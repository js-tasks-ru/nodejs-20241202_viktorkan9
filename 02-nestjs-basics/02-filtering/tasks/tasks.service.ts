import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  private filterByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  private _sortBy(tasks: Task[], field: keyof Task, order: 'asc' | 'desc' = 'asc'): Task[] {
    return tasks.sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;

      return 0;
    });
  }

  private _paginate(tasks: Task[], page: number, limit: number): Task[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return tasks.slice(startIndex, endIndex);
  }

  getFilteredTasks(
    status?: TaskStatus,
    page: number = 1,
    limit: number = 10,
    sortBy?: keyof Task,
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Task[] {
    let filteredTasks = [...this.tasks];

    if (status) {
      filteredTasks = this.filterByStatus(status);
    }

    if (sortBy) {
      filteredTasks = this._sortBy(filteredTasks, sortBy, sortOrder);
    }

    return this._paginate(filteredTasks, page, limit);
  }
}
