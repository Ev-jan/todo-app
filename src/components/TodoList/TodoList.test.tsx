import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useTasksContext } from '@/context/TasksContext';
import { TodoList } from './TodoList';

vi.mock('@/context/TasksContext', async () => {
	const actual = await vi.importActual<typeof import('@/context/TasksContext')>(
		'@/context/TasksContext'
	)
	return {
		...actual,
		useTasksContext: vi.fn()
	}
})

describe('TodoList', () => {
	it('renders list of all tasks', () => {
		vi.mocked(useTasksContext).mockReturnValue({
			state: {
				tasks: [
					{ id: '1', text: 'Task 1', completed: false },
					{ id: '2', text: 'Task 2', completed: true }
				],
				activeTab: 'all'
			},
			dispatch: vi.fn()
		});

		render(<TodoList />);

		expect(screen.getByText('Task 1')).toBeInTheDocument();
		expect(screen.getByText('Task 2')).toBeInTheDocument();
	});
	it('renders list of completed tasks', () => {
		vi.mocked(useTasksContext).mockReturnValue({
			state: {
				tasks: [
					{ id: '1', text: 'Task 1', completed: false },
					{ id: '2', text: 'Task 2', completed: true },
					{ id: '3', text: 'Task 3', completed: true },
				],
				activeTab: 'completed'
			},
			dispatch: vi.fn()
		});

		render(<TodoList />);

		expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
		expect(screen.getByText('Task 2')).toBeInTheDocument()
		expect(screen.getByText('Task 3')).toBeInTheDocument()
	});

	it('renders list of active tasks', () => {
		vi.mocked(useTasksContext).mockReturnValue({
			state: {
				tasks: [
					{ id: '1', text: 'Task 1', completed: false },
					{ id: '2', text: 'Task 2', completed: true },
					{ id: '3', text: 'Task 3', completed: false },
				],
				activeTab: 'active'
			},
			dispatch: vi.fn()
		})

		render(<TodoList />)

		expect(screen.getByText('Task 1')).toBeInTheDocument()
		expect(screen.getByText('Task 3')).toBeInTheDocument()
		expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
	})

	it('does not render todos when there are no tasks', () => {
		vi.mocked(useTasksContext).mockReturnValue({
			state: {
				tasks: [],
				activeTab: 'all'
			},
			dispatch: vi.fn()
		})

		render(<TodoList />)

		expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
		expect(screen.queryByText(/task/i)).not.toBeInTheDocument()
	})

	it("does not render any todos when active tab is completed but all tasks are active", () => {
		vi.mocked(useTasksContext).mockReturnValue({
			state: {
				tasks: [
					{ id: '1', text: 'Task 1', completed: false },
					{ id: '2', text: 'Task 2', completed: false }
				],
				activeTab: "completed"
			},
			dispatch: vi.fn()
		})

		render(<TodoList />)

		expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
		expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
	})
});