# Multi-API Fetcher React App

A modern React.js application built with Vite and Tailwind CSS for fetching data from multiple APIs simultaneously with intelligent caching and performance monitoring.

## Features

- **Multi-Select API Choice** – Choose one or more APIs to fetch data from simultaneously
- **Dynamic Parameters** – Smart input fields that adapt based on selected APIs:
  - GitHub: username
  - Weather: latitude, longitude, current temperature
- **Reusable Components** – Modular architecture with clean, reusable components
- **Intelligent Caching** – Prevents redundant API calls with identical parameters
- **Cache Management** – Clear cached responses without removing displayed results
- **Response Time Tracking** – Real-time measurement and display of API response times
- **Default Placeholder** – Elegant placeholder state before data fetching
- **Fully Responsive** – Seamless experience across all device sizes

## APIs Integrated

| API | Endpoint | Description |
| --- | --- | --- |
| GitHub Users | `https://api.github.com/users/{username}` | Fetch GitHub user information |
| Cat Facts | `https://catfact.ninja/fact` | Random interesting cat facts |
| Chuck Norris Jokes | `https://api.chucknorris.io/jokes/random` | Random Chuck Norris jokes |
| Open-Meteo Weather | `https://api.open-meteo.com/v1/forecast` | Real-time weather forecast data |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)  
- npm or yarn

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Open your browser at http://localhost:5173 (or the port displayed in your terminal)

Project Structure
graphql
Copy code
src/
├── components/
│   ├── MultiSelect.jsx        # Multi-select dropdown for API selection
│   ├── GithubUsername.jsx     # GitHub username input field
│   ├── WeatherInputs.jsx      # Weather parameters input group
│   ├── CatFact.jsx            # Cat fact display component
│   ├── ChuckNorrisJoke.jsx    # Chuck Norris joke display
│   ├── FetchButton.jsx        # Primary action button
│   └── ClearCache.jsx         # Cache management button
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
└── index.css                  # Global styles with Tailwind
Note: All components are styled using Tailwind CSS for consistency and maintainability.

Usage Guide
Select APIs – Choose one or more APIs from the "Services APIs" dropdown

Enter Parameters – Fill in the required parameters for your selected APIs

Fetch Data – Click the "Fetch Data" button to retrieve information

View Results – Each API result displays with its response time in milliseconds

Cached Results – Identical requests use cached data automatically

Clear Cache – Remove cached data without clearing displayed results

Components Overview
MultiSelect
Custom multi-select dropdown for choosing APIs.

Props:

label: string - Label for the dropdown

options: array - Array of objects with { label, value, icon, description }

onChange: function - Callback with selected values

GithubUsername
Input field for GitHub username.

Props:

label: string - Label for the input

onChange: function - Callback with username value

WeatherInputs
Input fields for weather parameters.

Props:

label: string - Label for the input group

onChange: function - Callback with { latitude, longitude, temperature }

CatFact
Displays description for Cat Fact API.

Props:

label: string - Label text

onChange: function - Callback with fact value

ChuckNorrisJoke
Displays description for Chuck Norris Joke API.

Props:

label: string - Label text

onChange: function - Callback with joke value

FetchButton
Primary action button to trigger API fetch.

Props:

onClick: function - Callback to fetch APIs

loading: boolean - Shows loading state

disabled: boolean - Disables button

ClearCache
Button to clear cached API responses.

Props:

onClick: function - Callback to clear cache

Technologies Used
React 18 - Modern React with hooks

Vite - Fast build tool and dev server with HMR

Tailwind CSS - Utility-first CSS framework for responsive design

Additional Notes
Response times for API calls are measured and displayed in milliseconds

Cache prevents redundant calls with identical parameters

All components follow React best practices with proper prop validation

Fully responsive design works seamlessly across all device sizes

License
This project is open source and available under the MIT License.