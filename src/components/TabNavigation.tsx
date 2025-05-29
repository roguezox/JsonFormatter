import React from 'react';
import { Code2, Terminal } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'json' | 'regex';
  onChange: (tab: 'json' | 'regex') => void;
  darkMode: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onChange, darkMode }) => {
  const tabs = [
    { id: 'json', label: 'JSON Formatter', icon: <Code2 size={18} /> },
    { id: 'regex', label: 'Regex Tester', icon: <Terminal size={18} /> },
  ];

  return (
    <div className={`flex rounded-lg overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-white shadow-md'}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id as 'json' | 'regex')}
          className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all duration-300 text-sm md:text-base
            ${activeTab === tab.id 
              ? darkMode 
                ? 'bg-slate-700 text-blue-400' 
                : 'bg-blue-50 text-blue-600' 
              : darkMode 
                ? 'text-slate-300 hover:bg-slate-700/50' 
                : 'text-slate-600 hover:bg-gray-50'
            }
          `}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;