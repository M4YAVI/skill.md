"use client";

import React, { useState, useEffect } from 'react';
import { updateManifestoItem } from '../actions';
import { ManifestoItem } from '../db/schema';

interface EditManifestoModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ManifestoItem | null;
}

export const EditManifestoModal: React.FC<EditManifestoModalProps> = ({ isOpen, onClose, item }) => {
    const [label, setLabel] = useState('');

    const [category, setCategory] = useState('');
    const [skill, setSkill] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (item) {
            setLabel(item.label);
            setLabel(item.label);
            setCategory(item.category);
            setSkill(item.skill || '');
        }
    }, [item]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!label || !category || !item) return;

        setIsSubmitting(true);
        await updateManifestoItem(item.id, { label, category, skill });
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-[#050505] border border-white/10 w-full max-w-md p-8 shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden">
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] opacity-20" />

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
                        <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-white">
                            Modify Protocol
                        </h2>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-75" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <div className="relative group">
                            <label className="absolute -top-3 left-0 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 bg-[#050505] px-1 transition-colors group-focus-within:text-white">
                                Designation / Label
                            </label>
                            <input
                                type="text"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="w-full bg-transparent border border-white/20 p-4 text-white font-mono text-base focus:outline-none focus:border-white transition-all placeholder:text-white/10 hover:border-white/40"
                                placeholder="ENTER_DESIGNATION"
                                autoFocus
                            />
                        </div>

                        <div className="relative group">
                            <label className="absolute -top-3 left-0 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 bg-[#050505] px-1 transition-colors group-focus-within:text-white">
                                Sector / Category
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-transparent border border-white/20 p-4 text-white font-mono text-base focus:outline-none focus:border-white transition-all placeholder:text-white/10 hover:border-white/40"
                                placeholder="ENTER_SECTOR"
                            />
                        </div>

                        <div className="relative group">
                            <label className="absolute -top-3 left-0 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 bg-[#050505] px-1 transition-colors group-focus-within:text-white">
                                Execution Protocol / Skill
                            </label>
                            <textarea
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                className="w-full bg-transparent border border-white/20 p-4 text-white font-mono text-base focus:outline-none focus:border-white transition-all placeholder:text-white/10 hover:border-white/40 h-48 resize-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                                placeholder="ENTER_PROTOCOL_DATA"
                            />
                        </div>

                        <div className="flex justify-end gap-0 mt-6 border-t border-white/10 pt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-4 border-r border-y border-l border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all text-xs font-mono uppercase tracking-widest flex-1"
                            >
                                [ Esc ] Abort
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-4 border-y border-r border-white/10 text-white hover:bg-white hover:text-black transition-all text-xs font-mono uppercase tracking-widest flex-[2] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Rewriting...' : 'Confirm Overwrite'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Technical Decors */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-[1px] h-32 bg-gradient-to-t from-white/20 to-transparent" />
            </div>
        </div>
    );
};
