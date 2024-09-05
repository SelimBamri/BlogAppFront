import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { ArticleService } from '../services/article.service';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [NgIf, AsyncPipe, DatePipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  article$!: Observable<Article>;
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}
  ngOnInit(): void {
    this.article$ = this.articleService.getServiceById(
      Number(this.route.snapshot.paramMap.get('id'))
    );
  }
}
