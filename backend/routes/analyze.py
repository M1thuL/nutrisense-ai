from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import gemini_service
from services.firebase_service import save_meal
import datetime

router = APIRouter(prefix="/api/analyze", tags=["Analyze"])

class AnalyzeRequest(BaseModel):
    meal_description: str
    user_id: str

@router.post("/")
async def analyze_meal(request: AnalyzeRequest):
    if not request.meal_description or not request.user_id:
        raise HTTPException(status_code=400, detail="Missing required fields")
        
    analysis_result = gemini_service.analyze_meal(request.meal_description)
    
    if "error" in analysis_result:
        raise HTTPException(status_code=500, detail=analysis_result["error"])
        
    # Add metadata
    meal_data = {
        "description": request.meal_description,
        "nutrition": analysis_result,
        "timestamp": datetime.datetime.utcnow().isoformat()
    }
    
    # Save to Firebase
    save_meal(request.user_id, meal_data)
    
    return analysis_result
