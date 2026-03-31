import React, { useState } from 'react';
import { Briefcase, Paintbrush, Rocket, Monitor, Layers, Gamepad2 } from 'lucide-react';
import ChatWidget from './components/ChatWidget';

interface Theme {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  disabled?: boolean;
}

const themes: Theme[] = [
  {
    id: 'theme-business',
    name: '商務經典風',
    description: '沉穩、專業的藍灰配色，適合企業客服或 B2B 入口。',
    icon: <Briefcase className="h-6 w-6" />,
    colorClass: 'bg-blue-600',
  },
  {
    id: 'theme-playful',
    name: '活潑馬卡龍',
    description: '高反差亮色系，圓潤造型，增加年輕活力的視覺體驗。',
    icon: <Paintbrush className="h-6 w-6" />,
    colorClass: 'bg-pink-500',
  },
  {
    id: 'theme-cyberpunk',
    name: '暗黑科技風',
    description: '霓虹色調、極客感受，為高科技與駭客元素量身打造。',
    icon: <Rocket className="h-6 w-6" />,
    colorClass: 'bg-purple-600',
  },
  {
    id: 'theme-mac',
    name: '🍎 Apple MAC',
    description: '擬真作業系統介面，精準的邊界高光與實體陰影層次。',
    icon: <Monitor className="h-6 w-6" />,
    colorClass: 'bg-slate-700',
  },
  {
    id: 'theme-glass',
    name: '🧊 Glassmorphism',
    description: '穿透與無邊界未來感，24px 強烈高斯模糊效果。',
    icon: <Layers className="h-6 w-6" />,
    colorClass: 'bg-cyan-500',
  },
  {
    id: 'theme-pixel',
    name: '🕹️ 8-Bit 像素復古',
    description: '硬邊界方塊、點陣綠文字與 DotGothic16 像素字型。',
    icon: <Gamepad2 className="h-6 w-6" />,
    colorClass: 'bg-green-600',
  }
];

export default function App() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-900/20"></div>
      
      <div className="mx-auto max-w-5xl space-y-12 relative z-10">
        <header className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400">
            Powered by Vite & Tailwind v4
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            AI Chat Widget <br className="hidden md:block"/>展示與導覽中心
          </h1>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            請從下方選擇一種介面風格。點擊風格卡片後，右下角會自動開啟採用該專屬設計語言的 AI 客服小工具。
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              disabled={theme.disabled}
              onClick={() => setActiveTheme(theme.id)}
              className={`group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border bg-white p-6 text-left shadow-sm transition-all duration-300 dark:bg-zinc-900 ${
                activeTheme === theme.id 
                  ? 'border-blue-500 ring-1 ring-blue-500 shadow-md dark:shadow-blue-900/20' 
                  : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 hover:shadow-md dark:hover:border-zinc-700'
              } ${theme.disabled ? 'grayscale cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
            >
              {activeTheme === theme.id && (
                <div className="absolute top-0 right-0 border-b border-l border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-900 dark:bg-blue-900/40 dark:text-blue-400 rounded-bl-lg">
                  現正套用
                </div>
              )}
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${theme.colorClass}`}>
                {theme.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{theme.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{theme.description}</p>
              </div>
              <div className={`mt-auto pt-4 text-sm font-semibold transition-opacity ${activeTheme === theme.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 opacity-0 group-hover:opacity-100 dark:text-slate-500'}`}>
                {theme.disabled ? '' : '套用此風格 →'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <ChatWidget theme={activeTheme} />
    </div>
  );
}
