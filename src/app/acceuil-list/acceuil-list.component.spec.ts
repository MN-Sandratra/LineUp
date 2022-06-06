import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilListComponent } from './acceuil-list.component';

describe('AcceuilListComponent', () => {
  let component: AcceuilListComponent;
  let fixture: ComponentFixture<AcceuilListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceuilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
