Here’s a properly formatted and polished version of your README:

---

# Prelo - Collaborative Document Editor

**Prelo** is a real-time collaborative document editor built with **Next.js**, leveraging **Liveblocks** for seamless multi-user collaboration and **BlockNote** for a rich and extensible editing experience. It features user authentication via **Clerk** and utilizes **Firebase** for backend services.

---

## 🚀 Features

* **Real-time Collaboration**: Edit documents simultaneously with others. Changes are instantly reflected using Liveblocks.
* **Rich Text Editing**: Built with BlockNote, supporting various content blocks like headings, lists, and more.
* **User Authentication**: Secure access with Clerk – only authorized users can view/edit documents.
* **Backend Integration**: Firebase supports backend functionality like storage and potentially database access.
* **User Presence & Avatars**: See who’s editing in real-time, with avatars.
* **Dark/Light Theming**: Customize your experience with theme toggles.
* **Translation Support**: Translate documents into different languages via integrated APIs.
* **Integrated Chat**: Chat in real-time within documents.
* **User Roles**: Role-based access (e.g., editor) for permission control.
* **Document Management**: Delete documents or remove users from collaboration rooms.
* **Modern UI**: Built using Radix UI and Shadcn UI components.
* **Optimized Performance**: Fast development and builds with Next.js and Turbopack.

---

## 🛠️ Technologies Used

| Technology                          | Description                                         |
| ----------------------------------- | --------------------------------------------------- |
| **Next.js v15.3.2**                 | React framework for scalable web apps               |
| **React v19.1.0**                   | JavaScript library for UI development               |
| **Liveblocks v2.24.2**              | Real-time collaboration engine                      |
| **BlockNote v0.30.0**               | Block-based editor built on top of TipTap           |
| **Clerk v6.19.4**                   | Authentication and user management                  |
| **Firebase v11.7.3**                | Backend services                                    |
| **Firebase Admin v13.4.0**          | Admin SDK for server-side Firebase use              |
| **Radix UI v1.1.9–v2.2.4**          | Unstyled, accessible UI primitives                  |
| **Shadcn UI**                       | Styled component system built with Radix + Tailwind |
| **Tailwind CSS v4**                 | Utility-first CSS framework                         |
| **Yjs**                             | CRDTs for real-time collaboration                   |
| **Lucide React v0.510.0**           | SVG icon library                                    |
| **Framer Motion v12.12.1**          | Motion and animation for React                      |
| **Lottie React v2.4.1**             | Render After Effects animations                     |
| **Next Themes v0.4.6**              | Theme switching support                             |
| **React Firebase Hooks v5.1.1**     | Firebase hooks for React                            |
| **React Markdown v10.1.0**          | Markdown-to-React rendering                         |
| **Sonner v2.0.3**                   | Toast notifications                                 |
| **Tailwind Merge v3.3.0**           | Merges Tailwind class names                         |
| **Vaul v1.1.2**                     | Experimental UI components                          |
| **clsx v2.1.1**                     | Conditional class utility                           |
| **class-variance-authority v0.7.1** | Manage Tailwind class variants                      |
| **tw-animate-css v1.2.9**           | Tailwind CSS animation plugin                       |

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone <repository_url>
cd prelo
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Environment Variables

Create a `.env.local` file in the root of your project and add the required secrets:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Liveblocks
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
# Add other Firebase config as needed
```

### 4. Initialize Firebase

Ensure Firebase is initialized in both the frontend (`firebase.ts`) and backend (`firebase-admin.ts`) according to your app’s logic.

### 5. Start Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

---

## 🚀 Deployment

### Vercel Deployment

A deployment script is provided in `package.json`:

```json
"scripts": {
  "deploy": "vercel deploy --prod"
}
```

### Deploy Instructions

1. Install Vercel CLI:

```bash
yarn global add vercel
# or use npx:
npx vercel login
```

2. Log in:

```bash
vercel login
```

3. Deploy the app:

```bash
yarn deploy
```

Follow the CLI prompts to link and deploy your project.

---

## 📁 Project Structure

```
/components
  ├─ Header.tsx
  ├─ Sidebar.tsx
  ├─ Avatars.tsx
  ├─ TranslateDocument.tsx
  ├─ ChatToDocument.tsx
  └─ /ui/ (Reusable UI components)

lib/
  ├─ firebase-admin.ts
  ├─ liveblocks.ts
  └─ stringToColor.ts

/pages or /app
  └─ _app.tsx or layout.tsx (Root layout, theme provider)

public/
  └─ Static assets

/styles
  └─ globals.css
```

---

## 🤝 Contributing
I welcome contributions! To contribute:

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Commit with a descriptive message
5. Push to your fork
6. Open a Pull Request

Make sure to follow any linting or style guides configured in the project.

---

## 📄 License

\[MIT License]

---
