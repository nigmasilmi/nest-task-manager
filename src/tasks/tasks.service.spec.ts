import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';
import { TaskStatus } from '../tasks/task-status.enum';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  // es necesario crear un "ambiente" que simule el módulo real,
  // por lo que cada vez que se corra este test, debe estar preparado con esa "simulaciòn"
  // dado que los repositorios interactúan con la base de datos en en testing queremos aislar el comportamiento
  // hacemos uso de la técnica "mocking"
  const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
  });
  const mockUser = {
    id: 'someId',
    username: 'Jane Joe',
    password: 'secretpassword',
    tasks: [],
  };

  const mockTask = {
    id: 'someId',
    title: 'Some title',
    description: 'Some description',
    status: TaskStatus.DONE,
    user: 'someUserId',
  };

  let tasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('ejecuta TaskService.getTasks() y retorna el resultado', async () => {
      tasksRepository.getTasks.mockResolvedValue('some Value');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('some Value');
    });
  });

  describe('getTask', () => {
    it('calls taskRepository.getTask and returns the result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksRepository.findOne('someId', mockUser);
      expect(result).toEqual(mockTask);
    });
    it('calls taskRepository.getTask and  throws not found exception', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksRepository.findOne('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
