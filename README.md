# 🚌 TravelTrucks

**TravelTrucks** is a modern web application for camper van rentals. Users can
browse available campers, filter them by location and features, view detailed
camper pages with reviews, and make bookings directly online.

---

## 🚀 Live Demo

🔗 **Live Website:**
[https://goit-test-task-gamma.vercel.app/](https://goit-test-task-gamma.vercel.app/)
💾 **Source Code:**
[https://github.com/IhorMtr/goit-test-task](https://github.com/IhorMtr/goit-test-task)

---

## 🧭 Overview

The project is built using **Next.js** and **TypeScript**, with state management
handled by **Zustand**. Data is fetched from a public backend API hosted on
[MockAPI](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers).

---

## 🧩 Features

- 🏕️ Browse all available campers with detailed specs and prices
- 🔍 Filter campers by location, type, and amenities (AC, kitchen, bathroom,
  etc.)
- ❤️ Add campers to favorites (saved locally in browser storage)
- 📖 View camper details with gallery, specifications, and reviews
- ⭐ Read user reviews with 5-star ratings
- 📝 Submit a booking form with success notification
- 🔄 Pagination with “Load More” button
- 💅 Clean and modern user interface

---

## 🧠 Tech Stack

| Category         | Technology           |
| ---------------- | -------------------- |
| Framework        | Next.js (App Router) |
| Language         | TypeScript           |
| State Management | Zustand              |
| HTTP Client      | Axios                |
| Styling          | CSS Modules          |
| Deployment       | Vercel               |

---

## 🗂️ Project Structure

```
TravelTrucks/
├── app/                 # Next.js App Router pages and layout
│   ├── catalog/         # Catalog page and camper details
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx         # Home page
│
├── components/          # Reusable UI components
│   ├── CamperCard/
│   ├── FiltersForm/
│   ├── Header/
│   ├── Reviews/
│   ├── BookForm/
│   └── ...
│
├── lib/                 # API, helpers, store, and type definitions
│   ├── api/
│   ├── helpers/
│   ├── store/
│   └── types/
│
├── public/              # Static assets (images, icons, logo)
│
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/IhorMtr/goit-test-task.git
cd goit-test-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

---

## 🧾 API Reference

All data is fetched from the public API: 👉
[https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers)

**Endpoints:**

- `GET /campers` — get all campers (supports filters and pagination)
- `GET /campers/:id` — get details of a specific camper

---

## 👨‍💻 Author

**Ihor Motornyi**

🔗 [GitHub](https://github.com/IhorMtr)

🔗 [LinkedIn](https://www.linkedin.com/in/ihor-motornyi)
