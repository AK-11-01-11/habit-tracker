// 1. This runs as soon as you open the website
window.onload = function() {
    loadFromMemory();
};

// 2. Add a new habit
function addHabit() {
    const input = document.getElementById('habitInput');
    const habitText = input.value;

    if (habitText === '') return;

    const li = document.createElement('li');
    // We added a new Delete button (the red 'X') here!
    li.innerHTML = `
        <span>${habitText}</span>
        <div>
            <button onclick="toggleHabit(this)">Done</button>
            <button onclick="deleteHabit(this)" style="background-color: #ff4d4d;">X</button>
        </div>
    `;

    document.getElementById('habitList').appendChild(li);
    input.value = ''; 
    saveToMemory(); // Save the new habit
}

// 3. Cross off a habit
function toggleHabit(button) {
    const span = button.parentElement.parentElement.querySelector('span');
    span.classList.toggle('done');
    saveToMemory(); // Save that you crossed it off
}

// 4. Delete a habit completely
function deleteHabit(button) {
    const li = button.parentElement.parentElement;
    li.remove(); // Removes it from the screen
    saveToMemory(); // Removes it from memory
}

// 5. The Memory & Daily Reset Logic
function saveToMemory() {
    const listHTML = document.getElementById('habitList').innerHTML;
    localStorage.setItem('myHabits', listHTML); // Saves the list
    localStorage.setItem('lastOpened', new Date().toDateString()); // Saves today's date
}

function loadFromMemory() {
    const savedHabits = localStorage.getItem('myHabits');
    const lastOpened = localStorage.getItem('lastOpened');
    const today = new Date().toDateString();

    // If we have saved habits, put them on the screen
    if (savedHabits) {
        document.getElementById('habitList').innerHTML = savedHabits;
    }

    // THE DAILY RESET: If the date saved isn't today's date, un-cross everything!
    if (lastOpened !== today) {
        const allSpans = document.querySelectorAll('#habitList span');
        for (let i = 0; i < allSpans.length; i++) {
            allSpans[i].classList.remove('done'); // Removes the grey crossed-out look
        }
        saveToMemory(); // Save the fresh start
    }
}