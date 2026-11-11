import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const view = useSelector((state) => state.view.currentView);

  return (
    <section 
      style={{ 
        padding: '32px', 
        border: '1px solid var(--accent-border)', 
        borderRadius: '16px',
        background: 'var(--accent-bg)',
        boxShadow: 'var(--shadow)'
      }}
    >
      <h2 style={{ color: 'var(--accent)' }}>Profil Pengguna (Lazy & Redux)</h2>
      
      <div className="flex items-center gap-6 mt-8">
        <div 
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--bg)',
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            flexShrink: 0
          }}
        >
        👦
        </div>
        
        <div className="flex flex-col gap-2">
          <p><strong style={{ color: 'var(--text-h)' }}>Nama:</strong> Muhammad Fahmi</p>
          <p><strong style={{ color: 'var(--text-h)' }}>Prodi:</strong> Teknik Informatika</p>
          <p><strong style={{ color: 'var(--text-h)' }}>Angkatan:</strong> 2023</p>
        </div>
      </div>
      
      <div className="mt-8 pt-6" style={{ borderTop: '1px dashed var(--accent-border)' }}>
      </div>
    </section>
  );
}
