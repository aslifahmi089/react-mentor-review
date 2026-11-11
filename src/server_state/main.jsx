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