import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAllouer, Allouer } from 'app/shared/model/primeservice/allouer.model';
import { AllouerService } from './allouer.service';
import { IAgent } from 'app/shared/model/primeservice/agent.model';
import { AgentService } from 'app/entities/primeservice/agent/agent.service';
import { IPrime } from 'app/shared/model/primeservice/prime.model';
import { PrimeService } from 'app/entities/primeservice/prime/prime.service';
import { IAnnee } from 'app/shared/model/primeservice/annee.model';
import { AnneeService } from 'app/entities/primeservice/annee/annee.service';
import { ITrimestre } from 'app/shared/model/primeservice/trimestre.model';
import { TrimestreService } from 'app/entities/primeservice/trimestre/trimestre.service';

type SelectableEntity = IAgent | IPrime | IAnnee | ITrimestre;

@Component({
  selector: 'jhi-allouer-update',
  templateUrl: './allouer-update.component.html'
})
export class AllouerUpdateComponent implements OnInit {
  isSaving = false;
  agents: IAgent[] = [];
  primes: IPrime[] = [];
  annees: IAnnee[] = [];
  trimestres: ITrimestre[] = [];

  editForm = this.fb.group({
    id: [],
    note: [null, [Validators.min(0), Validators.max(20)]],
    nombreJours: [],
    montant: [],
    agent: [],
    prime: [],
    annee: [],
    trimestre: []
  });

  constructor(
    protected allouerService: AllouerService,
    protected agentService: AgentService,
    protected primeService: PrimeService,
    protected anneeService: AnneeService,
    protected trimestreService: TrimestreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ allouer }) => {
      this.updateForm(allouer);

      this.agentService
        .query({ filter: 'allouer-is-null' })
        .pipe(
          map((res: HttpResponse<IAgent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAgent[]) => {
          if (!allouer.agent || !allouer.agent.id) {
            this.agents = resBody;
          } else {
            this.agentService
              .find(allouer.agent.id)
              .pipe(
                map((subRes: HttpResponse<IAgent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAgent[]) => (this.agents = concatRes));
          }
        });

      this.primeService
        .query({ filter: 'allouer-is-null' })
        .pipe(
          map((res: HttpResponse<IPrime[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPrime[]) => {
          if (!allouer.prime || !allouer.prime.id) {
            this.primes = resBody;
          } else {
            this.primeService
              .find(allouer.prime.id)
              .pipe(
                map((subRes: HttpResponse<IPrime>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPrime[]) => (this.primes = concatRes));
          }
        });

      this.anneeService
        .query({ filter: 'allouer-is-null' })
        .pipe(
          map((res: HttpResponse<IAnnee[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAnnee[]) => {
          if (!allouer.annee || !allouer.annee.id) {
            this.annees = resBody;
          } else {
            this.anneeService
              .find(allouer.annee.id)
              .pipe(
                map((subRes: HttpResponse<IAnnee>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAnnee[]) => (this.annees = concatRes));
          }
        });

      this.trimestreService
        .query({ filter: 'allouer-is-null' })
        .pipe(
          map((res: HttpResponse<ITrimestre[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITrimestre[]) => {
          if (!allouer.trimestre || !allouer.trimestre.id) {
            this.trimestres = resBody;
          } else {
            this.trimestreService
              .find(allouer.trimestre.id)
              .pipe(
                map((subRes: HttpResponse<ITrimestre>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITrimestre[]) => (this.trimestres = concatRes));
          }
        });
    });
  }

  updateForm(allouer: IAllouer): void {
    this.editForm.patchValue({
      id: allouer.id,
      note: allouer.note,
      nombreJours: allouer.nombreJours,
      montant: allouer.montant,
      agent: allouer.agent,
      prime: allouer.prime,
      annee: allouer.annee,
      trimestre: allouer.trimestre
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const allouer = this.createFromForm();
    if (allouer.id !== undefined) {
      this.subscribeToSaveResponse(this.allouerService.update(allouer));
    } else {
      this.subscribeToSaveResponse(this.allouerService.create(allouer));
    }
  }

  private createFromForm(): IAllouer {
    return {
      ...new Allouer(),
      id: this.editForm.get(['id'])!.value,
      note: this.editForm.get(['note'])!.value,
      nombreJours: this.editForm.get(['nombreJours'])!.value,
      montant: this.editForm.get(['montant'])!.value,
      agent: this.editForm.get(['agent'])!.value,
      prime: this.editForm.get(['prime'])!.value,
      annee: this.editForm.get(['annee'])!.value,
      trimestre: this.editForm.get(['trimestre'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAllouer>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
