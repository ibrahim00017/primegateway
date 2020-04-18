import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { AvancementUpdateComponent } from 'app/entities/primeservice/avancement/avancement-update.component';
import { AvancementService } from 'app/entities/primeservice/avancement/avancement.service';
import { Avancement } from 'app/shared/model/primeservice/avancement.model';

describe('Component Tests', () => {
  describe('Avancement Management Update Component', () => {
    let comp: AvancementUpdateComponent;
    let fixture: ComponentFixture<AvancementUpdateComponent>;
    let service: AvancementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [AvancementUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AvancementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AvancementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvancementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Avancement(123);
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
        const entity = new Avancement();
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
