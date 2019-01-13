export interface TaskDefinition {
  description: string,
  quota: number,
  range: string, // "yearly" | "monthly" | "weekly" | "daily"
}

export interface Task {
  id: string;
  definition: TaskDefinition;
  count: number;
}