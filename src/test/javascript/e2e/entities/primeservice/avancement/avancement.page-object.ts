import { element, by, ElementFinder } from 'protractor';

export class AvancementComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-avancement div table .btn-danger'));
  title = element.all(by.css('jhi-avancement div h2#page-heading span')).first();
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

export class AvancementUpdatePage {
  pageTitle = element(by.id('jhi-avancement-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateDebutInput = element(by.id('field_dateDebut'));
  dateFinInput = element(by.id('field_dateFin'));

  gradeSelect = element(by.id('field_grade'));
  agentSelect = element(by.id('field_agent'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateDebutInput(dateDebut: string): Promise<void> {
    await this.dateDebutInput.sendKeys(dateDebut);
  }

  async getDateDebutInput(): Promise<string> {
    return await this.dateDebutInput.getAttribute('value');
  }

  async setDateFinInput(dateFin: string): Promise<void> {
    await this.dateFinInput.sendKeys(dateFin);
  }

  async getDateFinInput(): Promise<string> {
    return await this.dateFinInput.getAttribute('value');
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

export class AvancementDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-avancement-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-avancement'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
