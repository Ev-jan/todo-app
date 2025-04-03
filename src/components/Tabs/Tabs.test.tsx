import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs } from './Tabs'

const mockDispatch = vi.fn()

vi.mock('@/context/TasksContext', () => ({
	useTasksContext: () => ({
		dispatch: mockDispatch,
		state: { tasks: [], activeTab: 'all' }
	})
}))

describe('Tabs component', () => {

	it('dispatches SET_TAB with the value "all" when "All" tab is clicked', () => {
		render(<Tabs />)
		fireEvent.click(screen.getByText('all'))

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_TAB',
			payload: 'all'
		})
	})

	it('dispatches SET_TAB with the value "active" when "Active" tab is clicked', () => {
		render(<Tabs />)
		fireEvent.click(screen.getByText('active'))

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_TAB',
			payload: 'active'
		})
	})

	it('dispatches SET_TAB with "completed" when "Completed" is clicked', () => {
		render(<Tabs />)
		fireEvent.click(screen.getByText('completed'))

		expect(mockDispatch).toHaveBeenCalledWith({
			type: 'SET_TAB',
			payload: 'completed'
		})
	})

	it('applies correct styling to the active tab', () => {
		vi.mock('@/context/TasksContext', () => ({
			useTasksContext: () => ({
				dispatch: mockDispatch,
				state: { tasks: [], activeTab: 'active' }
			})
		}))

		render(<Tabs />)
		fireEvent.click(screen.getByText('active'))

		const activeTabElement = screen.getByText('active')
		expect(activeTabElement).toHaveClass('px-2 py-1 capitalize rounded border ')

		const allTabElement = screen.getByText('all')
		expect(allTabElement).not.toHaveClass('border-accent')
	})
})