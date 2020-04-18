import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAgent, Agent } from 'app/shared/model/primeservice/agent.model';
import { AgentService } from './agent.service';
import { IFonction } from 'app/shared/model/primeservice/fonction.model';
import { FonctionService } from 'app/entities/primeservice/fonction/fonction.service';
import { IDirection } from 'app/shared/model/primeservice/direction.model';
import { DirectionService } from 'app/entities/primeservice/direction/direction.service';
import { IGrade } from 'app/shared/model/primeservice/grade.model';
import { GradeService } from 'app/entities/primeservice/grade/grade.service';
import { ICorps } from 'app/shared/model/primeservice/corps.model';
import { CorpsService } from 'app/entities/primeservice/corps/corps.service';

type SelectableEntity = IFonction | IDirection | IGrade | ICorps;

@Component({
  selector: 'jhi-agent-update',
  templateUrl: './agent-update.component.html'
})
export class AgentUpdateComponent implements OnInit {
  isSaving = false;
  fonctions: IFonction[] = [];
  directions: IDirection[] = [];
  grades: IGrade[] = [];
  corps: ICorps[] = [];

  editForm = this.fb.group({
    id: [],
    matricule: [null, [Validators.required]],
    nom: [],
    prenoms: [],
    dateNaiss: [],
    lieuNaiss: [],
    contact: [null, [Validators.required]],
    email: [null, [Validators.required]],
    adresse: [],
    datePriseServ: [],
    situationMatrim: [],
    nombreEnfts: [],
    statut: [],
    fonction: [],
    direction: [],
    grade: [],
    corps: []
  });

  constructor(
    protected agentService: AgentService,
    protected fonctionService: FonctionService,
    protected directionService: DirectionService,
    protected gradeService: GradeService,
    protected corpsService: CorpsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agent }) => {
      if (!agent.id) {
        const today = moment().startOf('day');
        agent.dateNaiss = today;
        agent.datePriseServ = today;
      }

      this.updateForm(agent);

      this.fonctionService
        .query({ filter: 'agent-is-null' })
        .pipe(
          map((res: HttpResponse<IFonction[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IFonction[]) => {
          if (!agent.fonction || !agent.fonction.id) {
            this.fonctions = resBody;
          } else {
            this.fonctionService
              .find(agent.fonction.id)
              .pipe(
                map((subRes: HttpResponse<IFonction>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IFonction[]) => (this.fonctions = concatRes));
          }
        });

      this.directionService
        .query({ filter: 'agent-is-null' })
        .pipe(
          map((res: HttpResponse<IDirection[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDirection[]) => {
          if (!agent.direction || !agent.direction.id) {
            this.directions = resBody;
          } else {
            this.directionService
              .find(agent.direction.id)
              .pipe(
                map((subRes: HttpResponse<IDirection>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDirection[]) => (this.directions = concatRes));
          }
        });

      this.gradeService
        .query({ filter: 'agent-is-null' })
        .pipe(
          map((res: HttpResponse<IGrade[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IGrade[]) => {
          if (!agent.grade || !agent.grade.id) {
            this.grades = resBody;
          } else {
            this.gradeService
              .find(agent.grade.id)
              .pipe(
                map((subRes: HttpResponse<IGrade>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IGrade[]) => (this.grades = concatRes));
          }
        });

      this.corpsService
        .query({ filter: 'agent-is-null' })
        .pipe(
          map((res: HttpResponse<ICorps[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICorps[]) => {
          if (!agent.corps || !agent.corps.id) {
            this.corps = resBody;
          } else {
            this.corpsService
              .find(agent.corps.id)
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

  updateForm(agent: IAgent): void {
    this.editForm.patchValue({
      id: agent.id,
      matricule: agent.matricule,
      nom: agent.nom,
      prenoms: agent.prenoms,
      dateNaiss: agent.dateNaiss ? agent.dateNaiss.format(DATE_TIME_FORMAT) : null,
      lieuNaiss: agent.lieuNaiss,
      contact: agent.contact,
      email: agent.email,
      adresse: agent.adresse,
      datePriseServ: agent.datePriseServ ? agent.datePriseServ.format(DATE_TIME_FORMAT) : null,
      situationMatrim: agent.situationMatrim,
      nombreEnfts: agent.nombreEnfts,
      statut: agent.statut,
      fonction: agent.fonction,
      direction: agent.direction,
      grade: agent.grade,
      corps: agent.corps
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agent = this.createFromForm();
    if (agent.id !== undefined) {
      this.subscribeToSaveResponse(this.agentService.update(agent));
    } else {
      this.subscribeToSaveResponse(this.agentService.create(agent));
    }
  }

  private createFromForm(): IAgent {
    return {
      ...new Agent(),
      id: this.editForm.get(['id'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenoms: this.editForm.get(['prenoms'])!.value,
      dateNaiss: this.editForm.get(['dateNaiss'])!.value ? moment(this.editForm.get(['dateNaiss'])!.value, DATE_TIME_FORMAT) : undefined,
      lieuNaiss: this.editForm.get(['lieuNaiss'])!.value,
      contact: this.editForm.get(['contact'])!.value,
      email: this.editForm.get(['email'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      datePriseServ: this.editForm.get(['datePriseServ'])!.value
        ? moment(this.editForm.get(['datePriseServ'])!.value, DATE_TIME_FORMAT)
        : undefined,
      situationMatrim: this.editForm.get(['situationMatrim'])!.value,
      nombreEnfts: this.editForm.get(['nombreEnfts'])!.value,
      statut: this.editForm.get(['statut'])!.value,
      fonction: this.editForm.get(['fonction'])!.value,
      direction: this.editForm.get(['direction'])!.value,
      grade: this.editForm.get(['grade'])!.value,
      corps: this.editForm.get(['corps'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgent>>): void {
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
