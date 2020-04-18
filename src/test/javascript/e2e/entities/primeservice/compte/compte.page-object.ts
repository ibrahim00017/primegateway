import { element, by, ElementFinder } from 'protractor';

export class CompteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-compte div table .btn-danger'));
  title = element.all(by.css('jhi-compte div h2#page-heading span')).first();
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

export class CompteUpdatePage {
  pageTitle = element(by.id('jhi-compte-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  numeroCompteInput = element(by.id('field_numeroCompte'));
  statutInput = element(by.id('field_statut'));

  agentSelect = element(by.id('field_agent'));
  banqueSelect = element(by.id('field_banque'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumeroCompteInput(numeroCompte: string): Promise<void> {
    await this.numeroCompteInput.sendKeys(numeroCompte);
  }

  async getNumeroCompteInput(): Promise<string> {
    return await this.numeroCompteInput.getAttribute('value');
  }

  getStatutInput(): ElementFinder {
    return this.statutInput;
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

  async banqueSelectLastOption(): Promise<void> {
    await this.banqueSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async banqueSelectOption(option: string): Promise<void> {
    await this.banqueSelect.sendKeys(option);
  }

  getBanqueSelect(): ElementFinder {
    return this.banqueSelect;
  }

  async getBanqueSelectedOption(): Promise<string> {
    return await this.banqueSelect.element(by.css('option:checked')).getText();
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

export class CompteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-compte-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-compte'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
