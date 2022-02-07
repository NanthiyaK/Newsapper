import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export class Article {
  id!: String;
  group!: String;
  title!: String;
  shortContent!: String;
  detail!: String;
  status!: Number;
  userCreate!: String;
  timeCreate!: String;
  userUpdate!: String;
  timeUpdate!: String;
  page!: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private httpClient: HttpClient) { }

  

  // C# API
  REST_API: string = 'https://localhost:7142/api/'

  // Get all obj
  GetArticles(page: any) {
    return this.httpClient.get(this.REST_API+"shortlist/"+page);
  };

  GetArticlesDetails(id: any) {
    return this.httpClient.get(this.REST_API+"detail/"+id);
  };

  // Get totalDb
  GetSumArticles() {
    return this.httpClient.get(this.REST_API+"totallist");
  }

  // Add new article
  AddNewArticle(data: any): Observable<any> {
    let API_URL = this.REST_API+"addcontent";
    return this.httpClient.post(API_URL, data).pipe(
      catchError(this.handleError)
    )
  }

  // Update
  updateArticle(id: any, data: any): Observable<any> {
    console.log(data);
    let API_URL = this.REST_API+"update/"+id;
    return this.httpClient.patch(API_URL, data, { headers: this.httpHeaders })
    .pipe(
      catchError(this.handleError)
    )
  }

  // Delete
  deleteArticle(id: any): Observable<any> {
    let API_URL = this.REST_API+"delete/"+id;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders})
    .pipe (
      catchError(this.handleError)
    )
  };

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent){
      //handle client error
      errorMessage = error.error.message;
    }else{
      // handle server
      errorMessage = "Error Code: ${"+error.status+"}\nMessage: ${"+error.message+"}";
    }
    console.log(errorMessage);
    return errorMessage;
  };

  // Get All for Pagination
  getAllArticles(params: any): Observable<any> {
    return this.httpClient.get<any>(this.REST_API, { params });
  }

}
