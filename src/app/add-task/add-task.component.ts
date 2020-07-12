import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";  
import { TaskService } from '../services/task.service';
import { Router } from "@angular/router";  
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskformlabel: string = 'Add Task';  
  taskformbtn: string = 'Save';  
  constructor(private formBuilder: FormBuilder, private router: Router, private taskService: TaskService,
              private toastrService: ToastrService,) {  
  }  
 
  addForm: FormGroup;  
  btnvisibility: boolean = true;  
  ngOnInit() {  
  
    this.addForm = this.formBuilder.group({  
      id: [],  
      priority: ['', Validators.required],  
      description: ['', [Validators.required, Validators.maxLength(9)]],  
      status: ['', [Validators.required, Validators.maxLength(3)]]  
    });  
  
    let name = localStorage.getItem('editTaskName');  
    if (name != null) {  
      this.taskService.getTaskById(name).subscribe(data => {  
        this.addForm.patchValue(data);  
      })  
      this.btnvisibility = false;  
      this.taskformlabel = 'Update Task';  
      this.taskformbtn = 'Update';  
    }  
  }  
  onSubmit() {  
    this.taskService.createTask(this.addForm.value)  
      .subscribe(data => {  
        this.toastrService.success('Row has been added successfully!');
        this.router.navigate(['list-task']);  
      },  
      error => {  
        // alert(error);  
        this.toastrService.error('Error during create: ' + error);
      });  
  }  
  onUpdate() {  
    let name = localStorage.getItem('editTaskName');
    this.taskService.updateTask(name, this.addForm.value).subscribe(data => {  
      this.toastrService.success('Row has been updated successfully!');
      this.router.navigate(['list-task']);  
    },  
      error => {  
        // alert(error);  
        this.toastrService.error('Error during edit/ update: ' + error);
      });  
  }  
  onListTasks(){
    this.router.navigate(['list-task']);
  }
}  
