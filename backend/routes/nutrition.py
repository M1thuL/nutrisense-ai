from fastapi import APIRouter, HTTPException
from services.gemini_service import gemini_service

router = APIRouter(prefix="/api/nutrition", tags=["Nutrition"])

@router.get("/{food_item}")
async def get_nutrition(food_item: str):
    if not food_item:
        raise HTTPException(status_code=400, detail="Missing food item")
        
    nutrition_facts = gemini_service.get_nutrition_facts(food_item)
    
    if "error" in nutrition_facts:
        raise HTTPException(status_code=500, detail=nutrition_facts["error"])
        
    return nutrition_facts
