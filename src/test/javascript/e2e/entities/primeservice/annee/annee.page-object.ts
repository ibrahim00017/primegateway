import { element, by, ElementFinder } from 'protractor';

export class AnneeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-annee div table .btn-danger'));
  title = element.all(by.css('jhi-annee div h2#page-heading span')).first();
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

export class AnneeUpdatePage {
  pageTitle = element(by.id('jhi-annee-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codeAnneeInput = element(by.id('field_codeAnnee'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeAnneeInput(codeAnnee: string): Promise<void> {
    await this.codeAnneeInput.sendKeys(codeAnnee);
  }

  async getCodeAnneeInput(): Promise<string> {
    return await this.codeAnneeInput.getAttribute('value');
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

export class AnneeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-annee-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-annee'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
