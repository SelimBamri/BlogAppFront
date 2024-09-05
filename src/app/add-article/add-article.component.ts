import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCloudArrowUp,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [FontAwesomeModule, EditorComponent, FormsModule, MatSnackBarModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.scss',
})
export class AddArticleComponent {
  faCloudArrowUp = faCloudArrowUp;
  faCircleCheck = faCircleCheck;
  isPhoto: boolean = false;
  editorContent: string = '';
  title: string = '';
  banner: string = '';
  bannerFinal: string = '';
  description: string = '';
  constructor(
    private snackBar: MatSnackBar,
    private articleService: ArticleService
  ) {}
  init: EditorComponent['init'] = {
    plugins: 'lists link code help wordcount',
  };
  onSelectFile(event: any) {
    this.isPhoto = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.bannerFinal = event.target.result;
      };
    }
  }
  saveContent() {
    if (!this.title.trim()) {
      this.showSnackBar('Title cannot be empty');
      return;
    }

    if (!this.description.trim()) {
      this.showSnackBar('Description cannot be empty');
      return;
    }

    if (!this.banner.trim()) {
      this.showSnackBar('Banner image cannot be empty');
      return;
    }

    if (!this.editorContent.trim()) {
      this.showSnackBar('Content cannot be empty');
      return;
    }
    this.articleService
      .addArticle(
        this.title,
        this.description,
        this.editorContent,
        this.bannerFinal
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
}
