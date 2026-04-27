import { API_BASE, currentUser } from '../app.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('meal-analyzer-view');
    container.innerHTML = `
        <div class="stitch-card mb-2">
            <h3>Analyze Your Meal</h3>
            <p>Describe what you ate, and let AI calculate the nutrition.</p>
            <textarea id="meal-input" class="stitch-input mt-1" rows="3" placeholder="e.g. 2 idlis with coconut chutney and sambar"></textarea>
            <button id="btn-analyze" class="stitch-button primary mt-1 w-100">Analyze Meal</button>
            <div id="analyze-loading" class="mt-1 text-center hidden">
                <div class="loading-spinner"></div>
                <p>Analyzing with Gemini AI...</p>
            </div>
        </div>
        <div id="analyze-result"></div>
    `;

    document.getElementById('btn-analyze').addEventListener('click', async () => {
        const mealDesc = document.getElementById('meal-input').value;
        if (!mealDesc || !currentUser) return alert('Please enter a meal and ensure you are logged in.');

        document.getElementById('analyze-loading').classList.remove('hidden');
        document.getElementById('analyze-result').innerHTML = '';

        try {
            const response = await fetch(`${API_BASE}/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ meal_description: mealDesc, user_id: currentUser.uid })
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.detail || 'Failed to analyze');

            document.getElementById('analyze-result').innerHTML = `
                <div class="stitch-card highlight-card">
                    <h4>Nutrition Card</h4>
                    <p><strong>Health Score:</strong> ${data.health_score}/10</p>
                    <div class="flex space-between mt-1 mb-1">
                        <div><strong>Calories:</strong> <br>${data.calories} kcal</div>
                        <div><strong>Protein:</strong> <br>${data.protein_g}g</div>
                        <div><strong>Carbs:</strong> <br>${data.carbs_g}g</div>
                        <div><strong>Fat:</strong> <br>${data.fat_g}g</div>
                    </div>
                    <p class="mt-1"><strong>Analysis:</strong> ${data.analysis}</p>
                    <div class="mt-1">
                        <strong>Suggestions:</strong>
                        <ul style="padding-left:1.5rem">
                            ${data.suggestions.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            // Trigger an event so meal-tracker can refresh
            window.dispatchEvent(new Event('meal-logged'));
        } catch (error) {
            alert(error.message);
        } finally {
            document.getElementById('analyze-loading').classList.add('hidden');
        }
    });
});
