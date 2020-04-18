import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICompte, Compte } from 'app/shared/model/primeservice/compte.model';
import { CompteService } from './compte.service';
import { IAgent } from 'app/shared/model/primeservice/agent.model';
import { AgentService } from 'app/entities/primeservice/agent/agent.service';
import { IBanque } from 'app/shared/model/primeservice/banque.model';
import { BanqueService } from 'app/entities/primeservice/banque/banque.service';

type SelectableEntity = IAgent | IBanque;

@Component({
  selector: 'jhi-compte-update',
  templateUrl: './compte-update.component.html'
})
export class CompteUpdateComponent implements OnInit {
  isSaving = false;
  agents: IAgent[] = [];
  banques: IBanque[] = [];

  editForm = this.fb.group({
    id: [],
    numeroCompte: [null, [Validators.required]],
    statut: [],
    agent: [],
    banque: []
  });

  constructor(
    protected compteService: CompteService,
    protected agentService: AgentService,
    protected banqueService: BanqueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compte }) => {
      this.updateForm(compte);

      this.agentService.query().subscribe((res: HttpResponse<IAgent[]>) => (this.agents = res.body || []));

      this.banqueService.query().subscribe((res: HttpResponse<IBanque[]>) => (this.banques = res.body || []));
    });
  }

  updateForm(compte: ICompte): void {
    this.editForm.patchValue({
      id: compte.id,
      numeroCompte: compte.numeroCompte,
      statut: compte.statut,
      agent: compte.agent,
      banque: compte.banque
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const compte = this.createFromForm();
    if (compte.id !== undefined) {
      this.subscribeToSaveResponse(this.compteService.update(compte));
    } else {
      this.subscribeToSaveResponse(this.compteService.create(compte));
    }
  }

  private createFromForm(): ICompte {
    return {
      ...new Compte(),
      id: this.editForm.get(['id'])!.value,
      numeroCompte: this.editForm.get(['numeroCompte'])!.value,
      statut: this.editForm.get(['statut'])!.value,
      agent: this.editForm.get(['agent'])!.value,
      banque: this.editForm.get(['banque'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompte>>): void {
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
