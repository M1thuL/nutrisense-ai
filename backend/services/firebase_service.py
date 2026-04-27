import firebase_admin
from firebase_admin import credentials, firestore
import os

# Initialize Firebase Admins SDK
# In production, use GOOGLE_APPLICATION_CREDENTIALS env var
try:
    if not firebase_admin._apps:
        # Default initialization uses GOOGLE_APPLICATION_CREDENTIALS
        firebase_admin.initialize_app()
    db = firestore.client()
except Exception as e:
    print(f"Firebase initialization warning: {e}")
    db = None

def save_meal(user_id: str, meal_data: dict):
    if db:
        db.collection("users").document(user_id).collection("meals").add(meal_data)
        return True
    return False

def get_last_meals(user_id: str, limit: int = 3):
    if db:
        meals_ref = db.collection("users").document(user_id).collection("meals")
        # Order by timestamp descending
        query = meals_ref.order_by("timestamp", direction=firestore.Query.DESCENDING).limit(limit)
        results = query.stream()
        return [doc.to_dict() for doc in results]
    return []

def save_user_profile(user_id: str, profile_data: dict):
    if db:
        db.collection("users").document(user_id).set(profile_data, merge=True)
        return True
    return False
