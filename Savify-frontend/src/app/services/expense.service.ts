import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl: string = 'http://localhost:3000/api/expenses'
  private monthlyCategoryUrl: string = 'http://localhost:3000/api'
  private expenseSubject = new BehaviorSubject<any[]>([])
  expenses$ = this.expenseSubject.asObservable();

  constructor(private http: HttpClient) { }
  // get expenses of user for that month
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  loadExpenses() {
  this.getUserExpenses().subscribe({
    next: (data) => {
      console.log(data, "--> data");
      this.expenseSubject.next(data || []);
    },
    error: (err) => {
      console.error("Failed to load expenses", err);
      this.expenseSubject.next([]);
    }
  });
}

  // Get all expenses for the current user
  getUserExpenses(): Observable<any> {
    return this.http
      .get(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Get expenses by month
  getExpenseByMonth(month: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/month/${month}`)
      .pipe(catchError(this.handleError));
  }

  // Add a new expense
  addExpense(expenseData: any): Observable<any> {
    return this.http
      .post(this.apiUrl, expenseData)
      .pipe(tap((resp: any) => {
        const savedExpense = resp.savedExpense;
        console.log("Saved expense from backend:", savedExpense);
        // Get current list
        const currentExpenses = this.expenseSubject.value;
        // Add the new expense to the list
        this.expenseSubject.next([...currentExpenses, savedExpense]);
      }),catchError(this.handleError));
  }

  // Update existing expense
  updateExpense(id: string, updatedData: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${id}`, updatedData)
      .pipe(catchError(this.handleError));
  }

  // Delete expense
  deleteExpense(id: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any) {
    console.error('ExpenseService Error:', error);
    return throwError(() => new Error(error.error?.message || 'Server error'));
  }

  getMonthlySummary(month: string, year: number) {
    return this.http.get<any[]>(
      `${this.monthlyCategoryUrl}/monthly-categories/summary?month=${month}&year=${year}`
    ).pipe(catchError(this.handleError));
  }
}
