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
    userId: any;
    expenseCards: any;
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

      this.expenseService.loadExpenses();
      if (user) {
        this.userId = user.id;
        this.userName = user.email.split('@')[0];
        this.monthlyLimitService.loadMonthlyLimits(this.userId, currentMonth, currentYear)
      }
    }
}
