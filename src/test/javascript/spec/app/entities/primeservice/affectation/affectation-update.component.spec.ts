import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PrimegatewayTestModule } from '../../../../test.module';
import { AffectationUpdateComponent } from 'app/entities/primeservice/affectation/affectation-update.component';
import { AffectationService } from 'app/entities/primeservice/affectation/affectation.service';
import { Affectation } from 'app/shared/model/primeservice/affectation.model';

describe('Component Tests', () => {
  describe('Affectation Management Update Component', () => {
    let comp: AffectationUpdateComponent;
    let fixture: ComponentFixture<AffectationUpdateComponent>;
    let service: AffectationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PrimegatewayTestModule],
        declarations: [AffectationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AffectationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AffectationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AffectationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Affectation(123);
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
        const entity = new Affectation();
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
