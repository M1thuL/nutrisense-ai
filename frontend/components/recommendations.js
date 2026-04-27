import { API_BASE, currentUser } from '../app.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('recommendations-view');
    container.innerHTML = `
        <div class="stitch-card">
            <h3>Smart Recommendations</h3>
            <p>Based on your history, here's what you should eat next.</p>
            <select id="time-select" class="stitch-input mt-1">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="snack">Snack</option>
                <option value="dinner" selected>Dinner</option>
            </select>
            <button id="btn-get-recs" class="stitch-button secondary-variant mt-1 w-100">Get Ideas</button>
            <div id="recs-loading" class="mt-1 text-center hidden">
                <div class="loading-spinner"></div>
                <p>Generating ideas...</p>
            </div>
            <div id="recs-results" class="mt-2 flex-column gap-1"></div>
        </div>
    `;

    document.getElementById('btn-get-recs').addEventListener('click', async () => {
        if (!currentUser) return alert('Log in first.');
        const t = document.getElementById('time-select').value;
        const resDiv = document.getElementById('recs-results');

        document.getElementById('recs-loading').classList.remove('hidden');
        resDiv.innerHTML = '';

        try {
            const response = await fetch(`${API_BASE}/recommend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: currentUser.uid, time_of_day: t })
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.detail || 'Failed');

            data.forEach(item => {
                resDiv.innerHTML += `
                    <div class="stitch-card highlight-card">
                        <h4>🍽️ ${item.meal}</h4>
                        <p class="mt-1"><strong>Calories:</strong> ~${item.calories} kcal</p>
                        <p><strong>Why:</strong> ${item.reason}</p>
                    </div>
                `;
            });
        } catch (error) {
            alert(error.message);
        } finally {
            document.getElementById('recs-loading').classList.add('hidden');
        }
    });
});
