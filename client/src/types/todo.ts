interface Task {
  id: number;
  userId: string;
  name: string;
  addedAt: Date;

  finished?: boolean;
  finishedAt?: Date;
}

export type { Task };
