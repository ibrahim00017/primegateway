import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../test.module';
import { SpecifiqueDetailComponent } from 'app/entities/specifique/specifique-detail.component';
import { Specifique } from 'app/shared/model/specifique.model';

describe('Component Tests', () => {
  describe('Specifique Management Detail Component', () => {
    let comp: SpecifiqueDetailComponent;
    let fixture: ComponentFixture<SpecifiqueDetailComponent>;
    const route = ({ data: of({ specifique: new Specifique(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [SpecifiqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SpecifiqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpecifiqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load specifique on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.specifique).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
