import { Action, initialState, State, tasksReducer } from '@/reducer/tasksReducer';
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const localStorageKey = 'todo-tasks'

const loadInitialState = (): State => {
	const saved = localStorage.getItem(localStorageKey)
	if (saved) {
		try {
			const parsed = JSON.parse(saved)
			return { tasks: parsed, activeTab: 'all' }
		} catch (err) {
			console.error('Failed to parse saved tasks:', err)
		}
	}
	return initialState
}

const TasksContext = createContext<{
	state: State;
	dispatch: React.Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => undefined,
});

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(tasksReducer, initialState, loadInitialState);

	useEffect(() => {
		localStorage.setItem(localStorageKey, JSON.stringify(state.tasks))
	}, [state.tasks])

	return (
		<TasksContext.Provider value={{ state, dispatch }}>
			{children}
		</TasksContext.Provider>
	);
};

export const useTasksContext = () => {
	return useContext(TasksContext);
};
