import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from '../models/Article';

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

  getServiceById(id: number): Observable<Article> {
    return this.http.get<any>(`${this.API_URL}/articles/${id}`).pipe(
      map((art: any) => ({
        id: art.id,
        content: art.content,
        banner: art.banner,
        created: art.created,
        title: art.title,
        description: art.description,
      }))
    );
  }
}
