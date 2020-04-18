import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { PrimeDetailComponent } from 'app/entities/primeservice/prime/prime-detail.component';
import { Prime } from 'app/shared/model/primeservice/prime.model';

describe('Component Tests', () => {
  describe('Prime Management Detail Component', () => {
    let comp: PrimeDetailComponent;
    let fixture: ComponentFixture<PrimeDetailComponent>;
    const route = ({ data: of({ prime: new Prime(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [PrimeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PrimeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrimeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load prime on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.prime).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
