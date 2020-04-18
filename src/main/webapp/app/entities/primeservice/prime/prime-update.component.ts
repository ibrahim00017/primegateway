import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrime, Prime } from 'app/shared/model/primeservice/prime.model';
import { PrimeService } from './prime.service';

@Component({
  selector: 'jhi-prime-update',
  templateUrl: './prime-update.component.html'
})
export class PrimeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    prime: [null, [Validators.required]],
    tauxMensuel: [],
    typePrime: []
  });

  constructor(protected primeService: PrimeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prime }) => {
      this.updateForm(prime);
    });
  }

  updateForm(prime: IPrime): void {
    this.editForm.patchValue({
      id: prime.id,
      prime: prime.prime,
      tauxMensuel: prime.tauxMensuel,
      typePrime: prime.typePrime
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prime = this.createFromForm();
    if (prime.id !== undefined) {
      this.subscribeToSaveResponse(this.primeService.update(prime));
    } else {
      this.subscribeToSaveResponse(this.primeService.create(prime));
    }
  }

  private createFromForm(): IPrime {
    return {
      ...new Prime(),
      id: this.editForm.get(['id'])!.value,
      prime: this.editForm.get(['prime'])!.value,
      tauxMensuel: this.editForm.get(['tauxMensuel'])!.value,
      typePrime: this.editForm.get(['typePrime'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrime>>): void {
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
