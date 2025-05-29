import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Wand2, Lightbulb, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

interface AIRegexHelperProps {
  darkMode: boolean;
  onPatternGenerated: (pattern: string) => void;
}

const AIRegexHelper: React.FC<AIRegexHelperProps> = ({ darkMode, onPatternGenerated }) => {
  const [description, setDescription] = useState('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRegex = async () => {
    if (!description.trim()) {
      setError('Please enter a description of what you want to match');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Generate a regular expression that matches the following requirement: "${description}". 
        Respond in the following JSON format:
        {
          "pattern": "the_regex_pattern",
          "explanation": "detailed explanation of how the regex works"
        }`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      try {
        const data = JSON.parse(text);
        onPatternGenerated(data.pattern);
        setExplanation(data.explanation);
      } catch (e) {
        throw new Error('Invalid response format from AI');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className={`block font-medium mb-2 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
          Describe what you want to match
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Match valid email addresses or Find URLs in text..."
          className={`w-full px-3 py-2 rounded-md border ${
            darkMode 
              ? 'bg-slate-800 border-slate-700 text-white' 
              : 'bg-white border-slate-300 text-slate-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={generateRegex} 
          darkMode={darkMode}
          variant="primary"
        >
          <Wand2 size={16} className="mr-1" />
          {loading ? 'Generating...' : 'Generate Regex'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 rounded-md p-4 text-sm flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {explanation && (
        <div className={`rounded-md p-4 ${
          darkMode ? 'bg-slate-800' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className={darkMode ? 'text-yellow-400' : 'text-yellow-600'} />
            <span className="font-medium">Explanation</span>
          </div>
          <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIRegexHelper;