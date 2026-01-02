"use client";

import React, { useState, useEffect } from 'react';
import { getManifestoItems, deleteManifestoItem } from '../actions';
import { ManifestoItem } from '../db/schema';
import { EditManifestoModal } from '../components/EditManifestoModal';
import Link from 'next/link';

export default function AdminPage() {
    const [items, setItems] = useState<ManifestoItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingItem, setEditingItem] = useState<ManifestoItem | null>(null);

    const fetchItems = async () => {
        setIsLoading(true);
        const data = await getManifestoItems();
        setItems(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, [editingItem]); // Re-fetch when edit modal closes/updates

    const handleDelete = async (id: number) => {
        if (confirm('CONFIRM DELETION??\nAction cannot be undone.')) {
            await deleteManifestoItem(id);
            fetchItems();
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-red-600 animate-pulse rounded-sm" />
                        <span className="tracking-[0.3em] font-bold text-sm">ADMINISTRATION_LAYER</span>
                    </div>
                    <Link
                        href="/"
                        className="text-[10px] uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all"
                    >
                        Return to Surface
                    </Link>
                </div>
            </header>

            <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">DATABASE ENTRIES</h1>
                        <p className="text-white/40 text-xs tracking-widest">
                            TOTAL RECORDS: {items.length.toString().padStart(3, '0')}
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="w-full h-64 flex items-center justify-center border border-white/10">
                        <span className="animate-blink tracking-widest text-xs">SCANNING DATABASE...</span>
                    </div>
                ) : (
                    <div className="border border-white/10">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 border-b border-white/10 bg-white/5 py-3 px-4 text-[10px] uppercase tracking-widest text-white/50">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-4">Label</div>
                            <div className="col-span-3">Category</div>
                            <div className="col-span-2 text-center">Stats</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>

                        {/* Table Body */}
                        <div className="divide-y divide-white/5">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-12 py-4 px-4 items-center hover:bg-white/[0.02] transition-colors group"
                                >
                                    <div className="col-span-1 text-white/30 text-xs text-xs font-mono">
                                        #{item.id.toString().padStart(3, '0')}
                                    </div>
                                    <div className="col-span-4 tracking-wider text-sm font-bold flex items-center gap-2">
                                        {item.label}
                                    </div>
                                    <div className="col-span-3 text-white/60 text-xs uppercase tracking-widest">
                                        {item.category}
                                    </div>
                                    <div className="col-span-2 flex justify-center gap-4 text-xs text-white/40 font-mono">
                                        <span title="Views">👁 {item.views}</span>
                                        <span title="Copies">⎘ {item.copies}</span>
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setEditingItem(item)}
                                            className="px-3 py-1 border border-white/20 text-[10px] hover:border-white hover:text-white text-white/60 transition-colors uppercase tracking-widest"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="px-3 py-1 border border-red-500/30 text-red-500/60 text-[10px] hover:bg-red-500 hover:text-black hover:border-red-500 transition-all uppercase tracking-widest"
                                        >
                                            Purge
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <EditManifestoModal
                isOpen={!!editingItem}
                onClose={() => setEditingItem(null)}
                item={editingItem}
            />
        </div>
    );
}
