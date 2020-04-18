import { element, by, ElementFinder } from 'protractor';

export class GradeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-grade div table .btn-danger'));
  title = element.all(by.css('jhi-grade div h2#page-heading span')).first();
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

export class GradeUpdatePage {
  pageTitle = element(by.id('jhi-grade-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  gradeInput = element(by.id('field_grade'));
  indiceBaseInput = element(by.id('field_indiceBase'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setGradeInput(grade: string): Promise<void> {
    await this.gradeInput.sendKeys(grade);
  }

  async getGradeInput(): Promise<string> {
    return await this.gradeInput.getAttribute('value');
  }

  async setIndiceBaseInput(indiceBase: string): Promise<void> {
    await this.indiceBaseInput.sendKeys(indiceBase);
  }

  async getIndiceBaseInput(): Promise<string> {
    return await this.indiceBaseInput.getAttribute('value');
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

export class GradeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-grade-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-grade'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
