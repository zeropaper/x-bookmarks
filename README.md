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

  before(function() {
    browser.url('http://localhost:9090');
  });

  describe('normal design', function() {
    Object.keys(checkStyle.resolutions).forEach(key => {
      it('has the right styles for ' + key.split('-').join(' '), function () {
        checkStyle(browser, key, null, './docs/image-diffs', 5);
      });
    });
  });
});
````

### Time for some design

Based on the test screenshots (whih you can find under `node_modules/xt-sc-bookmarks/sc`), recreate the design.

### More to come

The exercise is not finished yet...