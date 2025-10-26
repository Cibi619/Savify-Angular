import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl: string = 'http://localhost:3000/api/expenses'

  constructor(private http: HttpClient) { }

  // get all expenses for a user
  getAllExpenses(user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${user_id}`)
  }

  // get expenses of user for that month
  getExpenseByMonth(user_id: string, month: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${user_id}/${month}`)
  }
}
