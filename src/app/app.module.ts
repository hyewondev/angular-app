import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataServiceService } from './services/mock-data.service.service'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { TransactionDetailComponent } from './components/transaction-detail/transaction-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    TransactionDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MockDataServiceService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
