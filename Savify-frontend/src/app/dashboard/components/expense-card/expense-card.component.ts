import { Component, Input, OnInit } from '@angular/core';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { ExpenseCard } from '../../../../../models/expense-card.model';
import { MonthlyLimitService } from '../../../services/monthly-limit.service';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-expense-card',
  standalone: true,
  imports: [CurrencyPipe, NgStyle],
  templateUrl: './expense-card.component.html',
  styleUrl: './expense-card.component.css'
})
export class ExpenseCardComponent implements OnInit {
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

  get progressStyle() {
  const spentNum = Number(this.spent) || 0;
  const limitNum = Number(this.limit) || 0;

  console.log("progressStyle()", spentNum, limitNum);

  if (limitNum === 0) {
    return { background: 'conic-gradient(#f2f2f2 0deg, #f2f2f2 360deg)' };
  }

  const percent = Math.min((spentNum / limitNum) * 100, 100);
  const angle = (percent / 100) * 360;

  return {
    background: `conic-gradient(#20a8d8 ${angle}deg, #f2f2f2 ${angle}deg 360deg)`
  };
}
}
