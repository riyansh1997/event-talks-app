
document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('scheduleContainer');
    const categorySearch = document.getElementById('categorySearch');
    let allTalks = [];

    // Fetch talk data from the API
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            renderSchedule(allTalks);
        })
        .catch(error => console.error('Error fetching talks:', error));

    // Add event listener for the search input
    categorySearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTalks = allTalks.filter(talk => 
            talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredTalks);
    });

    /**
     * Renders the entire schedule based on an array of talks.
     * @param {Array} talks - The array of talk objects to render.
     */
    function renderSchedule(talks) {
        scheduleContainer.innerHTML = ''; // Clear existing schedule
        let currentTime = new Date('1970-01-01T10:00:00'); // Start at 10:00 AM

        talks.forEach((talk, index) => {
            const startTime = new Date(currentTime);
            const endTime = new Date(startTime.getTime() + talk.duration * 60000);

            const scheduleItem = createTalkElement(talk, startTime, endTime);
            scheduleContainer.appendChild(scheduleItem);

            // Add lunch break after the 3rd talk in the original full schedule
            if (allTalks.length > 3 && allTalks[2].title === talk.title) {
                const lunchStartTime = new Date(endTime.getTime() + 10 * 60000); // 10 min transition
                const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60000); // 1 hour lunch
                const lunchItem = createBreakElement('Lunch Break', lunchStartTime, lunchEndTime);
                scheduleContainer.appendChild(lunchItem);
                currentTime = new Date(lunchEndTime);
            } else {
                 // Update time for the next talk (duration + 10 min break)
                currentTime = new Date(endTime.getTime() + 10 * 60000);
            }
        });
    }

    /**
     * Creates the HTML element for a single talk.
     */
    function createTalkElement(talk, startTime, endTime) {
        const item = document.createElement('div');
        item.className = 'schedule-item';

        const timeString = `${formatTime(startTime)} - ${formatTime(endTime)}`;

        item.innerHTML = `
            <div class="time">${timeString}</div>
            <div class="details">
                <div class="talk-card">
                    <h2>${talk.title}</h2>
                    <div class="speakers">By: ${talk.speakers.join(', ')}</div>
                    <p>${talk.description}</p>
                    <div class="categories">
                        ${talk.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        return item;
    }

    /**
     * Creates the HTML element for a break (e.g., Lunch).
     */
    function createBreakElement(title, startTime, endTime) {
        const item = document.createElement('div');
        item.className = 'schedule-item break-item';
        const timeString = `${formatTime(startTime)} - ${formatTime(endTime)}`;

        item.innerHTML = `
            <div class="time">${timeString}</div>
            <div class="details">
                 <div class="talk-card">
                    <h2>${title}</h2>
                </div>
            </div>
        `;
        return item;
    }

    /**
     * Formats a Date object into a HH:MM AM/PM string.
     */
    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});
