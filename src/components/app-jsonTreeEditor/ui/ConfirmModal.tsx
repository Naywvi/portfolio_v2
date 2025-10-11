import React from 'react';
import { ConfirmModal } from './types';

export const ConfirmModalComponent: React.FC<{ modal: ConfirmModal }> = ({ modal }) => {
    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={modal.onCancel}
        >
            <div
                className="bg-[#24283b] border-2 border-orange-500/50 rounded-lg p-6 w-[500px] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-orange-400 mb-2">{modal.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{modal.message}</p>
                        {modal.currentValue && (
                            <div className="mt-3 p-3 bg-[#16161e] rounded border border-[#414868]">
                                <p className="text-xs text-gray-400 mb-1">Valeur actuelle :</p>
                                <code className="text-sm text-yellow-300 font-mono break-all">{modal.currentValue}</code>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={modal.onCancel}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 rounded py-2.5 transition font-medium"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={modal.onConfirm}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 rounded py-2.5 transition font-medium"
                    >
                        Continuer
                    </button>
                </div>
            </div>
        </div>
    );
};

