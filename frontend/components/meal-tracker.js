document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('meal-tracker-container');
    container.innerHTML = `
        <div class="stitch-card">
            <h3>Daily Nutrition Goal</h3>
            <p id="calories-display">0 / 2000 kcal</p>
            <div class="stitch-progress-container mt-1">
                <div id="calories-progress-bar" class="stitch-progress-bar" style="width: 0%"></div>
            </div>
            <div class="mt-1" style="height: 200px">
                <canvas id="weekly-chart"></canvas>
            </div>
        </div>
    `;

    // Initialize Chart
    const ctx = document.getElementById('weekly-chart').getContext('2d');
    const weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Calories',
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: '#4CAF50',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } }
        }
    });

    window.addEventListener('meal-logged', updateTracker);
    window.addEventListener('user-ready', updateTracker);

    function updateTracker() {
        // Mocking an update logic. 
        // In real app, fetch meals from Firebase via backend endpoint
        const consumed = Math.floor(Math.random() * 800) + 400; // Mock 400-1200
        const total = 2000;
        const pct = Math.min((consumed / total) * 100, 100);

        document.getElementById('calories-display').innerText = `${consumed} / ${total} kcal`;
        document.getElementById('calories-progress-bar').style.width = `${pct}%`;

        if (pct > 100) document.getElementById('calories-progress-bar').style.backgroundColor = '#FF9800';
    }
});
