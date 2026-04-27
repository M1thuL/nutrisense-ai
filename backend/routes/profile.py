from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.firebase_service import save_user_profile

router = APIRouter(prefix="/api/profile", tags=["Profile"])

class ProfileRequest(BaseModel):
    user_id: str
    age: int
    weight_kg: float
    height_cm: float
    gender: str # 'male' or 'female'
    goal: str
    preferences: list[str]

@router.post("/")
async def save_profile(request: ProfileRequest):
    # Calculate BMI
    height_m = request.height_cm / 100
    bmi = request.weight_kg / (height_m * height_m) if height_m > 0 else 0
    
    # Calculate BMR using Mifflin-St Jeor Equation
    if request.gender.lower() == 'male':
        bmr = (10 * request.weight_kg) + (6.25 * request.height_cm) - (5 * request.age) + 5
    else:
        bmr = (10 * request.weight_kg) + (6.25 * request.height_cm) - (5 * request.age) - 161
        
    # Target calories depending on goal (assuming sedentary activity multiplier 1.2 for baseline)
    maintenance_calories = bmr * 1.2
    target_calories = maintenance_calories
    if request.goal == 'lose weight':
        target_calories -= 500
    elif request.goal == 'gain muscle':
        target_calories += 300
        
    profile_data = {
        "age": request.age,
        "weight_kg": request.weight_kg,
        "height_cm": request.height_cm,
        "gender": request.gender,
        "goal": request.goal,
        "preferences": request.preferences,
        "bmi": round(bmi, 1),
        "target_calories": round(target_calories)
    }
    
    success = save_user_profile(request.user_id, profile_data)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to save profile to Firestore")
        
    return {"message": "Profile saved successfully", "profile": profile_data}
