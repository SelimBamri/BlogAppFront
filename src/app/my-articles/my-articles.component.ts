import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { ArticleComponent } from '../article/article.component';
import { MyArticleCardComponent } from '../my-article-card/my-article-card.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-my-articles',
  standalone: true,
  imports: [
    ArticleComponent,
    MyArticleCardComponent,
    NgIf,
    NgFor,
    AsyncPipe,
    MatPaginatorModule,
  ],
  templateUrl: './my-articles.component.html',
  styleUrl: './my-articles.component.scss',
})
export class MyArticlesComponent implements OnInit {
  articles$!: Observable<Article[]>;
  currentPage = 1;
  lastPage!: number;
  constructor(private articleService: ArticleService) {}
  loadArticles(page: number) {
    this.articleService.getMyPageInfo().subscribe({
      next: (lastPage) => {
        this.lastPage = lastPage;
        if (this.currentPage > lastPage) {
          this.currentPage = lastPage;
        }
        this.articles$ = this.articleService.getMyArticles(this.currentPage);
      },
      error: (error) => {
        console.error('Error fetching page info:', error);
      },
    });
  }
  ngOnInit(): void {
    this.articleService.getMyPageInfo().subscribe({
      next: (lastPage) => {
        this.lastPage = lastPage;
        this.articles$ = this.articleService.getMyArticles(1);
        console.log(lastPage);
      },
      error: (error) => {
        console.error('Error fetching page info:', error);
      },
    });
  }
  nextPage() {
    if (this.lastPage !== this.currentPage) {
      this.currentPage++;
      this.articles$ = this.articleService.getMyArticles(this.currentPage);
    }
  }
  previousPage() {
    if (1 !== this.currentPage) {
      this.currentPage--;
      this.articles$ = this.articleService.getMyArticles(this.currentPage);
    }
  }
}
