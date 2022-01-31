import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-article',
  templateUrl: 'add-article.component.html',
  styleUrls: ['add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  backClicked() {
    this._location.back();
  }

}
