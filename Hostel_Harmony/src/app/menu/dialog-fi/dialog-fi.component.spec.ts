import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFiComponent } from './dialog-fi.component';

describe('DialogFiComponent', () => {
  let component: DialogFiComponent;
  let fixture: ComponentFixture<DialogFiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
