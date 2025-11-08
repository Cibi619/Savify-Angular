import { Component } from '@angular/core';
import { ExpenseChartComponent } from "../expense-chart/expense-chart.component";
import { ExpenseTableComponent } from "../expense-table/expense-table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  imports: [ExpenseChartComponent, ExpenseTableComponent, CommonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {

}
