import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class PostService {
  apiUrl: string = `${environment.apiUrl}/posts`;

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  getPosts(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  createPost(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, data);
  }

  getPost(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }

  updatePost(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }

  removePost(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
