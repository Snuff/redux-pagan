'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = i18n;

var _actionTypes = require('./actionTypes');

var _i18nResolver = require('./i18nResolver');

var _i18nResolver2 = _interopRequireDefault(_i18nResolver);

var DEFAULT_STATE = {
  get: function get() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _i18nResolver2['default'].apply(undefined, [null, {}, 0].concat(args));
  },
  __version__: 0
};

var mergeLang = function mergeLang(state, action) {
  return _extends({}, state, {
    data: _extends({}, state.data, _defineProperty({}, action.locale, action.lang)),
    locale: action.locale,
    get: function get() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _i18nResolver2['default'].apply(undefined, [this.locale, this.data[this.locale], this.__version__].concat(args));
    },
    __version__: state.__version__ + 1
  });
};

function i18n(state, action) {
  if (state === undefined) state = DEFAULT_STATE;

  return (_defineProperty({}, _actionTypes.LOAD_LANG_SUCCESS, mergeLang)[action.type] || function (s) {
    return s;
  })(state, action);
}

module.exports = exports['default'];