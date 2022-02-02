import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from './services/article.service';
import { EditArticlesComponent } from './components/edit-articles/edit-articles.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    EditArticlesComponent,
    AddArticleComponent,
    ArticleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
