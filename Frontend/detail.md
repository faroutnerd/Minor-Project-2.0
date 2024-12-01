client/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── assets/             # Static assets like images
│   │   ├── edit.png
│   │   └── trash.png
│   ├── components/         # Reusable components
│   │   ├── Header.js
│   │   ├── ProtectedRoute.js
│   ├── pages/              # Main pages
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Tasks.js
│   │   └── ChangePassword.js
│   ├── services/           # API service functions
│   │   ├── authService.js
│   │   └── taskService.js
│   ├── context/            # Context for global state
│   │   ├── AuthContext.js
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point for React
│   └── router.js           # Route configuration
├── .env                    # Frontend environment variables
├── package.json            # Frontend dependencies and scripts
