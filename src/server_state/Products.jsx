import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=5');
  if (!response.ok) {
    throw new Error('Gagal mengambil data dari server');
  }
  const data = await response.json();
  return data.products;
};

export default function Products() {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '16px', textAlign: 'center', background: 'var(--bg)' }}>
        <p style={{ color: 'var(--accent)' }}>Sedang memuat data dari server...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '32px', border: '1px solid #ef4444', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)' }}>
        <h2 style={{ color: '#ef4444' }}>Terjadi Kesalahan</h2>
        <p>{error.message}</p>
      </div>
    );
  }

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
      <h2 style={{ color: 'var(--accent)', marginBottom: '16px' }}>Daftar Produk (Server State Cached)</h2>
      <p className="mb-6" style={{ fontSize: '15px' }}>
        Data di bawah ini diambil secara asinkron. Jika kamu pindah tab lalu kembali lagi, React Query tidak akan *fetch* ulang karena datanya sudah di-cache!
      </p>

      <ul className="flex flex-col gap-3 p-0 m-0 list-none">
        {products.map((product) => (
          <li 
            key={product.id}
            className="flex items-center justify-between p-4 rounded-xl"
            style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
          >
            <div>
              <strong style={{ color: 'var(--text-h)' }}>{product.title}</strong>
              <p style={{ fontSize: '14px', color: 'var(--text)' }}>Kategori: {product.category}</p>
            </div>
            <span 
              style={{ 
                fontFamily: 'var(--mono)', 
                background: 'var(--code-bg)', 
                padding: '4px 8px', 
                borderRadius: '4px',
                color: 'var(--accent)',
                fontWeight: 'bold'
              }}
            >
              ${product.price}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}