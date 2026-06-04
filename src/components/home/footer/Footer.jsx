'use client';

export default function Footer() {
  return (
    <footer className="relative w-full z-10 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div className="space-y-1">
        <p className="text-xs tracking-widest uppercase font-bold text-white">
          UNLIMITED TRANSFERS
        </p>
        <p className="text-[10px] text-slate-400 tracking-wider">
          ADVANCED ENCRYPTION STANDARD (AES) 256-BIT
        </p>
      </div>

      <div className="flex items-center space-x-6 text-[10px] text-slate-500 tracking-tight font-mono">
        <span>© COPYRIGHT ZTFR. ALL RIGHTS RESERVED.</span>
        <span className="hidden md:inline text-slate-400">SECURE DISK ENCRYPTION DATA SAFEGUARD SYSTEM</span>
      </div>
    </footer>
  );
}