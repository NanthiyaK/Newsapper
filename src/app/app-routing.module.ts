import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { EditArticlesComponent } from './components/edit-articles/edit-articles.component';
import { AddArticleComponent } from './components/add-article copy/add-article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { UpdateArticlesComponent } from './components/update-articles/update-articles.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles/1', pathMatch: 'full' },
  { path: 'articles/:page', component: ArticlesComponent },
  { path: 'edit-articles/:page', component: EditArticlesComponent },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent},
  { path: 'update-articles/:id', component: UpdateArticlesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
