# Event-Management-Dashboard
A full-stack Event Management Dashboard where organizers can create and manage events, and users can browse and register for them. Includes role-based access, real-time updates, and notifications.


Tech Stack
- Frontend: React, Tailwind CSS, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, JWT, Socket.io
- Database: MongoDB

- 
 # How to Run the Project
1.  Backend Setup
1. Open terminal and go to the `server` folder:
   cd server
2. Install dependencies:
   npm install
3. Start the backend server:
   npm run dev
4. It runs on: http://localhost:5000
5. Create a `.env` file inside the `server` directory:
   
PORT=5000
MONGO_URI=mongodb+srv://amritrai22oct:amritrai22oct@event.2eujlat.mongodb.net/?retryWrites=true&w=majority&appName=event
JWT_SECRET=randomsecretkey
CLIENT_URL=http://localhost:5173

2.  Frontend Setup
1. Open terminal and go to the `client` folder:
   cd client
2. Install dependencies:
   npm install
3. Start the frontend app:
   npm run dev
4. It runs on: http://localhost:5173
 User Roles
- User: Can view and register for events
- Organizer: Can create and delete only their own events

# API Endpoints Overview
Auth Routes
POST /auth/register → Register new user
POST /auth/login → Login
Event Routes
GET /events → Get all events
POST /events → Create event (organizer only)
DELETE /events/:id → Delete event (only if organizer)
Registration Route
POST /registrations/:eventId → Register for an event
 Developer
👨‍💻 [Amrit rai] – GitHub: [https://github.com/amrit22oct](https://github.com/amrit22oct/Event-Management-Dashboard.git)

