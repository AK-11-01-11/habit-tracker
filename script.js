// 1. Load habits when page opens
window.onload = loadFromMemory;

function addHabit() {
    const input = document.getElementById('habitInput');
    const text = input.value.trim();
    if (text === "") return;

    const habit = { text: text, completed: false };
    createHabitElement(habit);
    input.value = "";
    saveToMemory();
    updateCounter(); // Keeps the count correct
}

function createHabitElement(habit) {
    const list = document.getElementById('habitList');
    const li = document.createElement('li');
    
    // This builds the row with the "Done" and "X" buttons
    li.innerHTML = `
        <span class="${habit.completed ? 'done' : ''}">${habit.text}</span>
        <div>
            <button onclick="toggleHabit(this)">Done</button>
            <button onclick="deleteHabit(this)" style="background: #ff4444; margin-left: 5px;">X</button>
        </div>
    `;

    if (habit.completed) li.classList.add('habit-completed');
    list.appendChild(li);
}

function toggleHabit(button) {
    const row = button.parentElement.parentElement;
    const span = row.querySelector('span');
    span.classList.toggle('done');
    row.classList.toggle('habit-completed');
    saveToMemory();
    updateCounter(); // Updates the "Done" count
}

function deleteHabit(button) {
    button.parentElement.parentElement.remove();
    saveToMemory();
    updateCounter(); // Updates the "Total" count
}

function clearAllHabits() {
    if (confirm("Clear everything?")) {
        document.getElementById('habitList').innerHTML = '';
        saveToMemory();
        updateCounter();
    }
}

function updateCounter() {
    const total = document.querySelectorAll('#habitList li').length;
    const done = document.querySelectorAll('.habit-completed').length;
    document.getElementById('counter').innerText = `Total: ${total} | Done: ${done}`;
}

// Save to LocalStorage
function saveToMemory() {
    const habits = [];
    document.querySelectorAll('#habitList li').forEach(li => {
        habits.push({
            text: li.querySelector('span').innerText,
            completed: li.querySelector('span').classList.contains('done')
        });
    });
    localStorage.setItem('myHabits', JSON.stringify(habits));
}

// Load from LocalStorage
function loadFromMemory() {
    const saved = JSON.parse(localStorage.getItem('myHabits') || '[]');
    saved.forEach(habit => createHabitElement(habit));
    updateCounter();
}

// Make 'Enter' key work
document.getElementById("habitInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addHabit();
});