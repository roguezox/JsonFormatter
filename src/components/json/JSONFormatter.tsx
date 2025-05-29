import React, { useState } from 'react';
import { Copy, Check, RefreshCcw, AlertCircle } from 'lucide-react';
import { formatJSON, minifyJSON, validateJSON } from './JSONFormatterLogic';
import CodeArea from '../common/CodeArea';
import Button from '../common/Button';

interface JSONFormatterProps {
  darkMode: boolean;
}

const JSONFormatter: React.FC<JSONFormatterProps> = ({ darkMode }) => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<number>(2);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleFormat = () => {
    try {
      const result = formatJSON(input, indent);
      setOutput(result);
      setError(null);
      setIsValid(true);
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
    }
  };

  const handleMinify = () => {
    try {
      const result = minifyJSON(input);
      setOutput(result);
      setError(null);
      setIsValid(true);
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
    }
  };

  const handleValidate = () => {
    try {
      validateJSON(input);
      setError(null);
      setIsValid(true);
    } catch (err) {
      setError((err as Error).message);
      setIsValid(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
            Input JSON
          </label>
          <div className="flex space-x-2">
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className={`text-sm px-2 py-1 rounded ${
                darkMode ? 'bg-slate-700 text-white' : 'bg-white text-slate-800'
              } border ${darkMode ? 'border-slate-600' : 'border-slate-300'}`}
            >
              <option value="2">Indent: 2 spaces</option>
              <option value="4">Indent: 4 spaces</option>
              <option value="8">Indent: 8 spaces</option>
            </select>
          </div>
        </div>
        <CodeArea
          value={input}
          onChange={setInput}
          placeholder="Paste your JSON here..."
          darkMode={darkMode}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleFormat} darkMode={darkMode}>
          <RefreshCcw size={16} className="mr-1" /> Format
        </Button>
        <Button onClick={handleMinify} darkMode={darkMode}>
          <RefreshCcw size={16} className="mr-1" /> Minify
        </Button>
        <Button onClick={handleValidate} darkMode={darkMode}>
          <AlertCircle size={16} className="mr-1" /> Validate
        </Button>
      </div>

      {isValid !== null && (
        <div
          className={`${
            isValid
              ? 'bg-green-100 text-green-800 border-green-200'
              : 'bg-red-100 text-red-800 border-red-200'
          } px-4 py-3 rounded-md border text-sm`}
        >
          {isValid
            ? 'JSON is valid! ✓'
            : `JSON is invalid: ${error}`}
        </div>
      )}

      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={`font-medium ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              Output
            </label>
            <Button onClick={handleCopy} darkMode={darkMode} small>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <CodeArea
            value={output}
            onChange={() => {}}
            placeholder="Formatted JSON will appear here"
            darkMode={darkMode}
            readOnly
          />
        </div>
      )}
    </div>
  );
};

export default JSONFormatter;