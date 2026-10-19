import { ProductIdeaFramework } from '../types';

export const PRESET_FRAMEWORKS: ProductIdeaFramework[] = [
  {
    id: 'math-9',
    name: 'Toán10X AI (Ôn Luyện Toán 9 Vào 10)',
    subject: 'Môn Toán lớp 9 – 3 Chuyên đề trọng điểm thi vào 10 (Rút gọn biểu thức chứa căn, Phương trình bậc 2 & Hệ thức Vi-ét, Hình học đường tròn)',
    targetAudience: 'Học sinh lớp 9 (14 – 15 tuổi) đang chuẩn bị thi tuyển sinh vào lớp 10 THPT công lập.',
    learningGoals: [
      'Nắm chắc 100% dạng bài cơ bản lấy điểm 7+ (rút gọn biểu thức, giải phương trình/hệ phương trình).',
      'Tự phát hiện và sửa các lỗi sai kinh điển (quên điều kiện xác định, sai dấu khi biến đổi biểu thức).',
      'Được AI phân tích bước giải ngay lập tức khi gặp bế tắc thay vì phải chờ giáo viên hoặc chép giải sẵn.',
    ],
    coreScopeDescription: 'Không ôm đồm toàn bộ chương trình Toán 9. Trong Buổi 1, giới hạn phạm vi chặt chẽ vào 3 chuyên đề chắc chắn xuất hiện trong mọi đề thi vào lớp 10.',
    userPersona: {
      title: 'Học sinh lớp 9 chuẩn bị thi chuyển cấp',
      painPoints: [
        'Dễ mất điểm oan ở các bước biến đổi trung gian (quên ĐKXĐ, nhầm dấu).',
        'Khi bí bài tập về nhà, xem lời giải mẫu thường không hiểu "tại sao lại nghĩ ra bước biến đổi đó".',
        'Tốn nhiều thời gian tìm kiếm bài tập đúng trọng tâm phân cấp theo năng lực.',
      ],
      studyHabits: 'Ôn tập buổi tối 45-60 phút; cần phản hồi nhanh gọn trên máy tính hoặc điện thoại.',
    },
    mvpModules: [
      {
        number: 1,
        title: 'Chuyên mục chủ đề cốt lõi (Topic Hub)',
        description: 'Menu chọn 3 chuyên đề chính thi vào 10 có tóm tắt công thức trọng tâm.',
        features: ['Bảng tóm tắt công thức & điều kiện cần nhớ', 'Lọc bài tập theo mức độ: Nhận biết, Thông hiểu, Vận dụng'],
      },
      {
        number: 2,
        title: 'Trắc nghiệm chẩn đoán nhanh (Diagnostic Mini-Quiz)',
        description: 'Bộ 5 - 10 câu hỏi ngắn để đo năng lực hiện tại của học sinh chỉ trong 10 phút.',
        features: ['Làm bài trắc nghiệm tương tác', 'Chấm điểm tức thì và báo mức độ đạt chuẩn'],
      },
      {
        number: 3,
        title: 'Trợ lý AI phân tích bước giải & Lỗi sai (AI Step Tutor)',
        description: 'Cốt lõi AI: Khi học sinh chọn đáp án hoặc yêu cầu gợi ý, AI giải thích từng bước tư duy kèm chỉ điểm bẫy thường gặp.',
        features: ['Giải thích logic từng bước', 'Gợi ý từng phần (Hint) thay vì đưa ngay đáp án cuối', 'Nhắc nhở lỗi sai kinh điển'],
      },
      {
        number: 4,
        title: 'Bảng theo dõi tiến độ tinh gọn (Mini Dashboard)',
        description: 'Báo cáo trực quan đơn giản giúp học sinh biết mình đã làm bao nhiêu câu và đang yếu phần nào.',
        features: ['Số câu đã hoàn thành & Tỉ lệ chính xác (%)', 'Danh sách chuyên đề cần ôn tập lại'],
      },
    ],
    futureScopeRoadmap: [
      'Buổi 2+: Nhập bài bằng ảnh/chụp bài tập viết tay (OCR).',
      'Buổi 3+: Thuật toán sinh đề thi thử bám sát ma trận thi của từng tỉnh thành.',
      'Buổi 4+: Hệ thống huy hiệu Gamification & bảng xếp hạng thi đua bạn bè.',
    ],
    sampleQuestionPreview: {
      question: 'Cho biểu thức P = (√x / (√x - 2)) - (2 / (√x + 2)). Điều kiện xác định (ĐKXĐ) của biểu thức P là gì?',
      options: ['A. x ≥ 0 và x ≠ 4', 'B. x > 0 và x ≠ 4', 'C. x ≠ 2 và x ≠ -2', 'D. x ≥ 0'],
      correctIndex: 0,
      aiExplanation: 'AI Gợi ý tư duy: Để căn bậc hai √x có nghĩa thì x ≥ 0. Để mẫu thức khác 0 thì √x - 2 ≠ 0 ⇔ √x ≠ 2 ⇔ x ≠ 4, và √x + 2 > 0 luôn đúng với x ≥ 0. Do đó ĐKXĐ là x ≥ 0 và x ≠ 4. Bẫy hay gặp: Học sinh thường quên điều kiện trong căn (x ≥ 0) mà chỉ tìm mẫu số!',
    },
  },
  {
    id: 'english-12',
    name: 'EngiPrep AI (Luyện Thi Tiếng Anh THPT)',
    subject: 'Môn Tiếng Anh lớp 12 – Ôn luyện Ngữ pháp cốt lõi & Từ vựng theo chủ đề thi Tốt nghiệp THPT & Đánh giá năng lực',
    targetAudience: 'Học sinh lớp 12 (17 – 18 tuổi) cần củng cố kiến thức để đạt mục tiêu 7.0 - 8.5+ môn Tiếng Anh trong kỳ thi THPT.',
    learningGoals: [
      'Thành thạo 5 chuyên đề ngữ pháp chiếm 40% số câu hỏi (Thì động từ, Câu điều kiện/Mệnh đề quan hệ, Câu bị động, Cụm động từ - Phrasal Verbs).',
      'Nhớ từ vựng theo ngữ cảnh bài đọc thay vì học vẹt danh sách từ rời rạc.',
      'Hiểu rõ lý do vì sao một đáp án là bẫy ngữ nghĩa (Distractor Analysis).',
    ],
    coreScopeDescription: 'Tập trung vào dạng bài trắc nghiệm ngữ pháp & từ vựng có tính phân loại cao trong đề thi THPT Quốc gia.',
    userPersona: {
      title: 'Học sinh lớp 12 chuẩn bị thi Đại học',
      painPoints: [
        'Dễ bị bẫy ở các câu Phrasal Verbs và Collocations lạ.',
        'Làm đề xong xem đáp án chỉ có chữ A/B/C/D, không hiểu bản chất tại sao mình sai.',
        'Dung lượng bài thi lớn, dễ nản chí nếu phải làm đề dài 50 câu một lúc.',
      ],
      studyHabits: 'Ôn luyện ngắt quãng trong các khung giờ nghỉ ngắn 15-20 phút hàng ngày.',
    },
    mvpModules: [
      {
        number: 1,
        title: 'Bộ chuyên đề Ngữ pháp trọng tâm (Grammar Hub)',
        description: '5 chủ điểm ngữ pháp chắc chắn có mặt trong đề thi THPT kèm sơ đồ tư duy ngắn.',
        features: ['Lý thuyết cô đọng dạng bảng tóm tắt', 'Bài tập phân loại theo điểm số mục tiêu'],
      },
      {
        number: 2,
        title: 'Micro-Test 5 câu hàng ngày',
        description: 'Mỗi bài luyện chỉ kéo dài 3-5 phút với 5 câu hỏi trọng tâm để duy trì nhịp ôn tập đều đặn.',
        features: ['Bấm giờ làm bài nhẹ nhàng', 'Chấm điểm và hiển thị kết quả ngay lập tức'],
      },
      {
        number: 3,
        title: 'AI Giải thích lỗi sai & Phân tích đáp án nhiễu',
        description: 'Giải thích chi tiết vì sao đáp án này đúng và vì sao 3 phương án còn lại là bẫy.',
        features: ['Dịch nghĩa câu sang tiếng Việt', 'Giải thích quy tắc ngữ pháp tương ứng', 'Cung cấp ví dụ tương tự'],
      },
      {
        number: 4,
        title: 'Sổ tay từ vựng & Lỗi sai cá nhân (Mistake Log)',
        description: 'Tự động lưu lại các câu đã làm sai để học sinh có thể làm lại bài tập đó sau 24h.',
        features: ['Lưu câu sai vào danh sách ôn lại', 'Ghi chú mẹo nhớ từ AI'],
      },
    ],
    futureScopeRoadmap: [
      'Buổi 2+: Luyện đọc hiểu thông minh (Reading Comprehension) có AI giải nghĩa từ vựng trong bài.',
      'Buổi 3+: Luyện phát âm & thi nói Speaking bằng nhận diện giọng nói.',
      'Buổi 4+: Đề thi thử chuẩn cấu trúc Bộ Giáo Dục với phân tích ma trận điểm.',
    ],
    sampleQuestionPreview: {
      question: 'If she _______ harder during the term, she would not have failed the final exam.',
      options: ['A. studied', 'B. had studied', 'C. would study', 'D. has studied'],
      correctIndex: 1,
      aiExplanation: 'AI Gợi ý tư duy: Vế kết quả có cấu trúc "would not have failed" (would have + V3/ed) biểu thị sự việc không có thật trong quá khứ. Đây là Câu điều kiện loại 3 (Third Conditional). Vế IF cần chia quá khứ hoàn thành (had + V3/ed), do đó đáp án chính xác là "had studied". Bẫy thường gặp: Nhầm sang loại 2 (studied) do không chú ý vế sau có "have failed".',
    },
  },
  {
    id: 'science-8',
    name: 'KhoaHocAI (Ôn Tập KHTN & Vật Lý 8-9)',
    subject: 'Môn Khoa học Tự nhiên / Vật lý THCS (Lớp 8 – 9) – Chuyên đề Chuyển động, Lực, Áp suất và Định luật Ôm',
    targetAudience: 'Học sinh THCS lớp 8 - 9 (13 – 15 tuổi) cần củng cố lý thuyết và rèn luyện kỹ năng giải bài tập định lượng.',
    learningGoals: [
      'Hiểu bản chất hiện tượng vật lý thay vì chỉ học thuộc vẹt công thức.',
      'Biết cách tóm tắt bài toán (Đổi đơn vị chuẩn SI, ghi rõ đại lượng đã biết và cần tìm).',
      'Được hướng dẫn giải bài tập tính toán từng bước rõ ràng.',
    ],
    coreScopeDescription: 'Thu hẹp vào các định luật vật lý cơ bản có công thức tính toán và hiện tượng thực tế sinh động.',
    userPersona: {
      title: 'Học sinh THCS học KHTN',
      painPoints: [
        'Hay quên đổi đơn vị (km/h sang m/s, cm sang m).',
        'Không biết bắt đầu giải từ đâu khi đọc một đề bài vật lý có nhiều số liệu.',
        'Lý thuyết khô khan, khó hình dung hiện tượng trong đời sống.',
      ],
      studyHabits: 'Cần sự trực quan, ví dụ thực tế và chỉ dẫn từng bước ngắn gọn.',
    },
    mvpModules: [
      {
        number: 1,
        title: 'Thư viện hiện tượng & Công thức SI chuẩn',
        description: 'Tóm lược công thức vật lý kèm bảng quy đổi đơn vị thường dùng.',
        features: ['Bảng tra cứu công thức nhanh', 'Mẹo đổi đơn vị chuẩn không bị nhầm'],
      },
      {
        number: 2,
        title: 'Trắc nghiệm hiện tượng & bài tập định lượng',
        description: 'Bộ câu hỏi kết hợp câu hỏi giải thích hiện tượng và bài toán tính toán cơ bản.',
        features: ['Câu hỏi trắc nghiệm kèm hình minh họa hiện tượng', 'Ô điền đáp số tính toán'],
      },
      {
        number: 3,
        title: 'AI hướng dẫn tóm tắt đề & Từng bước giải',
        description: 'AI đóng vai gia sư hướng dẫn học sinh viết tóm tắt đề trước khi áp dụng công thức.',
        features: ['Bước 1: Tóm tắt đề và đổi đơn vị', 'Bước 2: Chọn công thức phù hợp', 'Bước 3: Thay số và kết luận'],
      },
      {
        number: 4,
        title: 'Góc ghi nhớ kiến thức cốt lõi',
        description: 'Tổng kết sau mỗi bài học 3 điều quan trọng nhất cần ghi nhớ.',
        features: ['3 ý chính sau bài học', 'Đánh dấu câu hỏi đã hiểu rõ'],
      },
    ],
    futureScopeRoadmap: [
      'Buổi 2+: Mô phỏng thí nghiệm ảo tương tác (Virtual Lab/Simulations).',
      'Buổi 3+: Nhận dạng sơ đồ mạch điện từ ảnh chụp.',
      'Buổi 4+: Hỏi đáp mở với AI gia sư về các hiện tượng khoa học trong đời sống.',
    ],
    sampleQuestionPreview: {
      question: 'Một người đi xe đạp với vận tốc v = 18 km/h. Đổi vận tốc này sang đơn vị chuẩn mét trên giây (m/s) là bao nhiêu?',
      options: ['A. 5 m/s', 'B. 10 m/s', 'C. 50 m/s', 'D. 64.8 m/s'],
      correctIndex: 0,
      aiExplanation: 'AI Gợi ý tư duy: Để đổi từ km/h sang m/s, ta chia cho 3.6 (vì 1 km = 1000m và 1h = 3600s). Ta có: 18 : 3.6 = 5 m/s. Lỗi thường gặp: Rất nhiều bạn lấy 18 nhân với 3.6 ra 64.8 m/s do nhớ nhầm chiều đổi đơn vị!',
    },
  },
];
