import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';
import { DatePipe, JsonPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-expense-table',
  imports: [JsonPipe, NgForOf, DatePipe],
  standalone: true,
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent implements OnInit {
    expenses: any
    constructor(private expenseService: ExpenseService) {}

    ngOnInit() {
      this.expenseService.expenses$.subscribe(data => {
        this.expenses = data;
      })
      this.expenseService.loadExpenses();
    }
}
