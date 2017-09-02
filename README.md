# Bookmarks

## Steps

### The usual setup

Create the usual setup (`package.json`, build scripts and so on). Take the chess-queen exercise as a base but instead of using `xt-sc-chess-queen`, you will use `xt-sc-bookmarks`.

### HTML

Here is the HTML code of your `src/index.html`:

````xml
<!DOCTYPE html>
<html>
<head>
  <title>Bookmarks</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<header>
  <form method="get" class="columns">
    <div class="grow rows">
      <div>
        <input required type="url" name="link" placeholder="https://devdocs.io" />
      </div>
      <div>
        <textarea name="notes" placeholder="Some notes about the link"></textarea>
      </div>
    </div>
    <div class="rows">
      <button class="grow">Save</button>
    </div>
  </form>
</header>
<main>
  <ul class="bookmarks">
    <!-- <li class="bookmark">
      <div>
        <a href="https://devdocs.io">https://devdocs.io</a>
        <p>Works offline</p>
      </div>
      <button class="remove">X</button>
    </li> -->
  </ul>

  <script type="text/javascript" src="bundle.js"></script>
</main>
</body>
</html>
````

### WebdriverIO spec

In order to pass the tests it is a requirement that Chrome runs in headless mode which means that your `test/wdio.conf.js` must have the following code in the `capabilities`
````js
// ...
        chromeOptions: {
          args: ['--headless', '--disable-gpu', '--window-size=1280,800']
        }
// ...
````

Then create a file `test/bookmarks.spec.js`

````js
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
````

You can make the test run on [travis-ci](https://travis-ci.org) by adding the following `.travis.yml` file at the root of your repository.

````yml
sudo: required
dist: trusty
language: node_js
addons:
  firefox: latest
node_js:
  - 8
before_install:
 - export CHROME_BIN=/usr/bin/google-chrome
 - export DISPLAY=:99.0
 - sh -e /etc/init.d/xvfb start
 - sleep 3 # give xvfb some time to start
 - sudo apt-get update
 - sudo apt-get install -y libappindicator1 fonts-liberation libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++
 - wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
 - sudo dpkg -i google-chrome*.deb

````


### Time for some design

Based on the test screenshots (whih you can find under `node_modules/xt-sc-bookmarks/sc`), recreate the design.

<details>
  <summary>CSS without values</summary>
  
````scss
*,
*:before,
*:after {
  box-sizing: /* ... */;
}

body {
  margin: /* ... */;
  padding: /* ... */;
  display: /* ... */;
  flex-direction: /* ... */;
  font-family: /* ... */;
  background-color: /* ... */;
  color: /* ... */;
}

body > header {
  background-color: /* ... */;
}

form,
.bookmarks {
  min-width: /* ... */;
  max-width: /* ... */;
  margin: /* ... */;
  padding: /* ... */;
}

form {
  input,
  textarea,
  button {
    font-size: /* ... */;
    border: /* ... */;
  }

  input,
  textarea {
    width: /* ... */;
    margin: /* ... */;
    padding: /* ... */;
    font-family: /* ... */;
    display: /* ... */;
  }

  input {
    border-radius: /* ... */;
  }

  textarea {
    border-radius: /* ... */;
    border-top: /* ... */;
  }

  button {
    border-left: /* ... */;
    border-radius: /* ... */;
  }
}



.columns,
.rows {
  display: /* ... */;
}

.columns {
  flex-direction: /* ... */;
}

.rows {
  flex-direction: /* ... */;
}

.grow {
  flex-grow: /* ... */;
}


.bookmarks {
  list-style: /* ... */;

  > li {
    border: /* ... */;
    border-radius: /* ... */;
    background-color: /* ... */;
    padding: /* ... */;
    margin: /* ... */;
    position: /* ... */;
  }

  a {
    font-size: /* ... */;
    text-decoration: /* ... */;
    color: /* ... */;
  }
}

.remove {
  display: /* ... */;
  text-align: /* ... */;
  width: /* ... */;
  height: /* ... */;
  padding: /* ... */;
  border-radius: /* ... */;
  border: /* ... */;
  position: /* ... */;
  right: /* ... */;
  top: /* ... */;
}
````
  
</details>

### More to come

The exercise is not finished yet...