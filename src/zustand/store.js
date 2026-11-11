import { create } from 'zustand';

export const useStore = create((set) => ({
  view: 'home',
  setView: (newView) => set({ view: newView }),

  todos: [
    { id: 1, text: 'Pelajari Code Splitting', completed: true },
    { id: 2, text: 'Kuasai Tailwind CSS v4', completed: true },
    { id: 3, text: 'Migrasi dari Redux ke Zustand', completed: false }
  ],
  
  addTodo: (text) => set((state) => ({ 
    todos: [...state.todos, { id: Date.now(), text, completed: false }] 
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }))
}));
