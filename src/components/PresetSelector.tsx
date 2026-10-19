import { Calculator, Languages, Atom, PenLine } from 'lucide-react';
import { PRESET_FRAMEWORKS } from '../data/presets';
import { ProductIdeaFramework } from '../types';

interface PresetSelectorProps {
  selectedPresetId: string;
  onSelectPreset: (preset: ProductIdeaFramework) => void;
  onSelectCustom: () => void;
  isCustom: boolean;
}

export function PresetSelector({
  selectedPresetId,
  onSelectPreset,
  onSelectCustom,
  isCustom,
}: PresetSelectorProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'math-9':
        return <Calculator className="w-4 h-4 text-blue-600" />;
      case 'english-12':
        return <Languages className="w-4 h-4 text-emerald-600" />;
      case 'science-8':
        return <Atom className="w-4 h-4 text-violet-600" />;
      default:
        return <PenLine className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Chọn mẫu gợi ý sẵn hoặc tự nhập thông tin:
        </label>
        <span className="text-xs text-stone-400">Có thể chỉnh sửa mọi trường</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PRESET_FRAMEWORKS.map((preset) => {
          const isSelected = !isCustom && selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`p-3 rounded-xl text-left border transition-all duration-150 relative ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/70'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-stone-100">{getIcon(preset.id)}</div>
                <span className="text-xs font-medium text-stone-900 truncate">
                  {preset.name.split('(')[0].trim()}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 line-clamp-1 font-medium">
                {preset.subject.split('–')[0].trim()}
              </p>
              <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                {preset.targetAudience}
              </p>
            </button>
          );
        })}

        <button
          type="button"
          onClick={onSelectCustom}
          className={`p-3 rounded-xl text-left border transition-all duration-150 ${
            isCustom
              ? 'border-amber-600 bg-amber-50/50 shadow-xs ring-1 ring-amber-500/20'
              : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/70'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-1.5 rounded-lg bg-stone-100">
              <PenLine className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-xs font-medium text-stone-900">
              Tùy chỉnh môn học khác
            </span>
          </div>
          <p className="text-[11px] text-stone-500 line-clamp-1 font-medium">
            Tự điền 3 thông tin của bạn
          </p>
          <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
            Môn học, đối tượng, mục tiêu
          </p>
        </button>
      </div>
    </div>
  );
}
