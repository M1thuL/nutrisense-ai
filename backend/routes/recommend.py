from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import get_recommendations
from services.firebase_service import get_last_meals, db

router = APIRouter(prefix="/api/recommend", tags=["Recommend"])

class RecommendRequest(BaseModel):
    user_id: str
    time_of_day: str

@router.post("/")
async def handle_get_recommendations(request: RecommendRequest):
    if not request.user_id or not request.time_of_day:
        raise HTTPException(status_code=400, detail="Missing required fields")
        
    last_meals = get_last_meals(request.user_id, limit=3)
    
    recommendations = get_recommendations(request.time_of_day, last_meals)
    
    if len(recommendations) > 0 and "error" in recommendations[0]:
        raise HTTPException(status_code=500, detail=recommendations[0]["error"])
        
    return recommendations
