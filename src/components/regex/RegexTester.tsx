import React, { useState, useEffect } from 'react';
import { Copy, Check, Search, Flag } from 'lucide-react';
import { testRegex } from './RegexTesterLogic';
import CodeArea from '../common/CodeArea';
import Button from '../common/Button';

interface RegexTesterProps {
  darkMode: boolean;
}

const RegexTester: React.FC<RegexTesterProps> = ({ darkMode }) => {
  const [pattern, setPattern] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [flags, setFlags] = useState<string>('g');
  const [results, setResults] = useState<{
    matches: string[];
    matchCount: number;
    highlightedText: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const flagOptions = [
    { value: 'g', label: 'Global (g)', description: 'Find all matches' },
    { value: 'i', label: 'Case Insensitive (i)', description: 'Ignore case' },
    { value: 'm', label: 'Multiline (m)', description: 'Multiline mode' },
    { value: 's', label: 'Dotall (s)', description: 'Dot matches newlines' }
  ];

  const handleFlagToggle = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  const handleTest = () => {
    if (!pattern) {
      setError('Please enter a regex pattern');
      return;
    }

    try {
      const result = testRegex(pattern, text, flags);
      setResults(result);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setResults(null);
    }
  };

  const handleCopy = () => {
    if (results) {
      navigator.clipboard.writeText(results.matches.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Run test when pattern, text, or flags change (debounced)
  useEffect(() => {
    if (pattern && text) {
      const handler = setTimeout(() => {
        handleTest();
      }, 500);
      
      return () => clearTimeout(handler);
    }
  }, [pattern, text, flags]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <label className={`block font-medium mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
          Regular Expression
        </label>
        <div className="flex space-x-2">
          <div className={`flex-grow rounded-l border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'}`}>
            <div className="flex">
              <span className={`px-3 py-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className={`flex-1 px-2 py-2 outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}
              />
              <span className={`px-3 py-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>/</span>
              <span className={`px-3 py-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {flags || 'g'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {flagOptions.map((flag) => (
          <div 
            key={flag.value} 
            onClick={() => handleFlagToggle(flag.value)} 
            className={`cursor-pointer rounded-full px-3 py-1 text-sm flex items-center gap-1 transition-colors
              ${flags.includes(flag.value) 
                ? (darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800') 
                : (darkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700')}
            `}
          >
            <Flag size={12} />
            {flag.label}
          </div>
        ))}
      </div>

      <div>
        <label className={`block font-medium mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
          Test Text
        </label>
        <CodeArea
          value={text}
          onChange={setText}
          placeholder="Enter text to test against the regex..."
          darkMode={darkMode}
        />
      </div>

      <Button onClick={handleTest} darkMode={darkMode}>
        <Search size={16} className="mr-1" /> Test Regex
      </Button>

      {error && (
        <div className="bg-red-100 text-red-800 border border-red-200 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {results && (
        <>
          <div className="bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 rounded-md p-4 text-sm">
            <div className="font-medium">Results:</div>
            <div className="mt-1">{results.matchCount} match{results.matchCount !== 1 ? 'es' : ''} found</div>
          </div>

          {results.matchCount > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  Matches
                </label>
                {results.matches.length > 0 && (
                  <Button onClick={handleCopy} darkMode={darkMode} small>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy All'}
                  </Button>
                )}
              </div>
              
              {results.matches.length > 0 ? (
                <div className={`max-h-60 overflow-y-auto rounded-md p-4 ${
                  darkMode ? 'bg-slate-800' : 'bg-gray-50'
                }`}>
                  {results.matches.map((match, index) => (
                    <div 
                      key={index}
                      className={`px-3 py-2 mb-2 rounded ${
                        darkMode ? 'bg-slate-700' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <span className="font-mono">{match}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`p-4 rounded-md ${
                  darkMode ? 'bg-slate-800' : 'bg-gray-50'
                }`}>
                  No matches found.
                </div>
              )}
            </div>
          )}

          <div>
            <div className="mb-2">
              <label className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                Highlighted Text
              </label>
            </div>
            <div 
              className={`rounded-md p-4 font-mono whitespace-pre-wrap ${
                darkMode ? 'bg-slate-800' : 'bg-gray-50'
              }`}
              dangerouslySetInnerHTML={{ __html: results.highlightedText }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RegexTester;