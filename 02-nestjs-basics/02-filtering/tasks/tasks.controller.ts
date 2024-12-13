import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.model";
import { PaginationAndFiltrationQueryDto } from "./dto/PaginationAndFiltrationQuery.dto";
import { DefaultPagination } from "../constants";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getTasks(@Query() query: PaginationAndFiltrationQueryDto) {
    const { status, page = DefaultPagination.Page, limit = DefaultPagination.Limit } = query;

    return this.tasksService.getFilteredTasks(status, page, limit);
  }
}
