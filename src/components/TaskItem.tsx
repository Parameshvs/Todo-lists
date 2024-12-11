import React, { useState } from 'react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  editTask: (id: number, newText: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, editTask, toggleTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newText, setNewText] = useState<string>(task.text);

  const handleEdit = () => {
    if (isEditing && newText.trim()) {
      editTask(task.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="task-input"
        />
      ) : (
        <span
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          className="task-text"
        >
          {task.text}
        </span>
      )}
      <div className="task-buttons">
        <button 
          onClick={() => toggleTask(task.id)}
          aria-label={task.completed ? 'Undo task' : 'Complete task'}
          className="complete-button"
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={handleEdit}
          aria-label={isEditing ? 'Save task' : 'Edit task'}
          className="edit-button"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          aria-label="Delete task"
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
