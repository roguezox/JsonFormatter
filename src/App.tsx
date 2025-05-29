import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import TabNavigation from './components/TabNavigation';
import JSONFormatter from './components/json/JSONFormatter';
import RegexTester from './components/regex/RegexTester';

function App() {
  const [activeTab, setActiveTab] = useState<'json' | 'regex'>('json');
  const [darkMode, setDarkMode] = useState(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            DevTools<span className="font-light">Pro</span>
          </h1>
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-slate-700 text-yellow-300' : 'bg-slate-200 text-slate-700'} 
            transition-all duration-300 hover:scale-110`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <TabNavigation 
          activeTab={activeTab} 
          onChange={setActiveTab} 
          darkMode={darkMode}
        />

        <div className="mt-6">
          {activeTab === 'json' ? (
            <JSONFormatter darkMode={darkMode} />
          ) : (
            <RegexTester darkMode={darkMode} />
          )}
        </div>

        <footer className="mt-12 text-center text-sm opacity-70">
          <p>© {new Date().getFullYear()} DevToolsPro • Built with React & TailwindCSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;