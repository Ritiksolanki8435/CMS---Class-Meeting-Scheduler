
# Class Meeting Scheduler

A web application for scheduling and managing class meetings with an interactive calendar interface. Built with React and TypeScript.

## Features

- Interactive calendar with date selection
- Student meeting scheduling with age-based priority
- Real-time filtering by class or student name
- Meeting attendance tracking
- Excel export functionality
- Responsive design with dark/light theme

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository
```bash
git clone https://github.com/Ritiksolanki8435/CMS---Class-Meeting-Scheduler
cd class-meeting-scheduler
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Select dates on the calendar by clicking on them
2. Use filters to narrow down students by class or name
3. Click "Schedule Meetings" to automatically assign meetings
4. Click on any scheduled meeting to edit attendance or delete
5. View the Overview page for summary statistics
6. Export data to Excel for external use

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Redux Toolkit for state management
- Bootstrap for styling
- date-fns for date utilities
- SheetJS for Excel export
