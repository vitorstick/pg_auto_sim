import { RotateCcw, Share2 } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onShare: () => void;
}

export default function Header({ onReset, onShare }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center space-x-3">
        {/* Postgres Elephant SVG logo */}
        <div className="p-2 bg-blue-950/40 rounded-lg border border-blue-500/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 3.06 1.37 5.8 3.54 7.66.17.14.41.17.61.07.2-.1.32-.3.32-.52v-2.07c0-.28.18-.53.45-.6l1.37-.36c.26-.07.45-.3.45-.58v-1.12c0-.22.1-.42.27-.56.88-.73 2.1-.8 2.1-.8s.32.22.42.34c.15.18.25.41.28.65l.18 1.48c.03.24.22.42.46.44l1.37.1c.22 0 .42-.1.54-.28.53-.78 1.25-2.2 1.25-3.32 0-3.31-2.69-6-6-6H9.5a.5.5 0 00-.5.5v2a.5.5 0 00.5.5H12c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3v-.5a.5.5 0 00-.5-.5H6.5a.5.5 0 00-.5.5V12c0 2.21 1.79 4 4 4h.5c.28 0 .5-.22.5-.5V14c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5v1c0 1.1-.9 2-2 2h-.5c-.28 0-.5.22-.5.5v1.07c0 .28-.22.5-.5.5H7.3c-.2 0-.39.11-.48.29-.53.97-.82 2.07-.82 3.24 0 3.86 3.14 7 7 7s7-3.14 7-7c0-2.45-1.26-4.6-3.17-5.87a.498.498 0 00-.67.14c-.33.51-.89 1.1-1.6 1.1-.88 0-1.6-.72-1.6-1.6 0-.8.59-1.47 1.37-1.58.21-.03.38-.17.43-.37l.21-.84c.06-.24-.04-.49-.24-.62C14.73 8.35 13.43 8 12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-3.31-2.69-6-6-6z"/>
          </svg>
        </div>
        <span className="text-lg font-bold tracking-wider text-slate-200">PG_AUTO_SIM</span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onReset}
          type="button"
          className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700/80 rounded-lg hover:bg-slate-750 hover:text-white transition duration-200 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
        <button
          onClick={onShare}
          type="button"
          className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700/80 rounded-lg hover:bg-slate-750 hover:text-white transition duration-200 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>
    </header>
  );
}

