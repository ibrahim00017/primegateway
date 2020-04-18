import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { DirectionComponentsPage, DirectionDeleteDialog, DirectionUpdatePage } from './direction.page-object';

const expect = chai.expect;

describe('Direction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let directionComponentsPage: DirectionComponentsPage;
  let directionUpdatePage: DirectionUpdatePage;
  let directionDeleteDialog: DirectionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Directions', async () => {
    await navBarPage.goToEntity('direction');
    directionComponentsPage = new DirectionComponentsPage();
    await browser.wait(ec.visibilityOf(directionComponentsPage.title), 5000);
    expect(await directionComponentsPage.getTitle()).to.eq('primegatewayApp.primeserviceDirection.home.title');
    await browser.wait(ec.or(ec.visibilityOf(directionComponentsPage.entities), ec.visibilityOf(directionComponentsPage.noResult)), 1000);
  });

  it('should load create Direction page', async () => {
    await directionComponentsPage.clickOnCreateButton();
    directionUpdatePage = new DirectionUpdatePage();
    expect(await directionUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeserviceDirection.home.createOrEditLabel');
    await directionUpdatePage.cancel();
  });

  it('should create and save Directions', async () => {
    const nbButtonsBeforeCreate = await directionComponentsPage.countDeleteButtons();

    await directionComponentsPage.clickOnCreateButton();

    await promise.all([directionUpdatePage.setSigleInput('sigle'), directionUpdatePage.setLibelleDirectionInput('libelleDirection')]);

    expect(await directionUpdatePage.getSigleInput()).to.eq('sigle', 'Expected Sigle value to be equals to sigle');
    expect(await directionUpdatePage.getLibelleDirectionInput()).to.eq(
      'libelleDirection',
      'Expected LibelleDirection value to be equals to libelleDirection'
    );

    await directionUpdatePage.save();
    expect(await directionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await directionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Direction', async () => {
    const nbButtonsBeforeDelete = await directionComponentsPage.countDeleteButtons();
    await directionComponentsPage.clickOnLastDeleteButton();

    directionDeleteDialog = new DirectionDeleteDialog();
    expect(await directionDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeserviceDirection.delete.question');
    await directionDeleteDialog.clickOnConfirmButton();

    expect(await directionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
