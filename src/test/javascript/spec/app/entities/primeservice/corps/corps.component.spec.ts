import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrimegatewayTestModule } from '../../../../test.module';
import { CorpsComponent } from 'app/entities/primeservice/corps/corps.component';
import { CorpsService } from 'app/entities/primeservice/corps/corps.service';
import { Corps } from 'app/shared/model/primeservice/corps.model';

describe('Component Tests', () => {
  describe('Corps Management Component', () => {
    let comp: CorpsComponent;
    let fixture: ComponentFixture<CorpsComponent>;
    let service: CorpsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [CorpsComponent]
      })
        .overrideTemplate(CorpsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CorpsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CorpsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Corps(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.corps && comp.corps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
