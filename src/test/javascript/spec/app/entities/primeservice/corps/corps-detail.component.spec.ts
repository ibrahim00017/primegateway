import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { CorpsDetailComponent } from 'app/entities/primeservice/corps/corps-detail.component';
import { Corps } from 'app/shared/model/primeservice/corps.model';

describe('Component Tests', () => {
  describe('Corps Management Detail Component', () => {
    let comp: CorpsDetailComponent;
    let fixture: ComponentFixture<CorpsDetailComponent>;
    const route = ({ data: of({ corps: new Corps(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [CorpsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CorpsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CorpsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load corps on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.corps).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
