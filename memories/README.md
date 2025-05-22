## 📦 NPM Commands (Client & Server)

## 🔧 Server Side (`/server`)

##### Initialize the project (if not already initialized)
```bash
npm init -y
```

##### Install required dependencies
```bash
npm install express mongoose cors body-parser
```

##### Install development dependencies
```bash
npm install --save-dev nodemon
```

##### Start the server with hot-reloading

```bash
npm run start
```

> Make sure `package.json` contains:

```json
"scripts": {
  "start": "nodemon index.js"
}
```

---

## 🎨 Client Side (`/client`)


##### Create Vite + React app (only if starting from scratch)
```bash
npm create vite@latest client --template react
```
##### Move into the client directory
```bash
cd client
```
##### Install required dependencies

```bash
npm install @mui/material @mui/icons-material @mui/styles @emotion/react @emotion/styled
npm install axios moment react-file-base64
npm install redux react-redux redux-thunk
```

##### Install development tools
```bash
npm install -D vite @vitejs/plugin-react eslint eslint-plugin-react eslint-plugin-react-hooks
```

##### Start the client in development mode
```bash
npm run dev
```

