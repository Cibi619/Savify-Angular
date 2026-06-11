
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { ToastService } from '../../../shared/toast.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-expense-modal',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './add-expense-modal.component.html',
  styleUrl: './add-expense-modal.component.css'
})
export class AddExpenseModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() limitUpdated = new EventEmitter<number>();
  @Input() mode: 'add' | 'edit' = 'add';
  @Input() category: string = '';
  categories = ['Groceries', 'Travel', 'Entertainment', 'Miscellaneous'];
  expense = {
    name: '',
    price: 0,
    date: '',
    month: '',
    category: '',
    note: ''
  };
  newLimit = 0;

  constructor(private expenseService: ExpenseService, private toast: ToastService) {}
  close() {
      this.closeModal.emit();
    }

    autoSetMonth() {
      if (!this.expense.date) return;
      this.expense.month = new Date(this.expense.date).toLocaleString('en-US', { month: 'long' });
    }

  submit() {
  this.expenseService.addExpense(this.expense).subscribe(() => {
      this.toast.triggerToast('Expense Added Successfully 🎉');
      this.expense = {
        name: '',
        price: 0,
        date: '',
        month: '',
        category: '',
        note: ''
      };
      this.closeModal.emit();
    });
  }

  updateLimit() {
    this.expenseService.updateLimit(this.category, this.newLimit).subscribe(() => {
      this.toast.triggerToast('Limit Updated Successfully 🎉');
      this.limitUpdated.emit(this.newLimit);
      this.newLimit = 0;
      this.closeModal.emit();
    });
  }
}
