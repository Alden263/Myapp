import { useState } from 'react';
import {
  Copy,
  Check,
  Target,
  Users,
  Layers,
  Sparkles,
  AlertCircle,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { ProductIdeaFramework } from '../types';

interface CanvasResultViewProps {
  framework: ProductIdeaFramework;
}

export function CanvasResultView({ framework }: CanvasResultViewProps) {
  const [copied, setCopied] = useState(false);

  const generateMarkdownReport = () => {
    return `# BẢN XÁC ĐỊNH Ý TƯỞNG SẢN PHẨM (BUỔI 1)
Nền Tảng Ôn Tập Cá Nhân Bằng AI Cho Học Sinh

---

### 1. TÊN NỀN TẢNG
${framework.name}

### 2. MÔN HỌC / CHỦ ĐỀ TRUNG TÂM
- **Môn học & Phạm vi:** ${framework.subject}
- **Ranh giới nội dung:** ${framework.coreScopeDescription}

### 3. NGƯỜI DÙNG CHÍNH (TARGET AUDIENCE & PERSONA)
- **Đối tượng:** ${framework.targetAudience}
- **Vấn đề khó khăn (Pain points):**
${framework.userPersona.painPoints.map((p) => `  * ${p}`).join('\n')}
- **Thói quen ôn tập:** ${framework.userPersona.studyHabits}

### 4. MỤC TIÊU HỌC TẬP CHÍNH
${framework.learningGoals.map((g, idx) => `${idx + 1}. ${g}`).join('\n')}

### 5. CÁC PHẦN NÊN CÓ TRONG PHIÊN BẢN ĐẦU TIÊN (MVP BUỔI 1)
${framework.mvpModules
  .map(
    (m) =>
      `Phần ${m.number}: ${m.title}
  - Mô tả: ${m.description}
  - Tính năng cốt lõi: ${m.features.join(', ')}`
  )
  .join('\n\n')}

---
*LƯU Ý GIỚI HẠN PHẠM VI (BUỔI 1):*
- Chỉ tập trung vào 4 phần MVP tinh gọn trên để kiểm chứng giá trị dạy & học qua AI.
- Chưa triển khai các tính năng phức tạp (sẽ dành cho các buổi sau):
${framework.futureScopeRoadmap.map((f) => `  * ${f}`).join('\n')}
`;
  };

  const handleCopy = () => {
    const text = generateMarkdownReport();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            Khung Ý Tưởng Hoàn Chỉnh – Cấu Trúc 5 Phần Chuẩn
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            {framework.name || 'Nền tảng ôn tập cá nhân'}
          </h2>
          <p className="text-xs text-stone-300 mt-0.5">
            Được định hình tối ưu cho mục tiêu Buổi 1: Rõ ràng, đo lường được và khả thi làm MVP.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Đã sao chép văn bản!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Sao chép kết quả (Báo cáo Buổi 1)</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of the 5 key sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mục 1: Tên nền tảng */}
        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Tên Nền Tảng
              </h3>
            </div>
            <div className="text-lg font-bold text-stone-900 mt-2">
              {framework.name || '[Chưa đặt tên]'}
            </div>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              Tên gọi gợi mở trực diện về môn học, tính cá nhân hóa và sự đồng hành của trợ lý AI.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-stone-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Định vị: Trợ lý ôn tập thông minh từng bước (Step-by-step Tutor)</span>
          </div>
        </div>

        {/* Mục 2: Môn học / chủ đề trung tâm */}
        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Môn Học / Chủ Đề Trung Tâm
            </h3>
          </div>
          <div className="text-sm font-semibold text-stone-900 mt-2">
            {framework.subject || '[Chưa chọn môn học]'}
          </div>
          <div className="mt-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 leading-relaxed">
            <span className="font-semibold">Ranh giới phạm vi (Scope): </span>
            {framework.coreScopeDescription}
          </div>
        </div>

        {/* Mục 3: Người dùng chính */}
        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Người Dùng Chính
            </h3>
          </div>
          <div className="text-sm font-semibold text-stone-900 mt-2 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-stone-600" />
            <span>{framework.targetAudience || '[Chưa điền đối tượng]'}</span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="text-xs font-medium text-stone-700">Rào cản lớn nhất khi tự học:</div>
            <ul className="space-y-1">
              {framework.userPersona.painPoints.map((pain, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-stone-600">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mục 4: Mục tiêu học tập chính */}
        <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Mục Tiêu Học Tập Chính (Đo lường được)
            </h3>
          </div>

          <ul className="mt-3 space-y-2">
            {framework.learningGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                <Target className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mục 5: Các phần nên có trong phiên bản đầu tiên (MVP) */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              5
            </span>
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                Các Phần Nên Có Trong Phiên Bản Đầu Tiên (MVP)
              </h3>
              <p className="text-xs text-stone-500">
                Khung 4 phân hệ cốt lõi để hoàn thành trọn vẹn luồng học trong Buổi 1
              </p>
            </div>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Khả thi xây dựng ngay
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {framework.mvpModules.map((module) => (
            <div
              key={module.number}
              className="p-4 rounded-xl border border-stone-100 bg-stone-50/60 hover:bg-white hover:border-stone-200 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Phần {module.number}
                </span>
                <h4 className="text-xs font-bold text-stone-900">{module.title}</h4>
              </div>
              <p className="text-xs text-stone-600 mb-2.5 leading-relaxed">
                {module.description}
              </p>
              <div className="space-y-1">
                {module.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-stone-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Guardrail: What NOT to do in Session 1 */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Lưu ý quan trọng của Buổi 1 – Những tính năng CHƯA nên làm:</span>
          </div>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            Để tránh sa đà vào việc quá tải công nghệ, Buổi 1 chỉ giải quyết bài toán: <strong>Học sinh chọn chủ đề → Làm câu hỏi → Được AI giải thích từng bước logic</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
            {framework.futureScopeRoadmap.map((item, idx) => (
              <div key={idx} className="p-2 bg-white/80 rounded-lg border border-amber-200/60 text-stone-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
