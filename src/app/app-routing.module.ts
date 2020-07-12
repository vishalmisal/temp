import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { CommonModule } from '@angular/common';
import { ListTaskComponent } from './list-task/list-task.component';


const routes: Routes = [
    { path: '', component: ListTaskComponent, pathMatch: 'full' },  
    { path: 'list-task', component: ListTaskComponent },
    { path: 'add-task', component: AddTaskComponent }  
  ];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
