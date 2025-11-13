import { Component, OnInit } from '@angular/core';
import { ExpenseChartComponent } from "../expense-chart/expense-chart.component";
import { ExpenseTableComponent } from "../expense-table/expense-table.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AddExpenseComponent } from "../add-expense/add-expense.component";
import { ExpenseCardComponent } from "../expense-card/expense-card.component";

@Component({
  selector: 'app-dashboard-home',
  imports: [ExpenseChartComponent, ExpenseTableComponent, CommonModule, AddExpenseComponent, ExpenseCardComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent implements OnInit {
    userName: string = ''
    constructor(private authService: AuthService) {

    }

    ngOnInit() {
      this.authService.getUser().subscribe((user: any) => {
        this.userName = user.trim().split(" ")[0]
      })
    }
}
