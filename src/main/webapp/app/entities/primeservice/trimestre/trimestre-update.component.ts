import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITrimestre, Trimestre } from 'app/shared/model/primeservice/trimestre.model';
import { TrimestreService } from './trimestre.service';

@Component({
  selector: 'jhi-trimestre-update',
  templateUrl: './trimestre-update.component.html'
})
export class TrimestreUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codeTrimestre: [null, [Validators.required]]
  });

  constructor(protected trimestreService: TrimestreService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trimestre }) => {
      this.updateForm(trimestre);
    });
  }

  updateForm(trimestre: ITrimestre): void {
    this.editForm.patchValue({
      id: trimestre.id,
      codeTrimestre: trimestre.codeTrimestre
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trimestre = this.createFromForm();
    if (trimestre.id !== undefined) {
      this.subscribeToSaveResponse(this.trimestreService.update(trimestre));
    } else {
      this.subscribeToSaveResponse(this.trimestreService.create(trimestre));
    }
  }

  private createFromForm(): ITrimestre {
    return {
      ...new Trimestre(),
      id: this.editForm.get(['id'])!.value,
      codeTrimestre: this.editForm.get(['codeTrimestre'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrimestre>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
