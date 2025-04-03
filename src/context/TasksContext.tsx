import { Action, initialState, State, tasksReducer } from '@/reducer/tasksReducer';
import React, { createContext, useReducer, useContext } from 'react';



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
