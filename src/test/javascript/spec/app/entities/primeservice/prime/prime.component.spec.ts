import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimegatewayTestModule } from '../../../../test.module';
import { PrimeComponent } from 'app/entities/primeservice/prime/prime.component';
import { PrimeService } from 'app/entities/primeservice/prime/prime.service';
import { Prime } from 'app/shared/model/primeservice/prime.model';

describe('Component Tests', () => {
  describe('Prime Management Component', () => {
    let comp: PrimeComponent;
    let fixture: ComponentFixture<PrimeComponent>;
    let service: PrimeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [PrimeComponent]
      })
        .overrideTemplate(PrimeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrimeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrimeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Prime(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.primes && comp.primes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
