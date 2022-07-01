import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

import { ProductService } from './product.service';

import { generateManyProducts, generateOneProduct } from '../models/product.mock';


fdescribe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        
      ]
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getAllsimple', () => {
    it('should return a product list', (doneFn) => {
      //Arrage
      const mokData: Product[] = generateManyProducts(2);
      //Act
      service.getAllSimple()
        .subscribe((data)=> {
          //Assert
          expect(data.length).toEqual(mokData.length);
          expect(data).toEqual(mokData);
          doneFn();
        });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mokData);
      httpController.verify();
    });
  });


  describe('Test for getAll', () => {
    it('should return a product list', (doneFn) => {
      //Arrage
      const mokData: Product[] = generateManyProducts(4);
      //Act
      service.getAll()
        .subscribe((data)=> {
          //Assert
          expect(data.length).toEqual(mokData.length);
          //expect(data).toEqual(mokData);
          doneFn();
        });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mokData);
      httpController.verify();
    });

    it('should return a product list with taxes', (doneFn) => {
      //Arrage
      const mokData: Product[] = [
        {...generateOneProduct(), price: 100},
        {...generateOneProduct(), price: 200}
      ];
      //Act
      service.getAll()
        .subscribe((data)=> {
          //Assert
          expect(data.length).toEqual(mokData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          doneFn();
        });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mokData);
      httpController.verify();
    });
  });
});
