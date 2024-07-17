

// Clock and Date
function updateClockAndDate() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
setInterval(updateClockAndDate, 1000);

// Motivational Quotes
const quotes = [
    "The secret of getting ahead is getting started. - Mark Twain",
    "It always seems impossible until it's done. - Nelson Mandela",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future depends on what you do today. - Mahatma Gandhi",
    "Believe you can and you're halfway there. - Theodore Roosevelt"
];
function setRandomQuote() {
    const quoteElement = document.getElementById('motivationalQuote');
    quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}
setRandomQuote();
setInterval(setRandomQuote, 3600000); // Update every 6 hours

// Reminders
function addReminder() {
    const reminderInput = document.getElementById('newReminder');
    const reminderTimeInput = document.getElementById('reminderTime');
    const reminderList = document.getElementById('reminderList');

    if (reminderInput.value.trim() !== '' && reminderTimeInput.value.trim() !== '') {
        const reminderText = `${reminderInput.value} - ${new Date(reminderTimeInput.value).toLocaleString()}`;
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="flex items-center justify-between py-2">
                <div>
                    <input type="checkbox" onchange="updateProductivityScore()" class="mr-2">
                    <span>${reminderText}</span>
                </div>
                <button onclick="this.closest('li').remove(); updateProductivityScore()" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i> 
                </button>
            </div>
        `;
        reminderList.appendChild(li);
        reminderInput.value = '';
        reminderTimeInput.value = '';
        updateProductivityScore();
    }
}

// Tasks
function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="flex items-center justify-between py-2">
                <div>
                    <input type="checkbox" onchange="updateProductivityScore()" class="mr-2">
                    <span>${taskInput.value}</span>
                </div>
                <button onclick="this.closest('li').remove(); updateProductivityScore()" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i> 
                </button>
            </div>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
        updateProductivityScore();
    }
}


// Water Intake Tracker
let waterIntake = 0;
function addWater() {
    if (waterIntake < 8) {
        waterIntake++;
        updateWaterIntake();
        updateProductivityScore();
    }
}
function updateWaterIntake() {
    document.getElementById('waterIntake').textContent = `${waterIntake} / 8 glasses`;
    document.getElementById('waterProgress').style.width = `${(waterIntake / 8) * 100}%`;
}

// Focus Timer
let focusTimer;
let focusTimeRemaining = 1500; // 25 minutes in seconds
function startFocusTimer() {
    clearInterval(focusTimer);
    focusTimer = setInterval(() => {
        if (focusTimeRemaining > 0) {
            focusTimeRemaining--;
            updateFocusTimer();
        } else {
            clearInterval(focusTimer);
            alert('Focus session completed!');
            updateProductivityScore();
        }
    }, 1000);
}
function stopFocusTimer() {
    clearInterval(focusTimer);
}
function updateFocusTimer() {
    const minutes = Math.floor(focusTimeRemaining / 60);
    const seconds = focusTimeRemaining % 60;
    document.getElementById('focusTimer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Quick Notes
function saveNotes() {
    const quickNotes = document.getElementById('quickNotes').value;
    localStorage.setItem('quickNotes', quickNotes);
    alert('Notes saved!');
}

// Logout
function logout() {
    // Handle logout logic here (e.g., clear session, redirect to login page)
    window.location.href = "index.html"; // Example: Redirect to login page
}

// Productivity Score
function updateProductivityScore() {
    const tasks = document.querySelectorAll('#taskList input[type="checkbox"]');
    const reminders = document.querySelectorAll('#reminderList input[type="checkbox"]');
    const totalItems = tasks.length + reminders.length;
    const completedItems = [...tasks, ...reminders].filter(item => item.checked).length;
    const productivityScore = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    document.getElementById('productivityScore').textContent = `${productivityScore}%`;
    document.getElementById('productivityProgress').style.width = `${productivityScore}%`;
}

// Initialize
window.onload = function() {
    updateClockAndDate();
    updateProductivityScore();
    const savedNotes = localStorage.getItem('quickNotes');
    if (savedNotes) {
        document.getElementById('quickNotes').value = savedNotes;
    }
}

// Timer updates
function updateTimer() {
    const timerMinutes = document.getElementById('timerMinutes').value;
    focusTimeRemaining = timerMinutes * 60; // Convert minutes to seconds
    updateFocusTimer();
}