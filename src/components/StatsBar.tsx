import { useTasksContext } from '@/context/TasksContext';
import { Tabs } from './Tabs/Tabs';
import { BtnClear } from './BtnClear/BtnClear';

export const StatsBar: React.FC = () => {
	const {
		state: { tasks },
	} = useTasksContext();

	const remainingCount = tasks.filter(task => !task.completed).length;

	return (
		<div className="flex flex-col md:flex-row lg:flex-row justify-between items-center text-sm text-text-secondary item-box py-4 border-t border-gray-200">
			<span>{remainingCount} items left</span>
			<Tabs />
			<BtnClear />
		</div>
	);
};