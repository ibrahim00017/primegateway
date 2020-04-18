import { element, by, ElementFinder } from 'protractor';

export class TrimestreComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-trimestre div table .btn-danger'));
  title = element.all(by.css('jhi-trimestre div h2#page-heading span')).first();
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

export class TrimestreUpdatePage {
  pageTitle = element(by.id('jhi-trimestre-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codeTrimestreInput = element(by.id('field_codeTrimestre'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeTrimestreInput(codeTrimestre: string): Promise<void> {
    await this.codeTrimestreInput.sendKeys(codeTrimestre);
  }

  async getCodeTrimestreInput(): Promise<string> {
    return await this.codeTrimestreInput.getAttribute('value');
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

export class TrimestreDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-trimestre-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-trimestre'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
