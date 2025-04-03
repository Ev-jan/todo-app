import { useTasksContext } from '@/context/TasksContext';

export const BtnClear: React.FC = () => {
	const {
		dispatch,
		state: { tasks }
	} = useTasksContext();

	const isDisabled = tasks.filter(task => task.completed).length === 0;

	return (
		<button
			disabled={isDisabled}
			className="disabled:no-underline disabled:text-neutral-300 hover:underline"
			onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>Clear completed
		</button>
	)
}