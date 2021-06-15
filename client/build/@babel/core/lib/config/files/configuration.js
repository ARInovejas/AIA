"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _marked = /*#__PURE__*/regeneratorRuntime.mark(findRelativeConfig),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(loadOneConfig),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(loadConfig),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(resolveShowConfigPath);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findConfigUpwards = findConfigUpwards;
exports.findRelativeConfig = findRelativeConfig;
exports.findRootConfig = findRootConfig;
exports.loadConfig = loadConfig;
exports.resolveShowConfigPath = resolveShowConfigPath;
exports.ROOT_CONFIG_FILENAMES = void 0;

function _debug() {
  var data = require("debug");

  _debug = function _debug() {
    return data;
  };

  return data;
}

function _fs() {
  var data = require("fs");

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _path() {
  var data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

function _json() {
  var data = require("json5");

  _json = function _json() {
    return data;
  };

  return data;
}

function _gensync() {
  var data = require("gensync");

  _gensync = function _gensync() {
    return data;
  };

  return data;
}

var _caching = require("../caching");

var _configApi = require("../helpers/config-api");

var _utils = require("./utils");

var _moduleTypes = require("./module-types");

var _patternToRegex = require("../pattern-to-regex");

var fs = require("../../gensync-utils/fs");

function _module() {
  var data = require("module");

  _module = function _module() {
    return data;
  };

  return data;
}

var debug = _debug()("babel:config:loading:files:configuration");

var ROOT_CONFIG_FILENAMES = ["babel.config.js", "babel.config.cjs", "babel.config.mjs", "babel.config.json"];
exports.ROOT_CONFIG_FILENAMES = ROOT_CONFIG_FILENAMES;
var RELATIVE_CONFIG_FILENAMES = [".babelrc", ".babelrc.js", ".babelrc.cjs", ".babelrc.mjs", ".babelrc.json"];
var BABELIGNORE_FILENAME = ".babelignore";

function findConfigUpwards(rootDir) {
  var dirname = rootDir;

  for (;;) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ROOT_CONFIG_FILENAMES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var filename = _step.value;

        if (_fs().existsSync(_path().join(dirname, filename))) {
          return dirname;
        }
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

    var nextDir = _path().dirname(dirname);

    if (dirname === nextDir) break;
    dirname = nextDir;
  }

  return null;
}

function findRelativeConfig(packageData, envName, caller) {
  var config, ignore, dirname, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, loc, _packageData$pkg, ignoreLoc;

  return regeneratorRuntime.wrap(function findRelativeConfig$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          config = null;
          ignore = null;
          dirname = _path().dirname(packageData.filepath);
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 6;
          _iterator2 = packageData.directories[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 21;
            break;
          }

          loc = _step2.value;

          if (config) {
            _context.next = 13;
            break;
          }

          return _context.delegateYield(loadOneConfig(RELATIVE_CONFIG_FILENAMES, loc, envName, caller, ((_packageData$pkg = packageData.pkg) == null ? void 0 : _packageData$pkg.dirname) === loc ? packageToBabelConfig(packageData.pkg) : null), "t0", 12);

        case 12:
          config = _context.t0;

        case 13:
          if (ignore) {
            _context.next = 18;
            break;
          }

          ignoreLoc = _path().join(loc, BABELIGNORE_FILENAME);
          return _context.delegateYield(readIgnoreConfig(ignoreLoc), "t1", 16);

        case 16:
          ignore = _context.t1;


          if (ignore) {
            debug("Found ignore %o from %o.", ignore.filepath, dirname);
          }

        case 18:
          _iteratorNormalCompletion2 = true;
          _context.next = 8;
          break;

        case 21:
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t2 = _context["catch"](6);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t2;

        case 27:
          _context.prev = 27;
          _context.prev = 28;

          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }

        case 30:
          _context.prev = 30;

          if (!_didIteratorError2) {
            _context.next = 33;
            break;
          }

          throw _iteratorError2;

        case 33:
          return _context.finish(30);

        case 34:
          return _context.finish(27);

        case 35:
          return _context.abrupt("return", {
            config: config,
            ignore: ignore
          });

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[6, 23, 27, 35], [28,, 30, 34]]);
}

function findRootConfig(dirname, envName, caller) {
  return loadOneConfig(ROOT_CONFIG_FILENAMES, dirname, envName, caller);
}

function loadOneConfig(names, dirname, envName, caller) {
  var previousConfig = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var configs, config;
  return regeneratorRuntime.wrap(function loadOneConfig$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.delegateYield(_gensync().all(names.map(function (filename) {
            return readConfig(_path().join(dirname, filename), envName, caller);
          })), "t0", 1);

        case 1:
          configs = _context2.t0;
          config = configs.reduce(function (previousConfig, config) {
            if (config && previousConfig) {
              throw new Error("Multiple configuration files found. Please remove one:\n" + (" - " + _path().basename(previousConfig.filepath) + "\n") + (" - " + config.filepath + "\n") + ("from " + dirname));
            }

            return config || previousConfig;
          }, previousConfig);


          if (config) {
            debug("Found configuration %o from %o.", config.filepath, dirname);
          }

          return _context2.abrupt("return", config);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function loadConfig(name, dirname, envName, caller) {
  var filepath, conf;
  return regeneratorRuntime.wrap(function loadConfig$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          filepath = (function (v, w) {
            return v = v.split("."), w = w.split("."), +v[0] > +w[0] || v[0] == w[0] && +v[1] >= +w[1];
          }(process.versions.node, "8.9") ? require.resolve : function (r, _ref) {
            var _ref$paths = _slicedToArray(_ref.paths, 1),
                b = _ref$paths[0];

            var M = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : require("module");

            var f = M._findPath(r, M._nodeModulePaths(b).concat(b));

            if (f) return f;
            f = new Error("Cannot resolve module '" + r + "'");
            f.code = "MODULE_NOT_FOUND";
            throw f;
          })(name, {
            paths: [dirname]
          });
          return _context3.delegateYield(readConfig(filepath, envName, caller), "t0", 2);

        case 2:
          conf = _context3.t0;

          if (conf) {
            _context3.next = 5;
            break;
          }

          throw new Error("Config file " + filepath + " contains no configuration data");

        case 5:

          debug("Loaded config %o from %o.", name, dirname);
          return _context3.abrupt("return", conf);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function readConfig(filepath, envName, caller) {
  var ext = _path().extname(filepath);

  return ext === ".js" || ext === ".cjs" || ext === ".mjs" ? readConfigJS(filepath, {
    envName: envName,
    caller: caller
  }) : readConfigJSON5(filepath);
}

var LOADING_CONFIGS = new Set();
var readConfigJS = (0, _caching.makeStrongCache)( /*#__PURE__*/regeneratorRuntime.mark(function readConfigJS(filepath, cache) {
  var options, assertCache;
  return regeneratorRuntime.wrap(function readConfigJS$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (_fs().existsSync(filepath)) {
            _context4.next = 3;
            break;
          }

          cache.never();
          return _context4.abrupt("return", null);

        case 3:
          if (!LOADING_CONFIGS.has(filepath)) {
            _context4.next = 7;
            break;
          }

          cache.never();
          debug("Auto-ignoring usage of config %o.", filepath);
          return _context4.abrupt("return", {
            filepath: filepath,
            dirname: _path().dirname(filepath),
            options: {}
          });

        case 7:
          options = void 0;
          _context4.prev = 8;

          LOADING_CONFIGS.add(filepath);
          return _context4.delegateYield((0, _moduleTypes.default)(filepath, "You appear to be using a native ECMAScript module configuration " + "file, which is only supported when running Babel asynchronously."), "t0", 11);

        case 11:
          options = _context4.t0;
          _context4.next = 18;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t1 = _context4["catch"](8);

          _context4.t1.message = filepath + ": Error while loading config - " + _context4.t1.message;
          throw _context4.t1;

        case 18:
          _context4.prev = 18;

          LOADING_CONFIGS.delete(filepath);
          return _context4.finish(18);

        case 21:
          assertCache = false;

          if (!(typeof options === "function")) {
            _context4.next = 26;
            break;
          }

          return _context4.delegateYield([], "t2", 24);

        case 24:
          options = options((0, _configApi.makeConfigAPI)(cache));
          assertCache = true;

        case 26:
          if (!(!options || (typeof options === "undefined" ? "undefined" : _typeof(options)) !== "object" || Array.isArray(options))) {
            _context4.next = 28;
            break;
          }

          throw new Error(filepath + ": Configuration should be an exported JavaScript object.");

        case 28:
          if (!(typeof options.then === "function")) {
            _context4.next = 30;
            break;
          }

          throw new Error("You appear to be using an async configuration, " + "which your current version of Babel does not support. " + "We may add support for this in the future, " + "but if you're on the most recent version of @babel/core and still " + "seeing this error, then you'll need to synchronously return your config.");

        case 30:

          if (assertCache && !cache.configured()) throwConfigError();
          return _context4.abrupt("return", {
            filepath: filepath,
            dirname: _path().dirname(filepath),
            options: options
          });

        case 32:
        case "end":
          return _context4.stop();
      }
    }
  }, readConfigJS, this, [[8, 14, 18, 21]]);
}));
var packageToBabelConfig = (0, _caching.makeWeakCacheSync)(function (file) {
  var babel = file.options["babel"];
  if (typeof babel === "undefined") return null;

  if ((typeof babel === "undefined" ? "undefined" : _typeof(babel)) !== "object" || Array.isArray(babel) || babel === null) {
    throw new Error(file.filepath + ": .babel property must be an object");
  }

  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: babel
  };
});
var readConfigJSON5 = (0, _utils.makeStaticFileCache)(function (filepath, content) {
  var options = void 0;

  try {
    options = _json().parse(content);
  } catch (err) {
    err.message = filepath + ": Error while parsing config - " + err.message;
    throw err;
  }

  if (!options) throw new Error(filepath + ": No config detected");

  if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== "object") {
    throw new Error(filepath + ": Config returned typeof " + (typeof options === "undefined" ? "undefined" : _typeof(options)));
  }

  if (Array.isArray(options)) {
    throw new Error(filepath + ": Expected config object but found array");
  }

  return {
    filepath: filepath,
    dirname: _path().dirname(filepath),
    options: options
  };
});
var readIgnoreConfig = (0, _utils.makeStaticFileCache)(function (filepath, content) {
  var ignoreDir = _path().dirname(filepath);

  var ignorePatterns = content.split("\n").map(function (line) {
    return line.replace(/#(.*?)$/, "").trim();
  }).filter(function (line) {
    return !!line;
  });

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = ignorePatterns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var pattern = _step3.value;

      if (pattern[0] === "!") {
        throw new Error("Negation of file paths is not supported.");
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return {
    filepath: filepath,
    dirname: _path().dirname(filepath),
    ignore: ignorePatterns.map(function (pattern) {
      return (0, _patternToRegex.default)(pattern, ignoreDir);
    })
  };
});

function resolveShowConfigPath(dirname) {
  var targetPath, absolutePath, stats;
  return regeneratorRuntime.wrap(function resolveShowConfigPath$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          targetPath = process.env.BABEL_SHOW_CONFIG_FOR;

          if (!(targetPath != null)) {
            _context5.next = 8;
            break;
          }

          absolutePath = _path().resolve(dirname, targetPath);
          return _context5.delegateYield(fs.stat(absolutePath), "t0", 4);

        case 4:
          stats = _context5.t0;

          if (stats.isFile()) {
            _context5.next = 7;
            break;
          }

          throw new Error(absolutePath + ": BABEL_SHOW_CONFIG_FOR must refer to a regular file, directories are not supported.");

        case 7:
          return _context5.abrupt("return", absolutePath);

        case 8:
          return _context5.abrupt("return", null);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked4, this);
}

function throwConfigError() {
  throw new Error("Caching was left unconfigured. Babel's plugins, presets, and .babelrc.js files can be configured\nfor various types of caching, using the first param of their handler functions:\n\nmodule.exports = function(api) {\n  // The API exposes the following:\n\n  // Cache the returned value forever and don't call this function again.\n  api.cache(true);\n\n  // Don't cache at all. Not recommended because it will be very slow.\n  api.cache(false);\n\n  // Cached based on the value of some function. If this function returns a value different from\n  // a previously-encountered value, the plugins will re-evaluate.\n  var env = api.cache(() => process.env.NODE_ENV);\n\n  // If testing for a specific env, we recommend specifics to avoid instantiating a plugin for\n  // any possible NODE_ENV value that might come up during plugin execution.\n  var isProd = api.cache(() => process.env.NODE_ENV === \"production\");\n\n  // .cache(fn) will perform a linear search though instances to find the matching plugin based\n  // based on previous instantiated plugins. If you want to recreate the plugin and discard the\n  // previous instance whenever something changes, you may use:\n  var isProd = api.cache.invalidate(() => process.env.NODE_ENV === \"production\");\n\n  // Note, we also expose the following more-verbose versions of the above examples:\n  api.cache.forever(); // api.cache(true)\n  api.cache.never();   // api.cache(false)\n  api.cache.using(fn); // api.cache(fn)\n\n  // Return the value that will be cached.\n  return { };\n};");
}