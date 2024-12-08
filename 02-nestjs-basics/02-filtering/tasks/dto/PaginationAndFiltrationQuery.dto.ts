import { IsEnum, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { TaskStatus } from "../task.model";
import { Type } from "class-transformer";

export class PaginationAndFiltrationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsOptional()
  @IsString()
  @IsEnum(TaskStatus)
  status: TaskStatus

  @IsOptional()
  @IsString()
  sortBy: string;
}
