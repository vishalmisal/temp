import { TestBed, async, inject } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('DataService', () => {

  let httpClient: HttpClient;
  let taskService: TaskService;
  let httpMock: HttpTestingController;


  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      TaskService
    ],
  }));

  it('should be created', async(inject([HttpTestingController, TaskService],
    (httpClient: HttpTestingController, taskService: TaskService) => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();

    const items = {"-M7HhcWczVkEzvI54Z0Q":
    {"description":"Task3","id":3,"priority":"Medium","status":"A"},
    "Task1":
    {"description":"Task1","id":1,"priority":"Low","status":"A"},
    "Task2":
    {"description":"Task2","id":2,"priority":"Medium","shortDescription":"Task2","status":"Not Started"}};

    taskService.getTasks()
    .subscribe((tasks: any) => {
      //expect(tasks.length).toBe(1);
    });

  let req = httpClient.expectOne('https://tasksmanager-302f5.firebaseio.com/Task.json');
  expect(req.request.method).toBe("GET");

  req.flush(items);
  httpClient.verify();
  })));
});
