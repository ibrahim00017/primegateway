import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PromotionComponentsPage, PromotionDeleteDialog, PromotionUpdatePage } from './promotion.page-object';

const expect = chai.expect;

describe('Promotion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let promotionComponentsPage: PromotionComponentsPage;
  let promotionUpdatePage: PromotionUpdatePage;
  let promotionDeleteDialog: PromotionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Promotions', async () => {
    await navBarPage.goToEntity('promotion');
    promotionComponentsPage = new PromotionComponentsPage();
    await browser.wait(ec.visibilityOf(promotionComponentsPage.title), 5000);
    expect(await promotionComponentsPage.getTitle()).to.eq('primegatewayApp.primeservicePromotion.home.title');
    await browser.wait(ec.or(ec.visibilityOf(promotionComponentsPage.entities), ec.visibilityOf(promotionComponentsPage.noResult)), 1000);
  });

  it('should load create Promotion page', async () => {
    await promotionComponentsPage.clickOnCreateButton();
    promotionUpdatePage = new PromotionUpdatePage();
    expect(await promotionUpdatePage.getPageTitle()).to.eq('primegatewayApp.primeservicePromotion.home.createOrEditLabel');
    await promotionUpdatePage.cancel();
  });

  it('should create and save Promotions', async () => {
    const nbButtonsBeforeCreate = await promotionComponentsPage.countDeleteButtons();

    await promotionComponentsPage.clickOnCreateButton();

    await promise.all([
      promotionUpdatePage.setDateDebutInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      promotionUpdatePage.setDateFinInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      promotionUpdatePage.agentSelectLastOption(),
      promotionUpdatePage.fonctionSelectLastOption()
    ]);

    expect(await promotionUpdatePage.getDateDebutInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateDebut value to be equals to 2000-12-31'
    );
    expect(await promotionUpdatePage.getDateFinInput()).to.contain('2001-01-01T02:30', 'Expected dateFin value to be equals to 2000-12-31');

    await promotionUpdatePage.save();
    expect(await promotionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await promotionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Promotion', async () => {
    const nbButtonsBeforeDelete = await promotionComponentsPage.countDeleteButtons();
    await promotionComponentsPage.clickOnLastDeleteButton();

    promotionDeleteDialog = new PromotionDeleteDialog();
    expect(await promotionDeleteDialog.getDialogTitle()).to.eq('primegatewayApp.primeservicePromotion.delete.question');
    await promotionDeleteDialog.clickOnConfirmButton();

    expect(await promotionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
