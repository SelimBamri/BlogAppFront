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

  getArticleById(id: number): Observable<Article> {
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

  getMyPageInfo(): Observable<number> {
    return this.http
      .get<any>(`${this.API_URL}/articles/info`)
      .pipe(map((response) => response.lastPage));
  }

  getMyArticles(page: number): Observable<Article[]> {
    return this.http.get<any>(`${this.API_URL}/articles?page=${page}`).pipe(
      map((r) =>
        r.results.map((art: any) => ({
          id: art.id,
          content: art.content,
          banner: art.banner,
          created: art.created,
          title: art.title,
          description: art.description,
        }))
      )
    );
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/articles/${id}`);
  }

  editArticle(
    id: number,
    banner: string,
    content: string,
    description: string,
    title: string
  ): Observable<any> {
    return this.http.put(`${this.API_URL}/articles/${id}`, {
      title,
      description,
      content,
      banner,
    });
  }
}
