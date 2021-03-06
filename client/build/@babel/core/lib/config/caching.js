"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(genTrue),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(getCachedValue),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(getCachedValueOrWait);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeWeakCache = makeWeakCache;
exports.makeWeakCacheSync = makeWeakCacheSync;
exports.makeStrongCache = makeStrongCache;
exports.makeStrongCacheSync = makeStrongCacheSync;
exports.assertSimpleType = assertSimpleType;

function _gensync() {
  var data = require("gensync");

  _gensync = function _gensync() {
    return data;
  };

  return data;
}

var _async = require("../gensync-utils/async");

var _util = require("./util");

var synchronize = function synchronize(gen) {
  return _gensync()(gen).sync;
};

function genTrue() {
  return regeneratorRuntime.wrap(function genTrue$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", true);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function makeWeakCache(handler) {
  return makeCachedFunction(WeakMap, handler);
}

function makeWeakCacheSync(handler) {
  return synchronize(makeWeakCache(handler));
}

function makeStrongCache(handler) {
  return makeCachedFunction(Map, handler);
}

function makeStrongCacheSync(handler) {
  return synchronize(makeStrongCache(handler));
}

function makeCachedFunction(CallCache, handler) {
  var callCacheSync = new CallCache();
  var callCacheAsync = new CallCache();
  var futureCache = new CallCache();
  return (/*#__PURE__*/regeneratorRuntime.mark(function cachedFunction(arg, data) {
      var asyncContext, callCache, cached, cache, handlerResult, finishLock, value, gen;
      return regeneratorRuntime.wrap(function cachedFunction$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.delegateYield((0, _async.isAsync)(), "t0", 1);

            case 1:
              asyncContext = _context2.t0;
              callCache = asyncContext ? callCacheAsync : callCacheSync;
              return _context2.delegateYield(getCachedValueOrWait(asyncContext, callCache, futureCache, arg, data), "t1", 4);

            case 4:
              cached = _context2.t1;

              if (!cached.valid) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", cached.value);

            case 7:
              cache = new CacheConfigurator(data);
              handlerResult = handler(arg, cache);
              finishLock = void 0;
              value = void 0;

              if (!(0, _util.isIterableIterator)(handlerResult)) {
                _context2.next = 17;
                break;
              }

              gen = handlerResult;
              return _context2.delegateYield((0, _async.onFirstPause)(gen, function () {
                finishLock = setupAsyncLocks(cache, futureCache, arg);
              }), "t2", 14);

            case 14:
              value = _context2.t2;
              _context2.next = 18;
              break;

            case 17:
              value = handlerResult;

            case 18:

              updateFunctionCache(callCache, cache, arg, value);

              if (finishLock) {
                futureCache.delete(arg);
                finishLock.release(value);
              }

              return _context2.abrupt("return", value);

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, cachedFunction, this);
    })
  );
}

function getCachedValue(cache, arg, data) {
  var cachedValue, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref, value, valid;

  return regeneratorRuntime.wrap(function getCachedValue$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          cachedValue = cache.get(arg);

          if (!cachedValue) {
            _context3.next = 31;
            break;
          }

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 5;
          _iterator = cachedValue[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 17;
            break;
          }

          _ref = _step.value;
          value = _ref.value;
          valid = _ref.valid;
          return _context3.delegateYield(valid(data), "t0", 12);

        case 12:
          if (!_context3.t0) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", {
            valid: true,
            value: value
          });

        case 14:
          _iteratorNormalCompletion = true;
          _context3.next = 7;
          break;

        case 17:
          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t1 = _context3["catch"](5);
          _didIteratorError = true;
          _iteratorError = _context3.t1;

        case 23:
          _context3.prev = 23;
          _context3.prev = 24;

          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }

        case 26:
          _context3.prev = 26;

          if (!_didIteratorError) {
            _context3.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context3.finish(26);

        case 30:
          return _context3.finish(23);

        case 31:
          return _context3.abrupt("return", {
            valid: false,
            value: null
          });

        case 32:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked2, this, [[5, 19, 23, 31], [24,, 26, 30]]);
}

function getCachedValueOrWait(asyncContext, callCache, futureCache, arg, data) {
  var cached, _cached, value;

  return regeneratorRuntime.wrap(function getCachedValueOrWait$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.delegateYield(getCachedValue(callCache, arg, data), "t0", 1);

        case 1:
          cached = _context4.t0;

          if (!cached.valid) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", cached);

        case 4:
          if (!asyncContext) {
            _context4.next = 11;
            break;
          }

          return _context4.delegateYield(getCachedValue(futureCache, arg, data), "t1", 6);

        case 6:
          _cached = _context4.t1;

          if (!_cached.valid) {
            _context4.next = 11;
            break;
          }

          return _context4.delegateYield((0, _async.waitFor)(_cached.value.promise), "t2", 9);

        case 9:
          value = _context4.t2;
          return _context4.abrupt("return", {
            valid: true,
            value: value
          });

        case 11:
          return _context4.abrupt("return", {
            valid: false,
            value: null
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked3, this);
}

function setupAsyncLocks(config, futureCache, arg) {
  var finishLock = new Lock();
  updateFunctionCache(futureCache, config, arg, finishLock);
  return finishLock;
}

function updateFunctionCache(cache, config, arg, value) {
  if (!config.configured()) config.forever();
  var cachedValue = cache.get(arg);
  config.deactivate();

  switch (config.mode()) {
    case "forever":
      cachedValue = [{
        value: value,
        valid: genTrue
      }];
      cache.set(arg, cachedValue);
      break;

    case "invalidate":
      cachedValue = [{
        value: value,
        valid: config.validator()
      }];
      cache.set(arg, cachedValue);
      break;

    case "valid":
      if (cachedValue) {
        cachedValue.push({
          value: value,
          valid: config.validator()
        });
      } else {
        cachedValue = [{
          value: value,
          valid: config.validator()
        }];
        cache.set(arg, cachedValue);
      }

  }
}

var CacheConfigurator = function () {
  function CacheConfigurator(data) {
    _classCallCheck(this, CacheConfigurator);

    this._active = true;
    this._never = false;
    this._forever = false;
    this._invalidate = false;
    this._configured = false;
    this._pairs = [];
    this._data = void 0;
    this._data = data;
  }

  _createClass(CacheConfigurator, [{
    key: "simple",
    value: function simple() {
      return makeSimpleConfigurator(this);
    }
  }, {
    key: "mode",
    value: function mode() {
      if (this._never) return "never";
      if (this._forever) return "forever";
      if (this._invalidate) return "invalidate";
      return "valid";
    }
  }, {
    key: "forever",
    value: function forever() {
      if (!this._active) {
        throw new Error("Cannot change caching after evaluation has completed.");
      }

      if (this._never) {
        throw new Error("Caching has already been configured with .never()");
      }

      this._forever = true;
      this._configured = true;
    }
  }, {
    key: "never",
    value: function never() {
      if (!this._active) {
        throw new Error("Cannot change caching after evaluation has completed.");
      }

      if (this._forever) {
        throw new Error("Caching has already been configured with .forever()");
      }

      this._never = true;
      this._configured = true;
    }
  }, {
    key: "using",
    value: function using(handler) {
      var _this = this;

      if (!this._active) {
        throw new Error("Cannot change caching after evaluation has completed.");
      }

      if (this._never || this._forever) {
        throw new Error("Caching has already been configured with .never or .forever()");
      }

      this._configured = true;
      var key = handler(this._data);
      var fn = (0, _async.maybeAsync)(handler, "You appear to be using an async cache handler, but Babel has been called synchronously");

      if ((0, _async.isThenable)(key)) {
        return key.then(function (key) {
          _this._pairs.push([key, fn]);

          return key;
        });
      }

      this._pairs.push([key, fn]);

      return key;
    }
  }, {
    key: "invalidate",
    value: function invalidate(handler) {
      this._invalidate = true;
      return this.using(handler);
    }
  }, {
    key: "validator",
    value: function validator() {
      var pairs = this._pairs;
      return (/*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
          var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _ref2, _ref3, key, fn;

          return regeneratorRuntime.wrap(function _callee$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context5.prev = 3;
                  _iterator2 = pairs[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context5.next = 18;
                    break;
                  }

                  _ref2 = _step2.value;
                  _ref3 = _slicedToArray(_ref2, 2);
                  key = _ref3[0];
                  fn = _ref3[1];
                  _context5.t0 = key;
                  return _context5.delegateYield(fn(data), "t1", 12);

                case 12:
                  _context5.t2 = _context5.t1;

                  if (!(_context5.t0 !== _context5.t2)) {
                    _context5.next = 15;
                    break;
                  }

                  return _context5.abrupt("return", false);

                case 15:
                  _iteratorNormalCompletion2 = true;
                  _context5.next = 5;
                  break;

                case 18:
                  _context5.next = 24;
                  break;

                case 20:
                  _context5.prev = 20;
                  _context5.t3 = _context5["catch"](3);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context5.t3;

                case 24:
                  _context5.prev = 24;
                  _context5.prev = 25;

                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }

                case 27:
                  _context5.prev = 27;

                  if (!_didIteratorError2) {
                    _context5.next = 30;
                    break;
                  }

                  throw _iteratorError2;

                case 30:
                  return _context5.finish(27);

                case 31:
                  return _context5.finish(24);

                case 32:
                  return _context5.abrupt("return", true);

                case 33:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee, this, [[3, 20, 24, 32], [25,, 27, 31]]);
        })
      );
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this._active = false;
    }
  }, {
    key: "configured",
    value: function configured() {
      return this._configured;
    }
  }]);

  return CacheConfigurator;
}();

function makeSimpleConfigurator(cache) {
  function cacheFn(val) {
    if (typeof val === "boolean") {
      if (val) cache.forever();else cache.never();
      return;
    }

    return cache.using(function () {
      return assertSimpleType(val());
    });
  }

  cacheFn.forever = function () {
    return cache.forever();
  };

  cacheFn.never = function () {
    return cache.never();
  };

  cacheFn.using = function (cb) {
    return cache.using(function () {
      return assertSimpleType(cb());
    });
  };

  cacheFn.invalidate = function (cb) {
    return cache.invalidate(function () {
      return assertSimpleType(cb());
    });
  };

  return cacheFn;
}

function assertSimpleType(value) {
  if ((0, _async.isThenable)(value)) {
    throw new Error("You appear to be using an async cache handler, " + "which your current version of Babel does not support. " + "We may add support for this in the future, " + "but if you're on the most recent version of @babel/core and still " + "seeing this error, then you'll need to synchronously handle your caching logic.");
  }

  if (value != null && typeof value !== "string" && typeof value !== "boolean" && typeof value !== "number") {
    throw new Error("Cache keys must be either string, boolean, number, null, or undefined.");
  }

  return value;
}

var Lock = function () {
  function Lock() {
    var _this2 = this;

    _classCallCheck(this, Lock);

    this.released = false;
    this.promise = void 0;
    this._resolve = void 0;
    this.promise = new Promise(function (resolve) {
      _this2._resolve = resolve;
    });
  }

  _createClass(Lock, [{
    key: "release",
    value: function release(value) {
      this.released = true;

      this._resolve(value);
    }
  }]);

  return Lock;
}();