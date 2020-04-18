import { element, by, ElementFinder } from 'protractor';

export class ChangementComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-changement div table .btn-danger'));
  title = element.all(by.css('jhi-changement div h2#page-heading span')).first();
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

export class ChangementUpdatePage {
  pageTitle = element(by.id('jhi-changement-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateDebutInput = element(by.id('field_dateDebut'));
  datefinInput = element(by.id('field_datefin'));

  agentSelect = element(by.id('field_agent'));
  corpsSelect = element(by.id('field_corps'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateDebutInput(dateDebut: string): Promise<void> {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput(): Promise<string> {
    return await this.dateDebutInput.getAttribute('value');
  }

  async setDatefinInput(datefin: string): Promise<void> {
    await this.datefinInput.sendKeys(datefin);
  }

  async getDatefinInput(): Promise<string> {
    return await this.datefinInput.getAttribute('value');
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

export class ChangementDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-changement-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-changement'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
