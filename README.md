

---

# **SkillBridge: A Micro-Learning Platform**  

## **Introduction**  
SkillBridge is a micro-learning platform designed to provide learners with quick, concise, and targeted lessons to enhance their skills efficiently. The platform focuses on bridging the gap between learners and curated knowledge by offering structured courses and real-time progress tracking.  

With SkillBridge, users can enroll in courses, complete lessons, and monitor their progress seamlessly in a user-friendly environment.  

---

## **Features**  
- **User Registration & Authentication**: Secure account creation and access to personalized dashboards.  
- **Course Management**: Browse, create, update, and delete courses and lessons.  
- **Enrollment**: Enroll in courses to access lessons and track learning progress.  
- **Progress Tracking**: Mark lessons as completed and review overall progress.  
- **Responsive Design**: Accessible across devices for seamless learning on the go.  

---

## **Technology Stack**  
### **Backend**  
- **Node.js**: Server-side runtime for efficient handling of requests.  
- **Express.js**: Framework for building RESTful APIs.  
- **MongoDB**: Database for storing user and course data.  
- **Mongoose**: ODM for MongoDB to simplify data modeling.  

### **Frontend**  
- **React.js**: Frontend library for building an interactive user interface.  
- **Axios**: For making API requests from the client to the server.  

### **Hosting & Deployment**  
- **Frontend**: Deployed on [Netlify/Vercel].  
- **Backend**: Hosted on [Heroku/Render].  
- **Database**: MongoDB Atlas for a cloud-based NoSQL database solution.  

---

## **Project Architecture**  
The system is designed using the MVC (Model-View-Controller) architecture for separation of concerns and scalability.  
### **Components**  
1. **Frontend**: Handles user interaction and UI rendering.  
2. **Backend**: Processes requests and business logic.  
3. **Database**: Stores user data, courses, lessons, and progress details.  

---

## **Installation**  
To run the SkillBridge application locally, follow these steps:  

### Prerequisites  
- Node.js  
- MongoDB (local or Atlas account)  
- Git  

### Steps  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-repo/SkillBridge.git  
   ```  

2. Navigate to the project directory:  
   ```bash  
   cd SkillBridge  
   ```  

3. Install dependencies for both the backend and frontend:  
   ```bash  
   cd backend  
   npm install  
   cd ../frontend  
   npm install  
   ```  

4. Set up environment variables:  
   - Create a `.env` file in the `backend` directory with the following details:  
     ```env  
     PORT=5000  
     MONGO_URI=your-mongodb-connection-string  
     JWT_SECRET=your-secret-key  
     REACT_APP_API_BASE_URL=http://localhost:5000  
     ```  

5. Start the backend server:  
   ```bash  
   cd backend  
   npm start  
   ```  

6. Start the frontend server:  
   ```bash  
   cd frontend  
   npm start  
   ```  

7. Open your browser and visit:  
   ```
   http://localhost:3000  
   ```  

---

## **API Endpoints**  
### **User Management**  
| Method | Endpoint          | Description                |  
|--------|-------------------|----------------------------|  
| POST   | /api/users/register | Register a new user.       |  
| POST   | /api/users/login    | Login and obtain a token.  |  

### **Course Management**  
| Method | Endpoint              | Description                        |  
|--------|-----------------------|------------------------------------|  
| GET    | /api/courses          | Retrieve all courses.              |  
| POST   | /api/courses          | Create a new course.               |  
| GET    | /api/courses/:id      | Retrieve course details by ID.     |  
| PUT    | /api/courses/:id      | Update a course by ID.             |  
| DELETE | /api/courses/:id      | Delete a course by ID.             |  

### **Enrollment**  
| Method | Endpoint             | Description                        |  
|--------|----------------------|------------------------------------|  
| POST   | /api/enroll/:courseId | Enroll in a course.                |  
| GET    | /api/enroll          | Retrieve all enrolled courses.     |  

### **Progress Tracking**  
| Method | Endpoint                | Description                        |  
|--------|-------------------------|------------------------------------|  
| POST   | /api/progress/:courseId/:lessonId | Mark a lesson as complete. |  
| GET    | /api/progress/:courseId | Retrieve progress for a course.   |  

---

## **Challenges & Solutions**  
### **Challenge**: Backend-Frontend Connection and API Optimization  
- **Solution**: Leveraged Axios for efficient API calls, ensured consistent response formats, and optimized MongoDB queries to improve performance.  

### **Challenge**: Responsive Design for Mobile Users  
- **Solution**: Used React’s responsive libraries and CSS media queries to create a mobile-first UI.  

---

## **Future Enhancements**  
- Implement real-time notifications for lesson updates.  
- Add user feedback and course rating systems.  
- Integrate payment gateways for premium courses.  

---

## **Contributors**  
- **Jundi Yusuf**: Full Stack Developer, ALX Student  

---

## **License**  
This project is licensed under the MIT License. See the `LICENSE` file for details.  

