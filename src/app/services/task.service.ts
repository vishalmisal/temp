import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }  
  baseUrl: string = 'https://tasksmanager-302f5.firebaseio.com/Task';  
  
  getTasks() {  
    return this.http.get<any>(this.baseUrl + '.json');  
  }  
  deleteTasks(name: string) {  
    return this.http.delete<Task[]>(this.baseUrl + '/' + name + '.json');  
  }  
  createTask(task: Task) {  
    return this.http.post(this.baseUrl + '.json', task);  
  }  
  getTaskById(name: string) {  
    return this.http.get<Task>(this.baseUrl + '/' + name + '.json');  
  }  
  updateTask(name: string, task: Task) {  
    return this.http.put(this.baseUrl + '/' + name  + '.json', task);  
  }  
}
