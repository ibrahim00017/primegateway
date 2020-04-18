import { element, by, ElementFinder } from 'protractor';

export class DirectionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-direction div table .btn-danger'));
  title = element.all(by.css('jhi-direction div h2#page-heading span')).first();
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

export class DirectionUpdatePage {
  pageTitle = element(by.id('jhi-direction-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  sigleInput = element(by.id('field_sigle'));
  libelleDirectionInput = element(by.id('field_libelleDirection'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSigleInput(sigle: string): Promise<void> {
    await this.sigleInput.sendKeys(sigle);
  }

  async getSigleInput(): Promise<string> {
    return await this.sigleInput.getAttribute('value');
  }

  async setLibelleDirectionInput(libelleDirection: string): Promise<void> {
    await this.libelleDirectionInput.sendKeys(libelleDirection);
  }

  async getLibelleDirectionInput(): Promise<string> {
    return await this.libelleDirectionInput.getAttribute('value');
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

export class DirectionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-direction-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-direction'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
