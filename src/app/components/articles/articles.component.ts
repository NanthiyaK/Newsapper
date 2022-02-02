import { Component, OnInit, NgZone } from '@angular/core';
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

  page: any;

  Articles:any = [];

  TotalArticles:any = [];

  ButtonPage:any = [];

  constructor(private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router) { 
      this.getId = this.activatedRoute.snapshot.paramMap.get('page'); 
      this.articleService.GetArticles(this.getId).subscribe(res => {
      this.Articles = res;
    })
  }

  

  ngOnInit(): void {
    this.articleService.GetSumArticles().subscribe(res => {
      this.TotalArticles = res;
      this.TotalArticles = Math.ceil(this.TotalArticles.total / 6);
      console.log(this.TotalArticles);
      for (let index = 0; index < this.TotalArticles; index++) {
        this.ButtonPage.push(index);
      }
      console.log(this.ButtonPage);
    })
  }

  getArticlesForPage(page: any) {
    this.articleService.GetArticles(page).subscribe((res) => {
      this.ngZone.run(() => this.router.navigateByUrl('/articles/'+page));
      this.Articles = res;
    });
  }

  

}
