import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { staff } from '../../models/staff.model';
import { resident } from '../../models/resident.model';

@Injectable()
export class NameSelectService {
  private ms= new BehaviorSubject<resident|staff>(null);
  cm=this.ms.asObservable();
  constructor() { }
  changeMessage(message: resident|staff){
    this.ms.next(message);
  }

}
