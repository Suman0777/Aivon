# 🤖 Aivon - Your All-in-One AI Assistant

Aivon is a modern web application that brings together multiple AI-powered features in one seamless platform. Create amazing content, interact with intelligent AI, and explore the power of artificial intelligence.

## ✨ Features

- **💬 AI Chat** - Smart conversational AI to answer your questions instantly
- **🎨 Background Remover** - Remove image backgrounds automatically with AI precision
- **🖼️ Text to Image** - Generate stunning images from simple text prompts
- **🎤 Text to Voice** - Convert written text into natural-sounding voice

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - Modern UI library
- **Vite** 7.3.1 - Next-generation build tool
- **Tailwind CSS** 4.2.1 - Utility-first CSS framework
- **React Router** 7.13.1 - Client-side routing
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icon library
- **Motion** - Animation library

## 📁 Project Structure

```
Aivon/
├── Frontend/
│   └── Aivon_Fr/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   ├── pages/
│       │   │   ├── Homepage.jsx
│       │   │   └── LoginPage.jsx
│       │   ├── Componet/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Midsection.jsx
│       │   │   └── SecondLower.jsx
│       │   ├── components/
│       │   │   └── ui/
│       │   └── lib/
│       ├── package.json
│       ├── vite.config.js
│       ├── tailwind.config.js
│       └── index.html
├── Backend/
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Aivon
   ```

2. **Install frontend dependencies**
   ```bash
   cd Frontend/Aivon_Fr
   npm install
   ```

3. **Setup environment variables** (if needed)
   Create a `.env` file in the `Frontend/Aivon_Fr` directory and add your API endpoints

### Running the Project

**Development Mode:**
```bash
cd Frontend/Aivon_Fr
npm run dev
```
The application will be available at `http://localhost:5173` (default Vite port)

**Build for Production:**
```bash
npm run build
```

**Preview Production Build:**
```bash
npm run preview
```

**Lint Code:**
```bash
npm run lint
```

## 📄 Pages

- **Homepage** (`/`) - Landing page showcasing Aivon's features with a retro grid background and hero section
- **Login Page** (`/login`) - User authentication page with sign up and login forms

## 🎨 Custom UI Components

The project includes custom-built UI components in `src/components/ui/`:
- `button.tsx` - Custom button component
- `card.tsx` - Card layout component
- `input.tsx` - Input field component
- `label.tsx` - Form label component
- `border-beam.tsx` - Animated border effect
- `video-text.tsx` - Video text component
- `retro-grid.tsx` - Retro grid background effect
- `ripple-button.tsx` - Button with ripple animation

## 🔧 Configuration

- **Vite Config** - `vite.config.js` for build optimization
- **Tailwind CSS** - `tailwind.config.js` for styling customization
- **TypeScript** - `tsconfig.json` for type checking
- **ESLint** - `eslint.config.js` for code quality

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚧 Backend

The backend folder is currently empty and ready for API implementation.

## 📦 Key Dependencies

- `react-router` - Routing management
- `tailwindcss` - Styling
- `class-variance-authority` - Component variant management
- `lucide-react` - Icons
- `motion` - Animations
- `shadcn` - UI component library

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

##  Support

For questions or support, please open an issue in the repository.
