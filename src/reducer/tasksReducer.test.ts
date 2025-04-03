import { describe, it, expect, vi } from "vitest";
import { tasksReducer } from "./tasksReducer";
import type { Action, State } from "./tasksReducer";

vi.mock("nanoid", () => ({
  nanoid: () => "mocked-id-123",
}));

describe("tasksReducer", () => {
  it("adds a task", () => {
    const action: Action = { type: "ADD_TASK", payload: "New Task" };
    const result = tasksReducer({ tasks: [], activeTab: "all" }, action);

    expect(result.tasks.length).toBe(1);
    expect(result.tasks[0].text).toBe("New Task");
    expect(result.tasks[0].completed).toBe(false);
  });

  it("does not add an empty string task", () => {
    const action: Action = { type: "ADD_TASK", payload: "   " };
    const result = tasksReducer({ tasks: [], activeTab: "all" }, action);

    expect(result.tasks.length).toBe(0);
  });

  it("toggles a task", () => {
    const action: Action = { type: "TOGGLE_TASK", payload: "123" };
    const result = tasksReducer(
      {
        tasks: [{ id: "123", text: "Do it", completed: false }],
        activeTab: "all",
      },
      action
    );

    expect(result.tasks[0].completed).toBe(true);
  });

  it("deletes a tasks by id", () => {
    const initialState: State = {
      tasks: [
        { id: "mocked-id-123", text: "Delete this task", completed: false },
        { id: "another-id-222", text: "Keep this task", completed: false },
      ],
      activeTab: "all",
    };

    const action: Action = { type: "DELETE_TASK", payload: "mocked-id-123" };
    const result = tasksReducer(initialState, action);

    expect(result.tasks.length).toBe(1);
    expect(result.tasks[0].id).toBe("another-id-222");
    expect(result.tasks[0].text).toBe("Keep this task");
  });

  it("clears all completed tasks", () => {
    const initialState: State = {
      tasks: [
        { id: "mocked-id-123", text: "Completed task 1", completed: true },
        { id: "another-id-221", text: "Active task", completed: false },
        { id: "mocked-id-125", text: "Completed task 2", completed: true },
      ],
      activeTab: "all",
    };
    const action: Action = { type: "CLEAR_COMPLETED" };
    const result = tasksReducer(initialState, action);

    expect(result.tasks.length).toBe(1);
    expect(result.tasks[0].text).toBe("Active task");
    expect(result.tasks[0].completed).toBe(false);
  });
});
