const assert = require('assert');

const checkStyle = require('xt-sc-bookmarks');

describe('Bookmarks tool', function() {
  var elements;
  const headless = ((browser.desiredCapabilities.chromeOptions || {}).args || []).indexOf('--headless') > -1;

  before(function() {
    browser.url('http://localhost:9090');
    browser.execute(function() {
      localStorage.removeItem('bookmraks');
    });
  });


  describe('normal design', function() {
    Object.keys(checkStyle.resolutions).forEach(key => {
      (headless ? it : xit)('has the right styles for ' + key.split('-').join(' '), function () {
        checkStyle(browser, key, null, './docs/image-diffs', 5);
      });
    });
  });


  describe('saving a bookmark', function() {
    var bookmarks;


    it('requires a url', function() {
      // by not giving the url before the first click of the 3 clicks
      // and checking
      $('[name=notes]').setValue('My personal website');
      $('form button').click();

      $('[name=link]').setValue('https://irata.ch');
      $('form button').click();

      $('[name=link]').setValue('https://devdocs.io');
      $('[name=notes]').setValue('Offline available documention for development');
      $('form button').click();
    });


    it('writes in the localStorage bookmarks', function() {
      bookmarks = browser.execute(function() {
        return localStorage.bookmarks;
      }).value;

      assert(typeof bookmarks, 'string');
    });


    it('has written valid JSON', function() {
      // JSON.parse throws an Error if the string cannot be parsed
      // (which makes the test fail)
      bookmarks = JSON.parse(bookmarks);
    });


    it('has 2 bookmarks', function() {
      assert(Array.isArray(bookmarks));
      assert(bookmarks.length === 2);
    });
  });


  describe('removing a bookmark', function() {
    var bookmarks;


    it('can be done by clicking the remove button', function() {
      $('.bookmarks button').click();
    });


    it('writes in the localStorage bookmarks', function() {
      bookmarks = browser.execute(function() {
        return localStorage.bookmarks;
      }).value;

      assert(typeof bookmarks, 'string');
    });


    it('has written valid JSON', function() {
      bookmarks = JSON.parse(bookmarks);
    });


    it('has 1 bookmark', function() {
      assert(Array.isArray(bookmarks));
      assert(bookmarks.length === 1);
    });
  });
});