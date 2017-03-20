import { VirtualtreePage } from './app.po';

describe('virtualtree App', () => {
  let page: VirtualtreePage;

  beforeEach(() => {
    page = new VirtualtreePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
