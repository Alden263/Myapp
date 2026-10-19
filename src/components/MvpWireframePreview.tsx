import { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { ProductIdeaFramework } from '../types';

interface MvpWireframePreviewProps {
  framework: ProductIdeaFramework;
}

export function MvpWireframePreview({ framework }: MvpWireframePreviewProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAiExplanation, setShowAiExplanation] = useState(false);

  const sample = framework.sampleQuestionPreview;

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    setShowAiExplanation(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowAiExplanation(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-semibold text-stone-900">
            Mô Phỏng Trải Nghiệm Học Sinh (MVP Buổi 1)
          </h3>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Làm lại thử nghiệm
        </button>
      </div>

      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/80">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
          <span className="font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Câu hỏi chẩn đoán thử nghiệm
          </span>
          <span>Thời gian đề xuất: ~1 phút</span>
        </div>

        <p className="text-sm font-medium text-stone-900 leading-relaxed mb-4">
          {sample.question}
        </p>

        <div className="space-y-2">
          {sample.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === sample.correctIndex;
            let btnStyle = 'border-stone-200 bg-white hover:border-blue-300 text-stone-700';

            if (selectedOption !== null) {
              if (isSelected) {
                btnStyle = isCorrect
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium ring-1 ring-emerald-400'
                  : 'border-rose-400 bg-rose-50 text-rose-900 font-medium ring-1 ring-rose-300';
              } else if (isCorrect) {
                btnStyle = 'border-emerald-400 bg-emerald-50/50 text-emerald-800';
              } else {
                btnStyle = 'border-stone-200 bg-stone-100/50 text-stone-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span>{opt}</span>
                {selectedOption !== null && isSelected && (
                  <span>
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {showAiExplanation && (
        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-stone-800 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 font-semibold text-blue-900">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>AI Step Tutor phản hồi cá nhân hóa:</span>
          </div>
          <p className="text-stone-700 leading-relaxed text-xs">
            {sample.aiExplanation}
          </p>
        </div>
      )}

      {selectedOption === null && (
        <p className="text-center text-xs text-stone-400 py-1">
          Nhấp vào một đáp án bên trên để xem cách AI gia sư phân tích từng bước và chỉ ra bẫy thường gặp.
        </p>
      )}
    </div>
  );
}
