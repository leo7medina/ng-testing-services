import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

import { ProductService } from './product.service';

import { generateManyProducts } from '../models/product.mock';


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
});
