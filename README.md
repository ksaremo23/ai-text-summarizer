# AI Dashboard

A clean React + TypeScript dashboard that integrates an AI summarization feature using an external API, with proper architecture and UI separation.

## 🎯 Features

- **AI Text Summarization**: Paste text and get AI-generated summaries
- **Clean Architecture**: Separated concerns with hooks, services, and components
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, responsive design with smooth animations

## 🧱 Tech Stack

- **React** + **TypeScript** (Vite)
- **Groq API** for AI text summarization
- **Fetch API** for API integration
- **CSS** for styling (no heavy dependencies)

## 📁 Project Structure

```
src/
 ├─ components/
 │   ├─ Header.tsx
 │   ├─ TextInput.tsx
 │   ├─ SummaryOutput.tsx
 │   └─ ChatBox.tsx
 ├─ hooks/
 │   └─ useAISummary.ts
 ├─ services/
 │   └─ aiService.ts
 ├─ pages/
 │   └─ Dashboard.tsx
 ├─ types/
 │   └─ ai.ts
 ├─ App.tsx
 └─ main.tsx
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 🧠 Architecture

The app follows a clean architecture pattern:

1. **UI Layer** (Components): `TextInput`, `SummaryOutput`, `Header`
2. **Business Logic** (Hooks): `useAISummary` - manages state and API calls
3. **Service Layer**: `aiService` - handles API communication
4. **Types**: TypeScript definitions for type safety

### Data Flow

```
UI (TextInput)
 → hook (useAISummary)
   → service (aiService)
     → API (AI)
```

## 📝 Current Status

**Phase 1: AI Text Summarizer (MVP)** ✅

- [x] Text input component
- [x] Groq API integration
- [x] Summary output display
- [x] Loading states
- [x] Error handling
- [x] Clean UI

**Phase 2: Coming Soon**

- [ ] Chat UI
- [ ] Loading skeletons
- [ ] Enhanced UI features
- [ ] History/Previous summaries

## 🔧 Configuration

The app uses **Groq API** for AI text summarization. To set up:

1. Create a `.env` file in the root directory
2. Add your Groq API key:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
3. Restart the dev server

The API key is automatically loaded from environment variables. Make sure `.env` is in your `.gitignore` (already configured).

## 🚀 Deployment

### Deploy to Vercel

This project is configured for easy deployment on Vercel:

1. **Connect GitHub Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Add New Project"
   - Import your `ai-text-summarizer` repository

2. **Configure Environment Variables:**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `VITE_GROQ_API_KEY` with your Groq API key value
   - Make sure to add it for all environments (Production, Preview, Development)

3. **Deploy:**
   - Vercel will automatically detect Vite and configure the build
   - Click "Deploy" and your app will be live!

4. **Automatic Deployments:**
   - Every push to `main` branch will trigger a production deployment
   - Pull requests will create preview deployments

**Note:** The `vercel.json` file is already configured for optimal Vite deployment.

## 📄 License

MIT
