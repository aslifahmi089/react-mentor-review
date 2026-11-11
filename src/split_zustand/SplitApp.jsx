import React, { lazy, Suspense } from 'react';
import { useStore } from '../zustand/store';

// Lazy loading komponen TodoApp
const TodoApp = lazy(() => import('./TodoApp'));

export default function SplitApp() {
  const view = useStore((state) => state.view);
  const setView = useStore((state) => state.setView);

  return (
    <div className="flex flex-col items-center w-full px-6 py-10">
      <header className="mb-10 w-full max-w-2xl flex flex-col items-center">
        <h1>Zustand Split.</h1>
        <p>Manajemen State Global</p>
        
        <nav className="flex gap-4 mt-8">
          <button 
            onClick={() => setView('home')}
            style={{
              background: view === 'home' ? 'var(--accent)' : 'transparent',
              color: view === 'home' ? '#fff' : 'var(--text-h)',
              border: `1px solid ${view === 'home' ? 'var(--accent)' : 'var(--border)'}`,
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontFamily: 'var(--sans)',
              transition: 'all 0.2s'
            }}
          >
            Home Base
          </button>
          <button 
            onClick={() => setView('todo')}
            style={{
              background: view === 'todo' ? 'var(--accent)' : 'transparent',
              color: view === 'todo' ? '#fff' : 'var(--text-h)',
              border: `1px solid ${view === 'todo' ? 'var(--accent)' : 'var(--border)'}`,
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontFamily: 'var(--sans)',
              transition: 'all 0.2s'
            }}
          >
            Buka Todo (Lazy)
          </button>
        </nav>
      </header>

      <main className="w-full max-w-2xl text-left">
        {view === 'home' ? (
          <section 
            style={{ 
              padding: '32px', 
              border: `1px solid var(--border)`, 
              borderRadius: '16px',
              background: 'var(--code-bg)'
            }}
            className="shadow-sm"
          >
            <h2>Bundle Utama (Zustand)</h2>
          </section>
        ) : (
          <Suspense fallback={
            <div 
              style={{
                padding: '48px',
                textAlign: 'center',
                border: '2px dashed var(--border)',
                borderRadius: '16px',
                color: 'var(--text)'
              }}
            >
              Mengunduh chunk TodoApp secara dinamis...
            </div>
          }>
            <TodoApp />
          </Suspense>
        )}
      </main>
    </div>
  );
}
