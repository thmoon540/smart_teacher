import React, { useState } from 'react';

interface ApiKeySetupProps {
  onKeySubmit: (key: string) => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onKeySubmit }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onKeySubmit(key.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center mx-4">
        <h2 className="text-2xl font-bold mb-4 text-sky-700">إعداد مفتاح API لاستخدام الأداة</h2>
        <p className="text-slate-600 mb-6 text-right leading-relaxed">
          لتتمكن من استخدام "مساعد المعلم الذكي"، ستحتاج إلى مفتاح API خاص بخدمات Google Gemini. هذا المفتاح يضمن أن استخدامك للخدمة خاص بك وآمن.
          <br />
          يمكنك الحصول على مفتاحك الخاص مجاناً من خلال Google AI Studio.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="أدخل مفتاح API الخاص بك هنا"
            className="w-full px-4 py-2 text-center bg-slate-700 text-white border border-slate-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-slate-400"
            aria-label="API Key Input"
          />
          <button
            type="submit"
            disabled={!key.trim()}
            className="w-full px-6 py-2 bg-sky-600 text-white font-semibold rounded-md shadow-sm hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            حفظ المفتاح والمتابعة
          </button>
        </form>
        <div className="mt-6">
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-sky-600 hover:underline">
                اضغط هنا للحصول على مفتاح API من Google
            </a>
            <p className="text-xs text-slate-400 mt-3">
            سيتم حفظ المفتاح في متصفحك فقط ولن يتم مشاركته مع أي جهة.
            </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;
