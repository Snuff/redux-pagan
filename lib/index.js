'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _actions = require('./actions');

Object.defineProperty(exports, 'loadLang', {
  enumerable: true,
  get: function get() {
    return _actions.loadLang;
  }
});

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

exports.i18n = _store2['default'];

var _i18nResolver2 = require('./i18nResolver');

var _i18nResolver3 = _interopRequireDefault(_i18nResolver2);

exports.i18nResolver = _i18nResolver3['default'];
Object.defineProperty(exports, 'LOAD_LANG', {
  enumerable: true,
  get: function get() {
    return _actions.LOAD_LANG;
  }
});
Object.defineProperty(exports, 'LOAD_LANG_SUCCESS', {
  enumerable: true,
  get: function get() {
    return _actions.LOAD_LANG_SUCCESS;
  }
});