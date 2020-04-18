import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimegatewayTestModule } from '../../../../test.module';
import { AvancementComponent } from 'app/entities/primeservice/avancement/avancement.component';
import { AvancementService } from 'app/entities/primeservice/avancement/avancement.service';
import { Avancement } from 'app/shared/model/primeservice/avancement.model';

describe('Component Tests', () => {
  describe('Avancement Management Component', () => {
    let comp: AvancementComponent;
    let fixture: ComponentFixture<AvancementComponent>;
    let service: AvancementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [AvancementComponent]
      })
        .overrideTemplate(AvancementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AvancementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvancementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Avancement(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.avancements && comp.avancements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
