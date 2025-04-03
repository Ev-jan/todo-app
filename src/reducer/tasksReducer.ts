import type { ITask, TTodoFilters } from '@/types';
import { nanoid } from 'nanoid'

export type State = {
	tasks: ITask[];
	activeTab: TTodoFilters
};

export type Action =
	| { type: 'ADD_TASK'; payload: string }
	| { type: 'DELETE_TASK'; payload: string }
	| { type: 'TOGGLE_TASK'; payload: string }
	| { type: 'CLEAR_COMPLETED' }
	| { type: 'SET_TAB'; payload: 'all' | 'active' | 'completed' };

export const initialState: State = {
	tasks: [],
	activeTab: 'all',
};

export function tasksReducer(state: State, action: Action): State {
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

		case 'DELETE_TASK': {
			const filteredTasks = state.tasks.filter(task => task.id !== action.payload);
			return { ...state, tasks: filteredTasks };
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