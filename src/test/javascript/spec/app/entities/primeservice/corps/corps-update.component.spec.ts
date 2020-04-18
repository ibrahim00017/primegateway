import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { CorpsUpdateComponent } from 'app/entities/primeservice/corps/corps-update.component';
import { CorpsService } from 'app/entities/primeservice/corps/corps.service';
import { Corps } from 'app/shared/model/primeservice/corps.model';

describe('Component Tests', () => {
  describe('Corps Management Update Component', () => {
    let comp: CorpsUpdateComponent;
    let fixture: ComponentFixture<CorpsUpdateComponent>;
    let service: CorpsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [CorpsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CorpsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CorpsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CorpsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Corps(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Corps();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
