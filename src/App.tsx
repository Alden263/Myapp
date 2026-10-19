import { useState } from 'react';
import { Header } from './components/Header';
import { PresetSelector } from './components/PresetSelector';
import { FrameworkEditor } from './components/FrameworkEditor';
import { CanvasResultView } from './components/CanvasResultView';
import { MvpWireframePreview } from './components/MvpWireframePreview';
import { ServerlessProxyGuide } from './components/ServerlessProxyGuide';
import { PRESET_FRAMEWORKS } from './data/presets';
import { ProductIdeaFramework } from './types';
import { HelpCircle, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'session1' | 'proxy'>('proxy');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('math-9');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const [currentFramework, setCurrentFramework] = useState<ProductIdeaFramework>(
    PRESET_FRAMEWORKS[0]
  );

  const handleSelectPreset = (preset: ProductIdeaFramework) => {
    setSelectedPresetId(preset.id);
    setIsCustom(false);
    setCurrentFramework(preset);
  };

  const handleSelectCustom = () => {
    setIsCustom(true);
    setCurrentFramework({
      id: 'custom',
      name: 'EduSmart AI (Tên nền tảng của bạn)',
      subject: 'Môn học bạn chọn – 2 đến 3 chủ đề trọng tâm',
      targetAudience: 'Học sinh lớp [điền khối lớp] (độ tuổi ...)',
      learningGoals: [
        'Nắm vững các dạng bài căn bản thường gặp trong bài thi.',
        'Được giải thích cặn kẽ từng bước khi làm sai.',
        'Rèn luyện tính chủ động và tự tin khi tự ôn tập ở nhà.',
      ],
      coreScopeDescription: 'Trong Buổi 1, chỉ giới hạn ở 2-3 bài học/dạng bài điển hình nhất để chứng minh giá trị.',
      userPersona: {
        title: 'Học sinh cần ôn tập trọng điểm',
        painPoints: [
          'Chưa có người giải đáp ngay khi làm bài tập tại nhà.',
          'Hay mắc lỗi sai ở các bước tính toán hoặc bẫy đề thi.',
          'Cần lộ trình học cô đọng, tránh lan man.',
        ],
        studyHabits: 'Học 30 - 45 phút mỗi ngày sau giờ học chính khóa.',
      },
      mvpModules: [
        {
          number: 1,
          title: 'Kho chủ đề cốt lõi (Topic Hub)',
          description: 'Danh mục các bài học trọng tâm kèm tóm tắt kiến thức cần nhớ.',
          features: ['Sơ đồ kiến thức tóm tắt', 'Phân loại mức độ bài tập'],
        },
        {
          number: 2,
          title: 'Trắc nghiệm chẩn đoán nhanh (Mini Quiz)',
          description: 'Bộ câu hỏi ngắn 5 - 10 câu để kiểm tra mức độ hiểu bài tức thì.',
          features: ['Làm bài tương tác', 'Chấm điểm tự động'],
        },
        {
          number: 3,
          title: 'Trợ lý AI giải thích từng bước (AI Step Tutor)',
          description: 'Hướng dẫn tư duy từng bước và chỉ ra lỗi sai phổ biến thay vì chỉ đưa đáp án.',
          features: ['Gợi ý hướng giải (Hint)', 'Giải thích lý do đúng/sai', 'Lời khuyên khắc phục'],
        },
        {
          number: 4,
          title: 'Theo dõi tiến độ đơn giản (Simple Progress)',
          description: 'Thống kê số câu đã làm và tỉ lệ hoàn thành để động viên học sinh.',
          features: ['Số câu đã làm', 'Tỉ lệ chính xác', 'Gợi ý bài cần ôn lại'],
        },
      ],
      futureScopeRoadmap: [
        'Buổi 2+: Nhập dữ liệu thông minh qua hình ảnh bài tập.',
        'Buổi 3+: Lộ trình thích ứng cá nhân hóa cao cấp theo ma trận năng lực.',
        'Buổi 4+: Tương tác giọng nói và gamification nâng cao.',
      ],
      sampleQuestionPreview: {
        question: 'Câu hỏi mẫu cho môn học bạn chọn: Chọn nhận định đúng nhất về phương pháp giải dạng bài này?',
        options: [
          'A. Phương án đúng (Áp dụng đúng quy tắc và công thức)',
          'B. Phương án nhiễu 1 (Sai sót do nhầm dấu hoặc điều kiện)',
          'C. Phương án nhiễu 2 (Sai do học vẹt công thức)',
          'D. Phương án nhiễu 3 (Chưa chuyển đổi đơn vị chuẩn)',
        ],
        correctIndex: 0,
        aiExplanation: 'AI Gợi ý tư duy: Phân tích chi tiết quy tắc cốt lõi giúp học sinh hiểu sâu bản chất, kèm cảnh báo các bẫy thường gặp ở phương án B và C.',
      },
    });
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans">
      <Header activeView={activeView} onSelectView={setActiveView} />

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {activeView === 'proxy' ? (
          /* View 1: Serverless Proxy Upgrade (Prompt #03) */
          <div className="space-y-6">
            <ServerlessProxyGuide />

            {/* Quick Link to Session 1 */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Bạn muốn xem lại hoặc điều chỉnh <strong>Ý tưởng sản phẩm & Khung 5 phần của Buổi 1</strong>?
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveView('session1')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors shrink-0 cursor-pointer"
              >
                <span>Xem Khung Buổi 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* View 2: Session 1 Product Idea Framework */
          <div className="space-y-8">
            {/* Quick Switcher Banner */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
              <span>Đang xem: <strong>Khung ý tưởng sản phẩm ban đầu (Buổi 1)</strong></span>
              <button
                type="button"
                onClick={() => setActiveView('proxy')}
                className="font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
              >
                Chuyển sang Hướng dẫn Serverless Proxy (#03) →
              </button>
            </div>

            {/* Quick Selection / Subject Presets */}
            <section aria-label="Lựa chọn mẫu ý tưởng">
              <PresetSelector
                selectedPresetId={selectedPresetId}
                onSelectPreset={handleSelectPreset}
                onSelectCustom={handleSelectCustom}
                isCustom={isCustom}
              />
            </section>

            {/* Input / Customization Editor */}
            <section aria-label="Chỉnh sửa thông tin">
              <FrameworkEditor
                framework={currentFramework}
                onChange={setCurrentFramework}
                isCustom={isCustom}
              />
            </section>

            {/* 5 Core Elements Results Canvas */}
            <section aria-label="Khung 5 nội dung chính">
              <CanvasResultView framework={currentFramework} />
            </section>

            {/* Live Interactive Wireframe Preview of MVP */}
            <section aria-label="Xem trước trải nghiệm học sinh">
              <MvpWireframePreview framework={currentFramework} />
            </section>

            {/* Educational Checklist for Session 1 */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Ghi nhớ Buổi 1:</strong> Hoàn thiện 5 mục cốt lõi trước khi nâng cấp serverless proxy để hệ thống có mục tiêu học tập rõ ràng.
                </span>
              </div>
              <div className="flex items-center gap-1 text-stone-400 shrink-0 text-[11px]">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>AI Studio Build - Framework Edu</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200 bg-white py-4 text-center text-xs text-stone-400">
        Nền Tảng Ôn Tập Cá Nhân Bằng AI – Hướng Dẫn & Nâng Cấp Serverless Proxy (Prompt #03)
      </footer>
    </div>
  );
}
