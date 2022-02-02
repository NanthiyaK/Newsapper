import { Component, OnInit, NgZone} from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.css'],
})


export class EditArticlesComponent implements OnInit {

  searchText: any;
  page: any;
  getId: any;
  

  constructor(private articleService: ArticleService, 
    private activatedRoute: ActivatedRoute, 
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    ) { 
    this.getId = this.activatedRoute.snapshot.paramMap.get('page'); 
      this.articleService.GetArticles(this.getId).subscribe(res => {
      console.log(res);
      this.Articles = res;
      //
  })

}

  Articles:any = [];

  ngOnInit(): void {
    // this.articleService.GetArticles(this.page).subscribe(res => {
    //   console.log(res);
    //   this.Articles = res;
    // })
    var pass = "123456";
    var isLoggingIn = sessionStorage.getItem("login");
    if (!isLoggingIn) {
      Swal.fire({
        title: 'Enter password',
        input: 'password',
        customClass: {
          validationMessage: 'my-validation-message'
        },
        preConfirm: (value) => {
          if (value == pass) {
            sessionStorage.setItem("login","asd");
            Swal.fire({
              title: 'Enter name',
              input: 'text',
              customClass: {
                validationMessage: 'my-validation-message'
              },
              preConfirm: (value) => {
                if (value) {
                  sessionStorage.setItem("user",value);
                  window.location.href = "http://localhost:4200/edit-articles/1";
                }
              }
            });
          }
        }
      });
    }
    console.log(isLoggingIn,sessionStorage.getItem("user"));
    
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
          this.Articles.data.splice(i, 1);
        });
      }
    })
  }

  
}
