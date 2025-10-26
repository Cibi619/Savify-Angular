import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense',
  imports: [],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent implements OnInit {
  constructor (private expenseService: ExpenseService) {}

  ngOnInit() {
    
  }

  monthlyExpense() {
    // this.expenseService.getExpenseByMonth()
  }
}
