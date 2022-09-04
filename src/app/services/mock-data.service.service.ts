import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class MockDataServiceService implements InMemoryDbService {
  createDb() {
    const transactions = [
      { id: 1, date: '1639502071000', comments: 'Utility bill' },
      { id: 2, date: '1639486575000', comments: '' },
      { id: 3, date: '1639478930000', comments: 'Rent' },
      { id: 4, date: '1638997755000', comments: 'Cash Transfer' }
    ];
    return { transactions };
  }

  getId(transactions: Transaction[]): number {
    return transactions.length > 0 ? Math.max(...transactions.map(transaction => transaction.id)) + 1 : 11;
  }
}
