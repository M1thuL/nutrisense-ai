from dotenv import load_dotenv
import os
import json
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("WARNING: GEMINI_API_KEY is None or empty. App requires a valid key to generate responses.")
    api_key = "dummy_key_for_build"

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash")

def analyze_meal(meal_description: str) -> dict:
    prompt = f"""
    Analyze this meal: {meal_description}.
    Return ONLY valid JSON with these fields:
    {{
      "calories": number,
      "protein_g": number,
      "carbs_g": number,
      "fat_g": number,
      "fiber_g": number,
      "health_score": number (1-10),
      "vitamins": [string],
      "analysis": "string (2 sentences)",
      "suggestions": ["string"] (2-3 improvement tips),
      "healthier_alternatives": ["string"]
    }}
    """
    try:
        response = model.generate_content(prompt)
        text = response.text
        
        # Clean up the response to extract JSON
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
            
        return json.loads(text.strip())
    except Exception as e:
        return {"error": f"Failed to analyze meal: {str(e)}"}

def get_recommendations(time_of_day: str, recent_meals: list) -> list:
    meals_context = json.dumps(recent_meals)
    prompt = f"""
    Based on these recent meals: {meals_context}, 
    suggest 3 personalized healthy meals for {time_of_day} to fill nutrition gaps.
    Return ONLY valid JSON array with objects containing:
    [{{ "meal": "...", "reason": "...", "calories": 400 }}]
    """
    try:
        response = model.generate_content(prompt)
        text = response.text
        
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
            
        return json.loads(text.strip())
    except Exception as e:
        return [{"error": f"Failed to get recommendations: {str(e)}"}]

def get_nutrition_facts(food_item: str) -> dict:
    prompt = f"""
    Provide detailed nutrition facts for {food_item}.
    Return ONLY valid JSON with fields: calories, protein_g, carbs_g, fat_g, fiber_g, vitamins (list), serving_size.
    """
    try:
        response = model.generate_content(prompt)
        text = response.text

        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]

        return json.loads(text.strip())
    except Exception as e:
        return {"error": f"Failed to get nutrition facts: {str(e)}"}
