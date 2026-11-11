import React, { useState } from 'react';
import { useStore } from '../zustand/store';

export default function TodoApp() {
  const [inputValue, setInputValue] = useState('');
  
  const { todos, addTodo, toggleTodo, removeTodo } = useStore();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addTodo(inputValue);
    setInputValue('');
  };

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
      <h2 style={{ color: 'var(--accent)', marginBottom: '24px' }}>Zustand Todo List</h2>
      
      {/* Form Tambah Todo */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Apa yang ingin dikerjakan?"
          className="flex-1 px-4 py-2 rounded-lg outline-none"
          style={{ 
            border: '1px solid var(--border)', 
            background: 'var(--bg)',
            color: 'var(--text-h)'
          }}
        />
        <button 
          type="submit"
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Tambah
        </button>
      </form>

      {/* List Todos */}
      <ul className="flex flex-col gap-3 p-0 m-0 list-none">
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text)', marginTop: '20px' }}>Tidak ada tugas!</p>
        ) : (
          todos.map((todo) => (
            <li 
              key={todo.id} 
              className="flex items-center justify-between p-3 rounded-lg"
              style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                <div 
                  style={{
                    width: '24px', height: '24px', borderRadius: '4px',
                    border: `2px solid var(--accent)`,
                    background: todo.completed ? 'var(--accent)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
                  }}
                >
                  {todo.completed && '✓'}
                </div>
                <span style={{ 
                  color: 'var(--text-h)',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  opacity: todo.completed ? 0.6 : 1
                }}>
                  {todo.text}
                </span>
              </div>
              <button 
                onClick={() => removeTodo(todo.id)}
                style={{
                  background: 'transparent', border: 'none', color: '#ef4444', 
                  cursor: 'pointer', fontWeight: 'bold', fontSize: '18px'
                }}
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
