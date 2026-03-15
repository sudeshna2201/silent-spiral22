# 🌀 The Silent Spiral 

> An AI-powered mental wellness companion that turns journaling into an active, emotional mirror.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HuggingFace](https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)

## 💡 The Problem
Over 40% of people struggle to notice their own mental health declining until they hit burnout. While traditional journaling helps, it relies on the user re-reading pages of notes to spot behavioral trends—something most people never do. We realized people needed a companion that pays attention *for* them.

## 🚀 The Solution
**The Silent Spiral** is a guided reflection app designed to act as your emotional mirror. It offers a calm, distraction-free environment for daily journaling, but the magic happens in the background. As you write, our application uses Natural Language Processing to instantly analyze sentiment, extract key emotions (like joy, fear, or stress), and identify the recurring themes occupying your mind.

## ✨ Key Features
- 🧘‍♀️ **Zen-Like Journaling Experience:** A distraction-free, minimalist UI utilizing glassmorphism, soft gradients, and subtle animations so the app itself feels like a deep breath.
- 🧠 **Instant Emotional Feedback:** If the AI detects stress, anxiety, or fear in a journal entry, it instantly intervenes with a customized 5-minute grounding prompt.
- 📊 **Trend Analysis:** All entries are aggregated into a visual 'Insights' dashboard, allowing users to track their emotional state over time and spot positive or negative spirals before they escalate.

## 🛠️ Architecture & Tech Stack
We built a decoupled, modern architecture to separate our UI rendering from our heavy AI inference operations:

- **Frontend:** React, Vite, Tailwind CSS, Recharts (for data visualization), and Lucide React (for iconography).
- **Backend:** Asynchronous Python API powered by FastAPI.
- **AI/NLP Layer:** Integrated HuggingFace transformer models and Spacy for live, sub-second sentiment analysis and keyword extraction.
- **Database:** SQLAlchemy ORM managing SQLite for lightweight, structure data storage.

## ⚙️ Local Setup Instructions

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/sudeshna2201/silent-spiral22.git
cd silent-spiral22
\`\`\`

### 2. Start the FastAPI Backend
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload
\`\`\`
*The API will be available at http://localhost:8000*

### 3. Start the React Frontend
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
*The web app will be available at http://localhost:5173*

## 🔮 Future Roadmap
1. **End-to-End Encryption / Local Storage:** Ensuring user journal entries remain 100% private and inaccessible to anyone except the user.
2. **LLM Insights:** Upgrading our NLP pipeline to a local LLM to generate weekly summary paragraphs of emotional growth.
3. **PWA Support:** Allowing users to install the app on their phone for on-the-go reflection.

---
*Built with ❤️ for mental wellness.*
