import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  { path: 'transactions', component: TransactionsListComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
