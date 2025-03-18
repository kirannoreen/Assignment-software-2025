import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks/`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.get<any>(this.apiUrl, { headers });
  }

  addTask(task: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.post<any>(this.apiUrl, task, { headers });
  }

  updateTask(id: number, task: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.put<any>(`${this.apiUrl}${id}/`, task, { headers });
  }

  deleteTask(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);

    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers });
  }
}
