import { Component } from '@angular/core';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { HeaderComponent } from "./components/header/header.component";
import { ExpenseChartComponent } from "./components/expense-chart/expense-chart.component";
import { ExpenseTableComponent } from "./components/expense-table/expense-table.component";

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, HeaderComponent, ExpenseChartComponent, ExpenseTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
