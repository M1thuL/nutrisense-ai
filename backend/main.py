from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import analyze, recommend, nutrition, profile
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="NutriSense AI API", description="AI-powered meal analysis and recommendation API")

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production to match your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(analyze.router)
app.include_router(recommend.router)
app.include_router(nutrition.router)
app.include_router(profile.router)

@app.get("/")
async def root():
    return {"message": "Welcome to NutriSense AI Backend"}
