import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IChangement, Changement } from 'app/shared/model/primeservice/changement.model';
import { ChangementService } from './changement.service';
import { IAgent } from 'app/shared/model/primeservice/agent.model';
import { AgentService } from 'app/entities/primeservice/agent/agent.service';
import { ICorps } from 'app/shared/model/primeservice/corps.model';
import { CorpsService } from 'app/entities/primeservice/corps/corps.service';

type SelectableEntity = IAgent | ICorps;

@Component({
  selector: 'jhi-changement-update',
  templateUrl: './changement-update.component.html'
})
export class ChangementUpdateComponent implements OnInit {
  isSaving = false;
  agents: IAgent[] = [];
  corps: ICorps[] = [];

  editForm = this.fb.group({
    id: [],
    dateDebut: [],
    datefin: [],
    agent: [],
    corps: []
  });

  constructor(
    protected changementService: ChangementService,
    protected agentService: AgentService,
    protected corpsService: CorpsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ changement }) => {
      if (!changement.id) {
        const today = moment().startOf('day');
        changement.dateDebut = today;
        changement.datefin = today;
      }

      this.updateForm(changement);

      this.agentService
        .query({ filter: 'changement-is-null' })
        .pipe(
          map((res: HttpResponse<IAgent[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAgent[]) => {
          if (!changement.agent || !changement.agent.id) {
            this.agents = resBody;
          } else {
            this.agentService
              .find(changement.agent.id)
              .pipe(
                map((subRes: HttpResponse<IAgent>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAgent[]) => (this.agents = concatRes));
          }
        });

      this.corpsService
        .query({ filter: 'changement-is-null' })
        .pipe(
          map((res: HttpResponse<ICorps[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICorps[]) => {
          if (!changement.corps || !changement.corps.id) {
            this.corps = resBody;
          } else {
            this.corpsService
              .find(changement.corps.id)
              .pipe(
                map((subRes: HttpResponse<ICorps>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICorps[]) => (this.corps = concatRes));
          }
        });
    });
  }

  updateForm(changement: IChangement): void {
    this.editForm.patchValue({
      id: changement.id,
      dateDebut: changement.dateDebut ? changement.dateDebut.format(DATE_TIME_FORMAT) : null,
      datefin: changement.datefin ? changement.datefin.format(DATE_TIME_FORMAT) : null,
      agent: changement.agent,
      corps: changement.corps
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const changement = this.createFromForm();
    if (changement.id !== undefined) {
      this.subscribeToSaveResponse(this.changementService.update(changement));
    } else {
      this.subscribeToSaveResponse(this.changementService.create(changement));
    }
  }

  private createFromForm(): IChangement {
    return {
      ...new Changement(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value ? moment(this.editForm.get(['dateDebut'])!.value, DATE_TIME_FORMAT) : undefined,
      datefin: this.editForm.get(['datefin'])!.value ? moment(this.editForm.get(['datefin'])!.value, DATE_TIME_FORMAT) : undefined,
      agent: this.editForm.get(['agent'])!.value,
      corps: this.editForm.get(['corps'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChangement>>): void {
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
