import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  getId: any;

  Articles:any = [];
  PaginationPage:any = [];

  constructor(private articleService: ArticleService,
    private activatedRoute: ActivatedRoute) { 
      this.getId = this.activatedRoute.snapshot.paramMap.get('page'); 
      this.articleService.GetArticles(this.getId).subscribe(res => {
      console.log(res);
      this.Articles = res;
    })
  }

  

  ngOnInit(): void {
    this.Articles.contenT_ID = parseInt(this.Articles.contenT_ID);
  }

  

}
