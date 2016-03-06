'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor')['default'];

var _Symbol$iterator = require('babel-runtime/core-js/symbol/iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodashMemoize = require('lodash.memoize');

var _lodashMemoize2 = _interopRequireDefault(_lodashMemoize);

var _intlMessageformat = require('intl-messageformat');

var _intlMessageformat2 = _interopRequireDefault(_intlMessageformat);

/* eslint-disable no-console */

function isEmpty(data) {
  return !data || _Object$keys(data).length === 0;
}

var emptyLocaleDataWarned = {};
var notFoundKeyWarned = {};

function getLangString(locale, data, fullpath) {
  if (fullpath.filter(function (key) {
    return typeof key !== 'string';
  }).length > 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Invalid langpack path: ', fullpath);
    }
  }

  var str = fullpath.reduce(function (obj, key, idx) {
    if (idx === fullpath.length - 1) {
      if (obj && obj[key] !== undefined) {
        return obj[key].toString();
      } else {
        var keyPath = locale + ':' + fullpath.join('/');
        if (!isEmpty(data) && !notFoundKeyWarned[keyPath]) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Redux-Pagan: key was not found at path: ' + keyPath);
          }
          notFoundKeyWarned[keyPath] = true;
        }
        return key;
      }
    } else {
      return obj && obj[key] ? obj[key] : null;
    }
  }, data);

  if (str && !(typeof str === 'string')) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('String expected, got: ', str);
    }
  }

  return str;
}

function concatPath(locale, data, path, subpath) {
  if (isEmpty(data) && !emptyLocaleDataWarned[locale]) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Redux-Pagan: got empty data for locale \'' + locale + '\'');
    }
    emptyLocaleDataWarned[locale] = true;
  }

  if (subpath.length === 0) {
    return getLangString(locale, data, path);
  }
  var _path = [].concat(_toConsumableArray(path), _toConsumableArray(subpath));

  var i18nPartial = function i18nPartial() {
    for (var _len = arguments.length, _subpath = Array(_len), _key = 0; _key < _len; _key++) {
      _subpath[_key] = arguments[_key];
    }

    return concatPath(locale, data, _path, _subpath);
  };

  var memoizedI18nPartial = (0, _lodashMemoize2['default'])(i18nPartial, function () {
    for (var _len2 = arguments.length, _subpath = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _subpath[_key2] = arguments[_key2];
    }

    return [locale].concat(_toConsumableArray(_path), _subpath).join(',');
  });

  memoizedI18nPartial.toString = function () {
    return getLangString(locale, data, _path);
  };

  memoizedI18nPartial.format = function (values) {
    var str = getLangString(locale, data, _path);
    var formatter = new _intlMessageformat2['default'](str, locale);
    return formatter.format(values);
  };

  Object.defineProperty(memoizedI18nPartial, 's', {
    get: function get() {
      return this.toString();
    }
  });

  // proxy string methods
  _Object$getOwnPropertyNames(String.prototype).forEach(function (prop) {
    if (typeof String.prototype[prop] === 'function' && ['constructor', 'toString', 'valueOf'].indexOf(prop) === -1) {
      // find more elegant way maybe
      _Object$defineProperty(memoizedI18nPartial, prop, {
        get: function get() {
          return this.toString()[prop];
        }
      });
    }
  });

  var desc = _Object$getOwnPropertyDescriptor(memoizedI18nPartial, _Symbol$iterator);

  if (!desc || desc.configurable) {
    memoizedI18nPartial[_Symbol$iterator] = _regeneratorRuntime.mark(function callee$1$0() {
      return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return memoizedI18nPartial.toString();

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    });
  }

  return memoizedI18nPartial;
}

/* eslint-enable no-console */

exports['default'] = (0, _lodashMemoize2['default'])(function i18nResolver(locale, data, version) {
  for (var _len3 = arguments.length, path = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
    path[_key3 - 3] = arguments[_key3];
  }

  return concatPath(locale, data, [], path);
}, function (locale, data, version) {
  for (var _len4 = arguments.length, path = Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    path[_key4 - 3] = arguments[_key4];
  }

  return [locale, version].concat(path).join(',');
});
module.exports = exports['default'];