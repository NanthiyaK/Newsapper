import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  getId: any;

  page: any;

  Articles:any = [];
  
  PaginationPage:any = [];

  TotalArticles:any = [];

  ButtonPage:any = [];

  //
  articles: Article[] = [];
  
  currentIndex = -1;
  currPage = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

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

  //
  getRequestParams(currPage: number, pageSize: number): any {
    let params: any = {};

    if (currPage) {
      params[`currPage`] = currPage - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  
  retrieveActicles(): void {
    const params = this.getRequestParams(this.currPage, this.pageSize);
    this.articleService.getAllArticles(params)
    .subscribe(
      response => {
        const { articles, totalItems } = response;
        this.articles = articles;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  handlePageChange(event: number): void {
    this.currPage = event;
    this.retrieveActicles();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.currPage = 1;
    this.retrieveActicles();
  }

}
