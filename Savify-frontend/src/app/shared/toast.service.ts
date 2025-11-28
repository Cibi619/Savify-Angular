import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toastMessage = new BehaviorSubject<string>('');
  showToast = new BehaviorSubject<boolean>(false);

  triggerToast(msg: string) {
    this.toastMessage.next(msg);
    this.showToast.next(true);

    setTimeout(() => {
      this.showToast.next(false);
    }, 3000);
  }
}
