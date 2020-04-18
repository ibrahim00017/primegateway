import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimegatewayTestModule } from '../../../../test.module';
import { DirectionComponent } from 'app/entities/primeservice/direction/direction.component';
import { DirectionService } from 'app/entities/primeservice/direction/direction.service';
import { Direction } from 'app/shared/model/primeservice/direction.model';

describe('Component Tests', () => {
  describe('Direction Management Component', () => {
    let comp: DirectionComponent;
    let fixture: ComponentFixture<DirectionComponent>;
    let service: DirectionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [DirectionComponent]
      })
        .overrideTemplate(DirectionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DirectionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DirectionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Direction(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.directions && comp.directions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
