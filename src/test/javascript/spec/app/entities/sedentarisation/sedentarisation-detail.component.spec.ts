import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../test.module';
import { SedentarisationDetailComponent } from 'app/entities/sedentarisation/sedentarisation-detail.component';
import { Sedentarisation } from 'app/shared/model/sedentarisation.model';

describe('Component Tests', () => {
  describe('Sedentarisation Management Detail Component', () => {
    let comp: SedentarisationDetailComponent;
    let fixture: ComponentFixture<SedentarisationDetailComponent>;
    const route = ({ data: of({ sedentarisation: new Sedentarisation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [SedentarisationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SedentarisationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SedentarisationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sedentarisation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sedentarisation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
