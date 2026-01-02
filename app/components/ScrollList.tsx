"use client";

import React, { useRef, useEffect, useState } from 'react';
import { incrementViewCount } from '../actions';
import { ManifestoItem } from '../db/schema';


interface ScrollListProps {
    items: ManifestoItem[];
    activeIndex: number;
    onActiveIndexChange: (index: number) => void;
}

const ITEM_HEIGHT = 80; // height in pixels of each item

export const ScrollList: React.FC<ScrollListProps> = ({ items, activeIndex, onActiveIndexChange }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleScroll = () => {
        if (!containerRef.current) return;

        setIsScrolling(true);

        const scrollTop = containerRef.current.scrollTop;
        const centerIndex = Math.round(scrollTop / ITEM_HEIGHT);
        const clampedIndex = Math.max(0, Math.min(centerIndex, items.length - 1));

        if (clampedIndex !== activeIndex) {
            onActiveIndexChange(clampedIndex);
        }

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
            // Item settled
            if (items[clampedIndex]) {
                incrementViewCount(items[clampedIndex].id);
            }
        }, 500); // 500ms settle time
    };

    // Scroll to active index on mount or if changed programmatically (optional)
    useEffect(() => {
        // Initial centering logic if needed
    }, []);

    return (
        <div className="relative h-screen w-1/2 flex flex-col justify-center overflow-hidden border-r border-white/20">

            {/* The Selection Box / Highlighter - Fixed in center relative to this container */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[80px] z-10 pointer-events-none flex items-center">
                {/* We use a visual border for the selection area */}
                <div className="w-full h-full border-t border-b border-white flex items-center">
                    <div className="w-4 h-4 bg-white ml-auto mr-[-8px] rotate-45 transform origin-center transition-transform duration-300"
                        style={{ transform: `rotate(45deg) scale(${isScrolling ? 0.8 : 1})` }}
                    />
                </div>
            </div>

            {/* The Scrolling Content */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="h-full overflow-y-auto no-scrollbar snap-y snap-mandatory py-[calc(50vh-40px)]"
                style={{ scrollBehavior: 'smooth' }}
            >
                {items.map((item, index) => {
                    const isActive = index === activeIndex;
                    const distance = Math.abs(activeIndex - index);

                    // Calculate opacity based on distance from center
                    let opacity = 0.3;
                    if (distance === 0) opacity = 1;
                    else if (distance === 1) opacity = 0.5;
                    else if (distance === 2) opacity = 0.2;
                    else opacity = 0.05;

                    return (
                        <div
                            key={item.id}
                            className="h-[80px] w-full flex items-center px-12 snap-center transition-all duration-300 cursor-pointer"
                            style={{ opacity }}
                            onClick={() => {
                                // Allow clicking to scroll to item
                                if (containerRef.current) {
                                    containerRef.current.scrollTo({
                                        top: index * ITEM_HEIGHT,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                        >
                            <span className={`text - 4xl md: text - 6xl font - bold tracking - tight uppercase transition - all duration - 500 ${isActive ? 'translate-x-4 text-white' : 'text-white/60'} `}>
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Bottom overlay for depth - Updated for Black Background */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
        </div>
    );
};
