import { AnimatePresence, motion } from 'framer-motion';
import { TodoItem } from '@/components/TodoItem/TodoItem';
import { useTasksContext } from '@/context/TasksContext';

export const TodoList: React.FC = () => {
	const {
		state: { tasks, activeTab },
	} = useTasksContext();

	const filteredTasks = tasks.filter(task => {
		if (activeTab === 'all') return true;
		if (activeTab === 'active') return !task.completed;
		if (activeTab === 'completed') return task.completed;
		return true;
	});

	return (
		<motion.ul className="divide-y divide-gray-200 mb-4">
			<AnimatePresence>
				{filteredTasks.map(task => (
					<TodoItem
						key={task.id}
						{...task}
					/>
				))}
			</AnimatePresence>
		</motion.ul>
	);
}