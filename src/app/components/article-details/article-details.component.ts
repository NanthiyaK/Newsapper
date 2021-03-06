import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { Location, SlicePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: 'article-details.component.html',
  styleUrls: ['article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  Articles:any = [];
  getId: any;

  constructor(private articleService: ArticleService, private _location: Location, private activatedRoute: ActivatedRoute) { 
    this.getId = this.activatedRoute.snapshot.paramMap.get('id'); 
      this.articleService.GetArticlesDetails(this.getId).subscribe(res => {
      console.log(res);
      this.Articles = res;
    })
  }

  ngOnInit(): void {
    
  }

  backClicked() {
    this._location.back();
  }

}
