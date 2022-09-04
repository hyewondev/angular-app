import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

  @Input() transaction? : Transaction;
  commentBtnText: string = '';

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTransaction();
  }

  getTransaction(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.transactionService.getTransaction(id)
        .subscribe( transaction => {
          this.transaction = transaction;
          this.commentBtnText = transaction.comments ? 'Edit' : 'Add';
        })
    }
  }

  goBack(): void {
    this.location.back();
  }
  
  save(): void {
    if (this.transaction) {
      this.transactionService.updateTransaction(this.transaction)
        .subscribe(() => this.goBack());
    }
  }

  keyPressAlphaNumeric(event: any) {
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}
