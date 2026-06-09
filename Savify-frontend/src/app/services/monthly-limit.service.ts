import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyLimitService {
  private baseUrl = 'http://localhost:3000/api/monthly-limits'

  monthlyLimits$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  

  loadMonthlyLimits(userId: string, month: string, year: Number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?user=${userId}&month=${month}&year=${year}`, { headers: this.getAuthHeaders() })
  }

  updateLimit(limitData: any) {
    return this.http.post(this.baseUrl, limitData, { headers: this.getAuthHeaders() });
  }
}
