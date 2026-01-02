"use client";

import React, { useEffect, useState } from 'react';

interface ToastProps {
    visible: boolean;
    title?: string;
    description?: string;
}

export const Toast: React.FC<ToastProps> = ({ visible, title = "Success", description }) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (visible) {
            setShouldRender(true);
        } else {
            const timer = setTimeout(() => setShouldRender(false), 300); // Wait for fade out animation
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${visible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95'
                }`}
        >
            <div className="bg-[#0a0a0a] border border-white/10 text-white pl-4 pr-6 py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-start gap-4 min-w-[320px] backdrop-blur-xl">
                {/* Success Icon */}
                <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold tracking-tight text-white">{title}</span>
                    {description && <span className="text-xs text-white/60 font-medium leading-relaxed">{description}</span>}
                </div>
            </div>
        </div>
    );
};
