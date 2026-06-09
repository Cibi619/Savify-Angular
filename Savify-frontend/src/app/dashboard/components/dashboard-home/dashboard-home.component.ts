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
  userName: string = '';
  recentExpenses: any;
  userId = localStorage.getItem('userId')!;
  month = new Date().toLocaleString('en-US', { month: 'long' });
  year = new Date().getFullYear();
  currentMonth!: string;
  currentYear!: number;

  expenseCards: any[] = [
    { category: 'Groceries', limit: 0, spent: 0 },
    { category: 'Travel', limit: 0, spent: 0 },
    { category: 'Entertainment', limit: 0, spent: 0 },
    { category: 'Miscellaneous', limit: 0, spent: 0 },
  ];

  constructor(
    private authService: AuthService,
    private expenseService: ExpenseService,
    private monthlyLimitService: MonthlyLimitService
  ) {}

  ngOnInit() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    this.currentMonth = monthNames[d.getMonth()];
    this.currentYear = d.getFullYear();

    // Every time expenses update, recalculate spent amounts on cards
    this.expenseService.expenses$.subscribe(data => {
      this.recentExpenses = data;
      console.log('Expenses updated in DashboardHome:', this.recentExpenses);
      this.calculateSpentAmounts(); // 👈 Keeps chart in sync on every add/update
    });
    this.expenseService.loadExpenses();
    this.loadExpenseCards();
  }

  loadExpenseCards() {
    const user = this.authService.getDecodedUser();
    this.userName = user.email.split('@')[0];

    this.expenseService
      .getMonthlySummary(this.month, this.year)
      .subscribe(async (summary: any[]) => {
        console.log('SUMMARY:', summary);

        const hasNoLimits =
          !summary ||
          summary.length === 0 ||
          summary.every(item => !item.limit || item.limit === 0);

        if (hasNoLimits) {
          // New user — create $200 defaults locally, no re-fetch needed
          // (re-fetching overwrites the $200 back to $0 if backend JOIN is slow/broken)
          await this.createDefaultMonthlyLimits();
          this.calculateSpentAmounts(); // 👈 Apply any existing expenses to new cards
        } else {
          this.expenseCards = this.mapSummaryToCards(summary);
          this.calculateSpentAmounts(); // 👈 Apply expenses to loaded cards
        }
      });
  }

  private mapSummaryToCards(summary: any[]): any[] {
    const defaultCategories = ['Groceries', 'Travel', 'Entertainment', 'Miscellaneous'];

    // If summary already has all 4 categories, map directly
    if (summary.length === 4) {
      return summary.map(item => ({
        category: item.category,
        limit: item.limit ?? 200,
        spent: item.spent ?? 0
      }));
    }

    // Fill in any missing categories with defaults (handles partial data)
    return defaultCategories.map(category => {
      const found = summary.find(s => s.category === category);
      return {
        category,
        limit: found?.limit ?? 200,
        spent: found?.spent ?? 0
      };
    });
  }

  async createDefaultMonthlyLimits() {
    const defaultLimit = 200;
    const categories = ['Groceries', 'Travel', 'Entertainment', 'Miscellaneous'];

    // Set cards immediately so UI shows $200 right away before API responds
    this.expenseCards = categories.map(category => ({
      category,
      limit: defaultLimit,
      spent: 0
    }));

    try {
      const promises = categories.map(category =>
        this.monthlyLimitService.updateLimit({
          user: this.userId,
          category,
          month: this.currentMonth,
          year: this.currentYear,
          limit: defaultLimit
        }).toPromise()
      );

      await Promise.all(promises);
      console.log('Default limits created successfully');

    } catch (error) {
      console.error('Error creating default limits:', error);
      // expenseCards already set above — UI will still show $200
    }
  }

  calculateSpentAmounts() {
    if (!this.recentExpenses || this.expenseCards.length === 0) return;

    const now = new Date();
    const currentMonthNum = now.getMonth();
    const currentYearNum = now.getFullYear();

    // Filter expenses for current month only
    const currentMonthExpenses = this.recentExpenses.filter(
      (expense: { date: string | number | Date }) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonthNum &&
          expenseDate.getFullYear() === currentYearNum
        );
      }
    );

    // Reset spent amounts
    this.expenseCards.forEach(card => (card.spent = 0));

    // Accumulate spent per category
    currentMonthExpenses.forEach((expense: { category: any; price: any }) => {
      const card = this.expenseCards.find(c => c.category === expense.category);
      if (card) {
        card.spent += Number(expense.price) || 0;
      }
    });

    console.log('Updated spent amounts:', this.expenseCards);
  }
}