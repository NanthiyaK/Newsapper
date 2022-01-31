import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.css']
})

export class EditArticlesComponent implements OnInit {

  searchText: any;
  page: any;
  getId: any;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) { 
    this.getId = this.activatedRoute.snapshot.paramMap.get('page'); 
      this.articleService.GetArticles(this.getId).subscribe(res => {
      console.log(res);
      this.Articles = res;
  })
}

  Articles:any = [];

  ngOnInit(): void {
    // this.articleService.GetArticles(this.page).subscribe(res => {
    //   console.log(res);
    //   this.Articles = res;
    // })
  }

  delete(id:any, i:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your data has been deleted.',
          'success'
        )
        this.articleService.deleteArticle(id).subscribe(() => {
          this.Articles.splice(i, 1);
        });
      }
    })
  }

}
