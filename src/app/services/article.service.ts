import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly API_URL = 'https://localhost:7063/api';
  constructor(private http: HttpClient) {}
  addArticle(
    title: string,
    description: string,
    content: string,
    banner: string
  ): Observable<any> {
    return this.http.post(`${this.API_URL}/articles`, {
      title,
      description,
      content,
      banner,
    });
  }
}
