# Server State Demo

Dokumen ini menjelaskan program yang ada di folder `src/server_state` secara detail, supaya lebih mudah dipresentasikan dan dipahami.

## 1. Tujuan Program

Program ini dibuat untuk menunjukkan konsep `server state` dalam aplikasi React modern. `server state` adalah data yang berasal dari server atau API, bukan data lokal yang disimpan di component state biasa.

Pada aplikasi ini, data produk diambil dari API publik `dummyjson.com` menggunakan React Query (`@tanstack/react-query`). Fokus utamanya adalah:

- mengambil data dari server secara asynchronous
- caching data agar tidak selalu request ulang
- menampilkan loading state saat data sedang diambil
- menampilkan error state jika request gagal
- membagi UI menjadi beberapa tab agar lebih rapi
- menggunakan lazy loading agar komponen dimuat hanya saat dibutuhkan

Dengan kata lain, aplikasi ini menjelaskan bahwa data yang datang dari API itu bukan hanya “state biasa”, tetapi state yang perlu dikelola dengan pola khusus.

---

## 2. Kenapa Ini Disebut Server State?

Dalam React, ada dua jenis state yang sering dipakai:

1. `Client state`
   - data lokal di component
   - contohnya form input, modal terbuka/tutup, filter UI

2. `Server state`
   - data yang berasal dari API/backend
   - contohnya daftar produk, user, transaksi, artikel, dll.

Server state punya karakter khusus:

- data bisa berubah dari luar aplikasi
- bisa dipanggil berkali-kali
- perlu caching agar tidak request berulang
- perlu loading dan error handling
- harus bisa di-refetch saat data berubah atau ketika user kembali ke halaman

React Query dibuat khusus untuk menangani kebutuhan seperti itu. Di program ini, semua itu diterapkan pada data produk.

---

## 3. Struktur Folder

Folder `src/server_state` berisi komponen utama dari demo ini:

- `main.jsx` → entry point aplikasi
- `ServerApp.jsx` → komponen utama layout dan navigasi tab
- `Products.jsx` → komponen yang mengambil data dari API dan menampilkan produk

Berikut penjelasan tiap file:

---

## 4. File `main.jsx`

File ini merupakan titik masuk aplikasi React untuk environment server state.

### Fungsi utama

- membuat root React DOM
- menghubungkan aplikasi dengan `QueryClientProvider`
- memanggil komponen `ServerApp`

### Kode inti

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ServerApp from './ServerApp';
import '../index.css';

const queryClient = new QueryClient();

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ServerApp />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
```

### Penjelasan

- `QueryClient` adalah instance client React Query.
- `QueryClientProvider` membungkus aplikasi agar semua komponen di bawahnya bisa memakai React Query.
- `ServerApp` adalah komponen utama yang menampilkan tampilan dashboard demo.

Tanpa `QueryClientProvider`, komponen seperti `useQuery` tidak akan bisa bekerja.

---

## 5. File `ServerApp.jsx`

File ini berperan sebagai layout utama dari demo server state. Di sini kita punya:

- judul halaman
- penjelasan singkat tentang konsep server state
- tombol navigasi tab
- area utama yang menampilkan konten sesuai tab yang dipilih

### State utama

```jsx
const [activeTab, setActiveTab] = useState('home');
```

`activeTab` digunakan untuk menentukan tab yang aktif, yaitu:

- `home` → halaman penjelasan teoritis
- `products` → halaman yang menampilkan data produk

### Struktur UI

Aplikasi memiliki header dengan judul:

```jsx
<h1>Server State.</h1>
<p>Mengelola asynchronous data fetching dan caching dengan React Query.</p>
```

Lalu ada dua tombol:

- `Home Overview`
- `Data Produk (Lazy + Server State)`

Saat tombol `products` diklik, aplikasi menampilkan component produk yang di-load secara lazy.

---

## 6. Lazy Loading

Komponen `Products` dimuat secara lazy menggunakan fitur React `lazy()`.

```jsx
const Products = lazy(() => import('./Products'));
```

### Kenapa lazy loading dipakai?

Karena komponen produk hanya dibutuhkan saat user membuka tab produk. Dengan lazy loading:

- bundle jadi lebih kecil
- loading awal aplikasi lebih cepat
- komponen diunduh hanya saat diperlukan

Untuk menangani kondisi saat komponen masih dimuat, digunakan `Suspense`:

```jsx
<Suspense fallback={
  <div>
    Mengunduh chunk komponen & mengambil data server...
  </div>
}>
  <Products />
</Suspense>
```

`fallback` adalah tampilan sementara saat chunk komponen sedang dimuat.

---

## 7. File `Products.jsx`

Ini adalah file yang paling penting. Di file ini, data API dipanggil dan ditampilkan ke UI.

### Fungsi `fetchProducts`

```jsx
const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=5');
  if (!response.ok) {
    throw new Error('Gagal mengambil data dari server');
  }
  const data = await response.json();
  return data.products;
};
```

### Penjelasan

- menggunakan `fetch` untuk meminta data dari API publik
- mengecek apakah response berhasil (`response.ok`)
- jika gagal, lempar error
- jika berhasil, ambil `data.products`

API yang dipakai:

`https://dummyjson.com/products?limit=5`

Artinya, aplikasi akan mengambil 5 produk pertama dari API dummyjson.

---

## 8. React Query: `useQuery`

Di dalam komponen `Products`, data diambil dengan hook `useQuery`.

```jsx
const { data: products, isLoading, isError, error } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});
```

### Penjelasan parameter:

#### `queryKey`

Merupakan key unik untuk caching query.

```jsx
['products']
```

Artinya, data produk ini akan disimpan di cache dengan key `products`.

#### `queryFn`

Fungsi yang dijalankan untuk mengambil data.

```jsx
queryFn: fetchProducts
```

React Query akan memanggil fungsi ini secara otomatis dan mengelola status loading/error/success.

### State yang dihasilkan

- `isLoading` → sedang mengambil data
- `isError` → ada error saat request
- `error` → objek error yang terjadi
- `data` → hasil data yang berhasil didapat

---

## 9. Kondisi Loading dan Error

### Loading state

```jsx
if (isLoading) {
  return (
    <div>
      <p>Sedang memuat data dari server...</p>
    </div>
  );
}
```

Saat request sedang berjalan, UI menampilkan pesan loading. Ini sangat penting agar user tahu aplikasi sedang bekerja.

### Error state

```jsx
if (isError) {
  return (
    <div>
      <h2>Terjadi Kesalahan</h2>
      <p>{error.message}</p>
    </div>
  );
}
```

Kalau request gagal, user akan melihat notifikasi error yang informatif.

---

## 10. Menampilkan Data Produk

Saat data berhasil diambil, komponen akan menampilkan daftar produk.

```jsx
<ul className="flex flex-col gap-3 p-0 m-0 list-none">
  {products.map((product) => (
    <li key={product.id}>
      <div>
        <strong>{product.title}</strong>
        <p>Kategori: {product.category}</p>
      </div>
      <span>${product.price}</span>
    </li>
  ))}
</ul>
```

### Yang ditampilkan

- judul produk (`product.title`)
- kategori (`product.category`)
- harga (`product.price`)

Setiap produk memiliki `key={product.id}` agar React bisa mengelola list dengan benar.

---

## 11. Kenapa React Query Penting di Sini?

Ini bagian kunci dari presentasi.

Tanpa React Query, developer biasanya menulis logic seperti ini:

- `useState` untuk simpan data
- `useEffect` untuk fetch data
- state `loading`, `error`, dan `data` manual
- cleanup, dependency, refetch, caching sering jadi rumit

React Query menyederhanakan semua itu dengan fitur seperti:

- caching otomatis
- background refetch
- loading state otomatis
- error handling otomatis
- query invalidation
- pengelolaan data yang lebih efisien

Program ini menunjukkan cara sederhana untuk memanfaatkan React Query tanpa kompleksitas terlalu banyak.

---

## 12. Kelebihan Aplikasi Ini

Beberapa kelebihan dari demo ini:

1. Mudah dipahami untuk presentasi
2. Menunjukkan konsep server state dengan contoh nyata
3. Menggunakan API publik, jadi bisa langsung dijalankan
4. Memiliki loading dan error state yang jelas
5. Menjelaskan lazy loading secara praktis
6. Menunjukkan arsitektur React modern dengan query management

---

## 13. Alur Program Secara Umum

Berikut alur kerja aplikasi dari awal sampai akhir:

1. User membuka aplikasi
2. `main.jsx` membuat root React dan memuat `ServerApp`
3. `ServerApp` menampilkan halaman dengan dua tab
4. Saat user klik tab `Data Produk`, komponen `Products` dimuat secara lazy
5. `Products` memanggil `useQuery` untuk mengambil data API
6. React Query mengecek cache terlebih dahulu
7. Jika belum ada cache, request dipanggil ke API
8. Saat request sedang berjalan, tampil loading
9. Jika berhasil, data ditampilkan ke list produk
10. Jika gagal, tampil pesan error

---

## 14. Output yang Diharapkan di Browser

User akan melihat halaman seperti berikut:

- Header utama: `Server State.`
- Penjelasan singkat tentang konsep caching dan fetching
- Tombol `Home Overview` dan `Data Produk (Lazy + Server State)`
- Saat tab produk dibuka, muncul pesan loading
- Setelah data selesai diambil, daftar 5 produk muncul

Halaman ini dirancang untuk menjelaskan fitur React Query secara visual dan mudah dicerna.

---

## 15. Percakapan Presentasi yang Bisa Dipakai

Berikut contoh kalimat singkat untuk presentasi:

> "Program ini menunjukkan bagaimana aplikasi React menangani server state. Data produk diambil dari API secara asinkron, lalu dikelola dengan React Query. Fitur utama yang ditonjolkan adalah caching, loading state, error state, dan lazy loading. Jadi, ini bukan hanya fetch data biasa, tetapi contoh penerapan pola modern dalam pengelolaan data dari backend."

> "Saat user membuka tab produk, komponen baru dimuat dengan lazy loading dan data diambil dari API. Jika data sudah pernah diambil sebelumnya, React Query dapat menggunakan cache sehingga tidak perlu request ulang. Ini membuat aplikasi lebih cepat dan efisien."

---

## 16. Kesimpulan

Folder `src/server_state` adalah demo sederhana namun penting untuk memahami bagaimana aplikasi modern menangani data dari server. Program ini mencontohkan:

- fetch data dari API
- lazy loading komponen
- loading/error state management
- React Query untuk server state
- penggunaan cache agar data lebih efisien

Dengan kata lain, program ini adalah representasi praktis dari cara kerja aplikasi modern yang membutuhkan data dari backend dan perlu dikelola dengan proper state management.

---

## 17. Catatan Tambahan

Untuk demo presentasi, fokuskan poin berikut:

- `server state` berbeda dengan `client state`
- React Query membantu menyederhanakan fetching data
- caching akan mengurangi request yang tidak perlu
- UX lebih smooth karena loading dan error selalu terkelola
- lazy loading membuat aplikasi lebih ringan

Semoga dokumentasi ini membantu saat presentasi, baik untuk menjelaskan code maupun untuk menjawab pertanyaan audiens.
