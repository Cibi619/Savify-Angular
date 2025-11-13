import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-expense-table',
  imports: [JsonPipe],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent implements OnInit {
    expenses: any
    constructor(private expenseService: ExpenseService) {}

    ngOnInit() {
      this.expenseService.getUserExpenses().subscribe({
        next: (data) => this.expenses = data,
        error: (err) => console.error(err)
      })
    }
}
