import React, { useState } from 'react';
import { runGemini } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';

const ConceptExplainer: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept) {
      setError('يرجى إدخال المفهوم الذي تريد شرحه.');
      return;
    }
    setIsLoading(true);
    setResult('');
    setError(null);

    const prompt = `أنت معلم شغوف ومتمكن، قادر على شرح أعقد المفاهيم بطريقة بسيطة وممتعة. اشرح المفهوم التالي باللغة العربية: "${concept}".
    
    استخدم أسلوباً سلساً، وقدم أمثلة من واقع الحياة لتوضيح الفكرة. يمكنك استخدام التشبيهات والنقاط لتسهيل الفهم. اجعل الشرح مناسباً لتقديمه للطلاب في فصل دراسي.`;

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
      <h2 className="text-xl font-bold mb-4 text-slate-700">شرح المفاهيم</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="concept" className="block text-sm font-medium text-slate-600 mb-1">
            المفهوم المراد شرحه
          </label>
          <input
            id="concept"
            type="text"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="مثال: البناء الضوئي، الجاذبية الأرضية..."
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 text-slate-900"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-2 bg-sky-600 text-white font-semibold rounded-md shadow-sm hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'جاري الشرح...' : 'اشرح المفهوم'}
        </button>
      </form>

      {isLoading && <LoadingSpinner />}
      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md">{error}</div>}
      {result && (
        <div className="mt-6 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <h3 className="text-lg font-bold mb-2 text-slate-800">شرح المفهوم:</h3>
          <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
};

export default ConceptExplainer;