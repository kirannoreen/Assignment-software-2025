import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  projectForm = { id: null, name: '', description: '' };
  isEditMode = false;
  private modalInstance: any; // Store modal reference

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  openAddProjectModal(): void {
    this.isEditMode = false;
    this.projectForm = { id: null, name: '', description: '' };
    this.showModal();
  }

  openEditProjectModal(project: any): void {
    this.isEditMode = true;
    this.projectForm = { ...project };
    this.showModal();
  }

  showModal(): void {
    const modalElement = document.getElementById('projectModal');
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

  saveProject(): void {
    if (this.isEditMode) {
      var projectId = this.projectForm.id;
      this.projectService.updateProject(projectId, this.projectForm).subscribe(() => this.loadProjects());
    } else {
      this.projectService.addProject(this.projectForm).subscribe(() => this.loadProjects());
    }
    this.closeModal();
  }

  deleteProject(projectId: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe(() => this.loadProjects());
    }
  }
}
