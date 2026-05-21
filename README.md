# 🚗 DriveFleet - Premium Car Rental Application

DriveFleet is a modern, full-stack, and high-performance Premium Car Rental Web Application built using **Next.js 15 (App Router)**, **Tailwind CSS**, and **Hero UI**. The platform provides seamless user authentication, a premium car fleet showcase, dynamic booking options with immersive modals, and an advanced booking management dashboard.

---

## ✨ Core Features

### 👤 1. Authentication & Security

- **JWT & HttpOnly Cookies:** Secured sessions using JSON Web Tokens stored inside protected HttpOnly cookies to mitigate XSS vulnerabilities.
- **Next.js Server-Side Context:** Tokens are extracted safely on the server side (`next/headers`) and securely mapped to backend API endpoints.

### 🚘 2. Dynamic Rental System

- **Live Availability Check:** Active states managing whether a luxury car is currently `Available` or `Rented Out`.
- **Interactive Context Modals:** Integrated **Hero UI** official modal architecture for smooth confirmation transitions during booking without generic browser alerts.

### 📊 3. My Bookings Dashboard

- **Real-time Synchronization:** Fetches targeted active rentals dynamically based on the logged-in user's cryptographic context.
- **Instant Cancellation:** Lightweight, modular, and declarative cancellation confirmation modals to effortlessly drop active schedules from the MongoDB/Node.js backend.

### ⚡ 4. High-Performance Static Elements

- **Why Choose Us Section:** A clean, grid-aligned corporate core value presentation optimized via **Next.js Server Components** for zero client-side JavaScript overhead.
- **Client Testimonials Section:** Highly responsive feedback display highlighting custom luxury rental experiences with real-time UI adaptivity.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** Next.js 15 (App Router Architecture)
- **Component & Modal Design:** Hero UI (`@heroui/react`)
- **Styling Engine:** Tailwind CSS
- **Icons Pack:** React Icons & Gravity UI Icons (`@gravity-ui/icons`)
- **State Management & Feedbacks:** React Hooks (`useState`, `useEffect`) & React Hot Toast

---

## 🚀 Getting Started

### 1. Clone the Project Repository

```bash
git clone [https://github.com/your-username/drivefleet.git](https://github.com/your-username/drivefleet.git)
cd drivefleet
```
