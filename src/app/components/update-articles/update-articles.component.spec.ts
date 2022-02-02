import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArticlesComponent } from './update-articles.component';

describe('UpdateArticlesComponent', () => {
  let component: UpdateArticlesComponent;
  let fixture: ComponentFixture<UpdateArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
