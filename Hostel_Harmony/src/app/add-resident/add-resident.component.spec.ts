import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResidentComponent } from './add-resident.component';

describe('AddResidentComponent', () => {
  let component: AddResidentComponent;
  let fixture: ComponentFixture<AddResidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
