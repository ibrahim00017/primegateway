import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { PromotionDetailComponent } from 'app/entities/primeservice/promotion/promotion-detail.component';
import { Promotion } from 'app/shared/model/primeservice/promotion.model';

describe('Component Tests', () => {
  describe('Promotion Management Detail Component', () => {
    let comp: PromotionDetailComponent;
    let fixture: ComponentFixture<PromotionDetailComponent>;
    const route = ({ data: of({ promotion: new Promotion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [PromotionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PromotionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PromotionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load promotion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.promotion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
