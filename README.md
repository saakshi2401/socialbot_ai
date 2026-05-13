# 🎨 SocialBot AI - Frontend

The frontend of **SocialBot AI** is a high-performance, responsive React application designed with a focus on **User Experience (UX)** and **Premium Aesthetics**. It provides a seamless interface for users to generate and manage their social media content.

---

## 🚀 Key Features

### 💻 Dynamic Workspace
- **Interactive Sidebar**: Quickly switch between different chat sessions or start a fresh generation.
- **Real-time Chat Interface**: A fluid, messaging-style experience for interacting with the AI.
- **Control Center (Right Panel)**: Fine-tune your content with easy-to-use dropdowns for:
  - **Platforms**: Instagram, LinkedIn, Twitter/X, Facebook, YouTube, Threads.
  - **Tones**: Professional, Casual, Witty, Persuasive, Gen Z, Luxury, Excited.
  - **Features**: Caption Generator, Hashtag Strategist, Thread Architect, Reel Script Writer, Post Ideas.

### 🎭 Visual Excellence
- **Glassmorphic Design**: Modern UI using translucent surfaces (`backdrop-blur`) and thin borders.
- **Framer Motion Animations**: 
  - Smooth page transitions.
  - Hover scales on buttons and cards.
  - Staggered entrance animations for dashboard elements.
- **Tailwind CSS v4 (Alpha/Stable)**: Leveraging the latest in CSS utility technology for a lightweight and lightning-fast UI.

---

## 🛠️ Tech Stack & Libraries

Every library in this project was chosen for its performance and developer experience:

| Library | Purpose |
| :--- | :--- |
| **React 19** | The foundation of the UI, using functional components and hooks. |
| **Vite** | Provides an extremely fast dev server and optimized builds. |
| **Tailwind CSS v4** | Custom styling with a modern, design-system approach. |
| **Framer Motion** | Industry-standard animation library for React. |
| **Lucide React** | Consistent, beautiful SVG icons. |
| **React Router v7** | Handles client-side routing (Landing, Login, Signup, Dashboard). |
| **Axios** | Robust HTTP client for backend communication. |
| **Context API** | Managing global Authentication state (`AuthContext`). |

---

## 📂 Component Architecture

- **`Sidebar.jsx`**: Manages the list of past chats and the "New Chat" functionality.
- **`ChatArea.jsx`**: The core messaging component where user prompts and AI responses are displayed.
- **`RightPanel.jsx`**: The settings panel for customizing the platform, tone, and specific AI features.
- **`AuthContext.jsx`**: Provides user session data and login/logout functions globally.

---

## 🚦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Dev Server**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```


   <img width="828" height="856" alt="image" src="https://github.com/user-attachments/assets/dc05d430-0817-4467-b220-b35c52c87662" />
   <img width="1918" height="867" alt="image" src="https://github.com/user-attachments/assets/4e730c36-5295-4664-8db2-0e712e3a8277" />



---
*Developed by [Sakshi](https://github.com/saakshi2401)*
