import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimegatewayTestModule } from '../../../../test.module';
import { PromotionComponent } from 'app/entities/primeservice/promotion/promotion.component';
import { PromotionService } from 'app/entities/primeservice/promotion/promotion.service';
import { Promotion } from 'app/shared/model/primeservice/promotion.model';

describe('Component Tests', () => {
  describe('Promotion Management Component', () => {
    let comp: PromotionComponent;
    let fixture: ComponentFixture<PromotionComponent>;
    let service: PromotionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [PromotionComponent]
      })
        .overrideTemplate(PromotionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PromotionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PromotionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Promotion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.promotions && comp.promotions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
