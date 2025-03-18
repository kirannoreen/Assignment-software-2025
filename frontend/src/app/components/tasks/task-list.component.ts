import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Modal } from 'bootstrap';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  projects: any[] = [];
  taskForm = { id: null, title: '', description: '', duedate: '', priority: 'Low', status: 'Pending', project: null };
  isEditMode = false;
  private modalInstance: any;

  constructor(private authService: AuthService, private taskService: TaskService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  openAddTaskModal(): void {
    this.isEditMode = false;
    this.taskForm = { id: null, title: '', description: '', duedate: '', priority: 'Low', status: 'Pending', project: null };
    this.showModal();
  }

  openEditTaskModal(task: any): void {
    this.isEditMode = true;
    this.taskForm = { ...task };
    this.showModal();
  }

  showModal(): void {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
      this.modalInstance.show();
    }
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  saveTask(): void {
    this.taskForm.duedate = new Date(this.taskForm.duedate).toISOString().split('T')[0];
    
    if (this.isEditMode) {
      var taskId = this.taskForm.id;
      this.taskService.updateTask(taskId, this.taskForm).subscribe(() => this.loadTasks());
    } else {
      this.taskService.addTask(this.taskForm).subscribe(() => this.loadTasks());
    }
    this.closeModal();
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(() => this.loadTasks());
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
