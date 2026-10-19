import { BookOpen, Sparkles, ShieldCheck, Layers } from 'lucide-react';

interface HeaderProps {
  activeView: 'session1' | 'proxy';
  onSelectView: (view: 'session1' | 'proxy') => void;
}

export function Header({ activeView, onSelectView }: HeaderProps) {
  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-semibold text-stone-900 tracking-tight">
                Nền Tảng Ôn Tập Cá Nhân Bằng AI
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="w-3 h-3" />
                Prompt #03 Ready
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Công cụ đồng hành: Từ thiết kế ý tưởng Buổi 1 đến Nâng cấp Serverless Proxy bảo mật
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onSelectView('proxy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'proxy'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Nâng Cấp Serverless Proxy (#03)
          </button>
          <button
            type="button"
            onClick={() => onSelectView('session1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'session1'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Khung Ý Tưởng (Buổi 1)
          </button>
        </div>
      </div>
    </header>
  );
}
