"use client";

import React, { useState } from 'react';
import { createManifestoItem } from '../actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddPage() {
    const router = useRouter();
    const [label, setLabel] = useState('');
    const [category, setCategory] = useState('');
    const [skill, setSkill] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!label || !category) return;

        setIsSubmitting(true);
        await createManifestoItem(label, category, skill);
        setIsSubmitting(false);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black flex flex-col">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-white/60 animate-pulse rounded-full" />
                        <span className="tracking-[0.3em] font-bold text-sm uppercase">Initialize New Protocol</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col justify-center pt-24 pb-12 px-6 max-w-5xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Label Input */}
                        <div className="relative group">
                            <label className="absolute -top-4 left-0 text-xs font-mono uppercase tracking-[0.2em] text-white/40 bg-black px-2 transition-colors group-focus-within:text-white">
                                Designation
                            </label>
                            <input
                                type="text"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="w-full bg-transparent border border-white/20 p-6 text-2xl md:text-3xl text-white font-bold tracking-wider focus:outline-none focus:border-white transition-all placeholder:text-white/10 hover:border-white/40"
                                placeholder="PROTOCOL_NAME"
                                autoFocus
                            />
                        </div>

                        {/* Category Input */}
                        <div className="relative group">
                            <label className="absolute -top-4 left-0 text-xs font-mono uppercase tracking-[0.2em] text-white/40 bg-black px-2 transition-colors group-focus-within:text-white">
                                Sector
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-transparent border border-white/20 p-6 text-2xl md:text-3xl text-white font-bold tracking-wider focus:outline-none focus:border-white transition-all placeholder:text-white/10 hover:border-white/40"
                                placeholder="DOMAIN_AREA"
                            />
                        </div>
                    </div>

                    {/* Skill / Prompt Input - The Main Event */}
                    <div className="relative group flex-1 min-h-[40vh] flex flex-col">
                        <label className="absolute -top-4 left-0 text-xs font-mono uppercase tracking-[0.2em] text-white/40 bg-black px-2 transition-colors group-focus-within:text-white z-10">
                            Execution Protocol / Prompt Data
                        </label>
                        <div className="relative flex-1 border border-white/20 hover:border-white/40 focus-within:border-white transition-all group">
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/60" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/60" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/60" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/60" />

                            <textarea
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                className="w-full h-full bg-transparent p-6 text-lg md:text-xl leading-relaxed text-white/90 font-mono focus:outline-none resize-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent placeholder:text-white/5"
                                placeholder="// INIT PROTOCOL SEQUENCE..."
                            />
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-4">
                        <Link
                            href="/"
                            className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors"
                        >
                            <span className="text-xl group-hover:-translate-x-2 transition-transform">&larr;</span>
                            <span className="text-xs uppercase tracking-[0.2em]">Abort Sequence</span>
                        </Link>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-white text-black px-12 py-4 text-xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {isSubmitting ? 'INITIALIZING...' : 'EXECUTE PROTOCOL'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
