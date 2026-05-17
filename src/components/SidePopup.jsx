
'use client';

import React, { useEffect } from 'react';


export default function SidePopup({
  isOpen,
  onClose,
  title = "Dummy Side Panel Details",
}) {
  
  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Prevent background scrolling when open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Pop-Up Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out sm:max-w-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="slide-over-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 
            id="slide-over-title" 
            className="text-lg font-semibold text-slate-900"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close panel"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body (Scrollable Content Area) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
          
          {/* Section 1: Overview Info card */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Status</h3>
            <div className="flex items-center space-x-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-sm font-medium text-slate-700">ZTFR Dummy Pop-up System Connected</p>
            </div>
          </div>

          {/* Section 2: Mock Input Fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="dummyName" className="block text-sm font-medium text-slate-700 mb-1">
                Resource Name
              </label>
              <input
                type="text"
                id="dummyName"
                defaultValue="ZTFR-Alpha-Mockup"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="dummyRole" className="block text-sm font-medium text-slate-700 mb-1">
                Access Tier Role
              </label>
              <select
                id="dummyRole"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option>Administrator</option>
                <option>Editor / Contributor</option>
                <option>Viewer Default</option>
              </select>
            </div>

            <div>
              <label htmlFor="dummyDesc" className="block text-sm font-medium text-slate-700 mb-1">
                Configuration Description
              </label>
              <textarea
                id="dummyDesc"
                rows={4}
                placeholder="Enter mockup notes extracted from layout..."
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Section 3: Checkbox Switches */}
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="notify"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notify" className="font-medium text-slate-700">Real-time webhooks</label>
                <p className="text-slate-400">Trigger notification on status update events.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Dummy Action Saved Successfully!');
              onClose();
            }}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}