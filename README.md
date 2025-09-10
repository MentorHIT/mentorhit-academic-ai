# MentorHIT - AI Academic Advisor

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### 🎓 Your AI Academic Advisor for Holon Institute of Technology

An application providing personalized academic guidance, course recommendations, and career planning for HIT students.

---

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
mentorhit-academic-ai/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── chat/          # Chat interface components
│   │   ├── layout/        # Layout components (Sidebar, etc.)
│   │   ├── preferences/   # Preferences quiz components
│   │   ├── profile/       # User profile components
│   │   └── ui/            # Shadcn/ui reusable components
│   ├── context/           # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ChatContext.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Top-level page components
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles with HIT branding
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

---

## 🎨 HIT Brand Colors

The application uses Holon Institute of Technology's official color palette:

```css
/* HIT Color Palette */
--hit-dark: #032F32      /* Chat bubbles, primary text */
--hit-secondary: #007377  /* Sidebar, interface elements */
--hit-primary: #0097A7    /* Headlines, buttons, accents */
--hit-light: #E8F7F8     /* Backgrounds, light elements */
```

---

## 🔧 Key Components

### **AuthContext**
Manages user authentication state, login/logout functionality, and session persistence.

### **ChatContext** 
Handles chat messages, AI response simulation, and conversation state management.

### **LoginForm**
Professional authentication interface with HIT email validation and form handling.

### **ChatInterface**
Real-time chat simulation with typing indicators, message history, and suggested prompts.

### **PreferencesQuiz**
Multi-step questionnaire for personalizing the user experience based on academic interests.

### **Dashboard**
Main application layout with navigation, header, and content area management.

---

## 👥 Team

**Team MentorHIT** - Hackathon Project for Holon Institute of Technology and AWS Public Sector Innovation Hackathon 

---

**Built with ❤️ for HIT students**

© 2025 Team MentorHIT. All rights reserved.
