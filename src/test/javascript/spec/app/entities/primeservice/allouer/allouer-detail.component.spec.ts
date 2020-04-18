import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { AllouerDetailComponent } from 'app/entities/primeservice/allouer/allouer-detail.component';
import { Allouer } from 'app/shared/model/primeservice/allouer.model';

describe('Component Tests', () => {
  describe('Allouer Management Detail Component', () => {
    let comp: AllouerDetailComponent;
    let fixture: ComponentFixture<AllouerDetailComponent>;
    const route = ({ data: of({ allouer: new Allouer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [AllouerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AllouerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AllouerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load allouer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.allouer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
