import { Component } from '@angular/core';
import { AddExpenseModalComponent } from "../add-expense-modal/add-expense-modal.component";


@Component({
  selector: 'app-add-expense',
  imports: [AddExpenseModalComponent],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  showModal = false;
  mode: 'add' | 'edit' = 'add';

  openModal(mode: 'add' | 'edit') {
    this.mode = mode;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  
}
