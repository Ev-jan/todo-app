import React, { createContext, useReducer, useContext } from 'react';
import type { ITask } from '@/types';
import { nanoid } from 'nanoid'

type State = {
	tasks: ITask[];
	activeTab: 'all' | 'active' | 'completed';
};

type Action =
	| { type: 'ADD_TASK'; payload: string }
	| { type: 'TOGGLE_TASK'; payload: string }
	| { type: 'CLEAR_COMPLETED' }
	| { type: 'SET_TAB'; payload: 'all' | 'active' | 'completed' };

const initialState: State = {
	tasks: [],
	activeTab: 'all',
};

function tasksReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'ADD_TASK': {
			if (!action.payload.trim()) {
				return state;
			}
			const newTask: ITask = {
				id: nanoid(),
				text: action.payload,
				completed: false,

			};
			return {
				...state,
				tasks: [newTask, ...state.tasks],
			};
		}

		case 'TOGGLE_TASK': {
			const updatedTasks = state.tasks.map(task =>
				task.id === action.payload
					? { ...task, completed: !task.completed }
					: task
			);
			return { ...state, tasks: updatedTasks };
		}

		case 'CLEAR_COMPLETED': {
			const filtered = state.tasks.filter(task => !task.completed);
			return { ...state, tasks: filtered };
		}

		case 'SET_TAB':
			return { ...state, activeTab: action.payload };

		default:
			return state;
	}
}

const TasksContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => undefined,
});

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(tasksReducer, initialState);

	return (
		<TasksContext.Provider value={{ state, dispatch }}>
			{children}
		</TasksContext.Provider>
	);
};

export const useTasksContext = () => {
	return useContext(TasksContext);
};
