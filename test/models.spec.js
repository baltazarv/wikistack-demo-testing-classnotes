const expect = require('chai').expect;
const db = require('../db');
const { Page, Tag, User } = db;

describe('models', ()=> {
  beforeEach(() => {
    return db.sync()
      .then(() => sdb.seed())
  })
  describe('seeded data', () => {
    let pages;
    beforeEach(() => {
      return Page.findAll({})
          .then( _pages => pages = _pages);
    });

    if('there are 3 pages', () => {
      expect(pages.length).to.equal(3);
    });
    describe('i love bitcoin page', () => {
      let page;
      beforeEach(() => {
        return Page.findOne({ where: { tittle: 'I love bitcoin'})
          .then(_page => {
            console.log(_page);
          })
      })
    });
    it('exists', () => {
      expect(page.to.be.ok);
    })
    it('has two tags', () => {
      expect(page.to.be.ok);
    })
  });
})
