import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { ChangementDetailComponent } from 'app/entities/primeservice/changement/changement-detail.component';
import { Changement } from 'app/shared/model/primeservice/changement.model';

describe('Component Tests', () => {
  describe('Changement Management Detail Component', () => {
    let comp: ChangementDetailComponent;
    let fixture: ComponentFixture<ChangementDetailComponent>;
    const route = ({ data: of({ changement: new Changement(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [ChangementDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChangementDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChangementDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load changement on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.changement).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
