import { element, by, ElementFinder } from 'protractor';

export class CorpsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-corps div table .btn-danger'));
  title = element.all(by.css('jhi-corps div h2#page-heading span')).first();
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

export class CorpsUpdatePage {
  pageTitle = element(by.id('jhi-corps-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  libelleCorpsInput = element(by.id('field_libelleCorps'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLibelleCorpsInput(libelleCorps: string): Promise<void> {
    await this.libelleCorpsInput.sendKeys(libelleCorps);
  }

  async getLibelleCorpsInput(): Promise<string> {
    return await this.libelleCorpsInput.getAttribute('value');
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

export class CorpsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-corps-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-corps'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
