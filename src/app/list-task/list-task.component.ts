import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Task } from '../models/task.model';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent {
  title = 'task-manager';
  tasks: Task[];  
  
  constructor(private taskService: TaskService, private router: Router, private toastrService: ToastrService,) { }  
  
  ngOnInit() {  
   this.getTasks();
  }  

  getTasks(){
    this.taskService.getTasks()  
    .subscribe((data: Task[]) => {  
      this.tasks = data;  
    });  
  }

  deleteTask(name : string): void {  
    this.taskService.deleteTasks(name)   
      .subscribe(data => {  
        this.getTasks();
        this.toastrService.success('Row has been deleted successfully!');
      },
      error => {  
        // alert(error);  
        this.toastrService.error('Error during delete: ' + error);
      });  
  }  

  editTask(name: string): void {  
    localStorage.removeItem('editTaskName');  
    localStorage.setItem('editTaskName', name);  
    this.router.navigate(['add-task']);  
  }  

  addTask(): void {  
    localStorage.removeItem('editTaskName');
    this.router.navigate(['add-task']);
  }  
}
