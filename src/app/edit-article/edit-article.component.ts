import { Component, OnInit } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [EditorComponent, FormsModule, MatSnackBarModule, NgIf, AsyncPipe],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent implements OnInit {
  article!: Article;
  url!: string | null;
  constructor(
    private snackBar: MatSnackBar,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}
  init: EditorComponent['init'] = {
    plugins: 'lists link code help wordcount',
  };
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.article.banner = this.url ? this.url : this.article.banner;
      };
    }
  }
  saveContent() {
    if (!this.article.title.trim()) {
      this.showSnackBar('Title cannot be empty');
      return;
    }

    if (!this.article.description.trim()) {
      this.showSnackBar('Description cannot be empty');
      return;
    }

    if (!this.article.banner.trim()) {
      this.showSnackBar('Banner image cannot be empty');
      return;
    }

    if (!this.article.content.trim()) {
      this.showSnackBar('Content cannot be empty');
      return;
    }
    this.articleService
      .editArticle(
        this.article.id,
        this.url ? this.url : this.article.banner,
        this.article.content,
        this.article.description,
        this.article.title
      )
      .subscribe({
        next: () => {
          this.showSnackBar('Post created successfully.');
        },
        error: (err) => {
          this.showSnackBar('There was an error, try later.');
        },
      });
  }
  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  ngOnInit(): void {
    const articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticleById(articleId).subscribe({
      next: (article: Article) => {
        this.article = article;
        this.article.banner = 'data:image/jpeg;base64,' + this.article.banner;
      },
      error: (err) => {
        this.showSnackBar('Error fetching article.');
      },
    });
  }
}
