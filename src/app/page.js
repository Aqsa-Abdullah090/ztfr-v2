'use client';

import { useState } from 'react';
import SidePopup from '@/components/SidePopup';

export default function Home() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center space-y-6">
        
        {/* Placeholder UI Graphic representation */}
        <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            ZTFR Design Wrapper
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Click the button below to display the interactive right-hand side pop-up menu modeled from the design specs workspace layout.
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsPanelOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Open Side Pop-up Panel
          </button>
        </div>
      </div>

      {/* Render the instantiated Modal drawer */}
      <SidePopup 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        title="ZTFR Configuration Drawer"
      />
    </main>
  );
}