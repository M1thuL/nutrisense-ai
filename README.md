# NutriSense AI 🥗

## Vertical: Food & Health

## Approach & Logic
NutriSense AI uses Google Gemini to analyze meal descriptions and provide 
real-time nutritional insights. The app learns from user meal history stored 
in Firebase Firestore to deliver personalized recommendations based on 
nutritional gaps, time of day, and dietary goals.

## How It Works
1. User logs a meal via text description
2. Gemini AI analyzes the meal and returns structured nutrition data
3. Data is stored in Firestore linked to user profile
4. Smart recommendation engine queries meal history + Gemini 
   to suggest next meals
5. Dashboard shows daily/weekly nutrition trends

## Google Services Used
- Gemini 1.5 Flash — AI-powered meal analysis and recommendations
- Firebase Auth — Google Sign-In authentication  
- Firebase Firestore — Meal logs and user profiles
- Google Cloud Run — Scalable serverless backend deployment
- Firebase Hosting — Frontend deployment

## Assumptions
- Users input meals in natural language (no barcode scanning)
- Nutritional data is AI-generated (not from a static database)
- App targets Indian dietary context by default but works globally
