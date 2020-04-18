import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { ChangementUpdateComponent } from 'app/entities/primeservice/changement/changement-update.component';
import { ChangementService } from 'app/entities/primeservice/changement/changement.service';
import { Changement } from 'app/shared/model/primeservice/changement.model';

describe('Component Tests', () => {
  describe('Changement Management Update Component', () => {
    let comp: ChangementUpdateComponent;
    let fixture: ComponentFixture<ChangementUpdateComponent>;
    let service: ChangementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [ChangementUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChangementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChangementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChangementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Changement(123);
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
        const entity = new Changement();
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
