import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { UsersModule } from "../users/users.module";
import { NotificationService } from "../providers/NotificationService";
import { LoggerService } from "../providers/LoggerService";

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [TasksService, NotificationService, LoggerService],
})

export class TasksModule {}
