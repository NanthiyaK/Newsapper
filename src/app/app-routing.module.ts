import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { EditArticlesComponent } from './components/edit-articles/edit-articles.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'articles/:page', component: ArticlesComponent },
  { path: 'edit-articles/:page', component: EditArticlesComponent },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'article-details/:id', component: ArticleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
