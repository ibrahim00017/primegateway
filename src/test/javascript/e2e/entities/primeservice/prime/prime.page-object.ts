import { element, by, ElementFinder } from 'protractor';

export class PrimeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-prime div table .btn-danger'));
  title = element.all(by.css('jhi-prime div h2#page-heading span')).first();
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

export class PrimeUpdatePage {
  pageTitle = element(by.id('jhi-prime-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  primeInput = element(by.id('field_prime'));
  tauxMensuelInput = element(by.id('field_tauxMensuel'));
  typePrimeSelect = element(by.id('field_typePrime'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPrimeInput(prime: string): Promise<void> {
    await this.primeInput.sendKeys(prime);
  }

  async getPrimeInput(): Promise<string> {
    return await this.primeInput.getAttribute('value');
  }

  async setTauxMensuelInput(tauxMensuel: string): Promise<void> {
    await this.tauxMensuelInput.sendKeys(tauxMensuel);
  }

  async getTauxMensuelInput(): Promise<string> {
    return await this.tauxMensuelInput.getAttribute('value');
  }

  async setTypePrimeSelect(typePrime: string): Promise<void> {
    await this.typePrimeSelect.sendKeys(typePrime);
  }

  async getTypePrimeSelect(): Promise<string> {
    return await this.typePrimeSelect.element(by.css('option:checked')).getText();
  }

  async typePrimeSelectLastOption(): Promise<void> {
    await this.typePrimeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class PrimeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-prime-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-prime'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
