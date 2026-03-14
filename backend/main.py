from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import journals

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Silent Spiral API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev, you might want to lock this down in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(journals.router)

@app.get("/")
def root():
    return {"message": "Welcome to Silent Spiral API"}
