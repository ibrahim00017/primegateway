import { element, by, ElementFinder } from 'protractor';

export class AllouerComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-allouer div table .btn-danger'));
  title = element.all(by.css('jhi-allouer div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class AllouerUpdatePage {
  pageTitle = element(by.id('jhi-allouer-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  noteInput = element(by.id('field_note'));
  nombreJoursInput = element(by.id('field_nombreJours'));
  montantInput = element(by.id('field_montant'));

  agentSelect = element(by.id('field_agent'));
  primeSelect = element(by.id('field_prime'));
  anneeSelect = element(by.id('field_annee'));
  trimestreSelect = element(by.id('field_trimestre'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNoteInput(note: string): Promise<void> {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput(): Promise<string> {
    return await this.noteInput.getAttribute('value');
  }

  async setNombreJoursInput(nombreJours: string): Promise<void> {
    await this.nombreJoursInput.sendKeys(nombreJours);
  }

  async getNombreJoursInput(): Promise<string> {
    return await this.nombreJoursInput.getAttribute('value');
  }

  async setMontantInput(montant: string): Promise<void> {
    await this.montantInput.sendKeys(montant);
  }

  async getMontantInput(): Promise<string> {
    return await this.montantInput.getAttribute('value');
  }

  async agentSelectLastOption(): Promise<void> {
    await this.agentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async agentSelectOption(option: string): Promise<void> {
    await this.agentSelect.sendKeys(option);
  }

  getAgentSelect(): ElementFinder {
    return this.agentSelect;
  }

  async getAgentSelectedOption(): Promise<string> {
    return await this.agentSelect.element(by.css('option:checked')).getText();
  }

  async primeSelectLastOption(): Promise<void> {
    await this.primeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async primeSelectOption(option: string): Promise<void> {
    await this.primeSelect.sendKeys(option);
  }

  getPrimeSelect(): ElementFinder {
    return this.primeSelect;
  }

  async getPrimeSelectedOption(): Promise<string> {
    return await this.primeSelect.element(by.css('option:checked')).getText();
  }

  async anneeSelectLastOption(): Promise<void> {
    await this.anneeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async anneeSelectOption(option: string): Promise<void> {
    await this.anneeSelect.sendKeys(option);
  }

  getAnneeSelect(): ElementFinder {
    return this.anneeSelect;
  }

  async getAnneeSelectedOption(): Promise<string> {
    return await this.anneeSelect.element(by.css('option:checked')).getText();
  }

  async trimestreSelectLastOption(): Promise<void> {
    await this.trimestreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async trimestreSelectOption(option: string): Promise<void> {
    await this.trimestreSelect.sendKeys(option);
  }

  getTrimestreSelect(): ElementFinder {
    return this.trimestreSelect;
  }

  async getTrimestreSelectedOption(): Promise<string> {
    return await this.trimestreSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AllouerDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-allouer-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-allouer'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
