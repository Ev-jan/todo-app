export interface ITask {
  id: string;
  text: string;
  completed: boolean;
}

export type TTodoFilters = "all" | "active" | "completed";
