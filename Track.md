
### 🚀 **LaMinds Internship Task Tracker**

🗓️ **Start Date:** 19/05/2025 (Monday)
📍 **Week 1 – Daily Breakdown with Detailed Tasks**

---

#### 📅 **Day 1 – 19/05/2025 (Monday)**
📍 **Week 1 – Day 1**

**🛠️ Tasks & Explanations:**

* ⚛️ **Basic Setup for the React App**
  Set up the React development environment using CRA or Vite. Configure folder structure, install dependencies, and initialize routing.

* 🔧 **Create Basic API Structure for Backend**
  Set up a Node.js + Express backend with initial route handlers and a clean project architecture for scalability.

* 🎨 **Finalize Initial UI Elements**
  Build reusable components like Header, Footer, and Landing Page. Apply base styling and ensure mobile responsiveness.

---

#### 📅 **Day 2 – 20/05/2025 (Tuesday)**
📍 **Week 1 – Day 2**

**🛠️ Tasks & Explanations:**

* 🌐 **Work on API: Add `GET` and `POST` Endpoints**
  Define backend endpoints to handle fetching (`GET`) and creating (`POST`) operations for posts. Validate inputs and return proper responses.

* 🛢️ **Connect MongoDB with Frontend**
  Integrate MongoDB using Mongoose. Set up schemas for post data and test database operations.

* 🔗 **Implement API Consumption in Frontend**
  Use Axios to send requests to the backend. Display retrieved data in a structured list on the frontend.

* ➕ **Create Post Feature**
  Build a form in React that lets users submit new posts. Capture input fields, validate them, and send the data to the backend via a POST request.

* 🧩 **Maintain and Display Posts in UI**
  After creating a post, automatically fetch the updated list and show it in the UI without refreshing. Ensure the frontend state syncs with the backend data using React hooks (e.g., `useState`, `useEffect`).

---

#### 📅 **Day 3 – 21/05/2025 (Wednesday)**
📍 **Week 1 – Day 3**

**🛠️ Tasks & Explanations:**

* ➕ **Add `POST` and ➖ `DELETE` Features**
  Finalize functionality to add new posts and delete existing ones from both backend and frontend interfaces.

* ♻️ **Implement `UPDATE` Functionality**
  Enable editing of posts. Use modal or inline forms to allow updates, and sync changes with MongoDB.

* 🧪 **Improve and Test API Routes**
  Test API with tools like Postman. Add error handling, validation, and logs for better debugging and security.

---

#### 📅 **Day 4 – 22/05/2025 (Thursday)**
📍 **Week 1 – Day 4**
**🛠️ Tasks & Explanations:**

* ❤️ **Implement Like Feature for Posts**
  Add a "Like" button to each post component. On click, update the like count in the database and reflect it immediately on the UI. Use optimistic UI updates for better UX. Ensure the backend route (`PATCH` or `PUT`) handles like increments and data consistency.

* 🎨 **Enhance UI using Material UI (MUI)**
  Integrate MUI components for a modern and consistent look. Replace basic HTML elements with MUI counterparts like `Card`, `Button`, `TextField`, `Dialog`, etc.
  ➤ **Reference:** Followed best practices from [this MUI Crash Course video](https://youtu.be/fzxEECHnsvU?si=DXRssvjjYSU0KT5J) for understanding how to use them effectively.

* 🖌️ **Refactor CSS and Responsiveness**
  Review and clean up existing CSS. Use MUI’s styling system (like `sx` prop and `styled()` API) for custom styles. Ensure all components are mobile-friendly with responsive breakpoints and flexible layouts.

* ⚙️ **Code Cleanup and UI Consistency**
  Ensure consistent color schemes, spacing, and typography across the app. Use MUI's `ThemeProvider` to define a global theme. Reorganize component code for better readability and reusability.

---

### 📅 **Day 5 – 23/05/2025 (Friday)**
📍 **Week 1 – Day 5**
**🛠️ Key Tasks:**

* 🔐 **Integrated Google Authentication**

  * Set up `@react-oauth/google` using credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials?project=ecstatic-moon-424809-m0).
  * Enabled secure login with the `GoogleLogin` component.

* 🧑‍💼 **Developed Sign In & Sign Up Forms**

  * Built responsive sign-in and sign-up forms using Material UI components.
  * Included fields for name, email, and password with validation.
  * Implemented password visibility toggle and form switching logic.

---


---
---

### 📅 **Day 6 – 26/05/2025 (Monday)**

📍 **Week 2 – Day 1**

**🛠️ Tasks & Explanations:**

* 🔐 **Completed Sign In & Sign Up Functionality**

  * Developed full Sign In and Sign Up pages with working form fields for name, email, and password using Material UI components.
  * Connected forms with backend authentication routes (`/signin` and `/signup`) using Axios.
  * Handled form submission logic, error responses, and state updates.

* 🔄 **Integrated Backend Authentication**

  * Connected to a Node.js + Express backend with MongoDB using Mongoose for secure user storage.
  * Implemented password hashing with `bcryptjs` and token generation with `jsonwebtoken`.
  * Ensured error handling for common cases like mismatched passwords and existing users.

* ☁️ **Fixed Google Sign-In via OAuth**

  * Successfully configured and fixed the `@react-oauth/google` component.
  * Managed Google Cloud Console credentials and ensured support for `localhost` during development.
  * Decoded Google token on frontend, dispatched auth actions to Redux, and stored user info in localStorage.

* 💾 **Local Storage Handling**

  * Stored JWT tokens and user profiles in `localStorage` for persistent login sessions.
  * Retrieved user data globally via Redux state, enabling conditionally rendered components (e.g., Navbar showing user's name and logout button).

* 🗂️ **Finalized All Auth-Related Files**

  * Created and organized React files: `Auth.jsx`, `Input.jsx`, `Icon.jsx`, and styling.
  * Refactored Redux actions and reducers to handle authentication logic.
  * Cleaned up backend structure: routes, controllers, and middleware (`auth.js`) for cleaner token handling and verification.

---
