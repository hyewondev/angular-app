import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionDetailComponent } from './transaction-detail.component';
import { Location } from '@angular/common';

describe('TransactionDetailComponent', () => {
  let transactionDetailComponent: TransactionDetailComponent;
  let fixture: ComponentFixture<TransactionDetailComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(TransactionDetailComponent);
    transactionDetailComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(transactionDetailComponent).toBeTruthy();
  });
  
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(transactionDetailComponent, 'getTransaction').and.callThrough();
      transactionDetailComponent.ngOnInit();
      expect(transactionDetailComponent.getTransaction).toHaveBeenCalled();
    })
  });

  describe('getTransaction', () => {
    it('makes expected calls', () => {
      spyOn(transactionDetailComponent, 'getTransaction').and.callThrough();
      transactionDetailComponent.getTransaction();
      expect(transactionDetailComponent.getTransaction).toHaveBeenCalled();
    });
  });

  describe('goBack', () => {
    it('makes expected calls', () => {
      spyOn(location, 'back').and.callThrough();
      transactionDetailComponent.goBack();
      expect(location.back).toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('makes expected calls', () => {
      spyOn(transactionDetailComponent, 'save').and.callThrough();
      transactionDetailComponent.save();
      expect(transactionDetailComponent.save).toHaveBeenCalled();
    });
  });
});
