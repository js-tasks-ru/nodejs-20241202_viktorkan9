import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task {
    return this.tasks.find(item => item.id === id)
  }

  createTask(task): Task {
    const { title, description, status } = task

    const newTask: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status,
    }

    this.tasks = [...this.tasks, newTask]

    return newTask
  }

  updateTask(id: string, update: Task): Task {
    const task = this.getTaskById(id)

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    const updatedTask = { ...task, ...update }

    this.tasks = this.tasks.map(item => item.id === id ? updatedTask : item)

    return updatedTask
  }

  deleteTask(id: string): Task {
    const task = this.getTaskById(id)

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`)
    }

    this.tasks = this.tasks.filter(item => item.id !== id)

    return task
  }
}
