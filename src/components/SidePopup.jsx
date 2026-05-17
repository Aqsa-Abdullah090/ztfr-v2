'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function SidePopup({
  isOpen,
  onClose,
  onOpen,
  title = "UPLOAD FILES",
}) {
  const [fileTitle, setFileTitle] = useState('');
  const [fileNote, setFileNote] = useState('');
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const triggerFileSelect = () => fileInputRef.current?.click();
  const triggerFolderSelect = () => folderInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      alert(`Selected ${files.length} item(s) for transfer.`);
    }
  };

  return (
    <>
      {/* 1. MINIMIZED SIDEBAR STRIP */}
      <div
        onClick={isOpen ? undefined : onOpen}
        className={`fixed inset-y-0 left-0 z-40 w-16 md:w-20 bg-slate-950/85 backdrop-blur-md border-r border-white/10 flex flex-col items-center justify-between py-8 transition-all duration-300 select-none ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer hover:bg-slate-900/90'
        }`}
      >
        <div className="text-white font-mono font-bold tracking-widest text-sm">
          ZT<span className="text-slate-400">R</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <p 
            className="text-[10px] md:text-xs font-semibold tracking-widest text-slate-300 uppercase whitespace-nowrap font-sans" 
            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
          >
            UPLOAD FILES OR FOLDERS BY DROPPING THEM ANYWHERE IN THIS WINDOW
          </p>
        </div>

        <div className="text-[9px] text-slate-600 font-mono text-center px-1 leading-none">
          © 2026
        </div>
      </div>

      {/* 2. BACKDROP OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 3. EXPANDED PRODUCTION PANEL CONTAINER */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-md bg-white text-slate-900 flex flex-col transform transition-transform duration-300 ease-out sm:max-w-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Block: Split Dropzone/Action Header */}
        <div className="relative flex min-h-[160px] border-b border-slate-100">
          
          {/* Left Plus Add Block */}
          <button 
            onClick={triggerFileSelect}
            type="button"
            className="w-1/3 transition-colors flex items-center justify-center group relative overflow-hidden"
          >
            <span className="text-5xl font-light text-slate-400 group-hover:text-slate-600 transition-colors">
              +
            </span>
            {/* Hidden Input Nodes */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              multiple 
              className="hidden" 
            />
            <input 
              type="file" 
              ref={folderInputRef} 
              onChange={handleFileChange} 
              webkitdirectory="true" 
              directory="true" 
              className="hidden" 
            />
          </button>

          {/* Right Text Trigger Header */}
          <div className="flex-1 p-6 flex flex-col justify-between relative">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <h2 className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  {title}
                </h2>
                <div 
                  onClick={triggerFolderSelect}
                  className="text-3xl font-normal tracking-tight cursor-pointer text-slate-900 hover:text-indigo-600 transition-colors font-sans"
                >
                  OR
                </div>
                <button 
                  onClick={triggerFolderSelect}
                  type="button"
                  className="text-xs font-semibold tracking-wider  uppercase pt-1 block text-left"
                >
                  SELECT A FOLDER
                </button>
              </div>
              
              {/* Context Safe Lock Icon */}
              <div className="text-slate-900 p-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm3 8H9V7a3 3 0 016 0v3z" />
                </svg>
              </div>
            </div>

            {/* Absolute Panel Window Close Vector */}
            <button
              onClick={onClose}
              className="absolute bottom-4 right-6 text-slate-300 hover:text-slate-500 transition-colors text-xs font-mono tracking-widest"
              aria-label="Close panel"
            >
              ✕ CLOSE
            </button>
          </div>
        </div>

        {/* Minimalist Inputs Form Section */}
        <div className="flex-1 px-8 py-10 space-y-10 overflow-y-auto custom-scrollbar">
          
          {/* Title Input field container */}
          <div className="relative border-b border-slate-900 pb-2">
            <label htmlFor="panelTitle" className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
              TITLE
            </label>
            <div className="flex items-center justify-between">
              <input
                type="text"
                id="panelTitle"
                maxLength={30}
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
                placeholder="Give your transfer a name..."
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-300 focus:outline-none font-medium"
              />
              <span className="text-[10px] font-mono text-slate-300 tracking-wider ml-2">
                {fileTitle.length}/30
              </span>
            </div>
          </div>

          {/* Note Input field container */}
          <div className="relative border-b border-slate-900 pb-2">
            <label htmlFor="panelNote" className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-1">
              NOTE
            </label>
            <textarea
              id="panelNote"
              rows={4}
              value={fileNote}
              onChange={(e) => setFileNote(e.target.value)}
              placeholder="Add a description or details for the recipient..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-300 focus:outline-none resize-none font-medium pt-1"
            />
          </div>

        </div>

        {/* Action Panel Base Grid */}
        <div className="border-t border-slate-100 px-8 py-5 bg-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-slate-800 uppercase">
              UNLIMITED TRANSFERS
            </span>
            <span className="text-[9px] text-slate-400 tracking-tight font-mono">
              AES 256-BIT ENCRYPTION ACTIVE
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                if(!fileTitle) {
                  alert('Please append a Transfer Title configuration before submission.');
                  return;
                }
                alert('Secure Transfer Initialized Successfully!');
                onClose();
              }}
              className="rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold tracking-widest text-white hover:bg-slate-800 transition-colors uppercase shadow-sm"
            >
              Transfer
            </button>
            
            {/* More Context Icon Button */}
            <button type="button" className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </>
  );
}