import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';

const mockDispatch = vi.fn()

vi.mock('@/context/TasksContext', () => ({
	useTasksContext: () => ({
		dispatch: mockDispatch,
		state: { tasks: [], activeTab: 'all' }
	})
}))

describe('TodoItem', () => {

	it('renders with active task', () => {
		render(
			<TodoItem id="task-1" text="Test task" completed={false} />
		);

		expect(screen.getByText('Test task')).toBeInTheDocument();
		expect(screen.getByRole('checkbox', { name: /Test task/i })).toHaveAttribute('aria-checked', 'false');
	});

	it('renders with completed task', () => {
		render(
			<TodoItem id="task-1" text="Test task" completed={true} />
		);

		expect(screen.getByText('Test task')).toHaveClass('line-through');
		expect(screen.getByRole('checkbox', { name: /Test task/i })).toHaveAttribute('aria-checked', 'true');
	});

	it('dispatches TOGGLE action when clicked', () => {
		render(
			<TodoItem id="task-1" text="Test task" completed={false} />
		);

		fireEvent.click(screen.getByText('Test task'));

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'TOGGLE_TASK',
			payload: 'task-1'
		});
	});
	it('dispatches DELETE action when clicked', () => {
		render(
			<TodoItem id="task-1" text="Test task" completed={false} />
		);

		fireEvent.click(screen.getByLabelText("Delete task"));

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'DELETE_TASK',
			payload: 'task-1'
		});
	});
});