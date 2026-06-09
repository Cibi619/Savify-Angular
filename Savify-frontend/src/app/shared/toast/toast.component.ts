import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from '../toast.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
  show = false;
  message = '';

  showToast(msg: string) {
    this.message = msg;
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
}
