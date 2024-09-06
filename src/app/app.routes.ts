import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ArticleComponent } from './article/article.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { authGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [() => authGuard],
  },
  {
    path: 'update',
    component: UpdateAccountComponent,
    canActivate: [() => authGuard],
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent,
    canActivate: [() => authGuard],
  },
  {
    path: 'new',
    component: AddArticleComponent,
    canActivate: [() => authGuard],
  },
  { path: 'article/:id', component: ArticleComponent },
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
    canActivate: [() => authGuard],
  },
  {
    path: 'my-articles',
    component: MyArticlesComponent,
    canActivate: [() => authGuard],
  },
];
