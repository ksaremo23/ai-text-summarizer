# AI Insight Dashboard

A modern React + TypeScript dashboard that demonstrates AI integration with text summarization and conversational AI capabilities. Built with clean architecture, reusable services, and professional UI/UX patterns.

## 🎯 Features

### 📝 Text Summarizer
- **Customizable Summaries**: Control length (short/medium/long), tone (neutral/simple/professional), and format (bullets/paragraphs)
- **Smart Prompting**: Advanced prompt engineering for tailored output
- **Real-time Processing**: Fast AI-powered summarization using Groq API

### 💬 Chat Assistant
- **Conversational AI**: Context-aware chat with message history
- **Auto-scroll**: Automatic scrolling to latest messages
- **Typing Indicators**: Visual feedback during AI processing
- **Clear Conversation**: Easy reset functionality

### 🏗️ Architecture Highlights
- **Clean Component Structure**: Organized by feature (Summarizer, Chat, UI)
- **Reusable AI Service**: Single service used by both features
- **TypeScript**: Full type safety throughout
- **Modern UI/UX**: Professional design with loading states, error handling, and responsive layout

## 🧱 Tech Stack

- **React 19** + **TypeScript** (Vite)
- **Groq API** for AI text summarization and chat
- **Fetch API** for API integration
- **CSS** for styling (no heavy dependencies)

## 📁 Project Structure

```
src/
 ├─ components/
 │   ├─ Chat/
 │   │   ├─ ChatWindow.tsx
 │   │   ├─ ChatBubble.tsx
 │   │   ├─ ChatInput.tsx
 │   │   └─ ChatAssistant.tsx
 │   ├─ Summarizer/
 │   │   ├─ TextInput.tsx
 │   │   ├─ PromptControls.tsx
 │   │   ├─ SummaryOutput.tsx
 │   │   └─ Summarizer.tsx
 │   ├─ UI/
 │   │   ├─ Button.tsx
 │   │   ├─ Loader.tsx
 │   │   └─ ErrorMessage.tsx
 │   └─ Header.tsx
 ├─ services/
 │   └─ aiService.ts
 ├─ hooks/
 │   └─ useAISummary.ts (legacy, can be removed)
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

1. **UI Layer** (Components): Organized by feature (Summarizer, Chat) and shared UI components
2. **Service Layer**: `aiService.ts` - reusable AI service for both summarization and chat
3. **Business Logic**: Component-level state management with React hooks
4. **Types**: TypeScript definitions for type safety

### Data Flow

```
UI (Components)
 → Service (aiService)
   → Groq API
     → Response
       → UI Update
```

## 📝 Current Status

**Phase 1: AI Dashboard (MVP)** ✅

- [x] Tabbed dashboard interface
- [x] Text summarizer with prompt controls
- [x] Chat assistant with message history
- [x] Shared AI service architecture
- [x] Loading states and error handling
- [x] Clean, responsive UI
- [x] TypeScript type safety

**Phase 2: Future Enhancements**

- [ ] Dark/Light mode toggle
- [ ] Conversation history persistence
- [ ] Export summaries
- [ ] Multiple AI model selection
- [ ] Enhanced animations

## 🔧 Configuration

The app uses **Groq API** for AI capabilities. To set up:

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

## 🎨 UI/UX Features

- **Loading States**: Visual feedback during AI processing
- **Error Handling**: User-friendly error messages
- **Disabled States**: Proper button/input states during processing
- **Responsive Design**: Works on desktop and mobile
- **Keyboard Support**: Enter to send, Ctrl+Enter for textarea
- **Smooth Animations**: Fade-in and slide-in effects

## 🧪 States Handled

| State | Implementation |
|-------|---------------|
| Loading | Spinner + disabled inputs |
| Error | Error message display |
| Empty | Placeholder states |
| Disabled | While processing |

## 📄 License

MIT

## 🙏 Acknowledgments

Built with [Groq](https://groq.com) for fast AI inference and [Vite](https://vitejs.dev) for lightning-fast development.
