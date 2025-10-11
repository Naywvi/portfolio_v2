import React, { useState } from 'react';
import { AddChildModal } from './types';

export const AddChildModalComponent: React.FC<{
    modal: AddChildModal;
    onSave: (key: string, value: any, type: string) => void;
    onClose: () => void;
}> = ({ modal, onSave, onClose }) => {
    const isParentArray = modal.node.data.type === 'array';
    const [key, setKey] = useState(modal.key);
    const [type, setType] = useState<string>(modal.type);
    const [stringValue, setStringValue] = useState('');
    const [numberValue, setNumberValue] = useState('0');
    const [booleanValue, setBooleanValue] = useState(true);

    const handleSave = () => {
        let finalValue: any;

        switch (type) {
            case 'string':
                finalValue = stringValue;
                break;
            case 'number':
                finalValue = Number(numberValue);
                break;
            case 'boolean':
                finalValue = booleanValue;
                break;
            case 'null':
                finalValue = null;
                break;
            case 'object':
                finalValue = {};
                break;
            case 'array':
                finalValue = [];
                break;
        }

        onSave(key, finalValue, type);
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
                <h3 className="text-lg font-semibold mb-4">
                    Ajouter un enfant {isParentArray && <span className="text-sm text-gray-400">(à un tableau)</span>}
                </h3>
                <div className="space-y-3">
                    {!isParentArray && (
                        <div>
                            <label className="text-sm text-gray-400">Clé</label>
                            <input
                                type="text"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                className="w-full bg-[#16161e] border border-[#414868] rounded px-3 py-2 mt-1"
                            />
                        </div>
                    )}
                    <div>
                        <label className="text-sm text-gray-400">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-[#16161e] border border-[#414868] rounded px-3 py-2 mt-1"
                        >
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="object">Object</option>
                            <option value="array">Array</option>
                            <option value="null">Null</option>
                        </select>
                    </div>

                    {type === 'string' && (
                        <div>
                            <label className="text-sm text-gray-400">Valeur</label>
                            <input
                                type="text"
                                value={stringValue}
                                onChange={(e) => setStringValue(e.target.value)}
                                className="w-full bg-[#16161e] border border-[#414868] rounded px-3 py-2 mt-1"
                                placeholder="Entrez une valeur..."
                            />
                        </div>
                    )}

                    {type === 'number' && (
                        <div>
                            <label className="text-sm text-gray-400">Valeur</label>
                            <input
                                type="number"
                                value={numberValue}
                                onChange={(e) => setNumberValue(e.target.value)}
                                className="w-full bg-[#16161e] border border-[#414868] rounded px-3 py-2 mt-1"
                            />
                        </div>
                    )}

                    {type === 'boolean' && (
                        <div>
                            <label className="text-sm text-gray-400 block mb-2">Valeur</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={booleanValue === true}
                                        onChange={() => setBooleanValue(true)}
                                    />
                                    <span>true</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={booleanValue === false}
                                        onChange={() => setBooleanValue(false)}
                                    />
                                    <span>false</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {(type === 'object' || type === 'array' || type === 'null') && (
                        <div className="text-sm text-gray-400 italic">
                            {type === 'null' && 'Valeur nulle (null)'}
                            {type === 'object' && 'Objet vide {}'}
                            {type === 'array' && 'Tableau vide []'}
                        </div>
                    )}
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-green-600 hover:bg-green-700 rounded py-2 transition"
                    >
                        Ajouter
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

