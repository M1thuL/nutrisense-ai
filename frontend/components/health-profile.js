import { API_BASE, currentUser } from '../app.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('profile-view');
    container.innerHTML = `
        <div class="stitch-card mb-2">
            <h3>Your Health Profile</h3>
            <form id="profile-form" class="mt-1 flex-column gap-1">
                <div>
                    <label>Age</label>
                    <input type="number" id="prof-age" class="stitch-input" placeholder="years" required>
                </div>
                <div class="flex gap-1" style="flex-wrap: nowrap">
                    <div style="flex:1">
                        <label>Weight (kg)</label>
                        <input type="number" id="prof-weight" class="stitch-input" required>
                    </div>
                    <div style="flex:1">
                        <label>Height (cm)</label>
                        <input type="number" id="prof-height" class="stitch-input" required>
                    </div>
                </div>
                <div>
                    <label>Gender</label>
                    <select id="prof-gender" class="stitch-input">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Goal</label>
                    <select id="prof-goal" class="stitch-input">
                        <option value="eat healthy">Eat Healthy (Maintain)</option>
                        <option value="lose weight">Lose Weight</option>
                        <option value="gain muscle">Gain Muscle</option>
                    </select>
                </div>
                <div>
                    <label>Tags (e.g. vegetarian, nut allergy)</label>
                    <input type="text" id="prof-tags" class="stitch-input" placeholder="Comma separated...">
                </div>
                <button type="submit" class="stitch-button primary mt-1 w-100">Save Profile</button>
            </form>
            <div id="profile-result" class="mt-1 text-center font-bold color-primary"></div>
        </div>
    `;

    document.getElementById('profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentUser) return alert("Log in first");

        const payload = {
            user_id: currentUser.uid,
            age: parseInt(document.getElementById('prof-age').value),
            weight_kg: parseFloat(document.getElementById('prof-weight').value),
            height_cm: parseFloat(document.getElementById('prof-height').value),
            gender: document.getElementById('prof-gender').value,
            goal: document.getElementById('prof-goal').value,
            preferences: document.getElementById('prof-tags').value.split(',').map(s => s.trim()).filter(Boolean)
        };

        try {
            const response = await fetch(`${API_BASE}/profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || 'Failed');

            document.getElementById('profile-result').innerText = `Saved! Targeted Calories: ${data.profile.target_calories} | BMI: ${data.profile.bmi}`;
        } catch (err) {
            alert(err.message);
        }
    });
});
