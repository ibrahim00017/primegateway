import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimegatewayTestModule } from '../../../../test.module';
import { AllouerComponent } from 'app/entities/primeservice/allouer/allouer.component';
import { AllouerService } from 'app/entities/primeservice/allouer/allouer.service';
import { Allouer } from 'app/shared/model/primeservice/allouer.model';

describe('Component Tests', () => {
  describe('Allouer Management Component', () => {
    let comp: AllouerComponent;
    let fixture: ComponentFixture<AllouerComponent>;
    let service: AllouerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [AllouerComponent]
      })
        .overrideTemplate(AllouerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AllouerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AllouerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Allouer(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.allouers && comp.allouers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
