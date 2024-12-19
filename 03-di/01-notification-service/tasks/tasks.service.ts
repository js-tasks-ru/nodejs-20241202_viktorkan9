import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationService } from "../providers/NotificationService";
import { UsersService } from "../users/users.service";

const NEW_TASK_LABEL = 'Новая задача';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly notificationService: NotificationService,
  ) {}

  private _getEmailMessage(task: Task) {
    return {subject: 'Новая задача', message: `Вы назначены ответственным за задачу: "${task.title}"`};
  }

  private _getSMSMessage(task: Task, status: string) {
    return `Статус задачи "${task.title}" обновлён на "${status}"`;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;

    const user = this.usersService.getUserById(assignedTo);

    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };

    this.tasks.push(task);

    const { subject, message } = this._getEmailMessage(task);

    this.notificationService.sendEmail(user.email, subject, message);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    const user = this.usersService.getUserById(task.assignedTo);

    Object.assign(task, updateTaskDto);


    this.notificationService.sendSMS(user.phone, this._getSMSMessage(task, updateTaskDto.status));

    return task;
  }
}
