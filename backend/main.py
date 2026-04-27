from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router as analyze_router
from routes.recommend import router as recommend_router
from routes.nutrition import router as nutrition_router
from routes.profile import router as profile_router
from dotenv import load_dotenv

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
app.include_router(analyze_router)
app.include_router(recommend_router)
app.include_router(nutrition_router)
app.include_router(profile_router)

@app.get("/")
async def root():
    return {"message": "Welcome to NutriSense AI Backend"}
