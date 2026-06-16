interface HeaderProps {
  onReset: () => void;
  onShare: () => void;
}

export default function Header({ onReset, onShare }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700 rounded-t-lg">
      <h1 className="text-xl font-bold text-white">PostgreSQL Helper Simulator</h1>
      <div className="flex gap-2">
        <button
          onClick={onReset}
          type="button"
          className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded hover:bg-slate-600 transition cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={onShare}
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-500 transition cursor-pointer"
        >
          Share
        </button>
      </div>
    </header>
  );
}
