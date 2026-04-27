import { API_BASE } from '../app.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('food-search-view');
    container.innerHTML = `
        <div class="stitch-card mb-2">
            <h3>Search Food Nutrition</h3>
            <div class="flex gap-1 mt-1">
                <input type="text" id="search-input" class="stitch-input" placeholder="e.g., Apple">
                <button id="btn-search" class="stitch-button primary" style="width:120px">Search</button>
            </div>
            <div id="search-loading" class="mt-1 text-center hidden">
                <div class="loading-spinner"></div>
                <p>Searching...</p>
            </div>
            <div id="search-result" class="mt-1"></div>
        </div>
    `;

    document.getElementById('btn-search').addEventListener('click', async () => {
        const term = document.getElementById('search-input').value;
        if (!term) return;

        document.getElementById('search-loading').classList.remove('hidden');
        document.getElementById('search-result').innerHTML = '';

        try {
            const response = await fetch(`${API_BASE}/nutrition/${encodeURIComponent(term)}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || 'Failed');

            document.getElementById('search-result').innerHTML = `
                <div class="stitch-card highlight-card">
                    <h4>${term}</h4>
                    <p>Serving Size: ${data.serving_size}</p>
                    <div class="flex space-between mt-1 mb-1">
                        <div><strong>Calories:</strong> <br>${data.calories}</div>
                        <div><strong>P:</strong> <br>${data.protein_g}g</div>
                        <div><strong>C:</strong> <br>${data.carbs_g}g</div>
                        <div><strong>F:</strong> <br>${data.fat_g}g</div>
                    </div>
                </div>
            `;
        } catch (err) {
            alert(err.message);
        } finally {
            document.getElementById('search-loading').classList.add('hidden');
        }
    });
});
