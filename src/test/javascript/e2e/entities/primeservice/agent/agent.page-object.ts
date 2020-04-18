import { element, by, ElementFinder } from 'protractor';

export class AgentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-agent div table .btn-danger'));
  title = element.all(by.css('jhi-agent div h2#page-heading span')).first();
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

export class AgentUpdatePage {
  pageTitle = element(by.id('jhi-agent-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  matriculeInput = element(by.id('field_matricule'));
  nomInput = element(by.id('field_nom'));
  prenomsInput = element(by.id('field_prenoms'));
  dateNaissInput = element(by.id('field_dateNaiss'));
  lieuNaissInput = element(by.id('field_lieuNaiss'));
  contactInput = element(by.id('field_contact'));
  emailInput = element(by.id('field_email'));
  adresseInput = element(by.id('field_adresse'));
  datePriseServInput = element(by.id('field_datePriseServ'));
  situationMatrimSelect = element(by.id('field_situationMatrim'));
  nombreEnftsInput = element(by.id('field_nombreEnfts'));
  statutSelect = element(by.id('field_statut'));

  fonctionSelect = element(by.id('field_fonction'));
  directionSelect = element(by.id('field_direction'));
  gradeSelect = element(by.id('field_grade'));
  corpsSelect = element(by.id('field_corps'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMatriculeInput(matricule: string): Promise<void> {
    await this.matriculeInput.sendKeys(matricule);
  }

  async getMatriculeInput(): Promise<string> {
    return await this.matriculeInput.getAttribute('value');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setPrenomsInput(prenoms: string): Promise<void> {
    await this.prenomsInput.sendKeys(prenoms);
  }

  async getPrenomsInput(): Promise<string> {
    return await this.prenomsInput.getAttribute('value');
  }

  async setDateNaissInput(dateNaiss: string): Promise<void> {
    await this.dateNaissInput.sendKeys(dateNaiss);
  }

  async getDateNaissInput(): Promise<string> {
    return await this.dateNaissInput.getAttribute('value');
  }

  async setLieuNaissInput(lieuNaiss: string): Promise<void> {
    await this.lieuNaissInput.sendKeys(lieuNaiss);
  }

  async getLieuNaissInput(): Promise<string> {
    return await this.lieuNaissInput.getAttribute('value');
  }

  async setContactInput(contact: string): Promise<void> {
    await this.contactInput.sendKeys(contact);
  }

  async getContactInput(): Promise<string> {
    return await this.contactInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
  }

  async setDatePriseServInput(datePriseServ: string): Promise<void> {
    await this.datePriseServInput.sendKeys(datePriseServ);
  }

  async getDatePriseServInput(): Promise<string> {
    return await this.datePriseServInput.getAttribute('value');
  }

  async setSituationMatrimSelect(situationMatrim: string): Promise<void> {
    await this.situationMatrimSelect.sendKeys(situationMatrim);
  }

  async getSituationMatrimSelect(): Promise<string> {
    return await this.situationMatrimSelect.element(by.css('option:checked')).getText();
  }

  async situationMatrimSelectLastOption(): Promise<void> {
    await this.situationMatrimSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setNombreEnftsInput(nombreEnfts: string): Promise<void> {
    await this.nombreEnftsInput.sendKeys(nombreEnfts);
  }

  async getNombreEnftsInput(): Promise<string> {
    return await this.nombreEnftsInput.getAttribute('value');
  }

  async setStatutSelect(statut: string): Promise<void> {
    await this.statutSelect.sendKeys(statut);
  }

  async getStatutSelect(): Promise<string> {
    return await this.statutSelect.element(by.css('option:checked')).getText();
  }

  async statutSelectLastOption(): Promise<void> {
    await this.statutSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async fonctionSelectLastOption(): Promise<void> {
    await this.fonctionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async fonctionSelectOption(option: string): Promise<void> {
    await this.fonctionSelect.sendKeys(option);
  }

  getFonctionSelect(): ElementFinder {
    return this.fonctionSelect;
  }

  async getFonctionSelectedOption(): Promise<string> {
    return await this.fonctionSelect.element(by.css('option:checked')).getText();
  }

  async directionSelectLastOption(): Promise<void> {
    await this.directionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async directionSelectOption(option: string): Promise<void> {
    await this.directionSelect.sendKeys(option);
  }

  getDirectionSelect(): ElementFinder {
    return this.directionSelect;
  }

  async getDirectionSelectedOption(): Promise<string> {
    return await this.directionSelect.element(by.css('option:checked')).getText();
  }

  async gradeSelectLastOption(): Promise<void> {
    await this.gradeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async gradeSelectOption(option: string): Promise<void> {
    await this.gradeSelect.sendKeys(option);
  }

  getGradeSelect(): ElementFinder {
    return this.gradeSelect;
  }

  async getGradeSelectedOption(): Promise<string> {
    return await this.gradeSelect.element(by.css('option:checked')).getText();
  }

  async corpsSelectLastOption(): Promise<void> {
    await this.corpsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async corpsSelectOption(option: string): Promise<void> {
    await this.corpsSelect.sendKeys(option);
  }

  getCorpsSelect(): ElementFinder {
    return this.corpsSelect;
  }

  async getCorpsSelectedOption(): Promise<string> {
    return await this.corpsSelect.element(by.css('option:checked')).getText();
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

export class AgentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-agent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-agent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
