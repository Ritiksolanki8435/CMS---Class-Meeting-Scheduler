
# Class Meeting Scheduler (Frontend)

A React + TypeScript implementation of the **Dynamic Class Meeting Scheduler** with:

- Visual calendar with multi-date selection
- Age-priority + balanced class distribution auto-scheduling
- Editable events + attendance status
- Overview page with class-wise counts and daily Present/Absent/Late
- Excel export (Overview + per-date sheets) using **SheetJS (xlsx)**

## Stack
- React 18 + Vite + TypeScript
- Redux Toolkit for state
- date-fns for calendar math
- xlsx for Excel export

## Getting Started
```bash
pnpm i   # or npm i / yarn
pnpm dev # npm run dev / yarn dev
```

Open http://localhost:5173

## How it works
- Pick dates in the Calendar view (click to toggle). Navigate months with ◀/▶.
- Optionally apply filters (class or student) to limit which students are scheduled.
- Click **Schedule Meetings** to auto-allocate meetings across selected dates:
  - **Older students first** (age desc)
  - **Balanced per-class distribution** across dates with fair tie-breakers
- Click an event to edit its **attendance** or delete it.
- Go to **Overview** to view class-wise per-day counts and **Export to Excel**.

## Folder Structure
```text
src/
  components/
    Calendar/
      Calendar.tsx
      DayCell.tsx
    Filters/
      FilterBar.tsx
    Modal/
      EditEventModal.tsx
    Overview/
      Overview.tsx
  data/
    students.json
  store/
    index.ts
    slices/
      schedulerSlice.ts
  utils/
    scheduler.ts    # scheduling algorithm
    excel.ts        # Excel export helpers
  App.tsx
  main.tsx
  styles.css
  types.ts
```

## Notes
- Dummy data is served from `src/data/students.json`. Replace with a real API when available.
- Excel contains an **Overview** sheet and a sheet **per date** with detailed rows.
- The UI is responsive and intentionally minimal.
