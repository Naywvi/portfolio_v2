import React, { useState } from 'react';
import { EditModal } from './types';

export const EditModalComponent: React.FC<{
    modal: EditModal;
    onSave: (key: string, value: string) => void;
    onClose: () => void;
}> = ({ modal, onSave, onClose }) => {
    const [key, setKey] = useState(modal.key);
    const [value, setValue] = useState(modal.value);

    const handleSave = () => {
        onSave(key, value);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#24283b] border border-[#414868] rounded-lg p-6 w-96"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold mb-4">Éditer le nœud</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-sm text-gray-400">Clé</label>
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="w-full bg-[#16161e] border border-[#414868] rounded px-3 py-2 mt-1"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-400">Valeur (JSON)</label>
                        <textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full bg-[#16161e] border border-[#414868] rounded px-3 py-2 mt-1 font-mono text-sm h-32 resize-none"
                        />
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 rounded py-2 transition"
                    >
                        Sauvegarder
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 rounded py-2 transition"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};

