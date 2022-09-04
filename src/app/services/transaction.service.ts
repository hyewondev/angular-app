import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction';
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactionsUrl = 'api/transactions';

  constructor(
    private http: HttpClient
  ) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl)
      .pipe(
        catchError(this.handleError<Transaction[]>('getTransactions', []))
      )
  }

  getTransaction(id: number): Observable<Transaction> {
    const url = `${this.transactionsUrl}/${id}`;
    return this.http.get<Transaction>(url).pipe(
      tap(_ => { }),
      catchError(this.handleError<Transaction>(`getTransaction id=${id}`))
    );
  }

  updateTransaction(transaction: Transaction): Observable<any> {
    return this.http.put(this.transactionsUrl, transaction, this.httpOptions).pipe(
      tap(_ => { }),
      catchError(this.handleError<any>('updateTransaction'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
