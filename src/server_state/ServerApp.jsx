import React, { useState, lazy, Suspense } from 'react';

const Products = lazy(() => import('./Products'));

export default function ServerApp() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="flex flex-col items-center w-full px-6 py-10">
      <header className="mb-10 w-full max-w-2xl flex flex-col items-center">
        <h1>Server State.</h1>
        <p>Mengelola asynchronous data fetching dan caching dengan React Query.</p>
        
        <nav className="flex gap-4 mt-8">
          <button 
            onClick={() => setActiveTab('home')}
            style={{
              background: activeTab === 'home' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'home' ? '#fff' : 'var(--text-h)',
              border: `1px solid ${activeTab === 'home' ? 'var(--accent)' : 'var(--border)'}`,
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontFamily: 'var(--sans)',
              transition: 'all 0.2s'
            }}
          >
            Home Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            style={{
              background: activeTab === 'products' ? 'var(--accent)' : 'transparent',
              color: activeTab === 'products' ? '#fff' : 'var(--text-h)',
              border: `1px solid ${activeTab === 'products' ? 'var(--accent)' : 'var(--border)'}`,
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontFamily: 'var(--sans)',
              transition: 'all 0.2s'
            }}
          >
            Data Produk (Lazy + Server State)
          </button>
        </nav>
      </header>

      <main className="w-full max-w-2xl text-left">
        {activeTab === 'home' ? (
          <section 
            style={{ 
              padding: '32px', 
              border: `1px solid var(--border)`, 
              borderRadius: '16px',
              background: 'var(--code-bg)'
            }}
            className="shadow-sm"
          >
            <h2>Kenapa Butuh Server State?</h2>
            <p className="mb-4">
              Aplikasi modern tidak cuma butuh state lokal. Data dari API butuh di-cache, di-retry otomatis kalau gagal, dan disinkronkan di background.
            </p>
            <p>
              Klik tab <strong>Data Produk</strong> di atas untuk melihat bagaimana React Query mengambil data dari API publik secara asinkron.
            </p>
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
              Mengunduh chunk komponen &amp; mengambil data server...
            </div>
          }>
            <Products />
          </Suspense>
        )}
      </main>
    </div>
  );
}