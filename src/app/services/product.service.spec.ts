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
        {...generateOneProduct(), price: 200},
        {...generateOneProduct(), price: 0},
        {...generateOneProduct(), price: -100}
      ];
      //Act
      service.getAll()
        .subscribe((data)=> {
          //Assert
          expect(data.length).toEqual(mokData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          doneFn();
        });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mokData);
      httpController.verify();
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      service.getAll(limit, offset)
      .subscribe((data)=> {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpController.verify();
    });
  });
});
