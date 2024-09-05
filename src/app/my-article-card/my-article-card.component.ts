import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../models/Article';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-article-card',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule],
  templateUrl: './my-article-card.component.html',
  styleUrl: './my-article-card.component.scss',
})
export class MyArticleCardComponent {
  faTrashCan = faTrashCan;
  faEdit = faEdit;
  @Input() article!: Article;
  @Output() changed = new EventEmitter();
  constructor(private articleService: ArticleService, private router: Router) {}
  deleteArticle(id: number) {
    this.articleService.deleteArticle(id).subscribe({
      next: (response) => {
        console.log('Article deleted successfully', response);
        this.changed.emit();
      },
      error: (error) => {
        console.error('Error deleting Article', error);
      },
    });
  }
  redirectToArticle(id: number) {
    this.router.navigate([`/article/${id}`]);
  }
}
