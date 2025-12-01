import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ExpenseCard } from '../../../../../models/expense-card.model';
import { MonthlyLimitService } from '../../../services/monthly-limit.service';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [NgIf, CurrencyPipe],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.css'
})
export class ExpenseCardComponent implements OnInit {
  expenseCards: ExpenseCard[] = [];
  userId = localStorage.getItem('userId')!;
  month = new Date().toLocaleString('en-US', { month: 'long' });
  year = new Date().getFullYear();
  constructor(private monthlyLimitService: MonthlyLimitService, private expenseService: ExpenseService) {}
  ngOnInit(): void {
    
  }
  @Input() category: string = '';
  @Input() limit: number = 0;
  @Input() spent: number = 0;

  get remaining(): number {
    return Math.max(this.limit - this.spent, 0);
  }

  get spentPercent(): number {
    if (!this.limit) return 0;
    return Math.min(Math.round((this.spent / this.limit) * 100), 100);
  }

  loadExpenseCards() {
    this.monthlyLimitService.loadMonthlyLimits(this.userId, this.month, this.year);

    this.monthlyLimitService.monthlyLimits$
      .subscribe((limits: any[]) => {

        if (!limits || limits.length === 0) {
          console.log("No monthly limits set yet.");
          this.expenseCards = [];
          return;
        }

        this.expenseService.getExpenseByMonth(this.month)
          .subscribe((expenses: any[]) => {

            const spentByCategory: Record<string, number> = {};

            expenses.forEach(exp => {
              if (!spentByCategory[exp.category]) {
                spentByCategory[exp.category] = 0;
              }
              spentByCategory[exp.category] += exp.amount;
            });

            this.expenseCards = limits.map(limit => ({
              category: limit.category,
              limit: limit.limit,
              spent: spentByCategory[limit.category] || 0
            }));

            console.log("FINAL CARDS:", this.expenseCards);
          });
      });
  }
}
