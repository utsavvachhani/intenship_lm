
### 🚀 **LaMinds Internship Task Tracker**

🗓️ **Start Date:** 19/05/2025 (Monday)
<br>
Daily Breakdown with Detailed Tasks 

---
---
📍 **Week 1 – 19/05/2025 (Monday) to 23/05/2025 (Friday)**

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


------
📍 **Week 2 – 26/05/2025 (Monday) to**

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


Absolutely! Here's your **LaMinds Internship Task Tracker – Day 7** entry (for today) following the same structured and emoji-enhanced style:

---

### 📅 **Day 7 – 27/05/2025 (Tuesday)**

📍 **Week 2 – Day 2**

**🛠️ Tasks & Explanations:**

* 🧑‍💼 **Final Polishing of Sign In & Sign Up Functionality**
  * Handled form validation edge cases and error messaging for a smooth user experience.
  * Managed secure token handling with `jsonwebtoken` and Redux state updates.
  * Ensured seamless switching between Sign In and Sign Up forms.

* 💬 **Post Features: Like, Create, Delete, and Update**

  * 🔄 **Like Post Functionality:** Implemented `PATCH` request to allow users to like posts. Optimistic UI updates ensure real-time feedback.
  * ➕ **Create Post:** Verified post submission via secure API endpoints and ensured newly created posts appear immediately on the UI.
  * 🗑️ **Delete Post:** Enabled users to remove posts with confirmation prompts and immediate UI update.
  * ♻️ **Update Post:** Used modal editing form for updating existing post content and images. Connected changes to backend and synced Redux store.

* 🚀 **Website Deployment**

  * 🌐 Successfully deployed the full-stack app on **Vercel** at:
    🔗 **[https://memories-app-omega.vercel.app](https://memories-app-omega.vercel.app)**
  * Integrated environment variables and ensured all features (auth, CRUD, like) work properly on production.

---

### 📅 **Day 8 – 28/05/2025 (Wednesday)**

📍 **Week 2 – Day 3**

**🛠️ Tasks & Explanations:**

* 🔍 **Implemented `getPostsBySearch` Feature (Frontend & Backend)**

  * 📡 **Backend:** Created a new route `/posts/search` in Express to handle query-based searches.
  * 🔗 **Query Logic:** Parsed search queries (e.g., title and tags) and filtered relevant posts from MongoDB using Mongoose’s `$regex` and `$in` operators.
  * ✅ **Tested API:** Verified with Postman that correct posts were returned based on dynamic search terms.

* 🌐 **Connected `getPostsBySearch` to Frontend**

  * 🚀 **API Integration:** Used Axios to call the `/posts/search` route with parameters based on user input.
  * 🧠 **State Handling:** Managed search-related data using React state and Redux.
  * 🔁 **URL Synchronization:** Implemented React Router's `useNavigate` and `useLocation` hooks to dynamically update the URL (`?searchQuery=...&tags=...`) based on search input.

* 🖥️ **UI Enhancements for Search Experience**

  * 🔎 **Search Bar Component:** Designed a responsive and interactive search bar using Material UI components (`TextField`, `Button`, `ChipInput`).
  * 📋 **Result Display:** Fetched and displayed related posts matching the search query dynamically as the URL changed—no page refresh needed.
  * 🧩 **Conditional Rendering:** Handled edge cases like "no results found" or empty input gracefully.

* 🧼 **Minor UI Polishing and UX Improvements**

  * 🎨 Adjusted layout spacing and typography in the post listing and form sections.
  * 📱 Improved mobile responsiveness for the search section.
  * ✨ Enhanced transitions and input feedback for a smoother search experience.

---
