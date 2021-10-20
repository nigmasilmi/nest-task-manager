import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // si existen filtros o no se toma el camino correspondiente
    // los criterios de filtrado van a estar incluidos en el endpoint como query parameters
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTask(@Param('id') taskId): Task {
    return this.taskService.getTask(taskId);
  }
  @Delete('/:id')
  deleteTask(@Param('id') taskId) {
    this.taskService.deleteTask(taskId);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') taskId, @Body('statusChange') chgStatus): Task {
    return this.taskService.updateTaskStatus(taskId, chgStatus);
  }
}
