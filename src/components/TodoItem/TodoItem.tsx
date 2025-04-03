import React from 'react';
import { Circle, CircleCheckBig } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTasksContext } from '@/context/TasksContext';
import { BtnDelete } from '../BtnDelete/BtnDelete';

interface Props {
	id: string;
	text: string;
	completed: boolean;
}

export const TodoItem: React.FC<Props> = ({ id, text, completed }) => {
	const { dispatch } = useTasksContext();

	const handleToggle = () => {
		dispatch({ type: 'TOGGLE_TASK', payload: id });
	};

	const handleDelete = () => {
		dispatch({ type: 'DELETE_TASK', payload: id })
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			handleToggle()
		}

		if (e.key === 'Delete') {
			e.preventDefault()
			handleDelete()
		}
	}

	return (
		<motion.li
			layout
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.8 }}
			transition={{
				type: "spring",
				stiffness: 500,
				damping: 30
			}}
			className="flex items-center item-box cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
			onClick={handleToggle}
			aria-checked={completed}
			role="checkbox"
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<span className="flex-shrink-0 mr-2">
				{completed ? (
					<CircleCheckBig strokeWidth={1} className="size-8 text-done" />
				) : (
					<Circle strokeWidth={1} className="size-8 text-gray-300" />
				)}
			</span>
			<span className={clsx("flex-grow text-wrap line-break whitespace-pre-line break-all", completed ? "line-through text-gray-500" : "")}>
				{text}
			</span>
			<BtnDelete onClick={handleDelete} />
		</motion.li>
	);
};