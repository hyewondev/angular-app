import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionsListComponent } from './transactions-list.component';

describe('TransactionsListComponent', () => {
  let transactionsListComponent: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsListComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsListComponent);
    transactionsListComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(transactionsListComponent).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(transactionsListComponent, 'getTransactions').and.callThrough();
      transactionsListComponent.ngOnInit();
      expect(transactionsListComponent.getTransactions).toHaveBeenCalled();
    })
  });

  describe('getTransactions', () => {
    it('makes expected calls', () => {
      spyOn(transactionsListComponent, 'getTransactions').and.callThrough();
      transactionsListComponent.getTransactions();
      expect(transactionsListComponent.getTransactions).toHaveBeenCalled();
    });
  });
});
