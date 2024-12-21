// ==UserScript==
// @name          aboutNewTabConfig.uc.mjs
// @author        SeleneCosmia
// @onlyonce
// @version       1.0.0
// ==/UserScript==

import {
  Prefs,
  Windows
} from 'chrome://userchromejs/content/uc_api.sys.mjs'

(() => {
  const PREF_NEWTAB = 'browser.newtab.url';
  const DEFAULT_URL = 'about:blank';

  const { AboutNewTab } =
    ChromeUtils.importESModule('resource:///modules/AboutNewTab.sys.mjs');
// ----------------------------------------------------------------------|

  function init() {
    // get pref if it already exists and store it in a variable
    var newTabURL = Prefs.get(PREF_NEWTAB);

    // if pref doesn't exist then create it and
    // set it to 'about:blank' as a default value
    if (!newTabURL.exists()) {
      Prefs.set(PREF_NEWTAB, DEFAULT_URL);
    }

    /** ensure that our default isn't registered as a user value
      * if (newTabURL.value === 'about:blank') {
      *   return newTabURL.hasUserValue() === false
      * }
      */

    // Override the browser's builtin new tab page with our own config
    // and add a listener to update the config when its value is changed
    AboutNewTab._newTabURL = newTabURL;
    let newTabListener = Prefs.addListener(
      PREF_NEWTAB,
      (value) => {
        AboutNewTab._newTabURL = value;
      }
    );
  }
  let loading = Windows.waitWindowLoading(window);
  
  loading.then(
    () => init()
  )
})();
