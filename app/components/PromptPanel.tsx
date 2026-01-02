"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Toast } from './Toast';
import { incrementCopyCount } from '../actions';
import { ManifestoItem } from '../db/schema';

interface PromptPanelProps {
    activeItem: ManifestoItem;
}

export const PromptPanel: React.FC<PromptPanelProps> = ({ activeItem }) => {
    const [mounted, setMounted] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCopy = () => {
        if (!activeItem) return;

        incrementCopyCount(activeItem.id);

        const textToCopy = activeItem.skill || `Generate a comprehensive analysis of ${activeItem.label} within the context of ${activeItem.category} ...`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            // Clear existing timeout to reset the duration if clicked rapidly
            if (toastTimeoutRef.current) {
                clearTimeout(toastTimeoutRef.current);
            }

            setShowToast(true);

            toastTimeoutRef.current = setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="h-screen w-1/2 flex flex-col justify-center items-start pl-8 pr-12 md:pl-16 relative bg-black text-white">

            <Toast
                visible={showToast}
                title="System Prompt Copied"
                description="The manifesto parameters have been transferred to your clipboard."
            />

            {/* Background large text fading */}
            <div className="absolute right-0 top-0 h-full w-full overflow-hidden opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
                <h1 className="text-[20vw] font-black leading-none tracking-tighter rotate-90 whitespace-nowrap">
                    {activeItem.label}
                </h1>
            </div>

            <div className="z-10 w-full max-w-xl flex flex-col justify-center h-full py-12">
                {/* Connector Line Logic */}
                <div className="flex items-center space-x-4 mb-8 shrink-0">
                    <div className="h-[1px] w-12 md:w-24 bg-white/50" />
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/70">
                        Subject: {activeItem.category}
                    </span>
                </div>

                {/* The Action Area */}
                <div className="mb-8 pointer-events-none shrink-0">
                    <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter mb-4 transition-all duration-300">
                        {activeItem.label}.
                    </h2>
                    <div className="flex gap-6 text-xs font-mono text-white/40 tracking-widest uppercase">
                        <span>Views [{activeItem.views}]</span>
                        <span>Copies [{activeItem.copies}]</span>
                    </div>
                </div>

                {/* The Prompt / Paragraph - Clickable */}
                <div
                    onClick={handleCopy}
                    className="group relative cursor-pointer border-l border-white/40 pl-6 py-4 hover:bg-white/[0.03] hover:border-white transition-all duration-300 rounded-r-lg flex flex-col max-h-[50vh]"
                >
                    <div className="shrink-0 mb-2">
                        <span className="text-white/40 select-none text-xs tracking-widest uppercase flex items-center gap-2 group-hover:text-white/70 transition-colors">
                        // System Prompt
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-bold tracking-normal">COPY</span>
                        </span>
                    </div>

                    <div className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        <p className="font-mono text-sm md:text-base leading-relaxed text-white/80 transition-all duration-500 group-hover:text-white group-active:scale-[0.99] origin-left whitespace-pre-wrap">
                            {activeItem.skill}
                            <span className="animate-pulse inline-block ml-1 text-white">_</span>
                        </p>
                    </div>
                </div>

                {/* Decor */}
                <div className="absolute bottom-12 right-12 text-[10px] font-mono opacity-30 flex flex-col items-end gap-1 pointer-events-none">
                    <span>SYS.MONO.V1</span>
                    <span>BLK.000</span>
                    <span>ID: {String(activeItem.id).padStart(3, '0')}</span>
                </div>
            </div>
        </div>
    );
};
