import React from 'react';

interface CodeAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  darkMode: boolean;
  readOnly?: boolean;
}

const CodeArea: React.FC<CodeAreaProps> = ({
  value,
  onChange,
  placeholder,
  darkMode,
  readOnly = false,
}) => {
  return (
    <div className={`relative rounded-md overflow-hidden border ${
      darkMode ? 'border-slate-700' : 'border-slate-300'
    }`}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full h-64 p-4 font-mono text-sm resize-y ${
          darkMode
            ? 'bg-slate-800 text-slate-200 placeholder-slate-500'
            : 'bg-white text-slate-800 placeholder-slate-400'
        } ${readOnly ? 'cursor-default' : ''} focus:outline-none`}
        spellCheck="false"
      />
      <div className={`absolute bottom-2 right-2 text-xs ${
        darkMode ? 'text-slate-500' : 'text-slate-400'
      }`}>
        {value.length} characters
      </div>
    </div>
  );
};

export default CodeArea;