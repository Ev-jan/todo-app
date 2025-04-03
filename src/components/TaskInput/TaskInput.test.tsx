import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TaskInput } from './TaskInput'

const mockDispatch = vi.fn()


vi.mock('@/context/TasksContext', () => ({
	useTasksContext: () => ({
		dispatch: mockDispatch,
		state: { tasks: [], activeTab: 'all' }
	})
}))


describe("TaskInput", () => {

	it('renders input, no ADD button', () => {
		render(<TaskInput />)
		const input = screen.getByPlaceholderText(/what needs to be done/i)
		expect(input).toBeInTheDocument()
		expect(input).toHaveValue('')
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
	})

	it('shows ADD button when input is not empty', () => {
		render(<TaskInput />)
		const input = screen.getByPlaceholderText(/what needs to be done/i)

		fireEvent.change(input, { target: { value: 'test task' } })

		expect(input).toHaveValue('test task')
		expect(screen.getByRole('button')).toBeInTheDocument()
	})

	it('dispatches ADD_TASK and clears input on submit', () => {
		render(<TaskInput />)
		const input = screen.getByPlaceholderText(/what needs to be done/i)

		fireEvent.change(input, { target: { value: 'test task' } })
		fireEvent.submit(input.closest('form')!)

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'ADD_TASK',
			payload: 'test task'
		})

		expect(input).toHaveValue('')
	})

	it('does not dispatch anything if input is whitespaces', () => {
		render(<TaskInput />)
		const input = screen.getByPlaceholderText(/what needs to be done/i)

		fireEvent.change(input, { target: { value: '   ' } })
		fireEvent.submit(input.closest('form')!)

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'ADD_TASK',
			payload: '   '
		})

		expect(input).toHaveValue('')
	})
})