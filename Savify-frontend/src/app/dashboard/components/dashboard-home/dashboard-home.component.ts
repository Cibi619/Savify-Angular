import { Component, OnInit } from '@angular/core';
import { ExpenseChartComponent } from "../expense-chart/expense-chart.component";
import { ExpenseTableComponent } from "../expense-table/expense-table.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AddExpenseComponent } from "../add-expense/add-expense.component";
import { ExpenseCardComponent } from "../expense-card/expense-card.component";
import { ExpenseService } from '../../../services/expense.service';
import { MonthlyLimitService } from '../../../services/monthly-limit.service';

@Component({
  selector: 'app-dashboard-home',
  imports: [ExpenseChartComponent, ExpenseTableComponent, CommonModule, AddExpenseComponent, ExpenseCardComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent implements OnInit {
    userName: string = ''
    recentExpenses: any;
    userId = localStorage.getItem('userId')!;
    month = new Date().toLocaleString('en-US', { month: 'long' });
    year = new Date().getFullYear();
    expenseCards: any[] = [
      { category: 'Groceries', limit: 0, spent: 0 },
      { category: 'Travel', limit: 0, spent: 0 },
      { category: 'Entertainment', limit: 0, spent: 0 },
      { category: 'Miscellaneous', limit: 0, spent: 0 },
    ];
    constructor(private authService: AuthService, private expenseService: ExpenseService, private monthlyLimitService: MonthlyLimitService) {

    }

    ngOnInit() {
      const user = this.authService.getDecodedUser();
      const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      const d = new Date()
      const currentMonth = month[d.getMonth()];
      const currentYear = d.getFullYear()

      this.expenseService.expenses$.subscribe(data => {
        this.recentExpenses = data;
      });

      // this.expenseService.loadExpenses();
      // if (user) {
      //   this.userId = user.id;
      //   this.userName = user.email.split('@')[0];
      //   this.monthlyLimitService.loadMonthlyLimits(this.userId, currentMonth, currentYear).subscribe(limits => {
      //     console.log('recieved monthly limits', limits)
      //     this.expenseCards = this.expenseCards.map(card => {
      //     const limitObj = limits.find(l => l.category === card.category);
      //     return {
      //       ...card,
      //       limit: limitObj ? limitObj.limit : 0
      //     };
      //   });
      //   })
      // }
      this.loadExpenseCards();
    }

    loadExpenseCards() {
    const month = this.month;
    const year = this.year;

    this.expenseService
      .getMonthlySummary(month, year)
      .subscribe((summary: any[]) => {
        console.log("SUMMARY:", summary);

        this.expenseCards = summary.map(item => ({
          category: item.category,
          limit: item.limit,
          spent: item.spent
        }));
      });
  }
}
