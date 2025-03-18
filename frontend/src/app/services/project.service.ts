import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects/`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }

  addProject(project: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.post<any>(this.apiUrl, project, { headers });
  }

  updateProject(id: number, project: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.put<any>(`${this.apiUrl}${id}/`, project, { headers });
  }

  deleteProject(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers });
  }
}
