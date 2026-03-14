from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime, timezone
from database import Base

class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    # NLP extracted data
    emotions = Column(JSON, nullable=True) # e.g. {"happy": 0.8, "sad": 0.1, ...}
    primary_emotion = Column(String, index=True, nullable=True)
    keywords = Column(JSON, nullable=True) # list of strings
