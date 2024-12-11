import React from 'react';
import { Task } from '../types';
import { motion } from 'framer-motion';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  editTask: (id: number, newText: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, editTask, toggleTask, deleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <motion.li
          key={task.id}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }} // Optionally add duration for a smoother animation
        >
          <TaskItem
            task={task}
            editTask={editTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </motion.li>
      ))}
    </ul>
  );
};

export default TaskList;
