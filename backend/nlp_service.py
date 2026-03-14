import os
import collections
from datetime import datetime, timedelta
from typing import List, Dict, Any

# NLP imports
from transformers import pipeline
import spacy

print("Loading NLP models. This might take a moment...")
try:
    classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None)
except Exception as e:
    print(f"Warning: Failed to load emotion model. {e}")
    classifier = None

try:
    nlp = spacy.load("en_core_web_sm")
except Exception as e:
    print(f"Warning: Failed to load spacy model. {e}")
    nlp = None

def extract_emotions(text: str) -> Dict[str, float]:
    """Extracts emotion scores and maps to requested labels."""
    if not classifier:
        return {"calm": 1.0}
    
    results = classifier(text[:512]) # limit length to prevent errors
    scores = {}
    if results and len(results) > 0:
        for item in results[0]:
            scores[item['label']] = item['score']
            
    mapped = {
        "happy": scores.get("joy", 0) + scores.get("surprise", 0) * 0.5,
        "sad": scores.get("sadness", 0),
        "anxious": scores.get("fear", 0),
        "stressed": scores.get("anger", 0) + scores.get("disgust", 0) + scores.get("fear", 0)*0.5,
        "calm": scores.get("neutral", 0) + scores.get("surprise", 0) * 0.5
    }
    
    total = sum(mapped.values())
    if total > 0:
        for k in mapped:
            mapped[k] = round(mapped[k] / total, 4)
            
    return mapped

def extract_keywords(text: str) -> List[str]:
    """Extracts nouns and entities from text."""
    if not nlp:
        return []
    doc = nlp(text)
    keywords = set()
    for token in doc:
        if token.pos_ in ['NOUN', 'PROPN'] and not token.is_stop and len(token.text) > 2:
            keywords.add(token.lemma_.lower())
    return list(keywords)

def generate_insights(entries: List[Any]) -> List[str]:
    """Generates text insights based on recent journal entries."""
    if not entries or len(entries) < 3:
        return ["Write a few more entries to unlock your emotional patterns."]
    
    insights = []
    day_stress = collections.defaultdict(int)
    day_joy = collections.defaultdict(int)
    topics = collections.Counter()
    
    for entry in entries:
        dt = entry.created_at
        if not dt: continue
        day_name = dt.strftime("%A")
        
        dominant = entry.primary_emotion
        if not dominant and entry.emotions:
            dominant = max(entry.emotions.items(), key=lambda x: x[1])[0]
        
        if dominant in ['sad', 'anxious', 'stressed']:
            day_stress[day_name] += 1
        elif dominant in ['happy', 'calm']:
            day_joy[day_name] += 1
            
        if entry.keywords:
            topics.update(entry.keywords)
            
    # Simple heuristics
    for day, count in day_stress.items():
        if count >= 2:
            insights.append(f"You often mention stress or anxiety on {day}s.")
            
    for day, count in day_joy.items():
        if count >= 2:
            insights.append(f"Your mood improves significantly on {day}s.")
            
    top_topics = topics.most_common(3)
    if top_topics:
        topic_words = [t[0] for t in top_topics if t[1] > 1]
        if topic_words:
            insights.append(f"Recurring themes in your thoughts: {', '.join(topic_words)}.")
            
    if not insights:
        insights.append("Your emotions have been relatively balanced recently without extreme highs or lows.")
        
    return insights
