from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from database import get_db
import models
from pydantic import BaseModel, ConfigDict
from nlp_service import extract_emotions, extract_keywords, generate_insights

router = APIRouter(prefix="/api", tags=["Journals"])

class JournalCreate(BaseModel):
    text: str

class JournalResponse(BaseModel):
    id: int
    text: str
    created_at: datetime
    emotions: dict | None
    primary_emotion: str | None
    keywords: list[str] | None

    model_config = ConfigDict(from_attributes=True)

@router.post("/journal", response_model=JournalResponse)
def create_entry(entry: JournalCreate, db: Session = Depends(get_db)):
    emotions = extract_emotions(entry.text)
    keywords = extract_keywords(entry.text)
    
    primary_emotion = "neutral"
    if emotions:
        primary_emotion = max(emotions.items(), key=lambda x: x[1])[0]
        
    db_entry = models.JournalEntry(
        text=entry.text,
        emotions=emotions,
        primary_emotion=primary_emotion,
        keywords=keywords
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

@router.get("/journals", response_model=List[JournalResponse])
def get_entries(db: Session = Depends(get_db), limit: int = 10):
    return db.query(models.JournalEntry).order_by(models.JournalEntry.created_at.desc()).limit(limit).all()

@router.get("/insights")
def get_insights(db: Session = Depends(get_db)):
    # get last 30 entries
    entries = db.query(models.JournalEntry).order_by(models.JournalEntry.created_at.desc()).limit(30).all()
    insights = generate_insights(entries)
    return {"insights": insights}

@router.get("/trends")
def get_trends(db: Session = Depends(get_db)):
    # oldest to newest for charts
    entries = db.query(models.JournalEntry).order_by(models.JournalEntry.created_at.asc()).limit(30).all()
    trend_data = []
    for entry in entries:
        dt = entry.created_at.strftime("%Y-%m-%d") # Or could use created_at.isoformat()
        
        # Check if entry with same date exists
        existing = next((item for item in trend_data if item["date"] == dt), None)
        
        if existing:
            # Average the scores or just ignore for simplicity - let's keep latest for today
            if entry.emotions:
                for k, v in entry.emotions.items():
                    existing[k] = (existing.get(k, 0) + v) / 2
        else:
            data_point = {"date": dt}
            if entry.emotions:
                data_point.update(entry.emotions)
            trend_data.append(data_point)
            
    return trend_data
