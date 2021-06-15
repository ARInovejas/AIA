"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _marked = /*#__PURE__*/regeneratorRuntime.mark(handlerOf),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(createPresetDescriptors),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(createPluginDescriptors),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(createDescriptors),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(createDescriptor);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCachedDescriptors = createCachedDescriptors;
exports.createUncachedDescriptors = createUncachedDescriptors;
exports.createDescriptor = createDescriptor;

function _gensync() {
  var data = require("gensync");

  _gensync = function _gensync() {
    return data;
  };

  return data;
}

var _files = require("./files");

var _item = require("./item");

var _caching = require("./caching");

var _resolveTargets = require("./resolve-targets");

function isEqualDescriptor(a, b) {
  return a.name === b.name && a.value === b.value && a.options === b.options && a.dirname === b.dirname && a.alias === b.alias && a.ownPass === b.ownPass && (a.file && a.file.request) === (b.file && b.file.request) && (a.file && a.file.resolved) === (b.file && b.file.resolved);
}

function handlerOf(value) {
  return regeneratorRuntime.wrap(function handlerOf$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", value);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function optionsWithResolvedBrowserslistConfigFile(options, dirname) {
  if (typeof options.browserslistConfigFile === "string") {
    options.browserslistConfigFile = (0, _resolveTargets.resolveBrowserslistConfigFile)(options.browserslistConfigFile, dirname);
  }

  return options;
}

function createCachedDescriptors(dirname, options, alias) {
  var plugins = options.plugins,
      presets = options.presets,
      passPerPreset = options.passPerPreset;

  return {
    options: optionsWithResolvedBrowserslistConfigFile(options, dirname),
    plugins: plugins ? function () {
      return createCachedPluginDescriptors(plugins, dirname)(alias);
    } : function () {
      return handlerOf([]);
    },
    presets: presets ? function () {
      return createCachedPresetDescriptors(presets, dirname)(alias)(!!passPerPreset);
    } : function () {
      return handlerOf([]);
    }
  };
}

function createUncachedDescriptors(dirname, options, alias) {
  var _plugins = void 0;
  var _presets = void 0;
  return {
    options: optionsWithResolvedBrowserslistConfigFile(options, dirname),

    plugins: /*#__PURE__*/regeneratorRuntime.mark(function plugins() {
      return regeneratorRuntime.wrap(function plugins$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_plugins) {
                _context2.next = 3;
                break;
              }

              return _context2.delegateYield(createPluginDescriptors(options.plugins || [], dirname, alias), "t0", 2);

            case 2:
              _plugins = _context2.t0;

            case 3:
              return _context2.abrupt("return", _plugins);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, plugins, this);
    }),
    presets: /*#__PURE__*/regeneratorRuntime.mark(function presets() {
      return regeneratorRuntime.wrap(function presets$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (_presets) {
                _context3.next = 3;
                break;
              }

              return _context3.delegateYield(createPresetDescriptors(options.presets || [], dirname, alias, !!options.passPerPreset), "t0", 2);

            case 2:
              _presets = _context3.t0;

            case 3:
              return _context3.abrupt("return", _presets);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, presets, this);
    })
  };
}

var PRESET_DESCRIPTOR_CACHE = new WeakMap();
var createCachedPresetDescriptors = (0, _caching.makeWeakCacheSync)(function (items, cache) {
  var dirname = cache.using(function (dir) {
    return dir;
  });
  return (0, _caching.makeStrongCacheSync)(function (alias) {
    return (0, _caching.makeStrongCache)( /*#__PURE__*/regeneratorRuntime.mark(function _callee(passPerPreset) {
      var descriptors;
      return regeneratorRuntime.wrap(function _callee$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.delegateYield(createPresetDescriptors(items, dirname, alias, passPerPreset), "t0", 1);

            case 1:
              descriptors = _context4.t0;
              return _context4.abrupt("return", descriptors.map(function (desc) {
                return loadCachedDescriptor(PRESET_DESCRIPTOR_CACHE, desc);
              }));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee, this);
    }));
  });
});
var PLUGIN_DESCRIPTOR_CACHE = new WeakMap();
var createCachedPluginDescriptors = (0, _caching.makeWeakCacheSync)(function (items, cache) {
  var dirname = cache.using(function (dir) {
    return dir;
  });
  return (0, _caching.makeStrongCache)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(alias) {
    var descriptors;
    return regeneratorRuntime.wrap(function _callee2$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.delegateYield(createPluginDescriptors(items, dirname, alias), "t0", 1);

          case 1:
            descriptors = _context5.t0;
            return _context5.abrupt("return", descriptors.map(function (desc) {
              return loadCachedDescriptor(PLUGIN_DESCRIPTOR_CACHE, desc);
            }));

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee2, this);
  }));
});
var DEFAULT_OPTIONS = {};

function loadCachedDescriptor(cache, desc) {
  var value = desc.value,
      _desc$options = desc.options,
      options = _desc$options === undefined ? DEFAULT_OPTIONS : _desc$options;

  if (options === false) return desc;
  var cacheByOptions = cache.get(value);

  if (!cacheByOptions) {
    cacheByOptions = new WeakMap();
    cache.set(value, cacheByOptions);
  }

  var possibilities = cacheByOptions.get(options);

  if (!possibilities) {
    possibilities = [];
    cacheByOptions.set(options, possibilities);
  }

  if (possibilities.indexOf(desc) === -1) {
    var matches = possibilities.filter(function (possibility) {
      return isEqualDescriptor(possibility, desc);
    });

    if (matches.length > 0) {
      return matches[0];
    }

    possibilities.push(desc);
  }

  return desc;
}

function createPresetDescriptors(items, dirname, alias, passPerPreset) {
  return regeneratorRuntime.wrap(function createPresetDescriptors$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.delegateYield(createDescriptors("preset", items, dirname, alias, passPerPreset), "t0", 1);

        case 1:
          return _context6.abrupt("return", _context6.t0);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked2, this);
}

function createPluginDescriptors(items, dirname, alias) {
  return regeneratorRuntime.wrap(function createPluginDescriptors$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.delegateYield(createDescriptors("plugin", items, dirname, alias), "t0", 1);

        case 1:
          return _context7.abrupt("return", _context7.t0);

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked3, this);
}

function createDescriptors(type, items, dirname, alias, ownPass) {
  var descriptors;
  return regeneratorRuntime.wrap(function createDescriptors$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.delegateYield(_gensync().all(items.map(function (item, index) {
            return createDescriptor(item, dirname, {
              type: type,
              alias: alias + "$" + index,
              ownPass: !!ownPass
            });
          })), "t0", 1);

        case 1:
          descriptors = _context8.t0;

          assertNoDuplicates(descriptors);
          return _context8.abrupt("return", descriptors);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked4, this);
}

function createDescriptor(pair, dirname, _ref) {
  var type = _ref.type,
      alias = _ref.alias,
      ownPass = _ref.ownPass;

  var desc, name, options, value, _value, _value2, _value3, _value4, file, filepath, resolver, request, _ref2;

  return regeneratorRuntime.wrap(function createDescriptor$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          desc = (0, _item.getItemDescriptor)(pair);

          if (!desc) {
            _context9.next = 3;
            break;
          }

          return _context9.abrupt("return", desc);

        case 3:
          name = void 0;
          options = void 0;
          value = pair;


          if (Array.isArray(value)) {
            if (value.length === 3) {
              _value = value;
              _value2 = _slicedToArray(_value, 3);
              value = _value2[0];
              options = _value2[1];
              name = _value2[2];
            } else {
              _value3 = value;
              _value4 = _slicedToArray(_value3, 2);
              value = _value4[0];
              options = _value4[1];
            }
          }

          file = undefined;
          filepath = null;

          if (!(typeof value === "string")) {
            _context9.next = 19;
            break;
          }

          if (!(typeof type !== "string")) {
            _context9.next = 12;
            break;
          }

          throw new Error("To resolve a string-based item, the type of item must be given");

        case 12:
          resolver = type === "plugin" ? _files.loadPlugin : _files.loadPreset;
          request = value;
          return _context9.delegateYield(resolver(value, dirname), "t0", 15);

        case 15:
          _ref2 = _context9.t0;
          filepath = _ref2.filepath;
          value = _ref2.value;

          file = {
            request: request,
            resolved: filepath
          };

        case 19:
          if (value) {
            _context9.next = 21;
            break;
          }

          throw new Error("Unexpected falsy value: " + String(value));

        case 21:
          if (!((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value.__esModule)) {
            _context9.next = 27;
            break;
          }

          if (!value.default) {
            _context9.next = 26;
            break;
          }

          value = value.default;
          _context9.next = 27;
          break;

        case 26:
          throw new Error("Must export a default export when using ES6 modules.");

        case 27:
          if (!((typeof value === "undefined" ? "undefined" : _typeof(value)) !== "object" && typeof value !== "function")) {
            _context9.next = 29;
            break;
          }

          throw new Error("Unsupported format: " + (typeof value === "undefined" ? "undefined" : _typeof(value)) + ". Expected an object or a function.");

        case 29:
          if (!(filepath !== null && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value)) {
            _context9.next = 31;
            break;
          }

          throw new Error("Plugin/Preset files are not allowed to export objects, only functions. In " + filepath);

        case 31:
          return _context9.abrupt("return", {
            name: name,
            alias: filepath || alias,
            value: value,
            options: options,
            dirname: dirname,
            ownPass: ownPass,
            file: file
          });

        case 32:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked5, this);
}

function assertNoDuplicates(items) {
  var map = new Map();

  var _loop = function _loop(item) {
    if (typeof item.value !== "function") return "continue";
    var nameMap = map.get(item.value);

    if (!nameMap) {
      nameMap = new Set();
      map.set(item.value, nameMap);
    }

    if (nameMap.has(item.name)) {
      var conflicts = items.filter(function (i) {
        return i.value === item.value;
      });
      throw new Error(["Duplicate plugin/preset detected.", "If you'd like to use two separate instances of a plugin,", "they need separate names, e.g.", "", "  plugins: [", "    ['some-plugin', {}],", "    ['some-plugin', {}, 'some unique name'],", "  ]", "", "Duplicates detected are:", "" + JSON.stringify(conflicts, null, 2)].join("\n"));
    }

    nameMap.add(item.name);
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      var _ret = _loop(item);

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}