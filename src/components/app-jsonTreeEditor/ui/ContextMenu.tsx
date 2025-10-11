import React from 'react';
import { ContextMenu } from './types';
import { Edit, Plus, Trash2 } from 'lucide-react';

export const ContextMenuComponent: React.FC<{
    contextMenu: ContextMenu;
    onEdit: (node: any) => void;
    onAddChild: (node: any) => void;
    onDelete: (node: any) => void;
}> = ({ contextMenu, onEdit, onAddChild, onDelete }) => {
    return (
        <div
            className="fixed bg-[#24283b] border border-[#414868] rounded-lg shadow-xl py-1 z-50"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={() => onEdit(contextMenu.node)}
                className="w-full px-4 py-2 hover:bg-[#343b58] flex items-center gap-2 text-sm text-left"
            >
                <Edit size={14} /> Éditer
            </button>
            <button
                onClick={() => onAddChild(contextMenu.node)}
                className="w-full px-4 py-2 hover:bg-[#343b58] flex items-center gap-2 text-sm text-left"
            >
                <Plus size={14} /> Ajouter enfant
            </button>
            <button
                onClick={() => onDelete(contextMenu.node)}
                className="w-full px-4 py-2 hover:bg-[#343b58] flex items-center gap-2 text-sm text-red-400 text-left"
            >
                <Trash2 size={14} /> Supprimer
            </button>
        </div>
    );
};

export default ContextMenuComponent;
