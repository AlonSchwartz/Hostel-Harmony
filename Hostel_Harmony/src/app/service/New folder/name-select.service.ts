import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NameSelectService {
  private ms= new BehaviorSubject<string>("default message");
  cm=this.ms.asObservable();
  constructor() { }
  changeMessage(message: string){
    this.ms.next(message);
  }

}
