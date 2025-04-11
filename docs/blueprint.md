# **App Name**: BookSwapr

## Core Features:

- User Authentication: User authentication and role management for Book Owners and Book Seekers with mock implementation.
- Book Listing: Book Owners can list books with title, author, genre, city/location, contact info, and cover image.
- Book Browsing: Book Seekers can browse book listings with filtering and search options.
- Owner Dashboard: Dashboard for Book Owners to manage their listings (add, edit, delete, mark as rented/exchanged).
- Seeker Dashboard: Dashboard for Book Seekers to browse and filter book listings.

## Style Guidelines:

- Primary color: Neutral white or light gray for a clean background.
- Secondary color: Soft blue (#E0F7FA) for headers and accents.
- Accent: Teal (#009688) to highlight interactive elements and differentiate Owner and Seeker views.
- Grid-based layout for book listings, ensuring responsiveness on all devices.
- Simple and clear icons for navigation and actions (e.g., edit, delete, rent, exchange).
- implement dark mode. use tailwind css.

## Original User Request:
Build me a complete full-stack web application called “Peer-to-Peer Book Exchange Portal” with a modern, clean, and responsive user interface. Use React + Next.js for the frontend and Node.js + Express.js for the backend. Store data in JSON files (flat file) instead of using a database. The app must include pages, API routes, UI components, and logic for authentication, book listings, and role-based user dashboards. The project should be deployable (Vercel for frontend, Render/Railway for backend).

⸻

🌐 App Purpose

Build a portal where:
	•	Book Owners can list books they want to give away or rent.
	•	Book Seekers can browse and find books to rent or exchange.

⸻

👤 User Roles

There are two types of users:
	1.	Book Owner: Can list books, view their dashboard with book entries.
	2.	Book Seeker: Can browse available book listings.

⸻

✨ User Interface & Design
	•	Use modern, minimalistic, clean UI design.
	•	Prefer rounded corners, good spacing, soft shadows, light/dark theme switch (optional).
	•	Mobile-responsive layout with grid/card-based components.
	•	Use color accents to differentiate Owner and Seeker views.

⸻

🔐 Authentication (Mock Only)

Implement basic login and signup functionality:
	•	Users can sign up using Name, Email, Phone, Password, and select their Role (Owner or Seeker).
	•	On login, redirect to the Owner Dashboard or Seeker Dashboard based on role.
	•	Passwords can be stored as plain text (no encryption).
	•	Use in-memory array or write to a JSON file called users.json.

⸻

📖 Book Listing Functionality

For Owners
	•	After login, Book Owners can:
	•	Add a new book
	•	See their listed books
	•	Edit or delete their own listings
	•	Mark a book as “Rented” or “Exchanged”

Fields for adding a book:
	•	Title (required)
	•	Author (required)
	•	Genre (optional)
	•	City/Location (required)
	•	Contact Email/Phone (required)
	•	Cover Image (optional; base64 or file input)

Store book listings in a JSON file named books.json.

For Seekers
	•	After login, Seekers can:
	•	View all book listings in a grid/card layout
	•	Filter/search by:
	•	Title
	•	Genre
	•	Location
	•	View Owner contact information

⸻

🧭 Pages to Include
	1.	/signup
	•	Form to register a user (name, email, phone, password, role selection)
	2.	/login
	•	Basic login form using email + password
	3.	/dashboard/owner
	•	Welcome header with Owner’s name
	•	Add New Book (form)
	•	My Listings (editable book cards with “Edit”, “Delete”, “Mark as Rented/Exchanged”)
	4.	/dashboard/seeker
	•	Welcome header with Seeker’s name
	•	All Book Listings (card view)
	•	Filter/Search by title, genre, location
	5.	/
	•	Simple landing page with “Login” / “Signup” buttons and a brief intro

⸻

🧠 Backend API Routes

Use Node.js + Express, saving data in flat JSON files.

User Auth Routes
	•	POST /api/signup → Save new user to users.json
	•	POST /api/login → Match email+password in users.json and return user info

Book Routes
	•	GET /api/books → Return all books from books.json
	•	POST /api/books → Add a new book to books.json
	•	PUT /api/books/:id → Update a book (edit or mark as rented)
	•	DELETE /api/books/:id → Delete a book (Owner-only)

⸻

📦 File Structure

The project should include the following folder structure:
/peerbook
├── /frontend (React + Next.js)
│   ├── /pages
│   ├── /components
│   ├── /utils
│   └── /styles
├── /backend (Node.js + Express)
│   ├── /routes
│   ├── /controllers
│   ├── /utils
│   ├── users.json
│   └── books.json

🧾 Extra Notes
	•	You can use Tailwind CSS or any lightweight UI framework if desired.
	•	You can also use Figma-style auto-layouts for UI structuring.
	•	Cover image upload (optional) can be base64 or uploaded to a temp folder.
	•	Allow users to edit or delete their own listings.
	•	Include a toggle to mark book as “Rented” or “Exchanged”.
	•	Use local storage to persist user session temporarily.
	•	Add dark/light mode toggle.
  