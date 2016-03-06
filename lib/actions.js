'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.loadLang = loadLang;

var _actionTypes = require('./actionTypes');

function loadLang(locale, data) {
  var _this = this;

  return function callee$1$0(dispatch) {
    var loader, lang;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          dispatch({
            type: _actionTypes.LOAD_LANG,
            locale: locale
          });

          loader = typeof data === 'function' ? data(locale) : data;
          lang = undefined;

          if (!(typeof loader === 'function')) {
            context$2$0.next = 9;
            break;
          }

          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(loader());

        case 6:
          lang = context$2$0.sent;
          context$2$0.next = 10;
          break;

        case 9:
          lang = loader;

        case 10:

          dispatch({
            type: _actionTypes.LOAD_LANG_SUCCESS,
            locale: locale,
            lang: lang
          });

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };
}