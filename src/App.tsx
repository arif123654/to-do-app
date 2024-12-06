import React, { useState, useEffect } from 'react';
import {  CheckCircle, PlusCircle } from 'lucide-react';
import 'bulma/css/bulma.min.css';
import './App.css';


interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const App: React.FC = () => {
  
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState<string>('');

  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  
  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Toggle todo completion
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Remove todo
  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle input key press (allow adding todo with Enter)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="section">
      <div className="container is-max-desktop mt-6">
        <div className="box">
          <h1 className="title has-text-centered mb-5">Todo List</h1>
          
          {/* Input area */}
          <div className="field has-addons">
            <div className="control is-expanded">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Add a new todo"
                className="input is-primary"
              />
            </div>
            <div className="control">
              <button 
                onClick={addTodo}
                className="button is-primary"
              >
                <span className="icon">
                  <PlusCircle size={20} />
                </span>
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Todo List */}
          {todos.length === 0 ? (
            <p className="has-text-centered has-text-grey-light">No todos yet. Add a task!</p>
          ) : (
            <div className="panel">
              {todos.map(todo => (
                <div 
                  key={todo.id} 
                  className={`panel-block is-flex-wrap-nowrap ${todo.completed ? 'has-background-success-light' : ''}`}
                >
                  <button 
                    onClick={() => toggleTodo(todo.id)}
                    className="mr-3 is-flex is-align-items-center"
                  >
                    <CheckCircle 
                      size={24} 
                      color={todo.completed ? 'green' : 'gray'}
                      fill={todo.completed ? 'currentColor' : 'none'}
                    />
                  </button>
                  <span 
                    className={`${todo.completed ? 'has-text-grey-light is-italic' : ''}`}
                    style={{ flexGrow: 1 }}
                  >
                    {todo.text}
                  </span>
                  <button 
                    onClick={() => removeTodo(todo.id)}
                    className="delete has-text-danger"
                  ></button>
                </div>
              ))}
            </div>
          )}

          {/* Todo stats */}
          <div className="mt-4 has-text-centered has-text-grey">
            <p>
              Total Todos: {todos.length} | 
              Completed: {todos.filter(todo => todo.completed).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;