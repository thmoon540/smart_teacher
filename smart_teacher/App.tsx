import React, { useState } from 'react';
import { ToolType } from './types';
import LessonPlanner from './components/LessonPlanner';
import QuizCreator from './components/QuizCreator';
import TextSimplifier from './components/TextSimplifier';
import ConceptExplainer from './components/ConceptExplainer';
import { BookOpenIcon, DocumentTextIcon, LightBulbIcon, SparklesIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.LessonPlan);

  const renderTool = () => {
    switch (activeTool) {
      case ToolType.LessonPlan:
        return <LessonPlanner />;
      case ToolType.Quiz:
        return <QuizCreator />;
      case ToolType.Simplify:
        return <TextSimplifier />;
      case ToolType.Explain:
        return <ConceptExplainer />;
      default:
        return <LessonPlanner />;
    }
  };

  const tabs = [
    { type: ToolType.LessonPlan, label: 'مخطط الدروس', icon: <BookOpenIcon /> },
    { type: ToolType.Quiz, label: 'منشئ الاختبارات', icon: <DocumentTextIcon /> },
    { type: ToolType.Simplify, label: 'مبسط النصوص', icon: <SparklesIcon /> },
    { type: ToolType.Explain, label: 'شرح المفاهيم', icon: <LightBulbIcon /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-sky-700">مساعد المعلم الذكي</h1>
            <p className="text-slate-500 mt-1">أداتك الذكية لتعزيز تجربة التعليم</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="border-b border-slate-200 mb-6">
            <nav className="-mb-px flex flex-wrap gap-x-4 gap-y-2" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.type}
                  onClick={() => setActiveTool(tab.type)}
                  className={`
                    flex items-center gap-2 shrink-0 border-b-2 py-3 px-1 text-sm font-medium transition-colors duration-200
                    ${activeTool === tab.type
                      ? 'border-sky-600 text-sky-600'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div>
            {renderTool()}
          </div>
        </div>
      </main>
      
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>تم التطوير بواسطة الذكاء الاصطناعي | &copy; 2024</p>
        <p className="mt-1">الفكرة والتنسيق والتنفيذ: الاستاذ. احمد الحازمي - ثانوية الجوهري بالرياض</p>
      </footer>
    </div>
  );
};

export default App;