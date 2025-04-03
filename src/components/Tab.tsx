import clsx from "clsx";
import { useTasksContext } from '@/context/TasksContext';
import { TTodoFilters } from "@/types";



export const Tab: React.FC<{ text: TTodoFilters }> = ({ text }) => {

	const handleClick = () => {
		dispatch({ type: 'SET_TAB', payload: text })
	}
	const {
		state: { activeTab },
		dispatch,
	} = useTasksContext();
	return (
		<button
			className={clsx("px-2 py-1 capitalize rounded", activeTab === text && " border border-accent")}
			onClick={handleClick}
		>{text}
		</button>
	)
}