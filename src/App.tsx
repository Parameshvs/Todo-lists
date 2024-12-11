
import React, { useState, useEffect } from 'react';
import { Task } from './types';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';



const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id: number, newText: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <div>
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        editTask={editTask} 
        toggleTask={toggleTask} 
        deleteTask={deleteTask} 
      />
      </div>
    </div>
  );
};

export default App;
