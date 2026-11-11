import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../redux/viewSlice';

const Profile = lazy(() => import('./Profile'));

export default function SplitApp() {
  const view = useSelector((state) => state.view.currentView);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center w-full px-6 py-10">
      <header className="mb-10 w-full max-w-2xl flex flex-col items-center">
        <h1>Code Split & lazy loading</h1>
        
        <nav className="flex gap-4 mt-8">
          <button 
            onClick={() => dispatch(setView('home'))}
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
            onClick={() => dispatch(setView('profile'))}
            style={{
              background: view === 'profile' ? 'var(--accent)' : 'transparent',
              color: view === 'profile' ? '#fff' : 'var(--text-h)',
              border: `1px solid ${view === 'profile' ? 'var(--accent)' : 'var(--border)'}`,
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontFamily: 'var(--sans)',
              transition: 'all 0.2s'
            }}
          >
            Lazy Profile
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
            <h2>Bundle Utama (Redux State)</h2>
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
              Load modul...
            </div>
          }>
            <Profile />
          </Suspense>
        )}
      </main>
    </div>
  );
}
