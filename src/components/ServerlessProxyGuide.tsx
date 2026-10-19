import { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Server,
  ArrowRight,
  Code2,
  Lock,
  Copy,
  Check,
  Send,
  Loader2,
  Terminal,
  Globe,
  HelpCircle,
  FolderTree,
} from 'lucide-react';

export function ServerlessProxyGuide() {
  const [activeTab, setActiveTab] = useState<'guide' | 'live-demo' | 'files'>('guide');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Live proxy test states
  const [testPrompt, setTestPrompt] = useState(
    'Giải thích ngắn gọn cách ghi nhớ công thức nghiệm phương trình bậc 2 (Toán 9) kèm 1 mẹo tránh sai dấu.'
  );
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [requestTime, setRequestTime] = useState<number | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSendLiveProxy = async () => {
    if (!testPrompt.trim() || isLoading) return;
    setIsLoading(true);
    setErrorMsg(null);
    setTestResponse(null);
    const start = Date.now();

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: testPrompt,
          systemInstruction:
            'Bạn là gia sư AI ôn tập dành cho học sinh K12. Trả lời ngắn gọn, súc tích, logic từng bước và chỉ ra lỗi sai học sinh hay mắc.',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi khi gọi serverless proxy');
      }

      setTestResponse(data.text);
      setRequestTime(Date.now() - start);
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể kết nối với endpoint /api/gemini');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Nâng Cấp Bảo Mật Serverless Proxy (Prompt #03)
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Chuyển Từ "Local API Key" Sang "Serverless Proxy" An Toàn
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Dành cho học sinh K12: Hiểu bản chất giấu chìa khóa bảo mật và làm chủ deploy Vercel / Netlify
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-stone-800 p-1 rounded-xl self-start sm:self-auto border border-stone-700">
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'guide'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            4 Bước Thực Hiện
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('live-demo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'live-demo'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Test Proxy Trực Tiếp
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'files'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Template Code Sẵn Dùng
          </button>
        </div>
      </div>

      {/* Visual Analogy Banner */}
      <div className="p-4 bg-blue-50/70 border-b border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-blue-900 block font-semibold">
              Hình dung ẩn dụ cho học sinh K12: "Tại sao không được để API Key ở trình duyệt?"
            </strong>
            <p className="text-stone-600 mt-0.5 leading-relaxed">
              <strong>Local Key (Cách cũ):</strong> Giống như bạn dán luôn chìa khóa nhà lên cửa ngoài ngõ. Bất kỳ ai mở F12 (Inspect) đều thấy key và dùng cạn tiền tài khoản của bạn.<br />
              <strong>Serverless Proxy (Cách mới):</strong> Bạn thuê một "chú bảo vệ" (Function trên Vercel/Server). Học sinh chỉ gửi câu hỏi cho chú bảo vệ; chú tự lấy chìa khóa trong két sắt bí mật gọi AI rồi đưa bài về. Trình duyệt không bao giờ nhìn thấy chìa khóa!
            </p>
          </div>
        </div>
      </div>

      {/* Tab 1: 4 Steps Detailed Guide */}
      {activeTab === 'guide' && (
        <div className="p-6 space-y-8">
          {/* Architecture Diagram */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
              Mô hình luồng dữ liệu an toàn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-xs">
                <Globe className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <div className="font-semibold text-xs text-stone-900">1. Trình duyệt (Frontend)</div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Chỉ gửi <code className="bg-stone-100 px-1 py-0.5 rounded text-blue-700">prompt</code> đến <code className="text-stone-800">/api/gemini</code>
                </div>
                <div className="mt-2 text-[10px] font-medium text-emerald-700 bg-emerald-50 py-0.5 rounded">
                  Không chứa API Key
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border-2 border-emerald-500/50 shadow-xs relative">
                <Server className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <div className="font-semibold text-xs text-stone-900">2. Serverless Proxy (Vercel / API)</div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Đọc <code className="bg-stone-100 px-1 py-0.5 rounded text-purple-700">process.env.GEMINI_API_KEY</code> trong két sắt
                </div>
                <div className="mt-2 text-[10px] font-medium text-blue-700 bg-blue-50 py-0.5 rounded">
                  Xác thực & Chuyển tiếp an toàn
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-xs">
                <Lock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <div className="font-semibold text-xs text-stone-900">3. Google Gemini API</div>
                <div className="text-[11px] text-stone-500 mt-1">
                  Model: <code className="text-stone-800 font-semibold">gemini-3.8-flash</code> xử lý và trả về lời giải
                </div>
                <div className="mt-2 text-[10px] font-medium text-stone-600 bg-stone-100 py-0.5 rounded">
                  Phản hồi kết quả học tập
                </div>
              </div>
            </div>
          </div>

          {/* 4 Steps */}
          <div className="space-y-6">
            {/* Bước 1 */}
            <div className="border border-stone-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">
                    Xóa logic lưu key local ở Frontend
                  </h4>
                </div>
                <span className="text-[11px] font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  Xóa bỏ rủi ro lộ key
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Học sinh cần xóa sạch các đoạn code đọc/ghi API Key vào <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">localStorage</code> và xóa khung form nhập key trên giao diện để người dùng không phải tự nhập thủ công.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-200">
                  <div className="flex items-center gap-1.5 text-rose-800 font-bold mb-1 text-[11px]">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    CÁCH CŨ (XÓA ĐI):
                  </div>
                  <pre className="text-rose-950 overflow-x-auto text-[11px] leading-relaxed">
{`// ❌ XÓA DÒNG NÀY:
const apiKey = localStorage.getItem('GEMINI_KEY');

// ❌ XÓA Ô INPUT TRÊN GIAO DIỆN:
<input 
  type="password" 
  placeholder="Nhập API Key của bạn..." 
  onChange={(e) => setKey(e.target.value)} 
/>`}
                  </pre>
                </div>

                <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    CÁCH MỚI (CHUẨN HOÁ):
                  </div>
                  <pre className="text-emerald-950 overflow-x-auto text-[11px] leading-relaxed">
{`// ✅ KHÔNG CẦN LƯU KEY NỮA!
// Frontend chỉ quản lý câu hỏi của học sinh:
const [prompt, setPrompt] = useState('');

// Khi cần hỏi bài, gọi thẳng đến proxy:
askAiTutor(prompt);`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Bước 2 */}
            <div className="border border-stone-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">
                    Viết 1 file Serverless Proxy Function cơ bản
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyCode(
                      `import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Thiếu câu hỏi (prompt)' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY' });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là gia sư AI ôn tập học tập cho học sinh K12, giải thích từng bước logic.'
      }
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}`,
                      'step2'
                    )
                  }
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-medium"
                >
                  {copiedIndex === 'step2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Sao chép code
                </button>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tạo thư mục <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-800">api/</code> ở thư mục gốc của project, tạo file <code className="bg-stone-100 px-1 py-0.5 rounded font-semibold text-blue-700">api/gemini.ts</code> (hoặc <code className="bg-stone-100 px-1 py-0.5 rounded font-semibold text-blue-700">api/gemini.js</code>).
              </p>

              <div className="bg-stone-900 text-stone-100 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                <span className="text-stone-400">// api/gemini.ts (Chuẩn Serverless Function cho Vercel / Netlify)</span>
                <br />
                <span className="text-purple-400">import</span> &#123; GoogleGenAI &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@google/genai'</span>;
                <br /><br />
                <span className="text-purple-400">export default async function</span> <span className="text-blue-400">handler</span>(req, res) &#123;
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">if</span> (req.method !== <span className="text-emerald-300">'POST'</span>) &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> res.status(405).json(&#123; error: <span className="text-emerald-300">'Method Not Allowed'</span> &#125;);
                <br />
                &nbsp;&nbsp;&#125;
                <br /><br />
                &nbsp;&nbsp;<span className="text-stone-400">// 1. Lấy câu hỏi từ Frontend gửi lên:</span>
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">const</span> &#123; prompt &#125; = req.body;
                <br /><br />
                &nbsp;&nbsp;<span className="text-stone-400">// 2. Lấy bí mật từ biến môi trường của server (không ai nhìn thấy):</span>
                <br />
                &nbsp;&nbsp;<span className="text-purple-400">const</span> apiKey = process.env.<span className="text-amber-300 font-bold">GEMINI_API_KEY</span>;
                <br /><br />
                &nbsp;&nbsp;<span className="text-purple-400">try</span> &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">const</span> ai = <span className="text-purple-400">new</span> GoogleGenAI(&#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;apiKey,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;httpOptions: &#123; headers: &#123; <span className="text-emerald-300">'User-Agent'</span>: <span className="text-emerald-300">'aistudio-build'</span> &#125; &#125;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;);
                <br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> ai.models.generateContent(&#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;model: <span className="text-emerald-300">'gemini-3.8-flash'</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contents: prompt,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&#125;);
                <br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> res.status(200).json(&#123; text: response.text &#125;);
                <br />
                &nbsp;&nbsp;&#125; <span className="text-purple-400">catch</span> (error) &#123;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> res.status(500).json(&#123; error: error.message &#125;);
                <br />
                &nbsp;&nbsp;&#125;
                <br />
                &#125;
              </div>
            </div>

            {/* Bước 3 */}
            <div className="border border-stone-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">
                    Cấu hình biến môi trường (Environment Variable) để giấu API Key
                  </h4>
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Bảo mật 100%
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Biến môi trường là nơi lưu trữ "bí mật" mà chỉ có server nhìn thấy, không bao giờ được commit lên GitHub.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-stone-600" />
                    A. Khi chạy ở máy tính cá nhân (Local):
                  </div>
                  <p className="text-stone-600 text-[11px]">
                    Tạo file tên là <code className="bg-white px-1.5 py-0.5 border rounded font-mono font-bold">.env</code> ở thư mục gốc:
                  </p>
                  <div className="p-2 bg-stone-900 text-stone-200 rounded-lg font-mono text-[11px]">
                    GEMINI_API_KEY="AIzaSyYourSecretKeyHere"
                  </div>
                  <p className="text-stone-500 text-[10px]">
                    *Lưu ý: Mở file <code className="font-mono">.gitignore</code> và thêm dòng <code className="font-mono">.env</code> để Git không bao giờ đẩy file này lên mạng!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    B. Khi deploy lên Vercel / Netlify:
                  </div>
                  <p className="text-stone-600 text-[11px]">
                    Không tải file .env lên! Thay vào đó cài đặt trực tiếp trên bảng điều khiển web:
                  </p>
                  <ul className="space-y-1 text-stone-600 text-[11px] list-disc list-inside">
                    <li>Vào <strong>Project Settings → Environment Variables</strong></li>
                    <li>Điền Key: <code className="font-mono font-bold text-blue-700">GEMINI_API_KEY</code></li>
                    <li>Điền Value: Dán chuỗi API Key của bạn</li>
                    <li>Bấm <strong>Save</strong> & Redeploy!</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bước 4 */}
            <div className="border border-stone-200 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h4 className="text-sm font-bold text-stone-900">
                    Sửa luồng fetch trong Frontend để gọi đến Proxy
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyCode(
                      `// Hàm gửi câu hỏi ôn tập đến Serverless Proxy
async function askAiTutor(studentQuestion: string) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: studentQuestion,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Lỗi kết nối');
    }

    const data = await response.json();
    return data.text; // Trả về lời giải thích của AI
  } catch (error) {
    console.error('Lỗi hỏi bài AI:', error);
    throw error;
  }
}`,
                      'step4'
                    )
                  }
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer font-medium"
                >
                  {copiedIndex === 'step4' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Sao chép code
                </button>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Frontend lúc này hoàn toàn "trong sạch", chỉ gọi đến đường dẫn nội bộ cùng tên miền <code className="bg-stone-100 px-1 py-0.5 rounded font-mono font-semibold text-blue-700">/api/gemini</code>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-rose-50/60 p-3 rounded-lg border border-rose-200">
                  <div className="text-rose-800 font-bold mb-1 text-[11px]">
                    ❌ TRƯỚC (GỌI THẲNG GOOGLE KÈM KEY):
                  </div>
                  <pre className="text-rose-950 overflow-x-auto text-[11px] leading-relaxed">
{`// Nguy hiểm: Lộ key trên thanh Network của trình duyệt!
fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=\${apiKey}\`, {
  method: 'POST',
  body: JSON.stringify(...)
})`}
                  </pre>
                </div>

                <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                  <div className="text-emerald-800 font-bold mb-1 text-[11px]">
                    ✅ SAU (GỌI ĐẾN PROXY /api/gemini):
                  </div>
                  <pre className="text-emerald-950 overflow-x-auto text-[11px] leading-relaxed">
{`// An toàn tuyệt đối: Không mang theo bất kỳ key nào!
const res = await fetch('/api/gemini', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: userQuestion })
});
const data = await res.json();
console.log(data.text);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live Proxy Demo Console */}
      {activeTab === 'live-demo' && (
        <div className="p-6 space-y-6">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-emerald-950 font-semibold">
                Máy chủ Serverless Proxy (/api/gemini) đang hoạt động thực tế!
              </strong>
              <p className="mt-0.5 text-stone-600 leading-relaxed">
                Hãy thử nhập một câu hỏi ôn tập bên dưới và bấm gửi. Trình duyệt của bạn sẽ gửi request tới backend <code className="font-mono bg-white px-1 py-0.5 rounded border">/api/gemini</code> (không hề kèm key), backend sẽ gọi Gemini 3.8 Flash và trả kết quả về an toàn.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
              <span>Nội dung câu hỏi ôn tập (Prompt gửi qua Proxy):</span>
              <span className="text-[11px] text-stone-400 font-normal">
                Backend sẽ nhận {`{ prompt }`} và gắn GEMINI_API_KEY
              </span>
            </label>

            <div className="relative">
              <textarea
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                rows={3}
                placeholder="Nhập câu hỏi toán, tiếng anh, khoa học..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-stone-50/50 leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-500">Mẫu câu nhanh:</span>
                <button
                  type="button"
                  onClick={() =>
                    setTestPrompt('Giải thích định lý Vi-ét toán lớp 9 cho học sinh hiểu nhanh và ví dụ 1 bài.')
                  }
                  className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] transition-colors cursor-pointer"
                >
                  Toán 9 (Vi-ét)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setTestPrompt('Phân biệt thì Hiện tại hoàn thành và Quá khứ đơn bằng 2 ví dụ thực tế.')
                  }
                  className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] transition-colors cursor-pointer"
                >
                  Tiếng Anh THPT
                </button>
              </div>

              <button
                type="button"
                onClick={handleSendLiveProxy}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Proxy đang gọi Gemini...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi qua /api/gemini Proxy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Network Inspection Preview */}
          <div className="p-3.5 rounded-xl bg-stone-900 text-stone-200 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-[11px] text-stone-400 border-b border-stone-800 pb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Mô phỏng Network Request (F12):
              </span>
              <span>Method: POST | Endpoint: /api/gemini</span>
            </div>
            <div className="text-[11px] space-y-1">
              <div><span className="text-stone-400">Request Headers:</span> <span className="text-emerald-300">&#123; "Content-Type": "application/json" &#125;</span> <span className="text-amber-400">(KHÔNG CÓ API KEY)</span></div>
              <div className="truncate"><span className="text-stone-400">Request Body:</span> <span className="text-blue-300">&#123; "prompt": "{testPrompt.slice(0, 50)}..." &#125;</span></div>
              {requestTime && (
                <div className="text-emerald-400 pt-1 border-t border-stone-800 text-[10px]">
                  ✓ Phản hồi thành công trong {requestTime}ms từ Serverless Proxy!
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold">Lỗi phản hồi từ Proxy:</strong>
                <p className="mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Result Output */}
          {testResponse && (
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Kết quả gia sư AI phản hồi an toàn qua Proxy:
                </div>
                <button
                  type="button"
                  onClick={() => copyCode(testResponse, 'res')}
                  className="text-stone-500 hover:text-stone-800 text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === 'res' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Sao chép kết quả
                </button>
              </div>
              <div className="text-xs text-stone-800 whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-lg border border-stone-200/80">
                {testResponse}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Template Files Ready to Copy */}
      {activeTab === 'files' && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-blue-600" />
              Cấu trúc thư mục chuẩn cho học sinh khi deploy lên Vercel:
            </h3>
          </div>

          <div className="bg-stone-900 text-stone-100 p-4 rounded-xl text-xs font-mono leading-relaxed">
{`my-ai-study-app/
├── api/
│   └── gemini.ts        <-- 1 file Serverless Proxy duy nhất ở đây!
├── src/
│   ├── App.tsx          <-- Frontend gọi fetch('/api/gemini')
│   └── main.tsx
├── .env                 <-- Chứa GEMINI_API_KEY (chỉ chạy local, không commit)
├── .gitignore           <-- Đã có dòng .env
└── package.json`}
          </div>

          <div className="space-y-4">
            <div className="border border-stone-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">File 1: .env.example (Dành cho chia sẻ mã nguồn)</span>
                <button
                  type="button"
                  onClick={() => copyCode('GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE\n', 'f1')}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === 'f1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
              </div>
              <pre className="bg-stone-50 p-2.5 rounded-lg border text-[11px] font-mono text-stone-800">
{`# File mẫu để đồng đội biết cần cài key gì (không ghi key thật vào đây)
GEMINI_API_KEY="MY_GEMINI_API_KEY"`}
              </pre>
            </div>

            <div className="border border-stone-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-stone-900">File 2: .gitignore (Ngăn Git đẩy chìa khóa lên mạng)</span>
                <button
                  type="button"
                  onClick={() => copyCode('.env\n.env.local\nnode_modules\ndist\n', 'f2')}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  {copiedIndex === 'f2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
              </div>
              <pre className="bg-stone-50 p-2.5 rounded-lg border text-[11px] font-mono text-stone-800">
{`node_modules
dist
.env
.env.local`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
