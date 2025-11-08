import { Component } from '@angular/core';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { HeaderComponent } from "./components/header/header.component";
import { ExpenseChartComponent } from "./components/expense-chart/expense-chart.component";
import { ExpenseTableComponent } from "./components/expense-table/expense-table.component";
import { AuthService } from '../services/auth.service';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, HeaderComponent, ExpenseChartComponent, ExpenseTableComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    constructor(private authService: AuthService) {}

    ngOnInit() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        this.authService.setUser(JSON.parse(storedUser));
      }
    }
}
