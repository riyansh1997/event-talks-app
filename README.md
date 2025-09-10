
# Tech Event Schedule Website

A simple, clean, and dynamic single-page web application to display the schedule for a one-day technical conference. The application is built with Node.js and Express on the backend, and standard HTML, CSS, and vanilla JavaScript on the frontend.

![Screenshot of the event schedule website](https://i.imgur.com/example.png) <!-- Replace with an actual screenshot URL if you have one -->

## Features

- **Dynamic Schedule:** The event schedule is loaded from a JSON file, so no code changes are needed to update talk details.
- **Live Category Search:** Instantly filter the schedule by typing a category (e.g., "AI", "Frontend", "Security") into the search bar.
- **Automatic Timings:** The frontend automatically calculates the start and end times for each session, including 10-minute transition breaks and a 1-hour lunch break.
- **Clean & Responsive UI:** A modern, single-page interface that is easy to read and navigate.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm) installed on your system.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/riyansh1997/event-talks-app.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd event-talks-app
    ```

3.  **Install the dependencies:**
    ```sh
    npm install
    ```

4.  **Start the server:**
    ```sh
    npm start
    ```

5.  **View the application:**
    Open your browser and navigate to `http://localhost:3000`.

## How It Works

The application consists of a lightweight Node.js server and a frontend client.

-   The **Node.js/Express server** has two jobs:
    1.  Serve the static frontend files located in the `public` directory.
    2.  Expose a single API endpoint at `/api/talks` that provides the schedule data from the `talks.json` file.

-   The **frontend JavaScript** running in the browser fetches the data from the `/api/talks` endpoint and dynamically builds the schedule HTML. It also handles the client-side logic for the live search/filter functionality.

## File Structure

```
.
├── public/
│   ├── index.html      # The main HTML structure
│   ├── style.css       # All styles for the application
│   └── script.js       # Client-side logic, rendering, and search
├── .gitignore          # Files and folders to be ignored by Git
├── package.json        # Project metadata and dependencies
├── README.md           # This file
├── server.js           # The Express.js server logic
└── talks.json          # The data source for the event schedule
```
