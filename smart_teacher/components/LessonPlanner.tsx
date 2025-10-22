import React, { useState } from 'react';
import { runGemini } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const LessonPlanner: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [duration, setDuration] = useState('45');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !grade || !duration) {
      setError('يرجى ملء جميع الحقول.');
      return;
    }
    setIsLoading(true);
    setResult('');
    setError(null);

    const prompt = `أنت خبير في تصميم المناهج للمعلمين. قم بإنشاء خطة درس مفصلة باللغة العربية حول الموضوع: "${topic}" لطلاب الصف: ${grade}. يجب أن تكون مدة الدرس ${duration} دقيقة. يجب أن تتضمن الخطة:
    1.  الأهداف التعليمية (ماذا سيتعلم الطلاب).
    2.  المواد والأدوات اللازمة.
    3.  مقدمة ونشاط تمهيدي (لجذب انتباه الطلاب).
    4.  شرح المفهوم الرئيسي وأنشطة تفاعلية (خطوات سير الدرس).
    5.  نشاط تطبيقي أو عملي.
    6.  طريقة التقييم (للتأكد من فهم الطلاب).
    7.  خاتمة ومراجعة سريعة.
    
    قم بتنسيق الإجابة بشكل واضح ومنظم.`;

    const response = await runGemini(prompt);
    if (response.startsWith('حدث خطأ')) {
      setError(response);
    } else {
      setResult(response);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-slate-700">مخطط الدروس</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-600 mb-1">موضوع الدرس</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="مثال: دورة حياة النبات"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-slate-900"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-slate-600 mb-1">المرحلة الدراسية</label>
            <input
              id="grade"
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="مثال: الرابع الابتدائي"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-slate-900"
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-slate-600 mb-1">مدة الدرس (بالدقائق)</label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-slate-900"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2 bg-sky-600 text-white font-semibold rounded-md shadow-sm hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'جاري الإنشاء...' : 'أنشئ خطة الدرس'}
        </button>
      </form>

      {isLoading && <LoadingSpinner />}
      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md">{error}</div>}
      {result && (
        <div className="mt-6 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <h3 className="text-lg font-bold mb-2 text-slate-800">خطة الدرس المقترحة:</h3>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
};

export default LessonPlanner;