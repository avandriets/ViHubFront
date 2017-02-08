import { ViHubFrontPage } from './app.po';

describe('vi-hub-front App', function() {
  let page: ViHubFrontPage;

  beforeEach(() => {
    page = new ViHubFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
