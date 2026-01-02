"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { ScrollList } from './components/ScrollList';
import { PromptPanel } from './components/PromptPanel';
import { ManifestoItem } from './db/schema';
import { getManifestoItems } from './actions';
import Link from 'next/link';

export default function Home() {
  const [items, setItems] = useState<ManifestoItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = useMemo(() => items[activeIndex], [items, activeIndex]);

  // Fetch initial data
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getManifestoItems();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleActiveIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  if (items.length === 0) {
    return (
      <div className="flex w-full h-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-xs tracking-[0.2em] animate-pulse">INITIALIZING SYSTEM...</span>
          {/* Fallback button if DB is empty so user can add first item */}
          <Link
            href="/add"
            className="px-4 py-2 border border-white/20 hover:bg-white hover:text-black transition-all text-xs font-mono uppercase tracking-widest"
          >
            + Initialize Data
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen overflow-hidden bg-black selection:bg-white selection:text-black">
      {/* Left Column: The Scroll Wheel */}
      <ScrollList
        items={items}
        activeIndex={activeIndex}
        onActiveIndexChange={handleActiveIndexChange}
      />

      {/* Right Column: The Static Prompt Output */}
      {activeItem && <PromptPanel activeItem={activeItem} />}


      {/* Symbol Button - Triggers Link */}
      <Link
        href="/add"
        className="fixed top-6 right-6 z-50 text-white hover:opacity-100 opacity-80 transition-opacity group"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Outer Circle */}
          <div className="absolute inset-0 border border-white/60 rounded-full group-hover:scale-110 transition-transform duration-500 ease-out" />

          {/* Crosshair Lines */}
          <div className="absolute w-full h-[1px] bg-white/60 group-hover:rotate-180 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
          <div className="absolute h-full w-[1px] bg-white/60 group-hover:rotate-180 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
        </div>
      </Link>
    </div>
  );
}


