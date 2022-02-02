import { Component, OnInit, NgZone} from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-update-articles',
  templateUrl: './update-articles.component.html',
  styleUrls: ['./update-articles.component.css']
})
export class UpdateArticlesComponent implements OnInit {

  updateForm: FormGroup;
  getId: any;
  Articles: any = [];

  constructor(private articleService: ArticleService, 
    private activatedRoute: ActivatedRoute, 
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    ) { 
    this.getId = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.getId = parseInt(this.getId);
      this.articleService.GetArticlesDetails(this.getId).subscribe(res => {
      this.Articles = res;
      this.updateForm.setValue({
      contenT_ID: this.Articles.data[0].contenT_ID,
      grouP_CONTENT: this.Articles.data[0].grouP_CONTENT,
      titlE_CONTENT: this.Articles.data[0].titlE_CONTENT,
      shorT_CONTENT: this.Articles.data[0].shorT_CONTENT,
      detaiL_CONTENT: this.Articles.data[0].detaiL_CONTENT,
      statuS_CONTENT: this.Articles.data[0].statuS_CONTENT,
      useR_CREATE: this.Articles.data[0].useR_CREATE,
      timE_CREATE: this.Articles.data[0].timE_CREATE,
      useR_UPDATE: sessionStorage.getItem('user'),
      timE_UPDATE: this.Articles.data[0].timE_UPDATE
      })
      // if (this.Articles.data[0].statuS_CONTENT == 1) {
      //   this.updateForm.setValue({
      //     status: "Open"
      //   })
      // }else{
      //   this.updateForm.setValue({
      //     status: "Closed"
      //   })
      // }
    });

    this.updateForm = this.formBuilder.group({
      contenT_ID: null,
      grouP_CONTENT: null,
      titlE_CONTENT: null,
      shorT_CONTENT: null,
      detaiL_CONTENT: null,
      statuS_CONTENT: null,
      useR_CREATE: null,
      timE_CREATE: null,
      useR_UPDATE: null,
      timE_UPDATE: null
    });
    
  }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.articleService.updateArticle(this.getId, this.updateForm.value).subscribe(() => {
      console.log('Data updated successfully');
      this.ngZone.run(() => this.router.navigateByUrl('/edit-articles/1'));
      Swal.fire({
      icon: 'success',
      title: 'Successfully',
      text: "This article has been update!"
    });
    }, (err) => {
      console.log(err);
    }
    )
  }
  
}
