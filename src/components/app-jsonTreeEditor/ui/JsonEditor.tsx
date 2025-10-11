import React from 'react';

interface JsonEditorProps {
    value: string;
    onChange: (value: string) => void;
    error: string;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, error }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        const textarea = e.currentTarget;
        const { selectionStart, selectionEnd, value: textValue } = textarea;

        // Auto-complétion des paires
        const pairs: Record<string, string> = {
            '{': '}',
            '[': ']',
            '"': '"',
            "'": "'"
        };

        if (e.key in pairs && selectionStart === selectionEnd) {
            e.preventDefault();
            const before = textValue.substring(0, selectionStart);
            const after = textValue.substring(selectionStart);
            const newValue = before + e.key + pairs[e.key] + after;
            onChange(newValue);

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
            }, 0);
            return;
        }

        // Tab pour indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const before = textValue.substring(0, selectionStart);
            const after = textValue.substring(selectionEnd);
            onChange(before + '  ' + after);

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
            }, 0);
            return;
        }

        // Enter pour auto-indentation
        if (e.key === 'Enter') {
            e.preventDefault();
            const before = textValue.substring(0, selectionStart);
            const after = textValue.substring(selectionStart);

            const lines = before.split('\n');
            const currentLine = lines[lines.length - 1];
            const indent = currentLine.match(/^\s*/)?.[0] || '';

            const lastChar = before.trim().slice(-1);
            const nextChar = after.trim().charAt(0);
            const extraIndent = (lastChar === '{' || lastChar === '[') ? '  ' : '';
            const closeIndent = (lastChar === '{' || lastChar === '[') && (nextChar === '}' || nextChar === ']') ? '\n' + indent : '';

            const newValue = before + '\n' + indent + extraIndent + closeIndent + after;
            onChange(newValue);

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 1 + indent.length + extraIndent.length;
            }, 0);
            return;
        }
    };

    const handleFormat = (): void => {
        try {
            const formatted = JSON.stringify(JSON.parse(value), null, 2);
            onChange(formatted);
        } catch (e) {
            // Ignore si JSON invalide
        }
    };

    const lineNumbers = value.split('\n').map((_, i) => i + 1);

    return (
        <div className="w-72 bg-[#1e1e1e] border-r border-[#3e3e42] flex flex-col">
            <div className="px-3 py-2 bg-[#252526] border-b border-[#3e3e42] flex items-center justify-between">
                <span className="text-[11px] text-[#cccccc] font-semibold">data.json</span>
                <button
                    onClick={handleFormat}
                    className="text-[10px] text-[#cccccc] hover:text-white px-2 py-0.5 hover:bg-[#3e3e42] rounded transition"
                    title="Formater le JSON"
                >
                    Format
                </button>
            </div>
            <div className="flex-1 overflow-auto p-0 relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#1e1e1e] border-r border-[#3e3e42] flex flex-col text-right pr-2 pt-4 text-[11px] text-[#858585] font-mono select-none">
                    {lineNumbers.map((num) => (
                        <div key={num} className="leading-[1.6] h-[17.6px]">{num}</div>
                    ))}
                </div>
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[11px] leading-[1.6] pl-14 pr-4 py-4 resize-none focus:outline-none ${error ? 'border-l-2 border-red-500' : ''}`}
                    spellCheck={false}
                    style={{
                        tabSize: 2,
                        fontFamily: "'Consolas', 'Courier New', monospace",
                        caretColor: '#aeafad'
                    }}
                    placeholder="Paste your JSON here..."
                />
            </div>
            {error && (
                <div className="p-3 bg-[#5a1d1d] border-t border-[#be1100]">
                    <p className="text-[#f48771] text-[10px] font-mono leading-relaxed font-semibold">⚠ {error}</p>
                </div>
            )}
            <div className="px-4 py-1.5 bg-[#007acc] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white font-mono">{lineNumbers.length} lines</span>
                    <span className="text-[10px] text-white font-mono">UTF-8</span>
                </div>
                <span className={`text-[10px] font-mono ${error ? 'text-[#f48771]' : 'text-white'}`}>
                    {error ? '✗ Errors' : '✓ JSON'}
                </span>
            </div>
        </div>
    );
};