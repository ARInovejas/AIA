"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(buildPresetChain),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(buildRootChain),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(loadFileChain),
    _marked4 = /*#__PURE__*/regeneratorRuntime.mark(mergeExtendsChain),
    _marked5 = /*#__PURE__*/regeneratorRuntime.mark(mergeChainOpts);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPresetChain = buildPresetChain;
exports.buildRootChain = buildRootChain;
exports.buildPresetChainWalker = void 0;

function _path() {
  var data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

function _debug() {
  var data = require("debug");

  _debug = function _debug() {
    return data;
  };

  return data;
}

var _options = require("./validation/options");

var _patternToRegex = require("./pattern-to-regex");

var _printer = require("./printer");

var _files = require("./files");

var _caching = require("./caching");

var _configDescriptors = require("./config-descriptors");

var debug = _debug()("babel:config:config-chain");

function buildPresetChain(arg, context) {
  var chain;
  return regeneratorRuntime.wrap(function buildPresetChain$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.delegateYield(buildPresetChainWalker(arg, context), "t0", 1);

        case 1:
          chain = _context.t0;

          if (chain) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", null);

        case 4:
          return _context.abrupt("return", {
            plugins: dedupDescriptors(chain.plugins),
            presets: dedupDescriptors(chain.presets),
            options: chain.options.map(function (o) {
              return normalizeOptions(o);
            }),
            files: new Set()
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var buildPresetChainWalker = makeChainWalker({
  root: function root(preset) {
    return loadPresetDescriptors(preset);
  },
  env: function env(preset, envName) {
    return loadPresetEnvDescriptors(preset)(envName);
  },
  overrides: function overrides(preset, index) {
    return loadPresetOverridesDescriptors(preset)(index);
  },
  overridesEnv: function overridesEnv(preset, index, envName) {
    return loadPresetOverridesEnvDescriptors(preset)(index)(envName);
  },
  createLogger: function createLogger() {
    return function () {};
  }
});
exports.buildPresetChainWalker = buildPresetChainWalker;
var loadPresetDescriptors = (0, _caching.makeWeakCacheSync)(function (preset) {
  return buildRootDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors);
});
var loadPresetEnvDescriptors = (0, _caching.makeWeakCacheSync)(function (preset) {
  return (0, _caching.makeStrongCacheSync)(function (envName) {
    return buildEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, envName);
  });
});
var loadPresetOverridesDescriptors = (0, _caching.makeWeakCacheSync)(function (preset) {
  return (0, _caching.makeStrongCacheSync)(function (index) {
    return buildOverrideDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index);
  });
});
var loadPresetOverridesEnvDescriptors = (0, _caching.makeWeakCacheSync)(function (preset) {
  return (0, _caching.makeStrongCacheSync)(function (index) {
    return (0, _caching.makeStrongCacheSync)(function (envName) {
      return buildOverrideEnvDescriptors(preset, preset.alias, _configDescriptors.createUncachedDescriptors, index, envName);
    });
  });
});

function buildRootChain(opts, context) {
  var configReport, babelRcReport, programmaticLogger, programmaticChain, programmaticReport, configFile, babelrc, babelrcRoots, babelrcRootsDirectory, configFileChain, configFileLogger, validatedFile, result, ignoreFile, babelrcFile, isIgnored, fileChain, pkgData, _ref, _validatedFile, babelrcLogger, _result, chain;

  return regeneratorRuntime.wrap(function buildRootChain$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          configReport = void 0, babelRcReport = void 0;
          programmaticLogger = new _printer.ConfigPrinter();
          return _context2.delegateYield(loadProgrammaticChain({
            options: opts,
            dirname: context.cwd
          }, context, undefined, programmaticLogger), "t0", 3);

        case 3:
          programmaticChain = _context2.t0;

          if (programmaticChain) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", null);

        case 6:
          return _context2.delegateYield(programmaticLogger.output(), "t1", 7);

        case 7:
          programmaticReport = _context2.t1;
          configFile = void 0;

          if (!(typeof opts.configFile === "string")) {
            _context2.next = 14;
            break;
          }

          return _context2.delegateYield((0, _files.loadConfig)(opts.configFile, context.cwd, context.envName, context.caller), "t2", 11);

        case 11:
          configFile = _context2.t2;
          _context2.next = 17;
          break;

        case 14:
          if (!(opts.configFile !== false)) {
            _context2.next = 17;
            break;
          }

          return _context2.delegateYield((0, _files.findRootConfig)(context.root, context.envName, context.caller), "t3", 16);

        case 16:
          configFile = _context2.t3;

        case 17:
          babelrc = opts.babelrc, babelrcRoots = opts.babelrcRoots;
          babelrcRootsDirectory = context.cwd;
          configFileChain = emptyChain();
          configFileLogger = new _printer.ConfigPrinter();

          if (!configFile) {
            _context2.next = 32;
            break;
          }

          validatedFile = validateConfigFile(configFile);
          return _context2.delegateYield(loadFileChain(validatedFile, context, undefined, configFileLogger), "t4", 24);

        case 24:
          result = _context2.t4;

          if (result) {
            _context2.next = 27;
            break;
          }

          return _context2.abrupt("return", null);

        case 27:
          return _context2.delegateYield(configFileLogger.output(), "t5", 28);

        case 28:
          configReport = _context2.t5;


          if (babelrc === undefined) {
            babelrc = validatedFile.options.babelrc;
          }

          if (babelrcRoots === undefined) {
            babelrcRootsDirectory = validatedFile.dirname;
            babelrcRoots = validatedFile.options.babelrcRoots;
          }

          mergeChain(configFileChain, result);

        case 32:
          ignoreFile = void 0, babelrcFile = void 0;
          isIgnored = false;
          fileChain = emptyChain();

          if (!((babelrc === true || babelrc === undefined) && typeof context.filename === "string")) {
            _context2.next = 58;
            break;
          }

          return _context2.delegateYield((0, _files.findPackageData)(context.filename), "t6", 37);

        case 37:
          pkgData = _context2.t6;

          if (!(pkgData && babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory))) {
            _context2.next = 58;
            break;
          }

          return _context2.delegateYield((0, _files.findRelativeConfig)(pkgData, context.envName, context.caller), "t7", 40);

        case 40:
          _ref = _context2.t7;
          ignoreFile = _ref.ignore;
          babelrcFile = _ref.config;


          if (ignoreFile) {
            fileChain.files.add(ignoreFile.filepath);
          }

          if (ignoreFile && shouldIgnore(context, ignoreFile.ignore, null, ignoreFile.dirname)) {
            isIgnored = true;
          }

          if (!(babelrcFile && !isIgnored)) {
            _context2.next = 57;
            break;
          }

          _validatedFile = validateBabelrcFile(babelrcFile);
          babelrcLogger = new _printer.ConfigPrinter();
          return _context2.delegateYield(loadFileChain(_validatedFile, context, undefined, babelrcLogger), "t8", 49);

        case 49:
          _result = _context2.t8;

          if (_result) {
            _context2.next = 54;
            break;
          }

          isIgnored = true;
          _context2.next = 57;
          break;

        case 54:
          return _context2.delegateYield(babelrcLogger.output(), "t9", 55);

        case 55:
          babelRcReport = _context2.t9;

          mergeChain(fileChain, _result);

        case 57:

          if (babelrcFile && isIgnored) {
            fileChain.files.add(babelrcFile.filepath);
          }

        case 58:

          if (context.showConfig) {
            console.log("Babel configs on \"" + context.filename + "\" (ascending priority):\n" + [configReport, babelRcReport, programmaticReport].filter(function (x) {
              return !!x;
            }).join("\n\n") + "\n-----End Babel configs-----");
          }

          chain = mergeChain(mergeChain(mergeChain(emptyChain(), configFileChain), fileChain), programmaticChain);
          return _context2.abrupt("return", {
            plugins: isIgnored ? [] : dedupDescriptors(chain.plugins),
            presets: isIgnored ? [] : dedupDescriptors(chain.presets),
            options: isIgnored ? [] : chain.options.map(function (o) {
              return normalizeOptions(o);
            }),
            fileHandling: isIgnored ? "ignored" : "transpile",
            ignore: ignoreFile || undefined,
            babelrc: babelrcFile || undefined,
            config: configFile || undefined,
            files: chain.files
          });

        case 61:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function babelrcLoadEnabled(context, pkgData, babelrcRoots, babelrcRootsDirectory) {
  if (typeof babelrcRoots === "boolean") return babelrcRoots;
  var absoluteRoot = context.root;

  if (babelrcRoots === undefined) {
    return pkgData.directories.indexOf(absoluteRoot) !== -1;
  }

  var babelrcPatterns = babelrcRoots;

  if (!Array.isArray(babelrcPatterns)) {
    babelrcPatterns = [babelrcPatterns];
  }

  babelrcPatterns = babelrcPatterns.map(function (pat) {
    return typeof pat === "string" ? _path().resolve(babelrcRootsDirectory, pat) : pat;
  });

  if (babelrcPatterns.length === 1 && babelrcPatterns[0] === absoluteRoot) {
    return pkgData.directories.indexOf(absoluteRoot) !== -1;
  }

  return babelrcPatterns.some(function (pat) {
    if (typeof pat === "string") {
      pat = (0, _patternToRegex.default)(pat, babelrcRootsDirectory);
    }

    return pkgData.directories.some(function (directory) {
      return matchPattern(pat, babelrcRootsDirectory, directory, context);
    });
  });
}

var validateConfigFile = (0, _caching.makeWeakCacheSync)(function (file) {
  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("configfile", file.options)
  };
});
var validateBabelrcFile = (0, _caching.makeWeakCacheSync)(function (file) {
  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("babelrcfile", file.options)
  };
});
var validateExtendFile = (0, _caching.makeWeakCacheSync)(function (file) {
  return {
    filepath: file.filepath,
    dirname: file.dirname,
    options: (0, _options.validate)("extendsfile", file.options)
  };
});
var loadProgrammaticChain = makeChainWalker({
  root: function root(input) {
    return buildRootDescriptors(input, "base", _configDescriptors.createCachedDescriptors);
  },
  env: function env(input, envName) {
    return buildEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, envName);
  },
  overrides: function overrides(input, index) {
    return buildOverrideDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index);
  },
  overridesEnv: function overridesEnv(input, index, envName) {
    return buildOverrideEnvDescriptors(input, "base", _configDescriptors.createCachedDescriptors, index, envName);
  },
  createLogger: function createLogger(input, context, baseLogger) {
    return buildProgrammaticLogger(input, context, baseLogger);
  }
});
var loadFileChainWalker = makeChainWalker({
  root: function root(file) {
    return loadFileDescriptors(file);
  },
  env: function env(file, envName) {
    return loadFileEnvDescriptors(file)(envName);
  },
  overrides: function overrides(file, index) {
    return loadFileOverridesDescriptors(file)(index);
  },
  overridesEnv: function overridesEnv(file, index, envName) {
    return loadFileOverridesEnvDescriptors(file)(index)(envName);
  },
  createLogger: function createLogger(file, context, baseLogger) {
    return buildFileLogger(file.filepath, context, baseLogger);
  }
});

function loadFileChain(input, context, files, baseLogger) {
  var chain;
  return regeneratorRuntime.wrap(function loadFileChain$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.delegateYield(loadFileChainWalker(input, context, files, baseLogger), "t0", 1);

        case 1:
          chain = _context3.t0;


          if (chain) {
            chain.files.add(input.filepath);
          }

          return _context3.abrupt("return", chain);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

var loadFileDescriptors = (0, _caching.makeWeakCacheSync)(function (file) {
  return buildRootDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors);
});
var loadFileEnvDescriptors = (0, _caching.makeWeakCacheSync)(function (file) {
  return (0, _caching.makeStrongCacheSync)(function (envName) {
    return buildEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, envName);
  });
});
var loadFileOverridesDescriptors = (0, _caching.makeWeakCacheSync)(function (file) {
  return (0, _caching.makeStrongCacheSync)(function (index) {
    return buildOverrideDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index);
  });
});
var loadFileOverridesEnvDescriptors = (0, _caching.makeWeakCacheSync)(function (file) {
  return (0, _caching.makeStrongCacheSync)(function (index) {
    return (0, _caching.makeStrongCacheSync)(function (envName) {
      return buildOverrideEnvDescriptors(file, file.filepath, _configDescriptors.createUncachedDescriptors, index, envName);
    });
  });
});

function buildFileLogger(filepath, context, baseLogger) {
  if (!baseLogger) {
    return function () {};
  }

  return baseLogger.configure(context.showConfig, _printer.ChainFormatter.Config, {
    filepath: filepath
  });
}

function buildRootDescriptors(_ref2, alias, descriptors) {
  var dirname = _ref2.dirname,
      options = _ref2.options;

  return descriptors(dirname, options, alias);
}

function buildProgrammaticLogger(_, context, baseLogger) {
  var _context$caller;

  if (!baseLogger) {
    return function () {};
  }

  return baseLogger.configure(context.showConfig, _printer.ChainFormatter.Programmatic, {
    callerName: (_context$caller = context.caller) == null ? void 0 : _context$caller.name
  });
}

function buildEnvDescriptors(_ref3, alias, descriptors, envName) {
  var dirname = _ref3.dirname,
      options = _ref3.options;

  var opts = options.env && options.env[envName];
  return opts ? descriptors(dirname, opts, alias + ".env[\"" + envName + "\"]") : null;
}

function buildOverrideDescriptors(_ref4, alias, descriptors, index) {
  var dirname = _ref4.dirname,
      options = _ref4.options;

  var opts = options.overrides && options.overrides[index];
  if (!opts) throw new Error("Assertion failure - missing override");
  return descriptors(dirname, opts, alias + ".overrides[" + index + "]");
}

function buildOverrideEnvDescriptors(_ref5, alias, descriptors, index, envName) {
  var dirname = _ref5.dirname,
      options = _ref5.options;

  var override = options.overrides && options.overrides[index];
  if (!override) throw new Error("Assertion failure - missing override");
  var opts = override.env && override.env[envName];
  return opts ? descriptors(dirname, opts, alias + ".overrides[" + index + "].env[\"" + envName + "\"]") : null;
}

function makeChainWalker(_ref6) {
  var root = _ref6.root,
      env = _ref6.env,
      overrides = _ref6.overrides,
      overridesEnv = _ref6.overridesEnv,
      createLogger = _ref6.createLogger;

  return (/*#__PURE__*/regeneratorRuntime.mark(function _callee(input, context) {
      var files = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();
      var baseLogger = arguments[3];

      var dirname, flattenedConfigs, rootOpts, envOpts, chain, logger, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref8, config, index, envName;

      return regeneratorRuntime.wrap(function _callee$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dirname = input.dirname;
              flattenedConfigs = [];
              rootOpts = root(input);


              if (configIsApplicable(rootOpts, dirname, context)) {
                flattenedConfigs.push({
                  config: rootOpts,
                  envName: undefined,
                  index: undefined
                });
                envOpts = env(input, context.envName);


                if (envOpts && configIsApplicable(envOpts, dirname, context)) {
                  flattenedConfigs.push({
                    config: envOpts,
                    envName: context.envName,
                    index: undefined
                  });
                }

                (rootOpts.options.overrides || []).forEach(function (_, index) {
                  var overrideOps = overrides(input, index);

                  if (configIsApplicable(overrideOps, dirname, context)) {
                    flattenedConfigs.push({
                      config: overrideOps,
                      index: index,
                      envName: undefined
                    });
                    var overrideEnvOpts = overridesEnv(input, index, context.envName);

                    if (overrideEnvOpts && configIsApplicable(overrideEnvOpts, dirname, context)) {
                      flattenedConfigs.push({
                        config: overrideEnvOpts,
                        index: index,
                        envName: context.envName
                      });
                    }
                  }
                });
              }

              if (!flattenedConfigs.some(function (_ref7) {
                var _ref7$config$options = _ref7.config.options,
                    ignore = _ref7$config$options.ignore,
                    only = _ref7$config$options.only;
                return shouldIgnore(context, ignore, only, dirname);
              })) {
                _context4.next = 6;
                break;
              }

              return _context4.abrupt("return", null);

            case 6:
              chain = emptyChain();
              logger = createLogger(input, context, baseLogger);
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 11;
              _iterator = flattenedConfigs[Symbol.iterator]();

            case 13:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context4.next = 26;
                break;
              }

              _ref8 = _step.value;
              config = _ref8.config;
              index = _ref8.index;
              envName = _ref8.envName;
              return _context4.delegateYield(mergeExtendsChain(chain, config.options, dirname, context, files, baseLogger), "t0", 19);

            case 19:
              if (_context4.t0) {
                _context4.next = 21;
                break;
              }

              return _context4.abrupt("return", null);

            case 21:

              logger(config, index, envName);
              return _context4.delegateYield(mergeChainOpts(chain, config), "t1", 23);

            case 23:
              _iteratorNormalCompletion = true;
              _context4.next = 13;
              break;

            case 26:
              _context4.next = 32;
              break;

            case 28:
              _context4.prev = 28;
              _context4.t2 = _context4["catch"](11);
              _didIteratorError = true;
              _iteratorError = _context4.t2;

            case 32:
              _context4.prev = 32;
              _context4.prev = 33;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 35:
              _context4.prev = 35;

              if (!_didIteratorError) {
                _context4.next = 38;
                break;
              }

              throw _iteratorError;

            case 38:
              return _context4.finish(35);

            case 39:
              return _context4.finish(32);

            case 40:
              return _context4.abrupt("return", chain);

            case 41:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee, this, [[11, 28, 32, 40], [33,, 35, 39]]);
    })
  );
}

function mergeExtendsChain(chain, opts, dirname, context, files, baseLogger) {
  var file, fileChain;
  return regeneratorRuntime.wrap(function mergeExtendsChain$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(opts.extends === undefined)) {
            _context5.next = 2;
            break;
          }

          return _context5.abrupt("return", true);

        case 2:
          return _context5.delegateYield((0, _files.loadConfig)(opts.extends, dirname, context.envName, context.caller), "t0", 3);

        case 3:
          file = _context5.t0;

          if (!files.has(file)) {
            _context5.next = 6;
            break;
          }

          throw new Error("Configuration cycle detected loading " + file.filepath + ".\n" + "File already loaded following the config chain:\n" + Array.from(files, function (file) {
            return " - " + file.filepath;
          }).join("\n"));

        case 6:

          files.add(file);
          return _context5.delegateYield(loadFileChain(validateExtendFile(file), context, files, baseLogger), "t1", 8);

        case 8:
          fileChain = _context5.t1;

          files.delete(file);

          if (fileChain) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", false);

        case 12:
          mergeChain(chain, fileChain);
          return _context5.abrupt("return", true);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked4, this);
}

function mergeChain(target, source) {
  var _target$options, _target$plugins, _target$presets;

  (_target$options = target.options).push.apply(_target$options, _toConsumableArray(source.options));
  (_target$plugins = target.plugins).push.apply(_target$plugins, _toConsumableArray(source.plugins));
  (_target$presets = target.presets).push.apply(_target$presets, _toConsumableArray(source.presets));

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = source.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var file = _step2.value;

      target.files.add(file);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return target;
}

function mergeChainOpts(target, _ref9) {
  var _target$plugins2, _target$presets2;

  var options = _ref9.options,
      plugins = _ref9.plugins,
      presets = _ref9.presets;
  return regeneratorRuntime.wrap(function mergeChainOpts$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          target.options.push(options);
          _context6.t0 = (_target$plugins2 = target.plugins).push;
          _context6.t1 = _target$plugins2;
          _context6.t2 = _toConsumableArray;
          return _context6.delegateYield(plugins(), "t3", 5);

        case 5:
          _context6.t4 = _context6.t3;
          _context6.t5 = (0, _context6.t2)(_context6.t4);

          _context6.t0.apply.call(_context6.t0, _context6.t1, _context6.t5);

          _context6.t6 = (_target$presets2 = target.presets).push;
          _context6.t7 = _target$presets2;
          _context6.t8 = _toConsumableArray;
          return _context6.delegateYield(presets(), "t9", 12);

        case 12:
          _context6.t10 = _context6.t9;
          _context6.t11 = (0, _context6.t8)(_context6.t10);

          _context6.t6.apply.call(_context6.t6, _context6.t7, _context6.t11);

          return _context6.abrupt("return", target);

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked5, this);
}

function emptyChain() {
  return {
    options: [],
    presets: [],
    plugins: [],
    files: new Set()
  };
}

function normalizeOptions(opts) {
  var options = Object.assign({}, opts);
  delete options.extends;
  delete options.env;
  delete options.overrides;
  delete options.plugins;
  delete options.presets;
  delete options.passPerPreset;
  delete options.ignore;
  delete options.only;
  delete options.test;
  delete options.include;
  delete options.exclude;

  if (Object.prototype.hasOwnProperty.call(options, "sourceMap")) {
    options.sourceMaps = options.sourceMap;
    delete options.sourceMap;
  }

  return options;
}

function dedupDescriptors(items) {
  var map = new Map();
  var descriptors = [];

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var item = _step3.value;

      if (typeof item.value === "function") {
        var fnKey = item.value;
        var nameMap = map.get(fnKey);

        if (!nameMap) {
          nameMap = new Map();
          map.set(fnKey, nameMap);
        }

        var desc = nameMap.get(item.name);

        if (!desc) {
          desc = {
            value: item
          };
          descriptors.push(desc);
          if (!item.ownPass) nameMap.set(item.name, desc);
        } else {
          desc.value = item;
        }
      } else {
        descriptors.push({
          value: item
        });
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

  return descriptors.reduce(function (acc, desc) {
    acc.push(desc.value);
    return acc;
  }, []);
}

function configIsApplicable(_ref10, dirname, context) {
  var options = _ref10.options;

  return (options.test === undefined || configFieldIsApplicable(context, options.test, dirname)) && (options.include === undefined || configFieldIsApplicable(context, options.include, dirname)) && (options.exclude === undefined || !configFieldIsApplicable(context, options.exclude, dirname));
}

function configFieldIsApplicable(context, test, dirname) {
  var patterns = Array.isArray(test) ? test : [test];
  return matchesPatterns(context, patterns, dirname);
}

function shouldIgnore(context, ignore, only, dirname) {
  if (ignore && matchesPatterns(context, ignore, dirname)) {
    var _context$filename;

    var message = "No config is applied to \"" + ((_context$filename = context.filename) != null ? _context$filename : "(unknown)") + "\" because it matches one of `ignore: " + JSON.stringify(ignore) + "` from \"" + dirname + "\"";
    debug(message);

    if (context.showConfig) {
      console.log(message);
    }

    return true;
  }

  if (only && !matchesPatterns(context, only, dirname)) {
    var _context$filename2;

    var _message = "No config is applied to \"" + ((_context$filename2 = context.filename) != null ? _context$filename2 : "(unknown)") + "\" because it fails to match one of `only: " + JSON.stringify(only) + "` from \"" + dirname + "\"";
    debug(_message);

    if (context.showConfig) {
      console.log(_message);
    }

    return true;
  }

  return false;
}

function matchesPatterns(context, patterns, dirname) {
  return patterns.some(function (pattern) {
    return matchPattern(pattern, dirname, context.filename, context);
  });
}

function matchPattern(pattern, dirname, pathToTest, context) {
  if (typeof pattern === "function") {
    return !!pattern(pathToTest, {
      dirname: dirname,
      envName: context.envName,
      caller: context.caller
    });
  }

  if (typeof pathToTest !== "string") {
    throw new Error("Configuration contains string/RegExp pattern, but no filename was passed to Babel");
  }

  if (typeof pattern === "string") {
    pattern = (0, _patternToRegex.default)(pattern, dirname);
  }

  return pattern.test(pathToTest);
}