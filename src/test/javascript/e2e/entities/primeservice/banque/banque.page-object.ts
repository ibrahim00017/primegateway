import { element, by, ElementFinder } from 'protractor';

export class BanqueComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-banque div table .btn-danger'));
  title = element.all(by.css('jhi-banque div h2#page-heading span')).first();
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

export class BanqueUpdatePage {
  pageTitle = element(by.id('jhi-banque-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  codeBanqueInput = element(by.id('field_codeBanque'));
  nomBanqueInput = element(by.id('field_nomBanque'));
  siegeSocialInput = element(by.id('field_siegeSocial'));
  telephoneInput = element(by.id('field_telephone'));
  faxInput = element(by.id('field_fax'));
  emailInput = element(by.id('field_email'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeBanqueInput(codeBanque: string): Promise<void> {
    await this.codeBanqueInput.sendKeys(codeBanque);
  }

  async getCodeBanqueInput(): Promise<string> {
    return await this.codeBanqueInput.getAttribute('value');
  }

  async setNomBanqueInput(nomBanque: string): Promise<void> {
    await this.nomBanqueInput.sendKeys(nomBanque);
  }

  async getNomBanqueInput(): Promise<string> {
    return await this.nomBanqueInput.getAttribute('value');
  }

  async setSiegeSocialInput(siegeSocial: string): Promise<void> {
    await this.siegeSocialInput.sendKeys(siegeSocial);
  }

  async getSiegeSocialInput(): Promise<string> {
    return await this.siegeSocialInput.getAttribute('value');
  }

  async setTelephoneInput(telephone: string): Promise<void> {
    await this.telephoneInput.sendKeys(telephone);
  }

  async getTelephoneInput(): Promise<string> {
    return await this.telephoneInput.getAttribute('value');
  }

  async setFaxInput(fax: string): Promise<void> {
    await this.faxInput.sendKeys(fax);
  }

  async getFaxInput(): Promise<string> {
    return await this.faxInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
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

export class BanqueDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-banque-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-banque'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
