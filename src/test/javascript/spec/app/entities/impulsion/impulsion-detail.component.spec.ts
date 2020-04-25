import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../test.module';
import { ImpulsionDetailComponent } from 'app/entities/impulsion/impulsion-detail.component';
import { Impulsion } from 'app/shared/model/impulsion.model';

describe('Component Tests', () => {
  describe('Impulsion Management Detail Component', () => {
    let comp: ImpulsionDetailComponent;
    let fixture: ComponentFixture<ImpulsionDetailComponent>;
    const route = ({ data: of({ impulsion: new Impulsion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [ImpulsionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ImpulsionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImpulsionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load impulsion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.impulsion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
