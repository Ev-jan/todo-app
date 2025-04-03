import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BtnClear } from './BtnClear'

const mockDispatch = vi.fn()

vi.mock('@/context/TasksContext', () => ({
	useTasksContext: () => ({
		dispatch: mockDispatch,
		state: {
			tasks: [{ id: 'task-id-1', text: 'task 1', completed: true }],
			activeTab: 'completed'
		}
	})
}))

describe('CLEAR COMPLETED Button', () => {
	beforeEach(() => {
		mockDispatch.mockClear()
	})

	it('dispatches CLEAR_COMPLETED action when clicked', () => {
		render(<BtnClear />)

		const button = screen.getByText('Clear completed')
		expect(button).toBeInTheDocument()

		fireEvent.click(button)

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'CLEAR_COMPLETED'
		})
	})
})
