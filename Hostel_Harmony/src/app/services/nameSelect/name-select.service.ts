import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { staff } from '../../models/staff.model';
import { resident } from '../../models/resident.model';

@Injectable()
export class NameSelectService {
  private ms= new BehaviorSubject<resident|staff>(null);
  private ren= new BehaviorSubject<resident>(null);
  cm=this.ms.asObservable();
  feval=this.ren.asObservable();
  constructor() { }
  changeMessage(user: resident|staff){
    this.ms.next(user);
  }
  exportUser(user: resident){
    this.ren.next(user);
  }

}
