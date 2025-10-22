import React, { useState } from 'react';
import { runGemini } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const QuizCreator: React.FC = () => {
  const [text, setText] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) {
      setError('يرجى إدخال النص أو الموضوع لإنشاء الاختبار.');
      return;
    }
    setIsLoading(true);
    setResult('');
    setError(null);

    const prompt = `أنت خبير في وضع الأسئلة للمعلمين. استنادًا إلى النص التالي، قم بإنشاء اختبار من ${numQuestions} سؤال من نوع الاختيار من متعدد باللغة العربية. يجب أن يكون لكل سؤال أربعة خيارات (أ, ب, ج, د)، مع تحديد الإجابة الصحيحة بوضوح بعد كل سؤال.
    
    النص:
    "${text}"
    
    قم بتنسيق الإجابة بشكل واضح ومنظم، بحيث يسهل قراءتها واستخدامها.`;

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
      <h2 className="text-xl font-bold mb-4 text-slate-700">منشئ الاختبارات</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-slate-600 mb-1">
            النص أو الموضوع
          </label>
          <textarea
            id="text"
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="أدخل النص الذي تريد إنشاء أسئلة عنه هنا..."
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-slate-900"
          />
        </div>
        <div>
          <label htmlFor="numQuestions" className="block text-sm font-medium text-slate-600 mb-1">
            عدد الأسئلة
          </label>
          <select
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full sm:w-48 px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900"
          >
            <option value={3}>3 أسئلة</option>
            <option value={5}>5 أسئلة</option>
            <option value={10}>10 أسئلة</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2 bg-sky-600 text-white font-semibold rounded-md shadow-sm hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'جاري إنشاء الاختبار...' : 'أنشئ الاختبار'}
        </button>
      </form>

      {isLoading && <LoadingSpinner />}
      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md">{error}</div>}
      {result && (
        <div className="mt-6 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <h3 className="text-lg font-bold mb-2 text-slate-800">الأسئلة المقترحة:</h3>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
};

export default QuizCreator;