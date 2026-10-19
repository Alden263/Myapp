import { Edit3, CheckCircle2 } from 'lucide-react';
import { ProductIdeaFramework } from '../types';

interface FrameworkEditorProps {
  framework: ProductIdeaFramework;
  onChange: (updated: ProductIdeaFramework) => void;
  isCustom: boolean;
}

export function FrameworkEditor({ framework, onChange, isCustom }: FrameworkEditorProps) {
  const handleInputChange = (field: keyof ProductIdeaFramework, value: any) => {
    onChange({
      ...framework,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-semibold text-stone-900">
            {isCustom ? 'Điền thông tin môn học của bạn' : 'Thông tin chi tiết khung sản phẩm'}
          </h2>
        </div>
        <span className="text-xs text-stone-500 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Tự động đồng bộ sang kết quả 5 mục
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tên nền tảng */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
            <span>1. Tên nền tảng (Brand / Project Name)</span>
          </label>
          <input
            type="text"
            value={framework.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="VD: Toán10X AI, EngiPrep AI, LýSmart..."
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-stone-50/50"
          />
          <p className="text-[11px] text-stone-400">
            Nên ngắn gọn, dễ nhớ và thể hiện trực tiếp giá trị cốt lõi.
          </p>
        </div>

        {/* Môn học / chủ đề */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700">
            2. Môn học / Chủ đề trung tâm
          </label>
          <input
            type="text"
            value={framework.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="VD: Môn Toán lớp 9 – Ôn tập chuyên đề Rút gọn căn thức & Vi-ét"
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-stone-50/50"
          />
          <p className="text-[11px] text-stone-400">
            Buổi 1: Chỉ chọn 2-3 chuyên đề trọng tâm nhất, không ôm đồm cả giáo trình.
          </p>
        </div>

        {/* Đối tượng học sinh */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700">
            3. Đối tượng học sinh (Lớp / Độ tuổi)
          </label>
          <input
            type="text"
            value={framework.targetAudience}
            onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            placeholder="VD: Học sinh lớp 9 (14-15 tuổi) chuẩn bị thi tuyển sinh vào 10"
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-stone-50/50"
          />
          <p className="text-[11px] text-stone-400">
            Xác định rõ khối lớp để AI điều chỉnh ngữ điệu và độ khó bài tập phù hợp.
          </p>
        </div>

        {/* Mục tiêu ôn tập chính */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-stone-700">
            4. Mục tiêu học tập chính (Đo lường được)
          </label>
          <input
            type="text"
            value={framework.learningGoals.join('; ')}
            onChange={(e) =>
              handleInputChange(
                'learningGoals',
                e.target.value.split(';').map((s) => s.trim()).filter(Boolean)
              )
            }
            placeholder="Phân tách các mục tiêu bằng dấu chấm phẩy (;)"
            className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-stone-50/50"
          />
          <p className="text-[11px] text-stone-400">
            Ví dụ: Lấy chắc điểm 7-8; Tự nhận diện và sửa bẫy sai; Hiểu bước giải thay vì học vẹt.
          </p>
        </div>
      </div>
    </div>
  );
}
