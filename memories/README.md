# 🧠 Memories

🌐 **Live Site :**  [memories-app-omega.vercel.app](https://memories-app-omega.vercel.app/)

**Memories** is a full-stack web application designed to **capture, preserve, and share meaningful moments**. It features secure user authentication, personal profiles, and the ability to view and interact with external memories.

---

## ✨ Features

- 🔐 JWT-based User Authentication
- 📸 Create, Edit, and Delete Memories
- 🖼️ Upload Images via Base64
- 👀 Explore Memories from Other Users
- 👤 User Profiles with Personal Memory Collections
- ❤️ Like Favorite Posts
- 🎨 Modern UI with Material-UI
- ⚡ Responsive Design

---

## 📦 NPM Commands (Client & Server)

---

## 🔧 Server Side (`/server`)

### 🛠️ Project Setup

#### 📁 Initialize Node project

```bash
npm init -y
````

#### 📦 Install required dependencies

```bash
npm install express mongoose cors body-parser dotenv bcryptjs jsonwebtoken serverless-http
```

#### 🧰 Install development dependencies

```bash
npm install --save-dev nodemon
```

#### 🚀 Start the server with hot-reloading

```bash
npm run dev
```

> 📝 Make sure your `package.json` includes:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

---

## 🎨 Client Side (`/client`)

### 🛠️ Project Setup

#### ⚛️ Create a Vite + React app

```bash
npm create vite@latest client --template react
cd client
```

#### 📦 Install required dependencies

```bash
npm install \
  @mui/material \
  @mui/icons-material \
  @mui/styles \
  @emotion/react \
  @emotion/styled \
  axios \
  moment \
  react-file-base64 \
  redux \
  react-redux \
  redux-thunk \
  react-router-dom \
  jwt-decode \
  @react-oauth/google
```

#### 🧰 Install development tools

```bash
npm install -D \
  vite \
  @vitejs/plugin-react \
  eslint \
  @eslint/js \
  eslint-plugin-react-hooks \
  eslint-plugin-react-refresh \
  globals \
  @types/react \
  @types/react-dom
```

#### 🚀 Start the development server

```bash
npm run dev
```

---

## 🔐 Authentication & Profiles

* JWT tokens for session handling
* Passwords encrypted using bcryptjs
* Profile system includes avatars and personal memory feeds
* Optional Google login via `@react-oauth/google`

---

## 📁 Project Structure

```bash
memories/
│
├── client/         # React + Vite frontend
│   └── ...
│
├── server/         # Express backend
│   └── ...
```

---

## 🧑‍💻 Developed By

**Utsav Vachhani**

* 🔗 [LinkedIn](https://www.linkedin.com/in/vachhani-utsav-21ut75/)
* 🐦 [X (Twitter)](https://x.com/ut_vachhani2115?t=EItJcQaI9oTviQcRAWBdzQ&s=09)
* 💻 [GitHub](https://github.com/utsavvachhani)

---

## 📄 License

This project is licensed under the MIT License.

---

```

Let me know if you'd like to:
- 📂 Add `.env.example`
- 🖼️ Include UI screenshots
- 🚀 Automate Vercel or GitHub Actions deployments

I'm happy to assist further!
```
