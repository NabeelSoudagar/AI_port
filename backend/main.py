import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import openai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Portfolio API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenRouter Configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "").strip()

# Diagnostic check (Safe)
if OPENROUTER_API_KEY:
    print(f"API Key detected: {OPENROUTER_API_KEY[:6]}...{OPENROUTER_API_KEY[-4:]}")
    if not OPENROUTER_API_KEY.startswith("sk-or-v1-"):
        print("WARNING: API Key does not start with 'sk-or-v1-'. It may be incorrectly formatted.")
else:
    print("CRITICAL: OPENROUTER_API_KEY is empty!")

# Robust Model List (Fallback in order)
MODELS = [
    "openrouter/free",
    "google/gemini-2.0-flash-lite:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
    "deepseek/deepseek-chat:free",
    "qwen/qwen-2-7b-instruct:free"
]

client = None
if OPENROUTER_API_KEY and OPENROUTER_API_KEY != "your_openrouter_api_key_here":
    client = openai.OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY,
    )

# Function to Load Resume Data Dynamically
def get_resume():
    try:
        resume_path = os.path.join(os.path.dirname(__file__), "resume.json")
        with open(resume_path, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading resume: {e}")
        return {"error": f"Could not load resume: {str(e)}"}

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []

@app.get("/")
async def root():
    return {"message": "AI Portfolio API is running"}

@app.get("/portfolio")
async def get_portfolio():
    return get_resume()

@app.post("/chat")
async def chat(request: ChatRequest):
    if not client or not OPENROUTER_API_KEY or OPENROUTER_API_KEY == "your_openrouter_api_key_here":
        return {"response": "API Key is missing or invalid. Please add it to the backend .env file and restart."}

    resume = get_resume()
    system_prompt = f"""
    You are an AI assistant for {resume.get('basics', {}).get('name', 'Nabeel Soudagar')}'s portfolio. 
    Answer questions about their career, skills, and projects based on this data:
    {json.dumps(resume, indent=2)}
    
    Rules: Be professional, friendly, and concise. Never fabricate facts. If asked something not in the data, refer them to Nabeel's contact info.
    """
    
    messages = [{"role": "system", "content": system_prompt}]
    for m in request.history[-5:]:
        messages.append(m)
    messages.append({"role": "user", "content": request.message})

    # Try models one by one
    last_error = ""
    for current_model in MODELS:
        try:
            print(f"Trying model: {current_model}...")
            response = client.chat.completions.create(
                model=current_model,
                messages=messages,
                extra_headers={
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "Nabeel AI Portfolio",
                }
            )
            print(f"Success with model: {current_model}")
            return {"response": response.choices[0].message.content}
        except Exception as e:
            last_error = str(e)
            print(f"Model {current_model} failed: {last_error}")
            continue

    print(f"All models failed. Last error: {last_error}")
    raise HTTPException(status_code=500, detail=f"All AI models failed. Error: {last_error}")

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable for hosting (Render/Heroku/etc)
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
