import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AddArticleComponent } from './add-article/add-article.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'update', component: UpdateAccountComponent },
  { path: 'update-password', component: UpdatePasswordComponent },
  { path: 'new', component: AddArticleComponent },
];
