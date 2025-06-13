
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
📍 **Week 2 – 26/05/2025 (Monday) to 30/05/2025 (Friday)**

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
### 📅 **Day 9 – 29/05/2025 (Thursday)**

📍 **Week 2 – Day 4**

**🛠️ Tasks & Explanations:**

* 📄 **Implemented Pagination Feature (Frontend & Backend)**

  * 🔙 **Backend Update:**
    Added support for pagination in the `GET /posts` route by accepting `page` query parameters.
    Used Mongoose's `.limit()` and `.skip()` functions to fetch a limited set of posts per request.
    ➤ Also returned `currentPage` and `numberOfPages` in the API response for better client-side handling.

  * 💻 **Frontend Integration:**
    Built a Pagination component using Material UI’s `Pagination` and `PaginationItem`.
    Incorporated React Router's `useNavigate` to switch between pages via URL (e.g., `?page=1`).
    Dynamically fetched posts based on the current page and updated Redux store accordingly.

  * 🔁 **Routing Logic with React Router:**
    Used `useParams` and `useEffect` to monitor URL changes and trigger new API calls as the page changed.

---

* ⚙️ **Loading State Handling for Better UX**

  * 🚀 **Start and End Loading Actions:**
    Implemented `START_LOADING` and `END_LOADING` Redux actions to manage a global loading state.
    Dispatched these actions around every async request (e.g., `fetchPosts`, `searchPosts`, `createPost`) to show or hide spinners during loading.

  * 🌀 **User Feedback with Spinners:**
    Displayed loading indicators using MUI's `CircularProgress` during data fetches to improve user feedback.
    Ensured the UI is responsive and avoids flickering or janky updates during async operations.

---

* 📦 **Optimized API Data Handling & Redux State**

  * 🗃️ **Structured API Responses:**
    Updated API to send structured responses (`data`, `currentPage`, `totalPages`) for easier consumption on frontend.

  * 📁 **Redux Enhancements:**
    Refined Redux slice for posts to track additional metadata like loading state and total pages.
    Updated selectors and reducers to support paginated data and keep components decoupled and clean.

---
### 📅 **Day 10 – 30/05/2025 (Friday)**

📍 **Week 2 – Day 5**

**🛠️ Tasks & Summary:**

* 📄 **Post Details Page Setup**

  * Implemented dynamic routing (`/posts/:id`) to view full post details.
  * Fetched individual post data by ID and displayed title, image, tags, and description.

* 🤖 **Recommended Posts Feature**

  * Used existing `getPostsBySearch` logic to fetch posts with similar tags.
  * Displayed recommended posts (excluding current one) under "You might also like".

* 🎨 **UI Improvements & Testing**

  * Ensured PostDetails and recommended sections are responsive and styled consistently.
  * Verified navigation between posts and data accuracy.

---
------
📍 **Week 3 – 02/06/2025 (Monday) to 06/06/2025 (Friday)**

---

### 📅 **Day 11 – 02/06/2025 (Monday)**

📍 **Week 3 – Day 1**

**🛠️ Tasks & Explanations:**

---

### 💬 **🗣️ Added Comments Functionality to Each Post**

* 🛠️ **Frontend UI for Comment Section:**

  * Built a **comment input field** under each post's detail view using Material UI's `TextField` and `Button`.
  * Allowed logged-in users to type and submit comments without page reload.
  * Displayed a dynamic list of all existing comments below the post content.

* 🔗 **Backend Integration:**

  * Extended the backend (`POST /posts/:id/comment`) to handle new comment submissions.
  * Stored comments as part of the post schema in MongoDB (array of strings or objects).
  * Ensured that new comments were added efficiently and returned in updated response.

* 🔁 **Live Comment Rendering:**

  * After comment submission, the frontend fetches and renders the updated comment list.
  * Used optimistic updates to instantly reflect the comment before re-fetching from server.

* 🔐 **User Identity with Comments:**

  * Tagged each comment with the commenter’s name (retrieved from localStorage / JWT payload).
  * Styled each comment with user avatars and formatted timestamps (e.g., “5 minutes ago”).

---

### 🎨 **✨ Final CSS Touches & UI Polishing**

* 🎯 **Focus on Happy & Clean UI:**

  * Chose a **light, joyful color palette** (pastel pinks, whites, purples) to create a feel-good user experience.
  * Added gentle **hover effects**, **elevation shadows**, and **rounded corners** for a smooth, modern feel.
  * Applied spacing and alignment fixes across sections (e.g., Post Cards, Auth Forms, Navbar).

* 📱 **Responsive Finishing:**

  * Ensured the **Comment Section** and **Post Details** render beautifully on mobile and tablet screens.
  * Used `Grid`, `Box`, and `Container` components to maintain layout harmony across screen sizes.

---

### 📅 **Day 12 – 03/06/2025 (Tuesday)**

📍 **Week 3 – Day 2**

**🛠️ Tasks & Explanations:**

---

### 🧾 **Adjusted Form CSS with Sticky Styling**

* 🧷 **Sticky Form Section**

  * Refined the layout and positioning of the **Post Creation / Edit Form** to stay **sticky at the top** (especially on larger screens).
  * Ensured better usability by keeping the form visible while scrolling through post lists.
  * Used CSS properties like `position: sticky`, `top`, and `z-index` to avoid overlap issues.

* 🖼️ **Improved Layout on All Screens**

  * Adapted sticky behavior only on desktops; ensured natural stacking on mobile for better experience.
  * Updated styling with **Material UI's `sx` prop** and `Grid` system to make spacing consistent and responsive.

---

### 🧭 **Updated Navbar for Responsive Media**

* 🧑‍💼 **Improved Desktop & Mobile Navigation**

  * Refactored the **Navbar component** to adapt dynamically based on screen width.
  * Used **Material UI's `useMediaQuery`** to conditionally render elements (like collapsing into a hamburger menu on small devices).
  * Enhanced user experience by keeping login/logout/user profile always accessible and readable.

* 🎨 **Navbar Styling and Font Consistency**

  * Applied a **unified font family** (e.g., `"Poppins", sans-serif` or `"Roboto"`) across the navbar and other components.
  * Harmonized color scheme with the rest of the UI (matching header/footer/post card themes).
  * Ensured dropdowns, links, and icons scale correctly on mobile devices using flexible layout units.

---

### 🖥️ **Post Details Responsiveness & Font Work**

* 📐 **Improved PostDetails Section**

  * Refined layout structure of `/posts/:id` page to support clean rendering on small screens.
  * Ensured the **post title, tags, description, comments, and recommended posts** stack correctly and don’t overflow.
  * Adjusted image scaling and container padding for better aesthetics.

* 🔠 **Font Family Integration Across the App**

  * Imported and applied a consistent, clean **font-family (like “Poppins” or “Open Sans”)** across all main components:
    ➤ Posts, Comments, Forms, Navbar, Buttons, etc.
  * Ensured the selected font pairs well with the app's light and pastel design system.

---

### 📅 **Day 13 – 04/06/2025 (Wednesday)**

📍 **Week 3 – Day 3**

**🛠️ Tasks & Summary:**

---

### 🧠 **Post Details & Recommendations**

* Improved tag-based recommendation logic.
* Excluded current post from recommended list.
* Ensured full responsiveness and clean card styling.

---

### 💬 **Comments Section Responsiveness**

* Made comments input and list mobile-friendly.
* Adjusted spacing, text, and layout for all screen sizes.

---

### 🔐 **Auth UX with React Toasts**

* Integrated `react-toastify` for login, signup, and logout messages.
* Positioned toasts at top-right with theme-aligned styles.
* Used toast + redirect for smoother auth flow.

---

### 🚪 **Logout Finalization**

* Added toast on logout.
* Cleared Redux & localStorage.
* Navbar updates and redirect on logout.

---

### 🎨 **General UI Enhancements**

* Minor UI fixes in Navbar and PostDetails.
* Verified responsiveness and transitions across devices.
---

### 📅 **Day 14 – 05/06/2025 (Thursday)**

📍 **Week 3 – Day 4**

---

### 🎨 **Styling & Responsiveness**

* Centralized all component styles into a single shared file.
* Fixed style nesting issues and cleaned up MUI `makeStyles` usage.
* Improved responsiveness across Navbar, Forms, and PostDetails using MUI’s Grid and breakpoints.

---

### 🧩 **Profile Planning**

* Outlined structure for a future Profile page (avatar, info, posts).
* Explored layout ideas for modular design and reusability.

---

### 📘 **Interview Prep**

* Revised key CSS (positioning, Flexbox, Grid) and JS topics (promises, ES6, array methods).
* Practiced with small examples to reinforce concepts.

---

### 🧼 **Other Tasks**

* Cleaned unused styles and imports.
* Updated paths after styling refactor.

---

### 📅 **Day 15 – 06/06/2025 (Friday)**

📍 **Week 3 – Day 5**

---

### 👤 **Developed User Profile Page (React + Redux)**

**🛠️ Tasks & Explanations:**

* ✅ **Created a Fully Functional User Profile Page**

  * Built a new `UserProfile.jsx` component in React to allow users to **view and update their profile information** (name, email, password).
  * Conditionally rendered edit forms using `useState` to toggle between view and edit modes.
  * Prevented editing for users authenticated via Google (`sub` check) and provided appropriate messages.

---

### 🔄 **Integrated Redux and API for Profile Update**

* ⚙️ **Redux Action & API Call:**

  * Created `updateUserProfile` Redux action to handle API interaction.
  * Connected it with the frontend form, dispatching data to the backend using:

    ```js
    export const updateUserProfile = (id, formData) => API.patch(`/user/${id}`, formData);
    ```

* 🔁 **Backend Routing and Controller:**

  * Added a backend route:

    ```js
    router.patch('/:id', updateUserProfile);
    ```
  * Implemented `updateUserProfile` controller logic to:

    * Validate incoming fields (firstName, lastName, email, password).
    * Hash new passwords (if provided).
    * Return the updated user object.

* 📁 **Updated User Schema in Mongoose:**

  * Ensured Mongoose user schema supports profile update and password re-hashing logic.
  * Applied best practices for schema structure and validation.

---

### 🎨 **Enhanced UI Styling with Material UI**

* 🖌️ Used `makeStyles` and `sx` to design a clean, responsive layout.
* Added a custom **Save / Cancel** button style matching the app theme.
* Ensured proper spacing, typography, and accessibility (form labels, error checks).

---

### 🔐 **LocalStorage & Toast Feedback**

* 🌐 Updated `localStorage` with new profile data after successful update.
* 💬 Used `react-toastify` to notify users of successful or failed profile updates.
* 🚫 Prevented updates when password and confirm password didn't match.

---

### 🧼 **Other Fixes & Refactoring**

* Cleaned up auth reducer to sync updated user profile across components.
* Ensured responsive behavior of the Profile Page on both desktop and mobile.


---
------
📍 **Week 4 – 09/06/2025 (Monday) to 13/06/2025 (Friday)**
---

### 📅 **Day 16 – 09/06/2025 (Monday)**

📍 **Week 4 – Day 1**

---

## 🛠️ Tasks & Explanations:

---

### 🔍 **Explored MERN Stack Project Ideas & Architectures**

* 📦 **Reviewed Existing MERN Projects**

  * Analyzed multiple MERN stack applications to understand advanced structuring, authentication patterns, and performance optimizations.
  * Focused on project structure, file separation, component reusability, Redux integration, and deployment strategies.

* 📚 **Noted Best Practices for Full-Stack Development**

  * Folder structure: `controllers`, `routes`, `models`, `middleware`, and centralized API services.
  * Frontend architecture: smart/dumb components, global state management with Redux or Context, and consistent theming with Material UI.

---

### 🛍️ **Finalized UV Mart E-commerce Project**

* 🧾 **Product Listing Page Setup**

  * Created a responsive product listing page using React + Material UI.
  * Displayed each product with image, title, description, and price.
  * Fetched products from a backend endpoint and managed via Redux.

* 👀 **User Product View (Frontend)**

  * Enabled users to view product details on a separate route (`/products/:id`).
  * Designed a clean layout with product info, price, and related items.
  * Implemented loading states and conditional rendering for better UX.

---

### 🔐 **Authentication with Google + Sign In / Sign Up Pages**

* 🔧 **Set Up Authentication System in New UV Mart Project**

  * Implemented Google OAuth integration using `@react-oauth/google` and token decoding.
  * Created dedicated **Sign In** and **Sign Up** pages with Material UI components.

* ⚙️ **Backend Authentication Setup (Express + MongoDB)**

  * Created `/signup`, `/signin`, and `/google-auth` routes.
  * Handled JWT generation, password hashing (`bcryptjs`), and user validation.
  * Stored user data securely in MongoDB and returned tokens on successful auth.

---

### 👤 **User Profile Page & Update Feature**

* 🛠️ **Developed Editable Profile Page**

  * Built a page where users can view and update their profile info (name, email, password).
  * Disabled editing for Google-authenticated users and showed informative messages.

* 🔁 **Redux & API Integration**

  * Connected profile update form with Redux and backend API (`PATCH /user/:id`).
  * On successful update, new data is reflected in `localStorage` and Redux state.

---

### 🧭 **Navigation & Routing**

* 🧑‍💼 **Updated Navbar Component**

  * Displayed user info conditionally (avatar + name).
  * Included logout functionality and links to Product List, Profile, and Auth pages.

* 🌐 **Defined Route Structure for UV Mart**

  * Set up React Router paths:
    * `/auth` – login/signup
    * `/profile` – user profile

---

### 📅 **Day 17 – 10/06/2025 (Tuesday)**

📍 **Week 4 – Day 2**

---

### 🛠️ **Tasks & Explanations:**

---

### 🧭 **Developed E-commerce Website Navbar**

* 🏗️ **Created a Responsive Navbar Using React + Tailwind CSS**

  * Set up a **sticky, top-level navigation bar** for the UV Mart project.
  * Included key sections with **navigation links**:

    * 🛍️ Products
    * 📈 Bestsellers
    * 📺 Mini-TV
    * 📞 Customer Service
    * 📱 Mobiles
    * 💡 Electronics
    * ➕ Sell
---

### 🎨 **Tailwind CSS Docs Review & Styling**

* 📚 **Read and Practiced TailwindCSS Documentation**

  * Reviewed how utility classes work for spacing, color, typography, and responsive design.
  * Studied and implemented:

    * `flex`, `justify-between`, `items-center`
    * `bg-color`, `hover:`, `text-xl`, `p-4`, `rounded`, `gap-x-4`
    * Responsive prefixes (`sm:`, `md:`, `lg:`)

---

### 📅 **Day 18 – 11/06/2025 (Wednesday)**

📍 **Week 4 – Day 3**

---

### 🛠️ **Tasks & Learnings Summary**

---

### 🎨 **Combined Styling with Material UI (MUI) & Tailwind CSS**

* Gained hands-on experience using **both MUI and Tailwind CSS** together for efficient UI development.
* Practiced how to:

  * Use **MUI components** for pre-built UI features (e.g., `AppBar`, `Button`, `TextField`) with logic integration.
  * Apply **Tailwind utility classes** for custom spacing, layout, and responsiveness (`flex`, `gap-x-4`, `hover:`, `rounded`, etc.).
* Learned how to **avoid style conflicts** by strategically choosing when to use MUI vs. Tailwind.

---

### 🧭 **AppBar Responsiveness & Authentication Awareness**

* Developed a **responsive navigation bar (AppBar)** for the UV Mart project using **React + Tailwind CSS + MUI**.
* Ensured mobile-friendly behavior by:

  * Using **conditional rendering** for menu collapse on smaller screens.
  * Integrating `useMediaQuery` (from MUI) and Tailwind's `sm:`, `md:`, `lg:` breakpoints.
* Dynamically displayed user authentication state:

  * If **logged in**: show user name, avatar, and logout option.
  * If **logged out**: show Sign In / Sign Up buttons.

---

### 🔐 **Sign In / Sign Up Page Enhancements**

* Continued development of **Sign In & Sign Up forms** using **Material UI components**.
* Ensured **responsive layout** with Tailwind grid and flex utilities.
* Added:

  * Form validation and feedback.
  * Password visibility toggles.
  * Button styling consistent with the app’s theme.

---

### 📅 **Day 19 – 12/06/2025 (Thursday)**

📍 **Week 4 – Day 4**

---

## 🛠️ Tasks & Explanations:

### 🔍 **API Testing & Postman Exploration**

* 🧪 **Explored Postman for API Testing**

  * Reviewed how to test RESTful APIs using **Postman** – focusing on:

    * `GET`, `POST`, `PATCH`, `DELETE` methods
    * Header configurations and body formats (JSON, URL-encoded)
    * Authorization tab usage (Bearer Token)
  * Tested key backend routes for **UV Mart**:

    * `/api/products`
    * `/api/user/signin`
    * `/api/user/profile/:id`
    * Verified success/failure responses and payload handling

* ✅ **Checked Backend Auth Flow**

  * Used Postman to simulate login, token generation, and profile fetching
  * Tested JWT verification middleware by sending invalid/expired tokens
  * Debugged edge cases: missing fields, duplicate users, incorrect passwords

---

### 📦 **Reviewed API Checker Tools**

* 🔧 Explored online tools like:

  * **Hoppscotch (formerly Postwoman.io)** – lightweight alternative to Postman
  * **ReqBin** – for quick HTTP requests
* Compared interface, ease of use, and ability to persist environments

---

---

### 📅 **Day 20 – 13/06/2025 (Friday)**

📍 **Week 4 – Day 5**

---

## 🛠️ Tasks & Explanations:

---

### 📧 **Explored Email OTP Verification Platforms**

* 🔍 **Reviewed OTP Services for Email Auth**

  * Researched platforms like:

    * **EmailJS**
    * **OTPify**
    * **Firebase Email Authentication**
    * Custom Node.js + Nodemailer approach
  * Analyzed their:

    * Ease of integration
    * Pricing models
    * Security practices (token expiration, rate limiting)

* 🧪 **Built a Sample OTP Flow (Conceptual)**

  * Defined how an email OTP system would work:

    1. User enters email on signup
    2. Server generates 6-digit OTP & stores it temporarily (Redis or DB)
    3. Sends OTP via email using SMTP or third-party service
    4. User submits OTP; server validates & proceeds
  * Outlined API routes like:

    * `POST /send-otp`
    * `POST /verify-otp`

---

### 🧠 **Built UV Mart Architecture Flow (Using draw\.io)**

* 🗂️ **Created a Visual Flowchart of UV Mart Architecture** using **draw\.io** (diagrams.net):

  * Mapped how the UV Mart app works:

    * **Frontend:** React + Redux → Axios → REST API
    * **Backend:** Express.js → Controllers → MongoDB
    * **Auth:** Google OAuth + JWT + Protected Routes
    * **State Flow:** Redux manages auth & products
    * **Pages:** Product List → Details → Profile → Auth
