import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';
import { Transaction } from '../models/transaction';

const mockData = [
  { id: 1, date: '1639502071000', comments: 'Utility bill' },
  { id: 2, date: '1639486575000', comments: '' },
  { id: 3, date: '1639478930000', comments: 'Rent' },
  { id: 4, date: '1638997755000', comments: 'Cash Transfer' }
] as Transaction[];

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let httpTestingController: HttpTestingController;
  let mockTransactions: Transaction[];
  let mockTransaction: Transaction;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ TransactionService ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    mockTransactions = [...mockData];
    mockTransaction = mockTransactions[0];

    transactionService = TestBed.inject(TransactionService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(transactionService).toBeTruthy();
  });

  describe('getTransactions', () => {
    it('should return mock transactions',  () => {
      spyOn<TransactionService, any>(transactionService, 'handleError').and.callThrough();

      transactionService.getTransactions().subscribe(
        transactions => expect(transactions.length).toEqual(mockTransactions.length),
        fail
      )
      const req = httpTestingController.expectOne(transactionService.transactionsUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockTransactions);
    });

    it('should turn 404 into a user-friendly error', () => {
      spyOn<TransactionService, any>(transactionService, 'handleError').and.callThrough();

      transactionService.getTransactions().subscribe(
        transactions => expect(transactions).toEqual([]),
        fail
      );

      const req = httpTestingController.expectOne(transactionService.transactionsUrl);
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(transactionService.handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTransaction', () => {
    it('should return a single mock transaction', () => {
      spyOn(transactionService, 'handleError').and.callThrough();

      transactionService.getTransaction(mockTransaction.id).subscribe(
        response => expect(response).toEqual(mockTransaction),
        fail
      );

      const req = httpTestingController.expectOne(`${transactionService.transactionsUrl}/${mockTransaction.id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockTransaction);
    });

    it('should fail gracefully on error', () => {
      spyOn(transactionService, 'handleError').and.callThrough();

      transactionService.getTransaction(mockTransaction.id).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${transactionService.transactionsUrl}/${mockTransaction.id}`);
      expect(req.request.method).toEqual('GET');

      req.flush('Invaild request parameters', { status: 404, statusText: 'Bad Request' });

      expect(transactionService.handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTransaction', () => {
    it('should update transaction', () => {
      spyOn(transactionService, 'handleError').and.callThrough();

      transactionService.updateTransaction(mockTransaction).subscribe(
        response => expect(response).toEqual(mockTransaction),
        fail
      );

      const req = httpTestingController.expectOne(transactionService.transactionsUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockTransaction);
    });

    it('should fail gracefully on error', () => {
      spyOn(transactionService, 'handleError').and.callThrough();

      transactionService.updateTransaction(mockTransaction).subscribe(
        response => expect(response).toEqual(mockTransaction),
        fail
      );

      const req = httpTestingController.expectOne(transactionService.transactionsUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockTransaction);

      expect(transactionService.handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleError', () => {
    it('should handle error gracefully', () => {
      spyOn(transactionService, 'handleError').and.callThrough();

      transactionService.getTransaction(mockTransaction.id).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${transactionService.transactionsUrl}/${mockTransaction.id}`);
      expect(req.request.method).toEqual('GET');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(transactionService.handleError).toHaveBeenCalledTimes(1);
    });
  });

});
