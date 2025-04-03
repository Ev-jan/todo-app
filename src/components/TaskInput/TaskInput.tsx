import { useTasksContext } from "@/context/TasksContext";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BtnAdd } from "../BtnAdd/BtnAdd";

export const TaskInput: React.FC = () => {
	const [taskValue, setTaskValue] = useState('');
	const {
		dispatch,
	} = useTasksContext();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTaskValue(event.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (taskValue.trim() === "") {
			setTaskValue('')
		}

		dispatch({ type: 'ADD_TASK', payload: taskValue });
		setTaskValue('')
	}

	return (
		<form onSubmit={handleSubmit} className="item-box border-b border-b-gray-200">
			<ChevronDown strokeWidth={1} className={clsx("size-8 mr-2 text-gray-300 shrink-0")} />
			<input
				id="todoInput"
				className="
				w-full
				border-0
				outline-none placeholder:italic placeholder-gray-300 
				placeholder:font-normal"
				placeholder="What needs to be done?"
				type="text"
				value={taskValue}
				onChange={handleChange}
			/>

			{taskValue && <BtnAdd />}
		</form>
	)
}