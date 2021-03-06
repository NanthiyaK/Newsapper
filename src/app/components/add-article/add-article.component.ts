import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-article',
  templateUrl: 'add-article.component.html',
  styleUrls: ['add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  articleForm: FormGroup;

  constructor(
    private _location: Location, 
    private articleService: ArticleService,
    public formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router) { 
      this.articleForm = this.formBuilder.group({

        contenT_ID: ["string"],
        grouP_CONTENT: [""],
        titlE_CONTENT: [""],
        shorT_CONTENT: [""],
        detaiL_CONTENT: [""],
        statuS_CONTENT: ["1"],
        useR_CREATE: sessionStorage.getItem('user'),
        timE_CREATE: ["string"],
        useR_UPDATE: sessionStorage.getItem('user'),
        timE_UPDATE: ["string"]
      })
    }

  ngOnInit(): void {
    
  }

  backClicked() {
    this._location.back();
  }

  onSubmit(): any {
    this.articleService.AddNewArticle(this.articleForm.value)
    .subscribe((err) => {
      console.log(this.articleForm.value)
      if (err != "Error"){
        var texts = "This article has been added successfully!";
        console.log("Data added successfully");
        this.ngZone.run(() => this.router.navigateByUrl('edit-articles/1'))
        Swal.fire({
          icon: 'success',
          title: 'Successfully',
          text: texts,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Aricle has been added!',
        })
      }
    }, (err) => {
      console.log(err);
    })
  }

}
