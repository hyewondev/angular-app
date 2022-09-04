import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService
  ) { }
  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }
}
