import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl: string = 'http://localhost:3000/api/expenses'

  constructor(private http: HttpClient) { }
  // get expenses of user for that month
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get all expenses for the current user
  getUserExpenses(): Observable<any> {
    return this.http
      .get(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Get expenses by month
  getExpenseByMonth(month: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/month/${month}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Add a new expense
  addExpense(expenseData: any): Observable<any> {
    return this.http
      .post(this.apiUrl, expenseData, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Update existing expense
  updateExpense(id: string, updatedData: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/${id}`, updatedData, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Delete expense
  deleteExpense(id: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any) {
    console.error('ExpenseService Error:', error);
    return throwError(() => new Error(error.error?.message || 'Server error'));
  }
}
