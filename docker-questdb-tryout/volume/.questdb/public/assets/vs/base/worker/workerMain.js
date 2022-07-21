/*! For license information please see workerMain.js.LICENSE.txt */
;(function () {
  var e,
    t,
    n,
    i,
    r = [
      'require',
      'exports',
      'vs/base/common/platform',
      'vs/editor/common/core/position',
      'vs/base/common/strings',
      'vs/base/common/event',
      'vs/editor/common/core/range',
      'vs/base/common/errors',
      'vs/base/common/lifecycle',
      'vs/base/common/stopwatch',
      'vs/base/common/diff/diff',
      'vs/base/common/types',
      'vs/base/common/uint',
      'vs/base/common/uri',
      'vs/base/common/diff/diffChange',
      'vs/base/common/functional',
      'vs/base/common/iterator',
      'vs/base/common/keyCodes',
      'vs/base/common/linkedList',
      'vs/base/common/process',
      'vs/base/common/path',
      'vs/base/common/cancellation',
      'vs/base/common/hash',
      'vs/editor/common/core/characterClassifier',
      'vs/editor/common/core/selection',
      'vs/editor/common/core/token',
      'vs/editor/common/diff/diffComputer',
      'vs/editor/common/model/wordHelper',
      'vs/editor/common/modes/linkComputer',
      'vs/editor/common/modes/supports/inplaceReplaceSupport',
      'vs/editor/common/standalone/standaloneEnums',
      'vs/editor/common/standalone/standaloneBase',
      'vs/editor/common/viewModel/prefixSumComputer',
      'vs/editor/common/model/mirrorTextModel',
      'vs/base/common/worker/simpleWorker',
      'vs/editor/common/services/editorSimpleWorker',
    ],
    o = function (e) {
      for (var t = [], n = 0, i = e.length; n < i; n++) t[n] = r[e[n]]
      return t
    },
    s = this,
    a = 'object' == typeof global ? global : {}
  !(function (e) {
    e.global = s
    var t = (function () {
      function t() {
        ;(this._detected = !1),
          (this._isWindows = !1),
          (this._isNode = !1),
          (this._isElectronRenderer = !1),
          (this._isWebWorker = !1),
          (this._isElectronNodeIntegrationWebWorker = !1)
      }
      return (
        Object.defineProperty(t.prototype, 'isWindows', {
          get: function () {
            return this._detect(), this._isWindows
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'isNode', {
          get: function () {
            return this._detect(), this._isNode
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'isElectronRenderer', {
          get: function () {
            return this._detect(), this._isElectronRenderer
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'isWebWorker', {
          get: function () {
            return this._detect(), this._isWebWorker
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, 'isElectronNodeIntegrationWebWorker', {
          get: function () {
            return this._detect(), this._isElectronNodeIntegrationWebWorker
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype._detect = function () {
          this._detected ||
            ((this._detected = !0),
            (this._isWindows = t._isWindows()),
            (this._isNode = 'undefined' != typeof module && !!module.exports),
            (this._isElectronRenderer =
              'undefined' != typeof process &&
              void 0 !== process.versions &&
              void 0 !== process.versions.electron &&
              'renderer' === process.type),
            (this._isWebWorker = 'function' == typeof e.global.importScripts),
            (this._isElectronNodeIntegrationWebWorker =
              this._isWebWorker &&
              'undefined' != typeof process &&
              void 0 !== process.versions &&
              void 0 !== process.versions.electron &&
              'worker' === process.type))
        }),
        (t._isWindows = function () {
          return (
            !!(
              'undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.indexOf('Windows') >= 0
            ) ||
            ('undefined' != typeof process && 'win32' === process.platform)
          )
        }),
        t
      )
    })()
    e.Environment = t
  })(i || (i = {})),
    (function (e) {
      var t = function (e, t, n) {
        ;(this.type = e), (this.detail = t), (this.timestamp = n)
      }
      e.LoaderEvent = t
      var n = (function () {
        function n(e) {
          this._events = [new t(1, '', e)]
        }
        return (
          (n.prototype.record = function (n, i) {
            this._events.push(new t(n, i, e.Utilities.getHighPerformanceTimestamp()))
          }),
          (n.prototype.getEvents = function () {
            return this._events
          }),
          n
        )
      })()
      e.LoaderEventRecorder = n
      var i = (function () {
        function e() {}
        return (
          (e.prototype.record = function (e, t) {}),
          (e.prototype.getEvents = function () {
            return []
          }),
          (e.INSTANCE = new e()),
          e
        )
      })()
      e.NullLoaderEventRecorder = i
    })(i || (i = {})),
    (e = i || (i = {})),
    (t = (function () {
      function t() {}
      return (
        (t.fileUriToFilePath = function (e, t) {
          if (((t = decodeURI(t).replace(/%23/g, '#')), e)) {
            if (/^file:\/\/\//.test(t)) return t.substr(8)
            if (/^file:\/\//.test(t)) return t.substr(5)
          } else if (/^file:\/\//.test(t)) return t.substr(7)
          return t
        }),
        (t.startsWith = function (e, t) {
          return e.length >= t.length && e.substr(0, t.length) === t
        }),
        (t.endsWith = function (e, t) {
          return e.length >= t.length && e.substr(e.length - t.length) === t
        }),
        (t.containsQueryString = function (e) {
          return /^[^\#]*\?/gi.test(e)
        }),
        (t.isAbsolutePath = function (e) {
          return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(e)
        }),
        (t.forEachProperty = function (e, t) {
          if (e) {
            var n = void 0
            for (n in e) e.hasOwnProperty(n) && t(n, e[n])
          }
        }),
        (t.isEmpty = function (e) {
          var n = !0
          return (
            t.forEachProperty(e, function () {
              n = !1
            }),
            n
          )
        }),
        (t.recursiveClone = function (e) {
          if (
            !e ||
            'object' != typeof e ||
            e instanceof RegExp ||
            (!Array.isArray(e) && Object.getPrototypeOf(e) !== Object.prototype)
          )
            return e
          var n = Array.isArray(e) ? [] : {}
          return (
            t.forEachProperty(e, function (e, i) {
              n[e] = i && 'object' == typeof i ? t.recursiveClone(i) : i
            }),
            n
          )
        }),
        (t.generateAnonymousModule = function () {
          return '===anonymous' + t.NEXT_ANONYMOUS_ID++ + '==='
        }),
        (t.isAnonymousModule = function (e) {
          return t.startsWith(e, '===anonymous')
        }),
        (t.getHighPerformanceTimestamp = function () {
          return (
            this.PERFORMANCE_NOW_PROBED ||
              ((this.PERFORMANCE_NOW_PROBED = !0),
              (this.HAS_PERFORMANCE_NOW =
                e.global.performance && 'function' == typeof e.global.performance.now)),
            this.HAS_PERFORMANCE_NOW ? e.global.performance.now() : Date.now()
          )
        }),
        (t.NEXT_ANONYMOUS_ID = 1),
        (t.PERFORMANCE_NOW_PROBED = !1),
        (t.HAS_PERFORMANCE_NOW = !1),
        t
      )
    })()),
    (e.Utilities = t),
    (function (e) {
      function t(e) {
        if (e instanceof Error) return e
        var t = new Error(e.message || String(e) || 'Unknown Error')
        return e.stack && (t.stack = e.stack), t
      }
      e.ensureError = t
      var n = (function () {
        function n() {}
        return (
          (n.validateConfigurationOptions = function (n) {
            if (
              ('string' != typeof (n = n || {}).baseUrl && (n.baseUrl = ''),
              'boolean' != typeof n.isBuild && (n.isBuild = !1),
              'object' != typeof n.paths && (n.paths = {}),
              'object' != typeof n.config && (n.config = {}),
              void 0 === n.catchError && (n.catchError = !1),
              void 0 === n.recordStats && (n.recordStats = !1),
              'string' != typeof n.urlArgs && (n.urlArgs = ''),
              'function' != typeof n.onError &&
                (n.onError = function (e) {
                  return 'loading' === e.phase
                    ? (console.error('Loading "' + e.moduleId + '" failed'),
                      console.error(e),
                      console.error('Here are the modules that depend on it:'),
                      void console.error(e.neededBy))
                    : 'factory' === e.phase
                    ? (console.error(
                        'The factory method of "' + e.moduleId + '" has thrown an exception',
                      ),
                      void console.error(e))
                    : void 0
                }),
              Array.isArray(n.ignoreDuplicateModules) || (n.ignoreDuplicateModules = []),
              n.baseUrl.length > 0 && (e.Utilities.endsWith(n.baseUrl, '/') || (n.baseUrl += '/')),
              'string' != typeof n.cspNonce && (n.cspNonce = ''),
              void 0 === n.preferScriptTags && (n.preferScriptTags = !1),
              Array.isArray(n.nodeModules) || (n.nodeModules = []),
              n.nodeCachedData &&
                'object' == typeof n.nodeCachedData &&
                ('string' != typeof n.nodeCachedData.seed && (n.nodeCachedData.seed = 'seed'),
                ('number' != typeof n.nodeCachedData.writeDelay ||
                  n.nodeCachedData.writeDelay < 0) &&
                  (n.nodeCachedData.writeDelay = 7e3),
                !n.nodeCachedData.path || 'string' != typeof n.nodeCachedData.path))
            ) {
              var i = t(new Error("INVALID cached data configuration, 'path' MUST be set"))
              ;(i.phase = 'configuration'), n.onError(i), (n.nodeCachedData = void 0)
            }
            return n
          }),
          (n.mergeConfigurationOptions = function (t, i) {
            void 0 === t && (t = null), void 0 === i && (i = null)
            var r = e.Utilities.recursiveClone(i || {})
            return (
              e.Utilities.forEachProperty(t, function (t, n) {
                'ignoreDuplicateModules' === t && void 0 !== r.ignoreDuplicateModules
                  ? (r.ignoreDuplicateModules = r.ignoreDuplicateModules.concat(n))
                  : 'paths' === t && void 0 !== r.paths
                  ? e.Utilities.forEachProperty(n, function (e, t) {
                      return (r.paths[e] = t)
                    })
                  : 'config' === t && void 0 !== r.config
                  ? e.Utilities.forEachProperty(n, function (e, t) {
                      return (r.config[e] = t)
                    })
                  : (r[t] = e.Utilities.recursiveClone(n))
              }),
              n.validateConfigurationOptions(r)
            )
          }),
          n
        )
      })()
      e.ConfigurationOptionsUtil = n
      var i = (function () {
        function t(e, t) {
          if (
            ((this._env = e),
            (this.options = n.mergeConfigurationOptions(t)),
            this._createIgnoreDuplicateModulesMap(),
            this._createNodeModulesMap(),
            this._createSortedPathsRules(),
            '' === this.options.baseUrl)
          ) {
            if (
              this.options.nodeRequire &&
              this.options.nodeRequire.main &&
              this.options.nodeRequire.main.filename &&
              this._env.isNode
            ) {
              var i = this.options.nodeRequire.main.filename,
                r = Math.max(i.lastIndexOf('/'), i.lastIndexOf('\\'))
              this.options.baseUrl = i.substring(0, r + 1)
            }
            this.options.nodeMain &&
              this._env.isNode &&
              ((i = this.options.nodeMain),
              (r = Math.max(i.lastIndexOf('/'), i.lastIndexOf('\\'))),
              (this.options.baseUrl = i.substring(0, r + 1)))
          }
        }
        return (
          (t.prototype._createIgnoreDuplicateModulesMap = function () {
            this.ignoreDuplicateModulesMap = {}
            for (var e = 0; e < this.options.ignoreDuplicateModules.length; e++)
              this.ignoreDuplicateModulesMap[this.options.ignoreDuplicateModules[e]] = !0
          }),
          (t.prototype._createNodeModulesMap = function () {
            this.nodeModulesMap = Object.create(null)
            for (var e = 0, t = this.options.nodeModules; e < t.length; e++) {
              var n = t[e]
              this.nodeModulesMap[n] = !0
            }
          }),
          (t.prototype._createSortedPathsRules = function () {
            var t = this
            ;(this.sortedPathsRules = []),
              e.Utilities.forEachProperty(this.options.paths, function (e, n) {
                Array.isArray(n)
                  ? t.sortedPathsRules.push({ from: e, to: n })
                  : t.sortedPathsRules.push({ from: e, to: [n] })
              }),
              this.sortedPathsRules.sort(function (e, t) {
                return t.from.length - e.from.length
              })
          }),
          (t.prototype.cloneAndMerge = function (e) {
            return new t(this._env, n.mergeConfigurationOptions(e, this.options))
          }),
          (t.prototype.getOptionsLiteral = function () {
            return this.options
          }),
          (t.prototype._applyPaths = function (t) {
            for (var n, i = 0, r = this.sortedPathsRules.length; i < r; i++)
              if (((n = this.sortedPathsRules[i]), e.Utilities.startsWith(t, n.from))) {
                for (var o = [], s = 0, a = n.to.length; s < a; s++)
                  o.push(n.to[s] + t.substr(n.from.length))
                return o
              }
            return [t]
          }),
          (t.prototype._addUrlArgsToUrl = function (t) {
            return e.Utilities.containsQueryString(t)
              ? t + '&' + this.options.urlArgs
              : t + '?' + this.options.urlArgs
          }),
          (t.prototype._addUrlArgsIfNecessaryToUrl = function (e) {
            return this.options.urlArgs ? this._addUrlArgsToUrl(e) : e
          }),
          (t.prototype._addUrlArgsIfNecessaryToUrls = function (e) {
            if (this.options.urlArgs)
              for (var t = 0, n = e.length; t < n; t++) e[t] = this._addUrlArgsToUrl(e[t])
            return e
          }),
          (t.prototype.moduleIdToPaths = function (t) {
            if (
              this._env.isNode &&
              (!0 === this.nodeModulesMap[t] ||
                (this.options.amdModulesPattern instanceof RegExp &&
                  !this.options.amdModulesPattern.test(t)))
            )
              return this.isBuild() ? ['empty:'] : ['node|' + t]
            var n,
              i = t
            if (e.Utilities.endsWith(i, '.js') || e.Utilities.isAbsolutePath(i))
              !e.Utilities.endsWith(i, '.js') &&
                !e.Utilities.containsQueryString(i) &&
                (i += '.js'),
                (n = [i])
            else
              for (var r = 0, o = (n = this._applyPaths(i)).length; r < o; r++)
                (this.isBuild() && 'empty:' === n[r]) ||
                  (e.Utilities.isAbsolutePath(n[r]) || (n[r] = this.options.baseUrl + n[r]),
                  !e.Utilities.endsWith(n[r], '.js') &&
                    !e.Utilities.containsQueryString(n[r]) &&
                    (n[r] = n[r] + '.js'))
            return this._addUrlArgsIfNecessaryToUrls(n)
          }),
          (t.prototype.requireToUrl = function (t) {
            var n = t
            return (
              e.Utilities.isAbsolutePath(n) ||
                ((n = this._applyPaths(n)[0]),
                e.Utilities.isAbsolutePath(n) || (n = this.options.baseUrl + n)),
              this._addUrlArgsIfNecessaryToUrl(n)
            )
          }),
          (t.prototype.isBuild = function () {
            return this.options.isBuild
          }),
          (t.prototype.isDuplicateMessageIgnoredFor = function (e) {
            return this.ignoreDuplicateModulesMap.hasOwnProperty(e)
          }),
          (t.prototype.getConfigForModule = function (e) {
            if (this.options.config) return this.options.config[e]
          }),
          (t.prototype.shouldCatchError = function () {
            return this.options.catchError
          }),
          (t.prototype.shouldRecordStats = function () {
            return this.options.recordStats
          }),
          (t.prototype.onError = function (e) {
            this.options.onError(e)
          }),
          t
        )
      })()
      e.Configuration = i
    })(i || (i = {})),
    (function (e) {
      var t = (function () {
          function e(e) {
            ;(this._env = e), (this._scriptLoader = null), (this._callbackMap = {})
          }
          return (
            (e.prototype.load = function (e, t, o, s) {
              var a = this
              if (!this._scriptLoader)
                if (this._env.isWebWorker) this._scriptLoader = new i()
                else if (this._env.isElectronRenderer) {
                  var l = e.getConfig().getOptionsLiteral().preferScriptTags
                  this._scriptLoader = l ? new n() : new r(this._env)
                } else
                  this._env.isNode
                    ? (this._scriptLoader = new r(this._env))
                    : (this._scriptLoader = new n())
              var u = { callback: o, errorback: s }
              this._callbackMap.hasOwnProperty(t)
                ? this._callbackMap[t].push(u)
                : ((this._callbackMap[t] = [u]),
                  this._scriptLoader.load(
                    e,
                    t,
                    function () {
                      return a.triggerCallback(t)
                    },
                    function (e) {
                      return a.triggerErrorback(t, e)
                    },
                  ))
            }),
            (e.prototype.triggerCallback = function (e) {
              var t = this._callbackMap[e]
              delete this._callbackMap[e]
              for (var n = 0; n < t.length; n++) t[n].callback()
            }),
            (e.prototype.triggerErrorback = function (e, t) {
              var n = this._callbackMap[e]
              delete this._callbackMap[e]
              for (var i = 0; i < n.length; i++) n[i].errorback(t)
            }),
            e
          )
        })(),
        n = (function () {
          function t() {}
          return (
            (t.prototype.attachListeners = function (e, t, n) {
              var i = function () {
                  e.removeEventListener('load', r), e.removeEventListener('error', o)
                },
                r = function (e) {
                  i(), t()
                },
                o = function (e) {
                  i(), n(e)
                }
              e.addEventListener('load', r), e.addEventListener('error', o)
            }),
            (t.prototype.load = function (t, n, i, r) {
              if (/^node\|/.test(n)) {
                var s = t.getConfig().getOptionsLiteral(),
                  a = o(t.getRecorder(), s.nodeRequire || e.global.nodeRequire),
                  l = n.split('|'),
                  u = null
                try {
                  u = a(l[1])
                } catch (e) {
                  return void r(e)
                }
                t.enqueueDefineAnonymousModule([], function () {
                  return u
                }),
                  i()
              } else {
                var c = document.createElement('script')
                c.setAttribute('async', 'async'),
                  c.setAttribute('type', 'text/javascript'),
                  this.attachListeners(c, i, r)
                var d = t.getConfig().getOptionsLiteral().trustedTypesPolicy
                d && (n = d.createScriptURL(n)), c.setAttribute('src', n)
                var h = t.getConfig().getOptionsLiteral().cspNonce
                h && c.setAttribute('nonce', h),
                  document.getElementsByTagName('head')[0].appendChild(c)
              }
            }),
            t
          )
        })(),
        i = (function () {
          function t() {
            this._cachedCanUseEval = null
          }
          return (
            (t.prototype._canUseEval = function (e) {
              return (
                null === this._cachedCanUseEval &&
                  (this._cachedCanUseEval = (function (e) {
                    var t = e.getConfig().getOptionsLiteral().trustedTypesPolicy
                    try {
                      return (
                        (t ? self.eval(t.createScript('', 'true')) : new Function('true')).call(
                          self,
                        ),
                        !0
                      )
                    } catch (e) {
                      return !1
                    }
                  })(e)),
                this._cachedCanUseEval
              )
            }),
            (t.prototype.load = function (t, n, i, r) {
              if (/^node\|/.test(n)) {
                var s = t.getConfig().getOptionsLiteral(),
                  a = o(t.getRecorder(), s.nodeRequire || e.global.nodeRequire),
                  l = n.split('|'),
                  u = null
                try {
                  u = a(l[1])
                } catch (e) {
                  return void r(e)
                }
                t.enqueueDefineAnonymousModule([], function () {
                  return u
                }),
                  i()
              } else {
                var c = t.getConfig().getOptionsLiteral().trustedTypesPolicy
                if (
                  (!/^((http:)|(https:)|(file:))/.test(n) ||
                    n.substring(0, self.origin.length) === self.origin) &&
                  this._canUseEval(t)
                )
                  return void fetch(n)
                    .then(function (e) {
                      if (200 !== e.status) throw new Error(e.statusText)
                      return e.text()
                    })
                    .then(function (e) {
                      ;(e = e + '\n//# sourceURL=' + n),
                        (c ? self.eval(c.createScript('', e)) : new Function(e)).call(self),
                        i()
                    })
                    .then(void 0, r)
                try {
                  c && (n = c.createScriptURL(n)), importScripts(n), i()
                } catch (e) {
                  r(e)
                }
              }
            }),
            t
          )
        })(),
        r = (function () {
          function t(e) {
            ;(this._env = e), (this._didInitialize = !1), (this._didPatchNodeRequire = !1)
          }
          return (
            (t.prototype._init = function (e) {
              this._didInitialize ||
                ((this._didInitialize = !0),
                (this._fs = e('fs')),
                (this._vm = e('vm')),
                (this._path = e('path')),
                (this._crypto = e('crypto')))
            }),
            (t.prototype._initNodeRequire = function (e, t) {
              var n = t.getConfig().getOptionsLiteral().nodeCachedData
              if (n && !this._didPatchNodeRequire) {
                this._didPatchNodeRequire = !0
                var i = this,
                  r = e('module')
                r.prototype._compile = function (e, o) {
                  var s,
                    l = r.wrap(e.replace(/^#!.*/, '')),
                    u = t.getRecorder(),
                    c = i._getCachedDataPath(n, o),
                    d = { filename: o }
                  try {
                    var h = i._fs.readFileSync(c)
                    ;(s = h.slice(0, 16)), (d.cachedData = h.slice(16)), u.record(60, c)
                  } catch (e) {
                    u.record(61, c)
                  }
                  var f = new i._vm.Script(l, d),
                    m = f.runInThisContext(d),
                    g = i._path.dirname(o),
                    p = (function (e) {
                      var t = e.constructor,
                        n = function (t) {
                          try {
                            return e.require(t)
                          } finally {
                          }
                        }
                      return (
                        ((n.resolve = function (n, i) {
                          return t._resolveFilename(n, e, !1, i)
                        }).paths = function (n) {
                          return t._resolveLookupPaths(n, e)
                        }),
                        (n.main = process.mainModule),
                        (n.extensions = t._extensions),
                        (n.cache = t._cache),
                        n
                      )
                    })(this),
                    _ = [this.exports, p, this, o, g, process, a, Buffer],
                    C = m.apply(this.exports, _)
                  return (
                    i._handleCachedData(f, l, c, !d.cachedData, t),
                    i._verifyCachedData(f, l, c, s, t),
                    C
                  )
                }
              }
            }),
            (t.prototype.load = function (n, i, r, s) {
              var a = this,
                l = n.getConfig().getOptionsLiteral(),
                u = o(n.getRecorder(), l.nodeRequire || e.global.nodeRequire),
                c =
                  l.nodeInstrumenter ||
                  function (e) {
                    return e
                  }
              this._init(u), this._initNodeRequire(u, n)
              var d = n.getRecorder()
              if (/^node\|/.test(i)) {
                var h = i.split('|'),
                  f = null
                try {
                  f = u(h[1])
                } catch (e) {
                  return void s(e)
                }
                n.enqueueDefineAnonymousModule([], function () {
                  return f
                }),
                  r()
              } else {
                i = e.Utilities.fileUriToFilePath(this._env.isWindows, i)
                var m = this._path.normalize(i),
                  g = this._getElectronRendererScriptPathOrUri(m),
                  p = Boolean(l.nodeCachedData),
                  _ = p ? this._getCachedDataPath(l.nodeCachedData, i) : void 0
                this._readSourceAndCachedData(m, _, d, function (e, i, o, l) {
                  if (e) s(e)
                  else {
                    var u
                    ;(u =
                      i.charCodeAt(0) === t._BOM
                        ? t._PREFIX + i.substring(1) + t._SUFFIX
                        : t._PREFIX + i + t._SUFFIX),
                      (u = c(u, m))
                    var d = { filename: g, cachedData: o },
                      h = a._createAndEvalScript(n, u, d, r, s)
                    a._handleCachedData(h, u, _, p && !o, n), a._verifyCachedData(h, u, _, l, n)
                  }
                })
              }
            }),
            (t.prototype._createAndEvalScript = function (t, n, i, r, o) {
              var s = t.getRecorder()
              s.record(31, i.filename)
              var a = new this._vm.Script(n, i),
                l = a.runInThisContext(i),
                u = t.getGlobalAMDDefineFunc(),
                c = !1,
                d = function () {
                  return (c = !0), u.apply(null, arguments)
                }
              return (
                (d.amd = u.amd),
                l.call(
                  e.global,
                  t.getGlobalAMDRequireFunc(),
                  d,
                  i.filename,
                  this._path.dirname(i.filename),
                ),
                s.record(32, i.filename),
                c ? r() : o(new Error("Didn't receive define call in " + i.filename + '!')),
                a
              )
            }),
            (t.prototype._getElectronRendererScriptPathOrUri = function (e) {
              if (!this._env.isElectronRenderer) return e
              var t = e.match(/^([a-z])\:(.*)/i)
              return t
                ? 'file:///' + (t[1].toUpperCase() + ':' + t[2]).replace(/\\/g, '/')
                : 'file://' + e
            }),
            (t.prototype._getCachedDataPath = function (e, t) {
              var n = this._crypto
                  .createHash('md5')
                  .update(t, 'utf8')
                  .update(e.seed, 'utf8')
                  .update(process.arch, '')
                  .digest('hex'),
                i = this._path.basename(t).replace(/\.js$/, '')
              return this._path.join(e.path, i + '-' + n + '.code')
            }),
            (t.prototype._handleCachedData = function (e, t, n, i, r) {
              var o = this
              e.cachedDataRejected
                ? this._fs.unlink(n, function (i) {
                    r.getRecorder().record(62, n),
                      o._createAndWriteCachedData(e, t, n, r),
                      i && r.getConfig().onError(i)
                  })
                : i && this._createAndWriteCachedData(e, t, n, r)
            }),
            (t.prototype._createAndWriteCachedData = function (e, t, n, i) {
              var r = this,
                o = Math.ceil(
                  i.getConfig().getOptionsLiteral().nodeCachedData.writeDelay * (1 + Math.random()),
                ),
                s = -1,
                a = 0,
                l = void 0,
                u = function () {
                  setTimeout(function () {
                    l || (l = r._crypto.createHash('md5').update(t, 'utf8').digest())
                    var o = e.createCachedData()
                    if (!(0 === o.length || o.length === s || a >= 5)) {
                      if (o.length < s) return void u()
                      ;(s = o.length),
                        r._fs.writeFile(n, Buffer.concat([l, o]), function (e) {
                          e && i.getConfig().onError(e), i.getRecorder().record(63, n), u()
                        })
                    }
                  }, o * Math.pow(4, a++))
                }
              u()
            }),
            (t.prototype._readSourceAndCachedData = function (e, t, n, i) {
              if (t) {
                var r = void 0,
                  o = void 0,
                  s = void 0,
                  a = 2,
                  l = function (e) {
                    e ? i(e) : 0 == --a && i(void 0, r, o, s)
                  }
                this._fs.readFile(e, { encoding: 'utf8' }, function (e, t) {
                  ;(r = t), l(e)
                }),
                  this._fs.readFile(t, function (e, i) {
                    !e && i && i.length > 0
                      ? ((s = i.slice(0, 16)), (o = i.slice(16)), n.record(60, t))
                      : n.record(61, t),
                      l()
                  })
              } else this._fs.readFile(e, { encoding: 'utf8' }, i)
            }),
            (t.prototype._verifyCachedData = function (e, t, n, i, r) {
              var o = this
              !i ||
                e.cachedDataRejected ||
                setTimeout(function () {
                  var e = o._crypto.createHash('md5').update(t, 'utf8').digest()
                  i.equals(e) ||
                    (r
                      .getConfig()
                      .onError(
                        new Error(
                          "FAILED TO VERIFY CACHED DATA, deleting stale '" +
                            n +
                            "' now, but a RESTART IS REQUIRED",
                        ),
                      ),
                    o._fs.unlink(n, function (e) {
                      e && r.getConfig().onError(e)
                    }))
                }, Math.ceil(5e3 * (1 + Math.random())))
            }),
            (t._BOM = 65279),
            (t._PREFIX = '(function (require, define, __filename, __dirname) { '),
            (t._SUFFIX = '\n});'),
            t
          )
        })()
      function o(e, t) {
        if (t.__$__isRecorded) return t
        var n = function (n) {
          e.record(33, n)
          try {
            return t(n)
          } finally {
            e.record(34, n)
          }
        }
        return (n.__$__isRecorded = !0), n
      }
      ;(e.ensureRecordedNodeRequire = o),
        (e.createScriptLoader = function (e) {
          return new t(e)
        })
    })(i || (i = {})),
    (function (e) {
      var t = (function () {
        function t(e) {
          var t = e.lastIndexOf('/')
          this.fromModulePath = -1 !== t ? e.substr(0, t + 1) : ''
        }
        return (
          (t._normalizeModuleId = function (e) {
            var t,
              n = e
            for (t = /\/\.\//; t.test(n); ) n = n.replace(t, '/')
            for (
              n = n.replace(/^\.\//g, ''),
                t = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
              t.test(n);

            )
              n = n.replace(t, '/')
            return n.replace(
              /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
              '',
            )
          }),
          (t.prototype.resolveModule = function (n) {
            var i = n
            return (
              e.Utilities.isAbsolutePath(i) ||
                ((e.Utilities.startsWith(i, './') || e.Utilities.startsWith(i, '../')) &&
                  (i = t._normalizeModuleId(this.fromModulePath + i))),
              i
            )
          }),
          (t.ROOT = new t('')),
          t
        )
      })()
      e.ModuleIdResolver = t
      var n = (function () {
        function t(e, t, n, i, r, o) {
          ;(this.id = e),
            (this.strId = t),
            (this.dependencies = n),
            (this._callback = i),
            (this._errorback = r),
            (this.moduleIdResolver = o),
            (this.exports = {}),
            (this.error = null),
            (this.exportsPassedIn = !1),
            (this.unresolvedDependenciesCount = this.dependencies.length),
            (this._isComplete = !1)
        }
        return (
          (t._safeInvokeFunction = function (t, n) {
            try {
              return { returnedValue: t.apply(e.global, n), producedError: null }
            } catch (e) {
              return { returnedValue: null, producedError: e }
            }
          }),
          (t._invokeFactory = function (t, n, i, r) {
            return t.isBuild() && !e.Utilities.isAnonymousModule(n)
              ? { returnedValue: null, producedError: null }
              : t.shouldCatchError()
              ? this._safeInvokeFunction(i, r)
              : { returnedValue: i.apply(e.global, r), producedError: null }
          }),
          (t.prototype.complete = function (n, i, r) {
            this._isComplete = !0
            var o = null
            if (this._callback)
              if ('function' == typeof this._callback) {
                n.record(21, this.strId)
                var s = t._invokeFactory(i, this.strId, this._callback, r)
                ;(o = s.producedError),
                  n.record(22, this.strId),
                  !o &&
                    void 0 !== s.returnedValue &&
                    (!this.exportsPassedIn || e.Utilities.isEmpty(this.exports)) &&
                    (this.exports = s.returnedValue)
              } else this.exports = this._callback
            if (o) {
              var a = e.ensureError(o)
              ;(a.phase = 'factory'), (a.moduleId = this.strId), (this.error = a), i.onError(a)
            }
            ;(this.dependencies = null),
              (this._callback = null),
              (this._errorback = null),
              (this.moduleIdResolver = null)
          }),
          (t.prototype.onDependencyError = function (e) {
            return (
              (this._isComplete = !0),
              (this.error = e),
              !!this._errorback && (this._errorback(e), !0)
            )
          }),
          (t.prototype.isComplete = function () {
            return this._isComplete
          }),
          t
        )
      })()
      e.Module = n
      var i = (function () {
          function e() {
            ;(this._nextId = 0),
              (this._strModuleIdToIntModuleId = new Map()),
              (this._intModuleIdToStrModuleId = []),
              this.getModuleId('exports'),
              this.getModuleId('module'),
              this.getModuleId('require')
          }
          return (
            (e.prototype.getMaxModuleId = function () {
              return this._nextId
            }),
            (e.prototype.getModuleId = function (e) {
              var t = this._strModuleIdToIntModuleId.get(e)
              return (
                void 0 === t &&
                  ((t = this._nextId++),
                  this._strModuleIdToIntModuleId.set(e, t),
                  (this._intModuleIdToStrModuleId[t] = e)),
                t
              )
            }),
            (e.prototype.getStrModuleId = function (e) {
              return this._intModuleIdToStrModuleId[e]
            }),
            e
          )
        })(),
        r = (function () {
          function e(e) {
            this.id = e
          }
          return (e.EXPORTS = new e(0)), (e.MODULE = new e(1)), (e.REQUIRE = new e(2)), e
        })()
      e.RegularDependency = r
      var o = function (e, t, n) {
        ;(this.id = e), (this.pluginId = t), (this.pluginParam = n)
      }
      e.PluginDependency = o
      var s = (function () {
        function s(t, n, r, o, s) {
          void 0 === s && (s = 0),
            (this._env = t),
            (this._scriptLoader = n),
            (this._loaderAvailableTimestamp = s),
            (this._defineFunc = r),
            (this._requireFunc = o),
            (this._moduleIdProvider = new i()),
            (this._config = new e.Configuration(this._env)),
            (this._hasDependencyCycle = !1),
            (this._modules2 = []),
            (this._knownModules2 = []),
            (this._inverseDependencies2 = []),
            (this._inversePluginDependencies2 = new Map()),
            (this._currentAnonymousDefineCall = null),
            (this._recorder = null),
            (this._buildInfoPath = []),
            (this._buildInfoDefineStack = []),
            (this._buildInfoDependencies = [])
        }
        return (
          (s.prototype.reset = function () {
            return new s(
              this._env,
              this._scriptLoader,
              this._defineFunc,
              this._requireFunc,
              this._loaderAvailableTimestamp,
            )
          }),
          (s.prototype.getGlobalAMDDefineFunc = function () {
            return this._defineFunc
          }),
          (s.prototype.getGlobalAMDRequireFunc = function () {
            return this._requireFunc
          }),
          (s._findRelevantLocationInStack = function (e, t) {
            for (
              var n = function (e) {
                  return e.replace(/\\/g, '/')
                },
                i = n(e),
                r = t.split(/\n/),
                o = 0;
              o < r.length;
              o++
            ) {
              var s = r[o].match(/(.*):(\d+):(\d+)\)?$/)
              if (s) {
                var a = s[1],
                  l = s[2],
                  u = s[3],
                  c = Math.max(a.lastIndexOf(' ') + 1, a.lastIndexOf('(') + 1)
                if ((a = n((a = a.substr(c)))) === i) {
                  var d = { line: parseInt(l, 10), col: parseInt(u, 10) }
                  return (
                    1 === d.line &&
                      (d.col -= '(function (require, define, __filename, __dirname) { '.length),
                    d
                  )
                }
              }
            }
            throw new Error('Could not correlate define call site for needle ' + e)
          }),
          (s.prototype.getBuildInfo = function () {
            if (!this._config.isBuild()) return null
            for (var e = [], t = 0, n = 0, i = this._modules2.length; n < i; n++) {
              var r = this._modules2[n]
              if (r) {
                var o = this._buildInfoPath[r.id] || null,
                  a = this._buildInfoDefineStack[r.id] || null,
                  l = this._buildInfoDependencies[r.id]
                e[t++] = {
                  id: r.strId,
                  path: o,
                  defineLocation: o && a ? s._findRelevantLocationInStack(o, a) : null,
                  dependencies: l,
                  shim: null,
                  exports: r.exports,
                }
              }
            }
            return e
          }),
          (s.prototype.getRecorder = function () {
            return (
              this._recorder ||
                (this._config.shouldRecordStats()
                  ? (this._recorder = new e.LoaderEventRecorder(this._loaderAvailableTimestamp))
                  : (this._recorder = e.NullLoaderEventRecorder.INSTANCE)),
              this._recorder
            )
          }),
          (s.prototype.getLoaderEvents = function () {
            return this.getRecorder().getEvents()
          }),
          (s.prototype.enqueueDefineAnonymousModule = function (e, t) {
            if (null !== this._currentAnonymousDefineCall)
              throw new Error('Can only have one anonymous define call per script file')
            var n = null
            this._config.isBuild() && (n = new Error('StackLocation').stack || null),
              (this._currentAnonymousDefineCall = { stack: n, dependencies: e, callback: t })
          }),
          (s.prototype.defineModule = function (e, i, r, o, s, a) {
            var l = this
            void 0 === a && (a = new t(e))
            var u = this._moduleIdProvider.getModuleId(e)
            if (this._modules2[u])
              this._config.isDuplicateMessageIgnoredFor(e) ||
                console.warn("Duplicate definition of module '" + e + "'")
            else {
              var c = new n(u, e, this._normalizeDependencies(i, a), r, o, a)
              ;(this._modules2[u] = c),
                this._config.isBuild() &&
                  ((this._buildInfoDefineStack[u] = s),
                  (this._buildInfoDependencies[u] = (c.dependencies || []).map(function (e) {
                    return l._moduleIdProvider.getStrModuleId(e.id)
                  }))),
                this._resolve(c)
            }
          }),
          (s.prototype._normalizeDependency = function (e, t) {
            if ('exports' === e) return r.EXPORTS
            if ('module' === e) return r.MODULE
            if ('require' === e) return r.REQUIRE
            var n = e.indexOf('!')
            if (n >= 0) {
              var i = t.resolveModule(e.substr(0, n)),
                s = t.resolveModule(e.substr(n + 1)),
                a = this._moduleIdProvider.getModuleId(i + '!' + s),
                l = this._moduleIdProvider.getModuleId(i)
              return new o(a, l, s)
            }
            return new r(this._moduleIdProvider.getModuleId(t.resolveModule(e)))
          }),
          (s.prototype._normalizeDependencies = function (e, t) {
            for (var n = [], i = 0, r = 0, o = e.length; r < o; r++)
              n[i++] = this._normalizeDependency(e[r], t)
            return n
          }),
          (s.prototype._relativeRequire = function (t, n, i, r) {
            if ('string' == typeof n) return this.synchronousRequire(n, t)
            this.defineModule(e.Utilities.generateAnonymousModule(), n, i, r, null, t)
          }),
          (s.prototype.synchronousRequire = function (e, n) {
            void 0 === n && (n = new t(e))
            var i = this._normalizeDependency(e, n),
              r = this._modules2[i.id]
            if (!r)
              throw new Error(
                "Check dependency list! Synchronous require cannot resolve module '" +
                  e +
                  "'. This is the first mention of this module!",
              )
            if (!r.isComplete())
              throw new Error(
                "Check dependency list! Synchronous require cannot resolve module '" +
                  e +
                  "'. This module has not been resolved completely yet.",
              )
            if (r.error) throw r.error
            return r.exports
          }),
          (s.prototype.configure = function (t, n) {
            var i = this._config.shouldRecordStats()
            ;(this._config = n ? new e.Configuration(this._env, t) : this._config.cloneAndMerge(t)),
              this._config.shouldRecordStats() && !i && (this._recorder = null)
          }),
          (s.prototype.getConfig = function () {
            return this._config
          }),
          (s.prototype._onLoad = function (e) {
            if (null !== this._currentAnonymousDefineCall) {
              var t = this._currentAnonymousDefineCall
              ;(this._currentAnonymousDefineCall = null),
                this.defineModule(
                  this._moduleIdProvider.getStrModuleId(e),
                  t.dependencies,
                  t.callback,
                  null,
                  t.stack,
                )
            }
          }),
          (s.prototype._createLoadError = function (t, n) {
            var i = this,
              r = this._moduleIdProvider.getStrModuleId(t),
              o = (this._inverseDependencies2[t] || []).map(function (e) {
                return i._moduleIdProvider.getStrModuleId(e)
              }),
              s = e.ensureError(n)
            return (s.phase = 'loading'), (s.moduleId = r), (s.neededBy = o), s
          }),
          (s.prototype._onLoadError = function (e, t) {
            var i = this._createLoadError(e, t)
            this._modules2[e] ||
              (this._modules2[e] = new n(
                e,
                this._moduleIdProvider.getStrModuleId(e),
                [],
                function () {},
                null,
                null,
              ))
            for (var r = [], o = 0, s = this._moduleIdProvider.getMaxModuleId(); o < s; o++)
              r[o] = !1
            var a = !1,
              l = []
            for (l.push(e), r[e] = !0; l.length > 0; ) {
              var u = l.shift(),
                c = this._modules2[u]
              c && (a = c.onDependencyError(i) || a)
              var d = this._inverseDependencies2[u]
              if (d)
                for (o = 0, s = d.length; o < s; o++) {
                  var h = d[o]
                  r[h] || (l.push(h), (r[h] = !0))
                }
            }
            a || this._config.onError(i)
          }),
          (s.prototype._hasDependencyPath = function (e, t) {
            var n = this._modules2[e]
            if (!n) return !1
            for (var i = [], r = 0, o = this._moduleIdProvider.getMaxModuleId(); r < o; r++)
              i[r] = !1
            var s = []
            for (s.push(n), i[e] = !0; s.length > 0; ) {
              var a = s.shift().dependencies
              if (a)
                for (r = 0, o = a.length; r < o; r++) {
                  var l = a[r]
                  if (l.id === t) return !0
                  var u = this._modules2[l.id]
                  u && !i[l.id] && ((i[l.id] = !0), s.push(u))
                }
            }
            return !1
          }),
          (s.prototype._findCyclePath = function (e, t, n) {
            if (e === t || 50 === n) return [e]
            var i = this._modules2[e]
            if (!i) return null
            var r = i.dependencies
            if (r)
              for (var o = 0, s = r.length; o < s; o++) {
                var a = this._findCyclePath(r[o].id, t, n + 1)
                if (null !== a) return a.push(e), a
              }
            return null
          }),
          (s.prototype._createRequire = function (t) {
            var n = this,
              i = function (e, i, r) {
                return n._relativeRequire(t, e, i, r)
              }
            return (
              (i.toUrl = function (e) {
                return n._config.requireToUrl(t.resolveModule(e))
              }),
              (i.getStats = function () {
                return n.getLoaderEvents()
              }),
              (i.hasDependencyCycle = function () {
                return n._hasDependencyCycle
              }),
              (i.config = function (e, t) {
                void 0 === t && (t = !1), n.configure(e, t)
              }),
              (i.__$__nodeRequire = e.global.nodeRequire),
              i
            )
          }),
          (s.prototype._loadModule = function (e) {
            var t = this
            if (!this._modules2[e] && !this._knownModules2[e]) {
              this._knownModules2[e] = !0
              var n = this._moduleIdProvider.getStrModuleId(e),
                i = this._config.moduleIdToPaths(n)
              this._env.isNode &&
                (-1 === n.indexOf('/') || /^@[^\/]+\/[^\/]+$/.test(n)) &&
                i.push('node|' + n)
              var r = -1,
                o = function (n) {
                  if (++r >= i.length) t._onLoadError(e, n)
                  else {
                    var s = i[r],
                      a = t.getRecorder()
                    if (t._config.isBuild() && 'empty:' === s)
                      return (
                        (t._buildInfoPath[e] = s),
                        t.defineModule(t._moduleIdProvider.getStrModuleId(e), [], null, null, null),
                        void t._onLoad(e)
                      )
                    a.record(10, s),
                      t._scriptLoader.load(
                        t,
                        s,
                        function () {
                          t._config.isBuild() && (t._buildInfoPath[e] = s),
                            a.record(11, s),
                            t._onLoad(e)
                        },
                        function (e) {
                          a.record(12, s), o(e)
                        },
                      )
                  }
                }
              o(null)
            }
          }),
          (s.prototype._loadPluginDependency = function (e, n) {
            var i = this
            if (!this._modules2[n.id] && !this._knownModules2[n.id]) {
              this._knownModules2[n.id] = !0
              var r = function (e) {
                i.defineModule(i._moduleIdProvider.getStrModuleId(n.id), [], e, null, null)
              }
              ;(r.error = function (e) {
                i._config.onError(i._createLoadError(n.id, e))
              }),
                e.load(
                  n.pluginParam,
                  this._createRequire(t.ROOT),
                  r,
                  this._config.getOptionsLiteral(),
                )
            }
          }),
          (s.prototype._resolve = function (e) {
            var t = this,
              n = e.dependencies
            if (n)
              for (var i = 0, s = n.length; i < s; i++) {
                var a = n[i]
                if (a !== r.EXPORTS)
                  if (a !== r.MODULE)
                    if (a !== r.REQUIRE) {
                      var l = this._modules2[a.id]
                      if (l && l.isComplete()) {
                        if (l.error) return void e.onDependencyError(l.error)
                        e.unresolvedDependenciesCount--
                      } else if (this._hasDependencyPath(a.id, e.id)) {
                        ;(this._hasDependencyCycle = !0),
                          console.warn(
                            "There is a dependency cycle between '" +
                              this._moduleIdProvider.getStrModuleId(a.id) +
                              "' and '" +
                              this._moduleIdProvider.getStrModuleId(e.id) +
                              "'. The cyclic path follows:",
                          )
                        var u = this._findCyclePath(a.id, e.id, 0) || []
                        u.reverse(),
                          u.push(a.id),
                          console.warn(
                            u
                              .map(function (e) {
                                return t._moduleIdProvider.getStrModuleId(e)
                              })
                              .join(' => \n'),
                          ),
                          e.unresolvedDependenciesCount--
                      } else if (
                        ((this._inverseDependencies2[a.id] =
                          this._inverseDependencies2[a.id] || []),
                        this._inverseDependencies2[a.id].push(e.id),
                        a instanceof o)
                      ) {
                        var c = this._modules2[a.pluginId]
                        if (c && c.isComplete()) {
                          this._loadPluginDependency(c.exports, a)
                          continue
                        }
                        var d = this._inversePluginDependencies2.get(a.pluginId)
                        d || ((d = []), this._inversePluginDependencies2.set(a.pluginId, d)),
                          d.push(a),
                          this._loadModule(a.pluginId)
                      } else this._loadModule(a.id)
                    } else e.unresolvedDependenciesCount--
                  else e.unresolvedDependenciesCount--
                else (e.exportsPassedIn = !0), e.unresolvedDependenciesCount--
              }
            0 === e.unresolvedDependenciesCount && this._onModuleComplete(e)
          }),
          (s.prototype._onModuleComplete = function (e) {
            var t = this,
              n = this.getRecorder()
            if (!e.isComplete()) {
              var i = e.dependencies,
                o = []
              if (i)
                for (var s = 0, a = i.length; s < a; s++) {
                  var l = i[s]
                  if (l !== r.EXPORTS)
                    if (l !== r.MODULE)
                      if (l !== r.REQUIRE) {
                        var u = this._modules2[l.id]
                        o[s] = u ? u.exports : null
                      } else o[s] = this._createRequire(e.moduleIdResolver)
                    else
                      o[s] = {
                        id: e.strId,
                        config: function () {
                          return t._config.getConfigForModule(e.strId)
                        },
                      }
                  else o[s] = e.exports
                }
              e.complete(n, this._config, o)
              var c = this._inverseDependencies2[e.id]
              if (((this._inverseDependencies2[e.id] = null), c))
                for (s = 0, a = c.length; s < a; s++) {
                  var d = c[s],
                    h = this._modules2[d]
                  h.unresolvedDependenciesCount--,
                    0 === h.unresolvedDependenciesCount && this._onModuleComplete(h)
                }
              var f = this._inversePluginDependencies2.get(e.id)
              if (f)
                for (this._inversePluginDependencies2.delete(e.id), s = 0, a = f.length; s < a; s++)
                  this._loadPluginDependency(e.exports, f[s])
            }
          }),
          s
        )
      })()
      e.ModuleManager = s
    })(i || (i = {})),
    (function (e) {
      var t = new e.Environment(),
        i = null,
        r = function (e, t, n) {
          'string' != typeof e && ((n = t), (t = e), (e = null)),
            ('object' != typeof t || !Array.isArray(t)) && ((n = t), (t = null)),
            t || (t = ['require', 'exports', 'module']),
            e ? i.defineModule(e, t, n, null, null) : i.enqueueDefineAnonymousModule(t, n)
        }
      r.amd = { jQuery: !0 }
      var o = function (e, t) {
          void 0 === t && (t = !1), i.configure(e, t)
        },
        s = function () {
          if (1 === arguments.length) {
            if (arguments[0] instanceof Object && !Array.isArray(arguments[0]))
              return void o(arguments[0])
            if ('string' == typeof arguments[0]) return i.synchronousRequire(arguments[0])
          }
          if ((2 !== arguments.length && 3 !== arguments.length) || !Array.isArray(arguments[0]))
            throw new Error('Unrecognized require call')
          i.defineModule(
            e.Utilities.generateAnonymousModule(),
            arguments[0],
            arguments[1],
            arguments[2],
            null,
          )
        }
      function a() {
        if (void 0 !== e.global.require || 'undefined' != typeof require) {
          var n = e.global.require || require
          if ('function' == typeof n && 'function' == typeof n.resolve) {
            var o = e.ensureRecordedNodeRequire(i.getRecorder(), n)
            ;(e.global.nodeRequire = o), (s.nodeRequire = o), (s.__$__nodeRequire = o)
          }
        }
        !t.isNode || t.isElectronRenderer || t.isElectronNodeIntegrationWebWorker
          ? (t.isElectronRenderer || (e.global.define = r), (e.global.require = s))
          : ((module.exports = s), (require = s))
      }
      ;(s.config = o),
        (s.getConfig = function () {
          return i.getConfig().getOptionsLiteral()
        }),
        (s.reset = function () {
          i = i.reset()
        }),
        (s.getBuildInfo = function () {
          return i.getBuildInfo()
        }),
        (s.getStats = function () {
          return i.getLoaderEvents()
        }),
        (s.define = r),
        (e.init = a),
        ('function' != typeof e.global.define || !e.global.define.amd) &&
          ((i = new e.ModuleManager(
            t,
            e.createScriptLoader(t),
            r,
            s,
            e.Utilities.getHighPerformanceTimestamp(),
          )),
          void 0 !== e.global.require &&
            'function' != typeof e.global.require &&
            s.config(e.global.require),
          (n = function () {
            return r.apply(null, arguments)
          }),
          (n.amd = r.amd),
          'undefined' == typeof doNotInitLoader && a())
    })(i || (i = {})),
    n(r[14], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.DiffChange = void 0),
        (t.DiffChange = class {
          constructor(e, t, n, i) {
            ;(this.originalStart = e),
              (this.originalLength = t),
              (this.modifiedStart = n),
              (this.modifiedLength = i)
          }
          getOriginalEnd() {
            return this.originalStart + this.originalLength
          }
          getModifiedEnd() {
            return this.modifiedStart + this.modifiedLength
          }
        })
    }),
    n(r[7], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.NotSupportedError =
          t.illegalState =
          t.illegalArgument =
          t.canceled =
          t.isPromiseCanceledError =
          t.transformErrorForSerialization =
          t.onUnexpectedExternalError =
          t.onUnexpectedError =
          t.errorHandler =
          t.ErrorHandler =
            void 0)
      class n {
        constructor() {
          ;(this.listeners = []),
            (this.unexpectedErrorHandler = function (e) {
              setTimeout(() => {
                throw e.stack ? new Error(e.message + '\n\n' + e.stack) : e
              }, 0)
            })
        }
        emit(e) {
          this.listeners.forEach(t => {
            t(e)
          })
        }
        onUnexpectedError(e) {
          this.unexpectedErrorHandler(e), this.emit(e)
        }
        onUnexpectedExternalError(e) {
          this.unexpectedErrorHandler(e)
        }
      }
      ;(t.ErrorHandler = n),
        (t.errorHandler = new n()),
        (t.onUnexpectedError = function (e) {
          r(e) || t.errorHandler.onUnexpectedError(e)
        }),
        (t.onUnexpectedExternalError = function (e) {
          r(e) || t.errorHandler.onUnexpectedExternalError(e)
        }),
        (t.transformErrorForSerialization = function (e) {
          if (e instanceof Error) {
            let { name: t, message: n } = e
            return { $isError: !0, name: t, message: n, stack: e.stacktrace || e.stack }
          }
          return e
        })
      const i = 'Canceled'
      function r(e) {
        return e instanceof Error && e.name === i && e.message === i
      }
      ;(t.isPromiseCanceledError = r),
        (t.canceled = function () {
          const e = new Error(i)
          return (e.name = e.message), e
        }),
        (t.illegalArgument = function (e) {
          return e ? new Error(`Illegal argument: ${e}`) : new Error('Illegal argument')
        }),
        (t.illegalState = function (e) {
          return e ? new Error(`Illegal state: ${e}`) : new Error('Illegal state')
        })
      class o extends Error {
        constructor(e) {
          super('NotSupported'), e && (this.message = e)
        }
      }
      t.NotSupportedError = o
    }),
    n(r[15], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.once = void 0),
        (t.once = function (e) {
          const t = this
          let n,
            i = !1
          return function () {
            return i || ((i = !0), (n = e.apply(t, arguments))), n
          }
        })
    }),
    n(r[16], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.Iterable = void 0),
        (function (e) {
          e.is = function (e) {
            return e && 'object' == typeof e && 'function' == typeof e[Symbol.iterator]
          }
          const t = Object.freeze([])
          ;(e.empty = function () {
            return t
          }),
            (e.single = function* (e) {
              yield e
            }),
            (e.from = function (e) {
              return e || t
            }),
            (e.isEmpty = function (e) {
              return !e || !0 === e[Symbol.iterator]().next().done
            }),
            (e.first = function (e) {
              return e[Symbol.iterator]().next().value
            }),
            (e.some = function (e, t) {
              for (const n of e) if (t(n)) return !0
              return !1
            }),
            (e.find = function (e, t) {
              for (const n of e) if (t(n)) return n
            }),
            (e.filter = function* (e, t) {
              for (const n of e) t(n) && (yield n)
            }),
            (e.map = function* (e, t) {
              let n = 0
              for (const i of e) yield t(i, n++)
            }),
            (e.concat = function* (...e) {
              for (const t of e) for (const e of t) yield e
            }),
            (e.concatNested = function* (e) {
              for (const t of e) for (const e of t) yield e
            }),
            (e.reduce = function (e, t, n) {
              let i = n
              for (const n of e) i = t(i, n)
              return i
            }),
            (e.slice = function* (e, t, n = e.length) {
              for (
                t < 0 && (t += e.length), n < 0 ? (n += e.length) : n > e.length && (n = e.length);
                t < n;
                t++
              )
                yield e[t]
            }),
            (e.consume = function (t, n = Number.POSITIVE_INFINITY) {
              const i = []
              if (0 === n) return [i, t]
              const r = t[Symbol.iterator]()
              for (let t = 0; t < n; t++) {
                const t = r.next()
                if (t.done) return [i, e.empty()]
                i.push(t.value)
              }
              return [i, { [Symbol.iterator]: () => r }]
            }),
            (e.equals = function (e, t, n = (e, t) => e === t) {
              const i = e[Symbol.iterator](),
                r = t[Symbol.iterator]()
              for (;;) {
                const e = i.next(),
                  t = r.next()
                if (e.done !== t.done) return !1
                if (e.done) return !0
                if (!n(e.value, t.value)) return !1
              }
            })
        })(t.Iterable || (t.Iterable = {}))
    }),
    n(r[17], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.KeyChord =
          t.KeyCodeUtils =
          t.IMMUTABLE_KEY_CODE_TO_CODE =
          t.IMMUTABLE_CODE_TO_KEY_CODE =
          t.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE =
          t.EVENT_KEY_CODE_MAP =
            void 0)
      class n {
        constructor() {
          ;(this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null))
        }
        define(e, t) {
          ;(this._keyCodeToStr[e] = t), (this._strToKeyCode[t.toLowerCase()] = e)
        }
        keyCodeToStr(e) {
          return this._keyCodeToStr[e]
        }
        strToKeyCode(e) {
          return this._strToKeyCode[e.toLowerCase()] || 0
        }
      }
      const i = new n(),
        r = new n(),
        o = new n()
      ;(t.EVENT_KEY_CODE_MAP = new Array(230)), (t.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE = {})
      const s = [],
        a = Object.create(null),
        l = Object.create(null)
      ;(t.IMMUTABLE_CODE_TO_KEY_CODE = []), (t.IMMUTABLE_KEY_CODE_TO_CODE = [])
      for (let e = 0; e <= 193; e++) t.IMMUTABLE_CODE_TO_KEY_CODE[e] = -1
      for (let e = 0; e <= 126; e++) t.IMMUTABLE_KEY_CODE_TO_CODE[e] = -1
      var u
      !(function () {
        const e = '',
          n = [
            [0, 1, 0, 'None', 0, 'unknown', 0, 'VK_UNKNOWN', e, e],
            [0, 1, 1, 'Hyper', 0, e, 0, e, e, e],
            [0, 1, 2, 'Super', 0, e, 0, e, e, e],
            [0, 1, 3, 'Fn', 0, e, 0, e, e, e],
            [0, 1, 4, 'FnLock', 0, e, 0, e, e, e],
            [0, 1, 5, 'Suspend', 0, e, 0, e, e, e],
            [0, 1, 6, 'Resume', 0, e, 0, e, e, e],
            [0, 1, 7, 'Turbo', 0, e, 0, e, e, e],
            [0, 1, 8, 'Sleep', 0, e, 0, 'VK_SLEEP', e, e],
            [0, 1, 9, 'WakeUp', 0, e, 0, e, e, e],
            [31, 0, 10, 'KeyA', 31, 'A', 65, 'VK_A', e, e],
            [32, 0, 11, 'KeyB', 32, 'B', 66, 'VK_B', e, e],
            [33, 0, 12, 'KeyC', 33, 'C', 67, 'VK_C', e, e],
            [34, 0, 13, 'KeyD', 34, 'D', 68, 'VK_D', e, e],
            [35, 0, 14, 'KeyE', 35, 'E', 69, 'VK_E', e, e],
            [36, 0, 15, 'KeyF', 36, 'F', 70, 'VK_F', e, e],
            [37, 0, 16, 'KeyG', 37, 'G', 71, 'VK_G', e, e],
            [38, 0, 17, 'KeyH', 38, 'H', 72, 'VK_H', e, e],
            [39, 0, 18, 'KeyI', 39, 'I', 73, 'VK_I', e, e],
            [40, 0, 19, 'KeyJ', 40, 'J', 74, 'VK_J', e, e],
            [41, 0, 20, 'KeyK', 41, 'K', 75, 'VK_K', e, e],
            [42, 0, 21, 'KeyL', 42, 'L', 76, 'VK_L', e, e],
            [43, 0, 22, 'KeyM', 43, 'M', 77, 'VK_M', e, e],
            [44, 0, 23, 'KeyN', 44, 'N', 78, 'VK_N', e, e],
            [45, 0, 24, 'KeyO', 45, 'O', 79, 'VK_O', e, e],
            [46, 0, 25, 'KeyP', 46, 'P', 80, 'VK_P', e, e],
            [47, 0, 26, 'KeyQ', 47, 'Q', 81, 'VK_Q', e, e],
            [48, 0, 27, 'KeyR', 48, 'R', 82, 'VK_R', e, e],
            [49, 0, 28, 'KeyS', 49, 'S', 83, 'VK_S', e, e],
            [50, 0, 29, 'KeyT', 50, 'T', 84, 'VK_T', e, e],
            [51, 0, 30, 'KeyU', 51, 'U', 85, 'VK_U', e, e],
            [52, 0, 31, 'KeyV', 52, 'V', 86, 'VK_V', e, e],
            [53, 0, 32, 'KeyW', 53, 'W', 87, 'VK_W', e, e],
            [54, 0, 33, 'KeyX', 54, 'X', 88, 'VK_X', e, e],
            [55, 0, 34, 'KeyY', 55, 'Y', 89, 'VK_Y', e, e],
            [56, 0, 35, 'KeyZ', 56, 'Z', 90, 'VK_Z', e, e],
            [22, 0, 36, 'Digit1', 22, '1', 49, 'VK_1', e, e],
            [23, 0, 37, 'Digit2', 23, '2', 50, 'VK_2', e, e],
            [24, 0, 38, 'Digit3', 24, '3', 51, 'VK_3', e, e],
            [25, 0, 39, 'Digit4', 25, '4', 52, 'VK_4', e, e],
            [26, 0, 40, 'Digit5', 26, '5', 53, 'VK_5', e, e],
            [27, 0, 41, 'Digit6', 27, '6', 54, 'VK_6', e, e],
            [28, 0, 42, 'Digit7', 28, '7', 55, 'VK_7', e, e],
            [29, 0, 43, 'Digit8', 29, '8', 56, 'VK_8', e, e],
            [30, 0, 44, 'Digit9', 30, '9', 57, 'VK_9', e, e],
            [21, 0, 45, 'Digit0', 21, '0', 48, 'VK_0', e, e],
            [3, 1, 46, 'Enter', 3, 'Enter', 13, 'VK_RETURN', e, e],
            [9, 1, 47, 'Escape', 9, 'Escape', 27, 'VK_ESCAPE', e, e],
            [1, 1, 48, 'Backspace', 1, 'Backspace', 8, 'VK_BACK', e, e],
            [2, 1, 49, 'Tab', 2, 'Tab', 9, 'VK_TAB', e, e],
            [10, 1, 50, 'Space', 10, 'Space', 32, 'VK_SPACE', e, e],
            [83, 0, 51, 'Minus', 83, '-', 189, 'VK_OEM_MINUS', '-', 'OEM_MINUS'],
            [81, 0, 52, 'Equal', 81, '=', 187, 'VK_OEM_PLUS', '=', 'OEM_PLUS'],
            [87, 0, 53, 'BracketLeft', 87, '[', 219, 'VK_OEM_4', '[', 'OEM_4'],
            [89, 0, 54, 'BracketRight', 89, ']', 221, 'VK_OEM_6', ']', 'OEM_6'],
            [88, 0, 55, 'Backslash', 88, '\\', 220, 'VK_OEM_5', '\\', 'OEM_5'],
            [0, 0, 56, 'IntlHash', 0, e, 0, e, e, e],
            [80, 0, 57, 'Semicolon', 80, ';', 186, 'VK_OEM_1', ';', 'OEM_1'],
            [90, 0, 58, 'Quote', 90, "'", 222, 'VK_OEM_7', "'", 'OEM_7'],
            [86, 0, 59, 'Backquote', 86, '`', 192, 'VK_OEM_3', '`', 'OEM_3'],
            [82, 0, 60, 'Comma', 82, ',', 188, 'VK_OEM_COMMA', ',', 'OEM_COMMA'],
            [84, 0, 61, 'Period', 84, '.', 190, 'VK_OEM_PERIOD', '.', 'OEM_PERIOD'],
            [85, 0, 62, 'Slash', 85, '/', 191, 'VK_OEM_2', '/', 'OEM_2'],
            [8, 1, 63, 'CapsLock', 8, 'CapsLock', 20, 'VK_CAPITAL', e, e],
            [59, 1, 64, 'F1', 59, 'F1', 112, 'VK_F1', e, e],
            [60, 1, 65, 'F2', 60, 'F2', 113, 'VK_F2', e, e],
            [61, 1, 66, 'F3', 61, 'F3', 114, 'VK_F3', e, e],
            [62, 1, 67, 'F4', 62, 'F4', 115, 'VK_F4', e, e],
            [63, 1, 68, 'F5', 63, 'F5', 116, 'VK_F5', e, e],
            [64, 1, 69, 'F6', 64, 'F6', 117, 'VK_F6', e, e],
            [65, 1, 70, 'F7', 65, 'F7', 118, 'VK_F7', e, e],
            [66, 1, 71, 'F8', 66, 'F8', 119, 'VK_F8', e, e],
            [67, 1, 72, 'F9', 67, 'F9', 120, 'VK_F9', e, e],
            [68, 1, 73, 'F10', 68, 'F10', 121, 'VK_F10', e, e],
            [69, 1, 74, 'F11', 69, 'F11', 122, 'VK_F11', e, e],
            [70, 1, 75, 'F12', 70, 'F12', 123, 'VK_F12', e, e],
            [0, 1, 76, 'PrintScreen', 0, e, 0, e, e, e],
            [79, 1, 77, 'ScrollLock', 79, 'ScrollLock', 145, 'VK_SCROLL', e, e],
            [7, 1, 78, 'Pause', 7, 'PauseBreak', 19, 'VK_PAUSE', e, e],
            [19, 1, 79, 'Insert', 19, 'Insert', 45, 'VK_INSERT', e, e],
            [14, 1, 80, 'Home', 14, 'Home', 36, 'VK_HOME', e, e],
            [11, 1, 81, 'PageUp', 11, 'PageUp', 33, 'VK_PRIOR', e, e],
            [20, 1, 82, 'Delete', 20, 'Delete', 46, 'VK_DELETE', e, e],
            [13, 1, 83, 'End', 13, 'End', 35, 'VK_END', e, e],
            [12, 1, 84, 'PageDown', 12, 'PageDown', 34, 'VK_NEXT', e, e],
            [17, 1, 85, 'ArrowRight', 17, 'RightArrow', 39, 'VK_RIGHT', 'Right', e],
            [15, 1, 86, 'ArrowLeft', 15, 'LeftArrow', 37, 'VK_LEFT', 'Left', e],
            [18, 1, 87, 'ArrowDown', 18, 'DownArrow', 40, 'VK_DOWN', 'Down', e],
            [16, 1, 88, 'ArrowUp', 16, 'UpArrow', 38, 'VK_UP', 'Up', e],
            [78, 1, 89, 'NumLock', 78, 'NumLock', 144, 'VK_NUMLOCK', e, e],
            [108, 1, 90, 'NumpadDivide', 108, 'NumPad_Divide', 111, 'VK_DIVIDE', e, e],
            [103, 1, 91, 'NumpadMultiply', 103, 'NumPad_Multiply', 106, 'VK_MULTIPLY', e, e],
            [106, 1, 92, 'NumpadSubtract', 106, 'NumPad_Subtract', 109, 'VK_SUBTRACT', e, e],
            [104, 1, 93, 'NumpadAdd', 104, 'NumPad_Add', 107, 'VK_ADD', e, e],
            [3, 1, 94, 'NumpadEnter', 3, e, 0, e, e, e],
            [94, 1, 95, 'Numpad1', 94, 'NumPad1', 97, 'VK_NUMPAD1', e, e],
            [95, 1, 96, 'Numpad2', 95, 'NumPad2', 98, 'VK_NUMPAD2', e, e],
            [96, 1, 97, 'Numpad3', 96, 'NumPad3', 99, 'VK_NUMPAD3', e, e],
            [97, 1, 98, 'Numpad4', 97, 'NumPad4', 100, 'VK_NUMPAD4', e, e],
            [98, 1, 99, 'Numpad5', 98, 'NumPad5', 101, 'VK_NUMPAD5', e, e],
            [99, 1, 100, 'Numpad6', 99, 'NumPad6', 102, 'VK_NUMPAD6', e, e],
            [100, 1, 101, 'Numpad7', 100, 'NumPad7', 103, 'VK_NUMPAD7', e, e],
            [101, 1, 102, 'Numpad8', 101, 'NumPad8', 104, 'VK_NUMPAD8', e, e],
            [102, 1, 103, 'Numpad9', 102, 'NumPad9', 105, 'VK_NUMPAD9', e, e],
            [93, 1, 104, 'Numpad0', 93, 'NumPad0', 96, 'VK_NUMPAD0', e, e],
            [107, 1, 105, 'NumpadDecimal', 107, 'NumPad_Decimal', 110, 'VK_DECIMAL', e, e],
            [92, 0, 106, 'IntlBackslash', 92, 'OEM_102', 226, 'VK_OEM_102', e, e],
            [58, 1, 107, 'ContextMenu', 58, 'ContextMenu', 93, e, e, e],
            [0, 1, 108, 'Power', 0, e, 0, e, e, e],
            [0, 1, 109, 'NumpadEqual', 0, e, 0, e, e, e],
            [71, 1, 110, 'F13', 71, 'F13', 124, 'VK_F13', e, e],
            [72, 1, 111, 'F14', 72, 'F14', 125, 'VK_F14', e, e],
            [73, 1, 112, 'F15', 73, 'F15', 126, 'VK_F15', e, e],
            [74, 1, 113, 'F16', 74, 'F16', 127, 'VK_F16', e, e],
            [75, 1, 114, 'F17', 75, 'F17', 128, 'VK_F17', e, e],
            [76, 1, 115, 'F18', 76, 'F18', 129, 'VK_F18', e, e],
            [77, 1, 116, 'F19', 77, 'F19', 130, 'VK_F19', e, e],
            [0, 1, 117, 'F20', 0, e, 0, 'VK_F20', e, e],
            [0, 1, 118, 'F21', 0, e, 0, 'VK_F21', e, e],
            [0, 1, 119, 'F22', 0, e, 0, 'VK_F22', e, e],
            [0, 1, 120, 'F23', 0, e, 0, 'VK_F23', e, e],
            [0, 1, 121, 'F24', 0, e, 0, 'VK_F24', e, e],
            [0, 1, 122, 'Open', 0, e, 0, e, e, e],
            [0, 1, 123, 'Help', 0, e, 0, e, e, e],
            [0, 1, 124, 'Select', 0, e, 0, e, e, e],
            [0, 1, 125, 'Again', 0, e, 0, e, e, e],
            [0, 1, 126, 'Undo', 0, e, 0, e, e, e],
            [0, 1, 127, 'Cut', 0, e, 0, e, e, e],
            [0, 1, 128, 'Copy', 0, e, 0, e, e, e],
            [0, 1, 129, 'Paste', 0, e, 0, e, e, e],
            [0, 1, 130, 'Find', 0, e, 0, e, e, e],
            [0, 1, 131, 'AudioVolumeMute', 112, 'AudioVolumeMute', 173, 'VK_VOLUME_MUTE', e, e],
            [0, 1, 132, 'AudioVolumeUp', 113, 'AudioVolumeUp', 175, 'VK_VOLUME_UP', e, e],
            [0, 1, 133, 'AudioVolumeDown', 114, 'AudioVolumeDown', 174, 'VK_VOLUME_DOWN', e, e],
            [105, 1, 134, 'NumpadComma', 105, 'NumPad_Separator', 108, 'VK_SEPARATOR', e, e],
            [110, 0, 135, 'IntlRo', 110, 'ABNT_C1', 193, 'VK_ABNT_C1', e, e],
            [0, 1, 136, 'KanaMode', 0, e, 0, e, e, e],
            [0, 0, 137, 'IntlYen', 0, e, 0, e, e, e],
            [0, 1, 138, 'Convert', 0, e, 0, e, e, e],
            [0, 1, 139, 'NonConvert', 0, e, 0, e, e, e],
            [0, 1, 140, 'Lang1', 0, e, 0, e, e, e],
            [0, 1, 141, 'Lang2', 0, e, 0, e, e, e],
            [0, 1, 142, 'Lang3', 0, e, 0, e, e, e],
            [0, 1, 143, 'Lang4', 0, e, 0, e, e, e],
            [0, 1, 144, 'Lang5', 0, e, 0, e, e, e],
            [0, 1, 145, 'Abort', 0, e, 0, e, e, e],
            [0, 1, 146, 'Props', 0, e, 0, e, e, e],
            [0, 1, 147, 'NumpadParenLeft', 0, e, 0, e, e, e],
            [0, 1, 148, 'NumpadParenRight', 0, e, 0, e, e, e],
            [0, 1, 149, 'NumpadBackspace', 0, e, 0, e, e, e],
            [0, 1, 150, 'NumpadMemoryStore', 0, e, 0, e, e, e],
            [0, 1, 151, 'NumpadMemoryRecall', 0, e, 0, e, e, e],
            [0, 1, 152, 'NumpadMemoryClear', 0, e, 0, e, e, e],
            [0, 1, 153, 'NumpadMemoryAdd', 0, e, 0, e, e, e],
            [0, 1, 154, 'NumpadMemorySubtract', 0, e, 0, e, e, e],
            [0, 1, 155, 'NumpadClear', 0, e, 0, e, e, e],
            [0, 1, 156, 'NumpadClearEntry', 0, e, 0, e, e, e],
            [5, 1, 0, e, 5, 'Ctrl', 17, 'VK_CONTROL', e, e],
            [4, 1, 0, e, 4, 'Shift', 16, 'VK_SHIFT', e, e],
            [6, 1, 0, e, 6, 'Alt', 18, 'VK_MENU', e, e],
            [57, 1, 0, e, 57, 'Meta', 0, 'VK_COMMAND', e, e],
            [5, 1, 157, 'ControlLeft', 5, e, 0, 'VK_LCONTROL', e, e],
            [4, 1, 158, 'ShiftLeft', 4, e, 0, 'VK_LSHIFT', e, e],
            [6, 1, 159, 'AltLeft', 6, e, 0, 'VK_LMENU', e, e],
            [57, 1, 160, 'MetaLeft', 57, e, 0, 'VK_LWIN', e, e],
            [5, 1, 161, 'ControlRight', 5, e, 0, 'VK_RCONTROL', e, e],
            [4, 1, 162, 'ShiftRight', 4, e, 0, 'VK_RSHIFT', e, e],
            [6, 1, 163, 'AltRight', 6, e, 0, 'VK_RMENU', e, e],
            [57, 1, 164, 'MetaRight', 57, e, 0, 'VK_RWIN', e, e],
            [0, 1, 165, 'BrightnessUp', 0, e, 0, e, e, e],
            [0, 1, 166, 'BrightnessDown', 0, e, 0, e, e, e],
            [0, 1, 167, 'MediaPlay', 0, e, 0, e, e, e],
            [0, 1, 168, 'MediaRecord', 0, e, 0, e, e, e],
            [0, 1, 169, 'MediaFastForward', 0, e, 0, e, e, e],
            [0, 1, 170, 'MediaRewind', 0, e, 0, e, e, e],
            [
              114,
              1,
              171,
              'MediaTrackNext',
              119,
              'MediaTrackNext',
              176,
              'VK_MEDIA_NEXT_TRACK',
              e,
              e,
            ],
            [
              115,
              1,
              172,
              'MediaTrackPrevious',
              120,
              'MediaTrackPrevious',
              177,
              'VK_MEDIA_PREV_TRACK',
              e,
              e,
            ],
            [116, 1, 173, 'MediaStop', 121, 'MediaStop', 178, 'VK_MEDIA_STOP', e, e],
            [0, 1, 174, 'Eject', 0, e, 0, e, e, e],
            [
              117,
              1,
              175,
              'MediaPlayPause',
              122,
              'MediaPlayPause',
              179,
              'VK_MEDIA_PLAY_PAUSE',
              e,
              e,
            ],
            [
              0,
              1,
              176,
              'MediaSelect',
              123,
              'LaunchMediaPlayer',
              181,
              'VK_MEDIA_LAUNCH_MEDIA_SELECT',
              e,
              e,
            ],
            [0, 1, 177, 'LaunchMail', 124, 'LaunchMail', 180, 'VK_MEDIA_LAUNCH_MAIL', e, e],
            [0, 1, 178, 'LaunchApp2', 125, 'LaunchApp2', 183, 'VK_MEDIA_LAUNCH_APP2', e, e],
            [0, 1, 179, 'LaunchApp1', 0, e, 0, 'VK_MEDIA_LAUNCH_APP1', e, e],
            [0, 1, 180, 'SelectTask', 0, e, 0, e, e, e],
            [0, 1, 181, 'LaunchScreenSaver', 0, e, 0, e, e, e],
            [0, 1, 182, 'BrowserSearch', 115, 'BrowserSearch', 170, 'VK_BROWSER_SEARCH', e, e],
            [0, 1, 183, 'BrowserHome', 116, 'BrowserHome', 172, 'VK_BROWSER_HOME', e, e],
            [112, 1, 184, 'BrowserBack', 117, 'BrowserBack', 166, 'VK_BROWSER_BACK', e, e],
            [113, 1, 185, 'BrowserForward', 118, 'BrowserForward', 167, 'VK_BROWSER_FORWARD', e, e],
            [0, 1, 186, 'BrowserStop', 0, e, 0, 'VK_BROWSER_STOP', e, e],
            [0, 1, 187, 'BrowserRefresh', 0, e, 0, 'VK_BROWSER_REFRESH', e, e],
            [0, 1, 188, 'BrowserFavorites', 0, e, 0, 'VK_BROWSER_FAVORITES', e, e],
            [0, 1, 189, 'ZoomToggle', 0, e, 0, e, e, e],
            [0, 1, 190, 'MailReply', 0, e, 0, e, e, e],
            [0, 1, 191, 'MailForward', 0, e, 0, e, e, e],
            [0, 1, 192, 'MailSend', 0, e, 0, e, e, e],
            [109, 1, 0, e, 109, 'KeyInComposition', 229, e, e, e],
            [111, 1, 0, e, 111, 'ABNT_C2', 194, 'VK_ABNT_C2', e, e],
            [91, 1, 0, e, 91, 'OEM_8', 223, 'VK_OEM_8', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_CLEAR', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_KANA', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_HANGUL', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_JUNJA', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_FINAL', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_HANJA', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_KANJI', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_CONVERT', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_NONCONVERT', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_ACCEPT', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_MODECHANGE', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_SELECT', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_PRINT', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_EXECUTE', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_SNAPSHOT', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_HELP', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_APPS', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_PROCESSKEY', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_PACKET', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_DBE_SBCSCHAR', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_DBE_DBCSCHAR', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_ATTN', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_CRSEL', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_EXSEL', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_EREOF', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_PLAY', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_ZOOM', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_NONAME', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_PA1', e, e],
            [0, 1, 0, e, 0, e, 0, 'VK_OEM_CLEAR', e, e],
          ]
        let u = [],
          c = []
        for (const e of n) {
          const [n, d, h, f, m, g, p, _, C, v] = e
          if (
            (c[h] ||
              ((c[h] = !0),
              (s[h] = f),
              (a[f] = h),
              (l[f.toLowerCase()] = h),
              d &&
                ((t.IMMUTABLE_CODE_TO_KEY_CODE[h] = m),
                0 !== m &&
                  3 !== m &&
                  5 !== m &&
                  4 !== m &&
                  6 !== m &&
                  57 !== m &&
                  (t.IMMUTABLE_KEY_CODE_TO_CODE[m] = h))),
            !u[m])
          ) {
            if (((u[m] = !0), !g))
              throw new Error(
                `String representation missing for key code ${m} around scan code ${f}`,
              )
            i.define(m, g), r.define(m, C || g), o.define(m, v || C || g)
          }
          p && (t.EVENT_KEY_CODE_MAP[p] = m), _ && (t.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[_] = m)
        }
        t.IMMUTABLE_KEY_CODE_TO_CODE[3] = 46
      })(),
        ((u = t.KeyCodeUtils || (t.KeyCodeUtils = {})).toString = function (e) {
          return i.keyCodeToStr(e)
        }),
        (u.fromString = function (e) {
          return i.strToKeyCode(e)
        }),
        (u.toUserSettingsUS = function (e) {
          return r.keyCodeToStr(e)
        }),
        (u.toUserSettingsGeneral = function (e) {
          return o.keyCodeToStr(e)
        }),
        (u.fromUserSettings = function (e) {
          return r.strToKeyCode(e) || o.strToKeyCode(e)
        }),
        (u.toElectronAccelerator = function (e) {
          if (e >= 93 && e <= 108) return null
          switch (e) {
            case 16:
              return 'Up'
            case 18:
              return 'Down'
            case 15:
              return 'Left'
            case 17:
              return 'Right'
          }
          return i.keyCodeToStr(e)
        }),
        (t.KeyChord = function (e, t) {
          return (e | (((65535 & t) << 16) >>> 0)) >>> 0
        })
    }),
    n(r[8], o([0, 1, 15, 16]), function (e, t, n, i) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.ImmortalReference =
          t.MutableDisposable =
          t.Disposable =
          t.DisposableStore =
          t.toDisposable =
          t.combinedDisposable =
          t.dispose =
          t.isDisposable =
          t.MultiDisposeError =
          t.markAsSingleton =
          t.setDisposableTracker =
            void 0)
      let r = null
      function o(e) {
        return null == r || r.trackDisposable(e), e
      }
      function s(e) {
        null == r || r.markAsDisposed(e)
      }
      function a(e, t) {
        null == r || r.setParent(e, t)
      }
      ;(t.setDisposableTracker = function (e) {
        r = e
      }),
        (t.markAsSingleton = function (e) {
          return null == r || r.markAsSingleton(e), e
        })
      class l extends Error {
        constructor(e) {
          super(`Encountered errors while disposing of store. Errors: [${e.join(', ')}]`),
            (this.errors = e)
        }
      }
      function u(e) {
        if (i.Iterable.is(e)) {
          let t = []
          for (const n of e)
            if (n)
              try {
                n.dispose()
              } catch (e) {
                t.push(e)
              }
          if (1 === t.length) throw t[0]
          if (t.length > 1) throw new l(t)
          return Array.isArray(e) ? [] : e
        }
        if (e) return e.dispose(), e
      }
      function c(e) {
        const t = o({
          dispose: (0, n.once)(() => {
            s(t), e()
          }),
        })
        return t
      }
      ;(t.MultiDisposeError = l),
        (t.isDisposable = function (e) {
          return 'function' == typeof e.dispose && 0 === e.dispose.length
        }),
        (t.dispose = u),
        (t.combinedDisposable = function (...e) {
          const t = c(() => u(e))
          return (
            (function (e, t) {
              if (r) for (const n of e) r.setParent(n, t)
            })(e, t),
            t
          )
        }),
        (t.toDisposable = c)
      class d {
        constructor() {
          ;(this._toDispose = new Set()), (this._isDisposed = !1), o(this)
        }
        dispose() {
          this._isDisposed || (s(this), (this._isDisposed = !0), this.clear())
        }
        clear() {
          try {
            u(this._toDispose.values())
          } finally {
            this._toDispose.clear()
          }
        }
        add(e) {
          if (!e) return e
          if (e === this) throw new Error('Cannot register a disposable on itself!')
          return (
            a(e, this),
            this._isDisposed
              ? d.DISABLE_DISPOSED_WARNING ||
                console.warn(
                  new Error(
                    'Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!',
                  ).stack,
                )
              : this._toDispose.add(e),
            e
          )
        }
      }
      ;(t.DisposableStore = d), (d.DISABLE_DISPOSED_WARNING = !1)
      class h {
        constructor() {
          ;(this._store = new d()), o(this), a(this._store, this)
        }
        dispose() {
          s(this), this._store.dispose()
        }
        _register(e) {
          if (e === this) throw new Error('Cannot register a disposable on itself!')
          return this._store.add(e)
        }
      }
      ;(t.Disposable = h),
        (h.None = Object.freeze({ dispose() {} })),
        (t.MutableDisposable = class {
          constructor() {
            ;(this._isDisposed = !1), o(this)
          }
          get value() {
            return this._isDisposed ? void 0 : this._value
          }
          set value(e) {
            var t
            this._isDisposed ||
              e === this._value ||
              (null === (t = this._value) || void 0 === t || t.dispose(),
              e && a(e, this),
              (this._value = e))
          }
          clear() {
            this.value = void 0
          }
          dispose() {
            var e
            ;(this._isDisposed = !0),
              s(this),
              null === (e = this._value) || void 0 === e || e.dispose(),
              (this._value = void 0)
          }
          clearAndLeak() {
            const e = this._value
            return (this._value = void 0), e && a(e, null), e
          }
        }),
        (t.ImmortalReference = class {
          constructor(e) {
            this.object = e
          }
          dispose() {}
        })
    }),
    n(r[18], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.LinkedList = void 0)
      class n {
        constructor(e) {
          ;(this.element = e), (this.next = n.Undefined), (this.prev = n.Undefined)
        }
      }
      n.Undefined = new n(void 0)
      class i {
        constructor() {
          ;(this._first = n.Undefined), (this._last = n.Undefined), (this._size = 0)
        }
        get size() {
          return this._size
        }
        isEmpty() {
          return this._first === n.Undefined
        }
        clear() {
          let e = this._first
          for (; e !== n.Undefined; ) {
            const t = e.next
            ;(e.prev = n.Undefined), (e.next = n.Undefined), (e = t)
          }
          ;(this._first = n.Undefined), (this._last = n.Undefined), (this._size = 0)
        }
        unshift(e) {
          return this._insert(e, !1)
        }
        push(e) {
          return this._insert(e, !0)
        }
        _insert(e, t) {
          const i = new n(e)
          if (this._first === n.Undefined) (this._first = i), (this._last = i)
          else if (t) {
            const e = this._last
            ;(this._last = i), (i.prev = e), (e.next = i)
          } else {
            const e = this._first
            ;(this._first = i), (i.next = e), (e.prev = i)
          }
          this._size += 1
          let r = !1
          return () => {
            r || ((r = !0), this._remove(i))
          }
        }
        shift() {
          if (this._first !== n.Undefined) {
            const e = this._first.element
            return this._remove(this._first), e
          }
        }
        pop() {
          if (this._last !== n.Undefined) {
            const e = this._last.element
            return this._remove(this._last), e
          }
        }
        _remove(e) {
          if (e.prev !== n.Undefined && e.next !== n.Undefined) {
            const t = e.prev
            ;(t.next = e.next), (e.next.prev = t)
          } else e.prev === n.Undefined && e.next === n.Undefined ? ((this._first = n.Undefined), (this._last = n.Undefined)) : e.next === n.Undefined ? ((this._last = this._last.prev), (this._last.next = n.Undefined)) : e.prev === n.Undefined && ((this._first = this._first.next), (this._first.prev = n.Undefined))
          this._size -= 1
        }
        *[Symbol.iterator]() {
          let e = this._first
          for (; e !== n.Undefined; ) yield e.element, (e = e.next)
        }
      }
      t.LinkedList = i
    }),
    n(r[2], o([0, 1]), function (e, t) {
      'use strict'
      var n
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.isLittleEndian =
          t.OS =
          t.setImmediate =
          t.userAgent =
          t.isIOS =
          t.isWeb =
          t.isNative =
          t.isLinux =
          t.isMacintosh =
          t.isWindows =
          t.globals =
            void 0)
      const i = 'en'
      let r,
        o,
        s,
        a,
        l = !1,
        u = !1,
        c = !1,
        d = !1,
        h = !1,
        f = !1,
        m = !1,
        g = i
      ;(t.globals = 'object' == typeof self ? self : 'object' == typeof global ? global : {}),
        void 0 !== t.globals.vscode && void 0 !== t.globals.vscode.process
          ? (a = t.globals.vscode.process)
          : 'undefined' != typeof process && (a = process)
      const p =
        'string' ==
          typeof (null === (n = null == a ? void 0 : a.versions) || void 0 === n
            ? void 0
            : n.electron) && 'renderer' === a.type
      if ('object' != typeof navigator || p)
        if ('object' == typeof a) {
          ;(l = 'win32' === a.platform),
            (u = 'darwin' === a.platform),
            (c = 'linux' === a.platform),
            (d = c && !!a.env.SNAP && !!a.env.SNAP_REVISION),
            (r = i),
            (g = i)
          const e = a.env.VSCODE_NLS_CONFIG
          if (e)
            try {
              const t = JSON.parse(e),
                n = t.availableLanguages['*']
              ;(r = t.locale), (g = n || i), (o = t._translationsConfigFile)
            } catch (e) {}
          h = !0
        } else console.error('Unable to resolve platform.')
      else
        (s = navigator.userAgent),
          (l = s.indexOf('Windows') >= 0),
          (u = s.indexOf('Macintosh') >= 0),
          (m =
            (s.indexOf('Macintosh') >= 0 || s.indexOf('iPad') >= 0 || s.indexOf('iPhone') >= 0) &&
            !!navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 0),
          (c = s.indexOf('Linux') >= 0),
          (f = !0),
          (r = navigator.language),
          (g = r)
      let _ = 0
      u ? (_ = 1) : l ? (_ = 3) : c && (_ = 2),
        (t.isWindows = l),
        (t.isMacintosh = u),
        (t.isLinux = c),
        (t.isNative = h),
        (t.isWeb = f),
        (t.isIOS = m),
        (t.userAgent = s),
        (t.setImmediate = (function () {
          if (t.globals.setImmediate) return t.globals.setImmediate.bind(t.globals)
          if ('function' == typeof t.globals.postMessage && !t.globals.importScripts) {
            let e = []
            t.globals.addEventListener('message', t => {
              if (t.data && t.data.vscodeSetImmediateId)
                for (let n = 0, i = e.length; n < i; n++) {
                  const i = e[n]
                  if (i.id === t.data.vscodeSetImmediateId) return e.splice(n, 1), void i.callback()
                }
            })
            let n = 0
            return i => {
              const r = ++n
              e.push({ id: r, callback: i }),
                t.globals.postMessage({ vscodeSetImmediateId: r }, '*')
            }
          }
          if ('function' == typeof (null == a ? void 0 : a.nextTick)) return a.nextTick.bind(a)
          const e = Promise.resolve()
          return t => e.then(t)
        })()),
        (t.OS = u || m ? 2 : l ? 1 : 3)
      let C = !0,
        v = !1
      t.isLittleEndian = function () {
        if (!v) {
          v = !0
          const e = new Uint8Array(2)
          ;(e[0] = 1), (e[1] = 2), (C = 513 === new Uint16Array(e.buffer)[0])
        }
        return C
      }
    }),
    n(r[19], o([0, 1, 2]), function (e, t, n) {
      'use strict'
      let i
      if (
        (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.platform = t.env = t.cwd = void 0),
        void 0 !== n.globals.vscode && void 0 !== n.globals.vscode.process)
      ) {
        const e = n.globals.vscode.process
        i = {
          get platform() {
            return e.platform
          },
          get arch() {
            return e.arch
          },
          get env() {
            return e.env
          },
          cwd: () => e.cwd(),
          nextTick: e => (0, n.setImmediate)(e),
        }
      } else
        i =
          'undefined' != typeof process
            ? {
                get platform() {
                  return process.platform
                },
                get arch() {
                  return process.arch
                },
                get env() {
                  return process.env
                },
                cwd: () => process.env.VSCODE_CWD || process.cwd(),
                nextTick: e => process.nextTick(e),
              }
            : {
                get platform() {
                  return n.isWindows ? 'win32' : n.isMacintosh ? 'darwin' : 'linux'
                },
                get arch() {},
                nextTick: e => (0, n.setImmediate)(e),
                get env() {
                  return {}
                },
                cwd: () => '/',
              }
      ;(t.cwd = i.cwd), (t.env = i.env), (t.platform = i.platform)
    }),
    n(r[20], o([0, 1, 19]), function (e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.sep =
          t.extname =
          t.basename =
          t.dirname =
          t.relative =
          t.resolve =
          t.normalize =
          t.posix =
          t.win32 =
            void 0)
      const i = 46,
        r = 47,
        o = 92,
        s = 58
      class a extends Error {
        constructor(e, t, n) {
          let i
          'string' == typeof t && 0 === t.indexOf('not ')
            ? ((i = 'must not be'), (t = t.replace(/^not /, '')))
            : (i = 'must be')
          const r = -1 !== e.indexOf('.') ? 'property' : 'argument'
          let o = `The "${e}" ${r} ${i} of type ${t}`
          ;(o += '. Received type ' + typeof n), super(o), (this.code = 'ERR_INVALID_ARG_TYPE')
        }
      }
      function l(e, t) {
        if ('string' != typeof e) throw new a(t, 'string', e)
      }
      function u(e) {
        return e === r || e === o
      }
      function c(e) {
        return e === r
      }
      function d(e) {
        return (e >= 65 && e <= 90) || (e >= 97 && e <= 122)
      }
      function h(e, t, n, o) {
        let s = '',
          a = 0,
          l = -1,
          u = 0,
          c = 0
        for (let d = 0; d <= e.length; ++d) {
          if (d < e.length) c = e.charCodeAt(d)
          else {
            if (o(c)) break
            c = r
          }
          if (o(c)) {
            if (l !== d - 1 && 1 !== u)
              if (2 === u) {
                if (
                  s.length < 2 ||
                  2 !== a ||
                  s.charCodeAt(s.length - 1) !== i ||
                  s.charCodeAt(s.length - 2) !== i
                ) {
                  if (s.length > 2) {
                    const e = s.lastIndexOf(n)
                    ;-1 === e
                      ? ((s = ''), (a = 0))
                      : ((s = s.slice(0, e)), (a = s.length - 1 - s.lastIndexOf(n))),
                      (l = d),
                      (u = 0)
                    continue
                  }
                  if (0 !== s.length) {
                    ;(s = ''), (a = 0), (l = d), (u = 0)
                    continue
                  }
                }
                t && ((s += s.length > 0 ? `${n}..` : '..'), (a = 2))
              } else
                s.length > 0 ? (s += `${n}${e.slice(l + 1, d)}`) : (s = e.slice(l + 1, d)),
                  (a = d - l - 1)
            ;(l = d), (u = 0)
          } else c === i && -1 !== u ? ++u : (u = -1)
        }
        return s
      }
      function f(e, t) {
        if (null === t || 'object' != typeof t) throw new a('pathObject', 'Object', t)
        const n = t.dir || t.root,
          i = t.base || `${t.name || ''}${t.ext || ''}`
        return n ? (n === t.root ? `${n}${i}` : `${n}${e}${i}`) : i
      }
      ;(t.win32 = {
        resolve(...e) {
          let t = '',
            i = '',
            r = !1
          for (let a = e.length - 1; a >= -1; a--) {
            let c
            if (a >= 0) {
              if (((c = e[a]), l(c, 'path'), 0 === c.length)) continue
            } else
              0 === t.length
                ? (c = n.cwd())
                : ((c = n.env[`=${t}`] || n.cwd()),
                  (void 0 === c ||
                    (c.slice(0, 2).toLowerCase() !== t.toLowerCase() && c.charCodeAt(2) === o)) &&
                    (c = `${t}\\`))
            const h = c.length
            let f = 0,
              m = '',
              g = !1
            const p = c.charCodeAt(0)
            if (1 === h) u(p) && ((f = 1), (g = !0))
            else if (u(p))
              if (((g = !0), u(c.charCodeAt(1)))) {
                let e = 2,
                  t = e
                for (; e < h && !u(c.charCodeAt(e)); ) e++
                if (e < h && e !== t) {
                  const n = c.slice(t, e)
                  for (t = e; e < h && u(c.charCodeAt(e)); ) e++
                  if (e < h && e !== t) {
                    for (t = e; e < h && !u(c.charCodeAt(e)); ) e++
                    ;(e === h || e !== t) && ((m = `\\\\${n}\\${c.slice(t, e)}`), (f = e))
                  }
                }
              } else f = 1
            else
              d(p) &&
                c.charCodeAt(1) === s &&
                ((m = c.slice(0, 2)), (f = 2), h > 2 && u(c.charCodeAt(2)) && ((g = !0), (f = 3)))
            if (m.length > 0)
              if (t.length > 0) {
                if (m.toLowerCase() !== t.toLowerCase()) continue
              } else t = m
            if (r) {
              if (t.length > 0) break
            } else if (((i = `${c.slice(f)}\\${i}`), (r = g), g && t.length > 0)) break
          }
          return (i = h(i, !r, '\\', u)), r ? `${t}\\${i}` : `${t}${i}` || '.'
        },
        normalize(e) {
          l(e, 'path')
          const t = e.length
          if (0 === t) return '.'
          let n,
            i = 0,
            r = !1
          const o = e.charCodeAt(0)
          if (1 === t) return c(o) ? '\\' : e
          if (u(o))
            if (((r = !0), u(e.charCodeAt(1)))) {
              let r = 2,
                o = r
              for (; r < t && !u(e.charCodeAt(r)); ) r++
              if (r < t && r !== o) {
                const s = e.slice(o, r)
                for (o = r; r < t && u(e.charCodeAt(r)); ) r++
                if (r < t && r !== o) {
                  for (o = r; r < t && !u(e.charCodeAt(r)); ) r++
                  if (r === t) return `\\\\${s}\\${e.slice(o)}\\`
                  r !== o && ((n = `\\\\${s}\\${e.slice(o, r)}`), (i = r))
                }
              }
            } else i = 1
          else
            d(o) &&
              e.charCodeAt(1) === s &&
              ((n = e.slice(0, 2)), (i = 2), t > 2 && u(e.charCodeAt(2)) && ((r = !0), (i = 3)))
          let a = i < t ? h(e.slice(i), !r, '\\', u) : ''
          return (
            0 === a.length && !r && (a = '.'),
            a.length > 0 && u(e.charCodeAt(t - 1)) && (a += '\\'),
            void 0 === n ? (r ? `\\${a}` : a) : r ? `${n}\\${a}` : `${n}${a}`
          )
        },
        isAbsolute(e) {
          l(e, 'path')
          const t = e.length
          if (0 === t) return !1
          const n = e.charCodeAt(0)
          return u(n) || (t > 2 && d(n) && e.charCodeAt(1) === s && u(e.charCodeAt(2)))
        },
        join(...e) {
          if (0 === e.length) return '.'
          let n, i
          for (let t = 0; t < e.length; ++t) {
            const r = e[t]
            l(r, 'path'), r.length > 0 && (void 0 === n ? (n = i = r) : (n += `\\${r}`))
          }
          if (void 0 === n) return '.'
          let r = !0,
            o = 0
          if ('string' == typeof i && u(i.charCodeAt(0))) {
            ++o
            const e = i.length
            e > 1 && u(i.charCodeAt(1)) && (++o, e > 2 && (u(i.charCodeAt(2)) ? ++o : (r = !1)))
          }
          if (r) {
            for (; o < n.length && u(n.charCodeAt(o)); ) o++
            o >= 2 && (n = `\\${n.slice(o)}`)
          }
          return t.win32.normalize(n)
        },
        relative(e, n) {
          if ((l(e, 'from'), l(n, 'to'), e === n)) return ''
          const i = t.win32.resolve(e),
            r = t.win32.resolve(n)
          if (i === r || (e = i.toLowerCase()) === (n = r.toLowerCase())) return ''
          let s = 0
          for (; s < e.length && e.charCodeAt(s) === o; ) s++
          let a = e.length
          for (; a - 1 > s && e.charCodeAt(a - 1) === o; ) a--
          const u = a - s
          let c = 0
          for (; c < n.length && n.charCodeAt(c) === o; ) c++
          let d = n.length
          for (; d - 1 > c && n.charCodeAt(d - 1) === o; ) d--
          const h = d - c,
            f = u < h ? u : h
          let m = -1,
            g = 0
          for (; g < f; g++) {
            const t = e.charCodeAt(s + g)
            if (t !== n.charCodeAt(c + g)) break
            t === o && (m = g)
          }
          if (g !== f) {
            if (-1 === m) return r
          } else {
            if (h > f) {
              if (n.charCodeAt(c + g) === o) return r.slice(c + g + 1)
              if (2 === g) return r.slice(c + g)
            }
            u > f && (e.charCodeAt(s + g) === o ? (m = g) : 2 === g && (m = 3)), -1 === m && (m = 0)
          }
          let p = ''
          for (g = s + m + 1; g <= a; ++g)
            (g === a || e.charCodeAt(g) === o) && (p += 0 === p.length ? '..' : '\\..')
          return (
            (c += m),
            p.length > 0 ? `${p}${r.slice(c, d)}` : (r.charCodeAt(c) === o && ++c, r.slice(c, d))
          )
        },
        toNamespacedPath(e) {
          if ('string' != typeof e) return e
          if (0 === e.length) return ''
          const n = t.win32.resolve(e)
          if (n.length <= 2) return e
          if (n.charCodeAt(0) === o) {
            if (n.charCodeAt(1) === o) {
              const e = n.charCodeAt(2)
              if (63 !== e && e !== i) return `\\\\?\\UNC\\${n.slice(2)}`
            }
          } else if (d(n.charCodeAt(0)) && n.charCodeAt(1) === s && n.charCodeAt(2) === o)
            return `\\\\?\\${n}`
          return e
        },
        dirname(e) {
          l(e, 'path')
          const t = e.length
          if (0 === t) return '.'
          let n = -1,
            i = 0
          const r = e.charCodeAt(0)
          if (1 === t) return u(r) ? e : '.'
          if (u(r)) {
            if (((n = i = 1), u(e.charCodeAt(1)))) {
              let r = 2,
                o = r
              for (; r < t && !u(e.charCodeAt(r)); ) r++
              if (r < t && r !== o) {
                for (o = r; r < t && u(e.charCodeAt(r)); ) r++
                if (r < t && r !== o) {
                  for (o = r; r < t && !u(e.charCodeAt(r)); ) r++
                  if (r === t) return e
                  r !== o && (n = i = r + 1)
                }
              }
            }
          } else
            d(r) && e.charCodeAt(1) === s && ((n = t > 2 && u(e.charCodeAt(2)) ? 3 : 2), (i = n))
          let o = -1,
            a = !0
          for (let n = t - 1; n >= i; --n)
            if (u(e.charCodeAt(n))) {
              if (!a) {
                o = n
                break
              }
            } else a = !1
          if (-1 === o) {
            if (-1 === n) return '.'
            o = n
          }
          return e.slice(0, o)
        },
        basename(e, t) {
          void 0 !== t && l(t, 'ext'), l(e, 'path')
          let n,
            i = 0,
            r = -1,
            o = !0
          if (
            (e.length >= 2 && d(e.charCodeAt(0)) && e.charCodeAt(1) === s && (i = 2),
            void 0 !== t && t.length > 0 && t.length <= e.length)
          ) {
            if (t === e) return ''
            let s = t.length - 1,
              a = -1
            for (n = e.length - 1; n >= i; --n) {
              const l = e.charCodeAt(n)
              if (u(l)) {
                if (!o) {
                  i = n + 1
                  break
                }
              } else
                -1 === a && ((o = !1), (a = n + 1)),
                  s >= 0 && (l === t.charCodeAt(s) ? -1 == --s && (r = n) : ((s = -1), (r = a)))
            }
            return i === r ? (r = a) : -1 === r && (r = e.length), e.slice(i, r)
          }
          for (n = e.length - 1; n >= i; --n)
            if (u(e.charCodeAt(n))) {
              if (!o) {
                i = n + 1
                break
              }
            } else -1 === r && ((o = !1), (r = n + 1))
          return -1 === r ? '' : e.slice(i, r)
        },
        extname(e) {
          l(e, 'path')
          let t = 0,
            n = -1,
            r = 0,
            o = -1,
            a = !0,
            c = 0
          e.length >= 2 && e.charCodeAt(1) === s && d(e.charCodeAt(0)) && (t = r = 2)
          for (let s = e.length - 1; s >= t; --s) {
            const t = e.charCodeAt(s)
            if (u(t)) {
              if (!a) {
                r = s + 1
                break
              }
            } else
              -1 === o && ((a = !1), (o = s + 1)),
                t === i ? (-1 === n ? (n = s) : 1 !== c && (c = 1)) : -1 !== n && (c = -1)
          }
          return -1 === n || -1 === o || 0 === c || (1 === c && n === o - 1 && n === r + 1)
            ? ''
            : e.slice(n, o)
        },
        format: f.bind(null, '\\'),
        parse(e) {
          l(e, 'path')
          const t = { root: '', dir: '', base: '', ext: '', name: '' }
          if (0 === e.length) return t
          const n = e.length
          let r = 0,
            o = e.charCodeAt(0)
          if (1 === n) return u(o) ? ((t.root = t.dir = e), t) : ((t.base = t.name = e), t)
          if (u(o)) {
            if (((r = 1), u(e.charCodeAt(1)))) {
              let t = 2,
                i = t
              for (; t < n && !u(e.charCodeAt(t)); ) t++
              if (t < n && t !== i) {
                for (i = t; t < n && u(e.charCodeAt(t)); ) t++
                if (t < n && t !== i) {
                  for (i = t; t < n && !u(e.charCodeAt(t)); ) t++
                  t === n ? (r = t) : t !== i && (r = t + 1)
                }
              }
            }
          } else if (d(o) && e.charCodeAt(1) === s) {
            if (n <= 2) return (t.root = t.dir = e), t
            if (((r = 2), u(e.charCodeAt(2)))) {
              if (3 === n) return (t.root = t.dir = e), t
              r = 3
            }
          }
          r > 0 && (t.root = e.slice(0, r))
          let a = -1,
            c = r,
            h = -1,
            f = !0,
            m = e.length - 1,
            g = 0
          for (; m >= r; --m)
            if (((o = e.charCodeAt(m)), u(o))) {
              if (!f) {
                c = m + 1
                break
              }
            } else
              -1 === h && ((f = !1), (h = m + 1)),
                o === i ? (-1 === a ? (a = m) : 1 !== g && (g = 1)) : -1 !== a && (g = -1)
          return (
            -1 !== h &&
              (-1 === a || 0 === g || (1 === g && a === h - 1 && a === c + 1)
                ? (t.base = t.name = e.slice(c, h))
                : ((t.name = e.slice(c, a)), (t.base = e.slice(c, h)), (t.ext = e.slice(a, h)))),
            (t.dir = c > 0 && c !== r ? e.slice(0, c - 1) : t.root),
            t
          )
        },
        sep: '\\',
        delimiter: ';',
        win32: null,
        posix: null,
      }),
        (t.posix = {
          resolve(...e) {
            let t = '',
              i = !1
            for (let o = e.length - 1; o >= -1 && !i; o--) {
              const s = o >= 0 ? e[o] : n.cwd()
              l(s, 'path'), 0 !== s.length && ((t = `${s}/${t}`), (i = s.charCodeAt(0) === r))
            }
            return (t = h(t, !i, '/', c)), i ? `/${t}` : t.length > 0 ? t : '.'
          },
          normalize(e) {
            if ((l(e, 'path'), 0 === e.length)) return '.'
            const t = e.charCodeAt(0) === r,
              n = e.charCodeAt(e.length - 1) === r
            return 0 === (e = h(e, !t, '/', c)).length
              ? t
                ? '/'
                : n
                ? './'
                : '.'
              : (n && (e += '/'), t ? `/${e}` : e)
          },
          isAbsolute: e => (l(e, 'path'), e.length > 0 && e.charCodeAt(0) === r),
          join(...e) {
            if (0 === e.length) return '.'
            let n
            for (let t = 0; t < e.length; ++t) {
              const i = e[t]
              l(i, 'path'), i.length > 0 && (void 0 === n ? (n = i) : (n += `/${i}`))
            }
            return void 0 === n ? '.' : t.posix.normalize(n)
          },
          relative(e, n) {
            if (
              (l(e, 'from'),
              l(n, 'to'),
              e === n || (e = t.posix.resolve(e)) === (n = t.posix.resolve(n)))
            )
              return ''
            const i = e.length,
              o = i - 1,
              s = n.length - 1,
              a = o < s ? o : s
            let u = -1,
              c = 0
            for (; c < a; c++) {
              const t = e.charCodeAt(1 + c)
              if (t !== n.charCodeAt(1 + c)) break
              t === r && (u = c)
            }
            if (c === a)
              if (s > a) {
                if (n.charCodeAt(1 + c) === r) return n.slice(1 + c + 1)
                if (0 === c) return n.slice(1 + c)
              } else o > a && (e.charCodeAt(1 + c) === r ? (u = c) : 0 === c && (u = 0))
            let d = ''
            for (c = 1 + u + 1; c <= i; ++c)
              (c === i || e.charCodeAt(c) === r) && (d += 0 === d.length ? '..' : '/..')
            return `${d}${n.slice(1 + u)}`
          },
          toNamespacedPath: e => e,
          dirname(e) {
            if ((l(e, 'path'), 0 === e.length)) return '.'
            const t = e.charCodeAt(0) === r
            let n = -1,
              i = !0
            for (let t = e.length - 1; t >= 1; --t)
              if (e.charCodeAt(t) === r) {
                if (!i) {
                  n = t
                  break
                }
              } else i = !1
            return -1 === n ? (t ? '/' : '.') : t && 1 === n ? '//' : e.slice(0, n)
          },
          basename(e, t) {
            void 0 !== t && l(t, 'ext'), l(e, 'path')
            let n,
              i = 0,
              o = -1,
              s = !0
            if (void 0 !== t && t.length > 0 && t.length <= e.length) {
              if (t === e) return ''
              let a = t.length - 1,
                l = -1
              for (n = e.length - 1; n >= 0; --n) {
                const u = e.charCodeAt(n)
                if (u === r) {
                  if (!s) {
                    i = n + 1
                    break
                  }
                } else
                  -1 === l && ((s = !1), (l = n + 1)),
                    a >= 0 && (u === t.charCodeAt(a) ? -1 == --a && (o = n) : ((a = -1), (o = l)))
              }
              return i === o ? (o = l) : -1 === o && (o = e.length), e.slice(i, o)
            }
            for (n = e.length - 1; n >= 0; --n)
              if (e.charCodeAt(n) === r) {
                if (!s) {
                  i = n + 1
                  break
                }
              } else -1 === o && ((s = !1), (o = n + 1))
            return -1 === o ? '' : e.slice(i, o)
          },
          extname(e) {
            l(e, 'path')
            let t = -1,
              n = 0,
              o = -1,
              s = !0,
              a = 0
            for (let l = e.length - 1; l >= 0; --l) {
              const u = e.charCodeAt(l)
              if (u !== r)
                -1 === o && ((s = !1), (o = l + 1)),
                  u === i ? (-1 === t ? (t = l) : 1 !== a && (a = 1)) : -1 !== t && (a = -1)
              else if (!s) {
                n = l + 1
                break
              }
            }
            return -1 === t || -1 === o || 0 === a || (1 === a && t === o - 1 && t === n + 1)
              ? ''
              : e.slice(t, o)
          },
          format: f.bind(null, '/'),
          parse(e) {
            l(e, 'path')
            const t = { root: '', dir: '', base: '', ext: '', name: '' }
            if (0 === e.length) return t
            const n = e.charCodeAt(0) === r
            let o
            n ? ((t.root = '/'), (o = 1)) : (o = 0)
            let s = -1,
              a = 0,
              u = -1,
              c = !0,
              d = e.length - 1,
              h = 0
            for (; d >= o; --d) {
              const t = e.charCodeAt(d)
              if (t !== r)
                -1 === u && ((c = !1), (u = d + 1)),
                  t === i ? (-1 === s ? (s = d) : 1 !== h && (h = 1)) : -1 !== s && (h = -1)
              else if (!c) {
                a = d + 1
                break
              }
            }
            if (-1 !== u) {
              const i = 0 === a && n ? 1 : a
              ;-1 === s || 0 === h || (1 === h && s === u - 1 && s === a + 1)
                ? (t.base = t.name = e.slice(i, u))
                : ((t.name = e.slice(i, s)), (t.base = e.slice(i, u)), (t.ext = e.slice(s, u)))
            }
            return a > 0 ? (t.dir = e.slice(0, a - 1)) : n && (t.dir = '/'), t
          },
          sep: '/',
          delimiter: ':',
          win32: null,
          posix: null,
        }),
        (t.posix.win32 = t.win32.win32 = t.win32),
        (t.posix.posix = t.win32.posix = t.posix),
        (t.normalize = 'win32' === n.platform ? t.win32.normalize : t.posix.normalize),
        (t.resolve = 'win32' === n.platform ? t.win32.resolve : t.posix.resolve),
        (t.relative = 'win32' === n.platform ? t.win32.relative : t.posix.relative),
        (t.dirname = 'win32' === n.platform ? t.win32.dirname : t.posix.dirname),
        (t.basename = 'win32' === n.platform ? t.win32.basename : t.posix.basename),
        (t.extname = 'win32' === n.platform ? t.win32.extname : t.posix.extname),
        (t.sep = 'win32' === n.platform ? t.win32.sep : t.posix.sep)
    }),
    n(r[9], o([0, 1, 2]), function (e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.StopWatch = void 0)
      const i = n.globals.performance && 'function' == typeof n.globals.performance.now
      class r {
        constructor(e) {
          ;(this._highResolution = i && e), (this._startTime = this._now()), (this._stopTime = -1)
        }
        static create(e = !0) {
          return new r(e)
        }
        stop() {
          this._stopTime = this._now()
        }
        elapsed() {
          return -1 !== this._stopTime
            ? this._stopTime - this._startTime
            : this._now() - this._startTime
        }
        _now() {
          return this._highResolution ? n.globals.performance.now() : Date.now()
        }
      }
      t.StopWatch = r
    }),
    n(r[5], o([0, 1, 7, 8, 18, 9]), function (e, t, n, i, r, o) {
      'use strict'
      var s
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.Relay =
          t.EventBufferer =
          t.DebounceEmitter =
          t.PauseableEmitter =
          t.Emitter =
          t.Event =
            void 0),
        (function (e) {
          function t(e) {
            return (t, n = null, i) => {
              let r,
                o = !1
              return (
                (r = e(
                  e => {
                    if (!o) return r ? r.dispose() : (o = !0), t.call(n, e)
                  },
                  null,
                  i,
                )),
                o && r.dispose(),
                r
              )
            }
          }
          function n(e, t) {
            return a((n, i = null, r) => e(e => n.call(i, t(e)), null, r))
          }
          function r(e, t) {
            return a((n, i = null, r) =>
              e(
                e => {
                  t(e), n.call(i, e)
                },
                null,
                r,
              ),
            )
          }
          function o(e, t) {
            return a((n, i = null, r) => e(e => t(e) && n.call(i, e), null, r))
          }
          function s(e, t, i) {
            let r = i
            return n(e, e => ((r = t(r, e)), r))
          }
          function a(e) {
            let t
            const n = new l({
              onFirstListenerAdd() {
                t = e(n.fire, n)
              },
              onLastListenerRemove() {
                t.dispose()
              },
            })
            return n.event
          }
          function u(e, t, n = 100, i = !1, r) {
            let o,
              s,
              a,
              u = 0
            const c = new l({
              leakWarningThreshold: r,
              onFirstListenerAdd() {
                o = e(e => {
                  u++,
                    (s = t(s, e)),
                    i && !a && (c.fire(s), (s = void 0)),
                    clearTimeout(a),
                    (a = setTimeout(() => {
                      const e = s
                      ;(s = void 0), (a = void 0), (!i || u > 1) && c.fire(e), (u = 0)
                    }, n))
                })
              },
              onLastListenerRemove() {
                o.dispose()
              },
            })
            return c.event
          }
          function c(e, t = (e, t) => e === t) {
            let n,
              i = !0
            return o(e, e => {
              const r = i || !t(e, n)
              return (i = !1), (n = e), r
            })
          }
          ;(e.None = () => i.Disposable.None),
            (e.once = t),
            (e.map = n),
            (e.forEach = r),
            (e.filter = o),
            (e.signal = function (e) {
              return e
            }),
            (e.any = function (...e) {
              return (t, n = null, r) =>
                (0, i.combinedDisposable)(...e.map(e => e(e => t.call(n, e), null, r)))
            }),
            (e.reduce = s),
            (e.debounce = u),
            (e.latch = c),
            (e.split = function (t, n) {
              return [e.filter(t, n), e.filter(t, e => !n(e))]
            }),
            (e.buffer = function (e, t = !1, n = []) {
              let i = n.slice(),
                r = e(e => {
                  i ? i.push(e) : s.fire(e)
                })
              const o = () => {
                  i && i.forEach(e => s.fire(e)), (i = null)
                },
                s = new l({
                  onFirstListenerAdd() {
                    r || (r = e(e => s.fire(e)))
                  },
                  onFirstListenerDidAdd() {
                    i && (t ? setTimeout(o) : o())
                  },
                  onLastListenerRemove() {
                    r && r.dispose(), (r = null)
                  },
                })
              return s.event
            })
          class d {
            constructor(e) {
              this.event = e
            }
            map(e) {
              return new d(n(this.event, e))
            }
            forEach(e) {
              return new d(r(this.event, e))
            }
            filter(e) {
              return new d(o(this.event, e))
            }
            reduce(e, t) {
              return new d(s(this.event, e, t))
            }
            latch() {
              return new d(c(this.event))
            }
            debounce(e, t = 100, n = !1, i) {
              return new d(u(this.event, e, t, n, i))
            }
            on(e, t, n) {
              return this.event(e, t, n)
            }
            once(e, n, i) {
              return t(this.event)(e, n, i)
            }
          }
          ;(e.chain = function (e) {
            return new d(e)
          }),
            (e.fromNodeEventEmitter = function (e, t, n = e => e) {
              const i = (...e) => r.fire(n(...e)),
                r = new l({
                  onFirstListenerAdd: () => e.on(t, i),
                  onLastListenerRemove: () => e.removeListener(t, i),
                })
              return r.event
            }),
            (e.fromDOMEventEmitter = function (e, t, n = e => e) {
              const i = (...e) => r.fire(n(...e)),
                r = new l({
                  onFirstListenerAdd: () => e.addEventListener(t, i),
                  onLastListenerRemove: () => e.removeEventListener(t, i),
                })
              return r.event
            }),
            (e.toPromise = function (e) {
              return new Promise(n => t(e)(n))
            })
        })((s = t.Event || (t.Event = {})))
      class a {
        constructor(e) {
          ;(this._listenerCount = 0),
            (this._invocationCount = 0),
            (this._elapsedOverall = 0),
            (this._name = `${e}_${a._idPool++}`)
        }
        start(e) {
          ;(this._stopWatch = new o.StopWatch(!0)), (this._listenerCount = e)
        }
        stop() {
          if (this._stopWatch) {
            const e = this._stopWatch.elapsed()
            ;(this._elapsedOverall += e),
              (this._invocationCount += 1),
              console.info(
                `did FIRE ${this._name}: elapsed_ms: ${e.toFixed(5)}, listener: ${
                  this._listenerCount
                } (elapsed_overall: ${this._elapsedOverall.toFixed(2)}, invocations: ${
                  this._invocationCount
                })`,
              ),
              (this._stopWatch = void 0)
          }
        }
      }
      a._idPool = 0
      class l {
        constructor(e) {
          var t
          ;(this._disposed = !1),
            (this._options = e),
            (this._leakageMon = void 0),
            (this._perfMon = (null === (t = this._options) || void 0 === t ? void 0 : t._profName)
              ? new a(this._options._profName)
              : void 0)
        }
        get event() {
          return (
            this._event ||
              (this._event = (e, t, n) => {
                var o
                this._listeners || (this._listeners = new r.LinkedList())
                const s = this._listeners.isEmpty()
                s &&
                  this._options &&
                  this._options.onFirstListenerAdd &&
                  this._options.onFirstListenerAdd(this)
                const a = this._listeners.push(t ? [e, t] : e)
                s &&
                  this._options &&
                  this._options.onFirstListenerDidAdd &&
                  this._options.onFirstListenerDidAdd(this),
                  this._options &&
                    this._options.onListenerDidAdd &&
                    this._options.onListenerDidAdd(this, e, t)
                const l =
                    null === (o = this._leakageMon) || void 0 === o
                      ? void 0
                      : o.check(this._listeners.size),
                  u = (0, i.toDisposable)(() => {
                    l && l(),
                      this._disposed ||
                        (a(),
                        this._options &&
                          this._options.onLastListenerRemove &&
                          ((this._listeners && !this._listeners.isEmpty()) ||
                            this._options.onLastListenerRemove(this)))
                  })
                return n instanceof i.DisposableStore ? n.add(u) : Array.isArray(n) && n.push(u), u
              }),
            this._event
          )
        }
        fire(e) {
          var t, i
          if (this._listeners) {
            this._deliveryQueue || (this._deliveryQueue = new r.LinkedList())
            for (let t of this._listeners) this._deliveryQueue.push([t, e])
            for (
              null === (t = this._perfMon) || void 0 === t || t.start(this._deliveryQueue.size);
              this._deliveryQueue.size > 0;

            ) {
              const [e, t] = this._deliveryQueue.shift()
              try {
                'function' == typeof e ? e.call(void 0, t) : e[0].call(e[1], t)
              } catch (e) {
                ;(0, n.onUnexpectedError)(e)
              }
            }
            null === (i = this._perfMon) || void 0 === i || i.stop()
          }
        }
        dispose() {
          var e, t, n, i, r
          this._disposed ||
            ((this._disposed = !0),
            null === (e = this._listeners) || void 0 === e || e.clear(),
            null === (t = this._deliveryQueue) || void 0 === t || t.clear(),
            null ===
              (i =
                null === (n = this._options) || void 0 === n ? void 0 : n.onLastListenerRemove) ||
              void 0 === i ||
              i.call(n),
            null === (r = this._leakageMon) || void 0 === r || r.dispose())
        }
      }
      t.Emitter = l
      class u extends l {
        constructor(e) {
          super(e),
            (this._isPaused = 0),
            (this._eventQueue = new r.LinkedList()),
            (this._mergeFn = null == e ? void 0 : e.merge)
        }
        pause() {
          this._isPaused++
        }
        resume() {
          if (0 !== this._isPaused && 0 == --this._isPaused)
            if (this._mergeFn) {
              const e = Array.from(this._eventQueue)
              this._eventQueue.clear(), super.fire(this._mergeFn(e))
            } else
              for (; !this._isPaused && 0 !== this._eventQueue.size; )
                super.fire(this._eventQueue.shift())
        }
        fire(e) {
          this._listeners && (0 !== this._isPaused ? this._eventQueue.push(e) : super.fire(e))
        }
      }
      ;(t.PauseableEmitter = u),
        (t.DebounceEmitter = class extends u {
          constructor(e) {
            var t
            super(e), (this._delay = null !== (t = e.delay) && void 0 !== t ? t : 100)
          }
          fire(e) {
            this._handle ||
              (this.pause(),
              (this._handle = setTimeout(() => {
                ;(this._handle = void 0), this.resume()
              }, this._delay))),
              super.fire(e)
          }
        }),
        (t.EventBufferer = class {
          constructor() {
            this.buffers = []
          }
          wrapEvent(e) {
            return (t, n, i) =>
              e(
                e => {
                  const i = this.buffers[this.buffers.length - 1]
                  i ? i.push(() => t.call(n, e)) : t.call(n, e)
                },
                void 0,
                i,
              )
          }
          bufferEvents(e) {
            const t = []
            this.buffers.push(t)
            const n = e()
            return this.buffers.pop(), t.forEach(e => e()), n
          }
        }),
        (t.Relay = class {
          constructor() {
            ;(this.listening = !1),
              (this.inputEvent = s.None),
              (this.inputEventListener = i.Disposable.None),
              (this.emitter = new l({
                onFirstListenerDidAdd: () => {
                  ;(this.listening = !0),
                    (this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter))
                },
                onLastListenerRemove: () => {
                  ;(this.listening = !1), this.inputEventListener.dispose()
                },
              })),
              (this.event = this.emitter.event)
          }
          set input(e) {
            ;(this.inputEvent = e),
              this.listening &&
                (this.inputEventListener.dispose(),
                (this.inputEventListener = e(this.emitter.fire, this.emitter)))
          }
          dispose() {
            this.inputEventListener.dispose(), this.emitter.dispose()
          }
        })
    }),
    n(r[21], o([0, 1, 5]), function (e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.CancellationTokenSource = t.CancellationToken = void 0)
      const i = Object.freeze(function (e, t) {
        const n = setTimeout(e.bind(t), 0)
        return {
          dispose() {
            clearTimeout(n)
          },
        }
      })
      var r, o
      ;((o = r = t.CancellationToken || (t.CancellationToken = {})).isCancellationToken = function (
        e,
      ) {
        return (
          e === o.None ||
          e === o.Cancelled ||
          e instanceof s ||
          (!(!e || 'object' != typeof e) &&
            'boolean' == typeof e.isCancellationRequested &&
            'function' == typeof e.onCancellationRequested)
        )
      }),
        (o.None = Object.freeze({
          isCancellationRequested: !1,
          onCancellationRequested: n.Event.None,
        })),
        (o.Cancelled = Object.freeze({ isCancellationRequested: !0, onCancellationRequested: i }))
      class s {
        constructor() {
          ;(this._isCancelled = !1), (this._emitter = null)
        }
        cancel() {
          this._isCancelled ||
            ((this._isCancelled = !0),
            this._emitter && (this._emitter.fire(void 0), this.dispose()))
        }
        get isCancellationRequested() {
          return this._isCancelled
        }
        get onCancellationRequested() {
          return this._isCancelled
            ? i
            : (this._emitter || (this._emitter = new n.Emitter()), this._emitter.event)
        }
        dispose() {
          this._emitter && (this._emitter.dispose(), (this._emitter = null))
        }
      }
      t.CancellationTokenSource = class {
        constructor(e) {
          ;(this._token = void 0),
            (this._parentListener = void 0),
            (this._parentListener = e && e.onCancellationRequested(this.cancel, this))
        }
        get token() {
          return this._token || (this._token = new s()), this._token
        }
        cancel() {
          this._token
            ? this._token instanceof s && this._token.cancel()
            : (this._token = r.Cancelled)
        }
        dispose(e = !1) {
          e && this.cancel(),
            this._parentListener && this._parentListener.dispose(),
            this._token ? this._token instanceof s && this._token.dispose() : (this._token = r.None)
        }
      }
    }),
    n(r[4], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getLeftDeleteOffset =
          t.breakBetweenGraphemeBreakType =
          t.getGraphemeBreakType =
          t.singleLetterHash =
          t.containsUppercaseCharacter =
          t.startsWithUTF8BOM =
          t.UTF8_BOM_CHARACTER =
          t.isEmojiImprecise =
          t.isFullWidthCharacter =
          t.containsFullWidthCharacter =
          t.containsUnusualLineTerminators =
          t.UNUSUAL_LINE_TERMINATORS =
          t.isBasicASCII =
          t.containsEmoji =
          t.containsRTL =
          t.prevCharLength =
          t.nextCharLength =
          t.getNextCodePoint =
          t.computeCodePoint =
          t.isLowSurrogate =
          t.isHighSurrogate =
          t.commonSuffixLength =
          t.commonPrefixLength =
          t.startsWithIgnoreCase =
          t.equalsIgnoreCase =
          t.isUpperAsciiLetter =
          t.isLowerAsciiLetter =
          t.compareSubstringIgnoreCase =
          t.compareIgnoreCase =
          t.compareSubstring =
          t.compare =
          t.lastNonWhitespaceIndex =
          t.getLeadingWhitespace =
          t.firstNonWhitespaceIndex =
          t.splitLines =
          t.regExpFlags =
          t.regExpLeadsToEndlessLoop =
          t.createRegExp =
          t.stripWildcards =
          t.convertSimple2RegExpPattern =
          t.rtrim =
          t.ltrim =
          t.trim =
          t.escapeRegExpCharacters =
          t.escape =
          t.format =
          t.isFalsyOrWhitespace =
            void 0),
        (t.isFalsyOrWhitespace = function (e) {
          return !e || 'string' != typeof e || 0 === e.trim().length
        })
      const n = /{(\d+)}/g
      function i(e) {
        return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&')
      }
      function r(e, t) {
        if (!e || !t) return e
        const n = t.length
        if (0 === n || 0 === e.length) return e
        let i = 0
        for (; e.indexOf(t, i) === i; ) i += n
        return e.substring(i)
      }
      function o(e, t) {
        if (!e || !t) return e
        const n = t.length,
          i = e.length
        if (0 === n || 0 === i) return e
        let r = i,
          o = -1
        for (; (o = e.lastIndexOf(t, r - 1)), -1 !== o && o + n === r; ) {
          if (0 === o) return ''
          r = o
        }
        return e.substring(0, r)
      }
      function s(e, t, n = 0, i = e.length, r = 0, o = t.length) {
        for (; n < i && r < o; n++, r++) {
          let i = e.charCodeAt(n),
            o = t.charCodeAt(r)
          if (i < o) return -1
          if (i > o) return 1
        }
        const s = i - n,
          a = o - r
        return s < a ? -1 : s > a ? 1 : 0
      }
      function a(e, t, n = 0, i = e.length, r = 0, o = t.length) {
        for (; n < i && r < o; n++, r++) {
          let a = e.charCodeAt(n),
            u = t.charCodeAt(r)
          if (a === u) continue
          if (a >= 128 || u >= 128) return s(e.toLowerCase(), t.toLowerCase(), n, i, r, o)
          l(a) && (a -= 32), l(u) && (u -= 32)
          const c = a - u
          if (0 !== c) return c
        }
        const a = i - n,
          u = o - r
        return a < u ? -1 : a > u ? 1 : 0
      }
      function l(e) {
        return e >= 97 && e <= 122
      }
      function u(e) {
        return 55296 <= e && e <= 56319
      }
      function c(e) {
        return 56320 <= e && e <= 57343
      }
      function d(e, t) {
        return t - 56320 + ((e - 55296) << 10) + 65536
      }
      function h(e, t, n) {
        const i = e.charCodeAt(n)
        if (u(i) && n + 1 < t) {
          const t = e.charCodeAt(n + 1)
          if (c(t)) return d(i, t)
        }
        return i
      }
      function f(e, t) {
        const n = e.charCodeAt(t - 1)
        if (c(n) && t > 1) {
          const i = e.charCodeAt(t - 2)
          if (u(i)) return d(i, n)
        }
        return n
      }
      ;(t.format = function (e, ...t) {
        return 0 === t.length
          ? e
          : e.replace(n, function (e, n) {
              const i = parseInt(n, 10)
              return isNaN(i) || i < 0 || i >= t.length ? e : t[i]
            })
      }),
        (t.escape = function (e) {
          return e.replace(/[<>&]/g, function (e) {
            switch (e) {
              case '<':
                return '&lt;'
              case '>':
                return '&gt;'
              case '&':
                return '&amp;'
              default:
                return e
            }
          })
        }),
        (t.escapeRegExpCharacters = i),
        (t.trim = function (e, t = ' ') {
          return o(r(e, t), t)
        }),
        (t.ltrim = r),
        (t.rtrim = o),
        (t.convertSimple2RegExpPattern = function (e) {
          return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*')
        }),
        (t.stripWildcards = function (e) {
          return e.replace(/\*/g, '')
        }),
        (t.createRegExp = function (e, t, n = {}) {
          if (!e) throw new Error('Cannot create regex from empty string')
          t || (e = i(e)),
            n.wholeWord &&
              (/\B/.test(e.charAt(0)) || (e = '\\b' + e),
              /\B/.test(e.charAt(e.length - 1)) || (e += '\\b'))
          let r = ''
          return (
            n.global && (r += 'g'),
            n.matchCase || (r += 'i'),
            n.multiline && (r += 'm'),
            n.unicode && (r += 'u'),
            new RegExp(e, r)
          )
        }),
        (t.regExpLeadsToEndlessLoop = function (e) {
          return (
            '^' !== e.source &&
            '^$' !== e.source &&
            '$' !== e.source &&
            '^\\s*$' !== e.source &&
            !(!e.exec('') || 0 !== e.lastIndex)
          )
        }),
        (t.regExpFlags = function (e) {
          return (
            (e.global ? 'g' : '') +
            (e.ignoreCase ? 'i' : '') +
            (e.multiline ? 'm' : '') +
            (e.unicode ? 'u' : '')
          )
        }),
        (t.splitLines = function (e) {
          return e.split(/\r\n|\r|\n/)
        }),
        (t.firstNonWhitespaceIndex = function (e) {
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e.charCodeAt(t)
            if (32 !== n && 9 !== n) return t
          }
          return -1
        }),
        (t.getLeadingWhitespace = function (e, t = 0, n = e.length) {
          for (let i = t; i < n; i++) {
            const n = e.charCodeAt(i)
            if (32 !== n && 9 !== n) return e.substring(t, i)
          }
          return e.substring(t, n)
        }),
        (t.lastNonWhitespaceIndex = function (e, t = e.length - 1) {
          for (let n = t; n >= 0; n--) {
            const t = e.charCodeAt(n)
            if (32 !== t && 9 !== t) return n
          }
          return -1
        }),
        (t.compare = function (e, t) {
          return e < t ? -1 : e > t ? 1 : 0
        }),
        (t.compareSubstring = s),
        (t.compareIgnoreCase = function (e, t) {
          return a(e, t, 0, e.length, 0, t.length)
        }),
        (t.compareSubstringIgnoreCase = a),
        (t.isLowerAsciiLetter = l),
        (t.isUpperAsciiLetter = function (e) {
          return e >= 65 && e <= 90
        }),
        (t.equalsIgnoreCase = function (e, t) {
          return e.length === t.length && 0 === a(e, t)
        }),
        (t.startsWithIgnoreCase = function (e, t) {
          const n = t.length
          return !(t.length > e.length) && 0 === a(e, t, 0, n)
        }),
        (t.commonPrefixLength = function (e, t) {
          let n,
            i = Math.min(e.length, t.length)
          for (n = 0; n < i; n++) if (e.charCodeAt(n) !== t.charCodeAt(n)) return n
          return i
        }),
        (t.commonSuffixLength = function (e, t) {
          let n,
            i = Math.min(e.length, t.length)
          const r = e.length - 1,
            o = t.length - 1
          for (n = 0; n < i; n++) if (e.charCodeAt(r - n) !== t.charCodeAt(o - n)) return n
          return i
        }),
        (t.isHighSurrogate = u),
        (t.isLowSurrogate = c),
        (t.computeCodePoint = d),
        (t.getNextCodePoint = h),
        (t.nextCharLength = function (e, t) {
          const n = y.getInstance(),
            i = t,
            r = e.length,
            o = h(e, r, t)
          t += o >= 65536 ? 2 : 1
          let s = n.getGraphemeBreakType(o)
          for (; t < r; ) {
            const i = h(e, r, t),
              o = n.getGraphemeBreakType(i)
            if (v(s, o)) break
            ;(t += i >= 65536 ? 2 : 1), (s = o)
          }
          return t - i
        }),
        (t.prevCharLength = function (e, t) {
          const n = y.getInstance(),
            i = t,
            r = f(e, t)
          t -= r >= 65536 ? 2 : 1
          let o = n.getGraphemeBreakType(r)
          for (; t > 0; ) {
            const i = f(e, t),
              r = n.getGraphemeBreakType(i)
            if (v(r, o)) break
            ;(t -= i >= 65536 ? 2 : 1), (o = r)
          }
          return i - t
        })
      const m =
        /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/
      t.containsRTL = function (e) {
        return m.test(e)
      }
      const g =
        /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDED6])/
      t.containsEmoji = function (e) {
        return g.test(e)
      }
      const p = /^[\t\n\r\x20-\x7E]*$/
      function _(e) {
        return (
          ((e = +e) >= 11904 && e <= 55215) ||
          (e >= 63744 && e <= 64255) ||
          (e >= 65281 && e <= 65374)
        )
      }
      function C(e) {
        return (
          (e >= 127462 && e <= 127487) ||
          8986 === e ||
          8987 === e ||
          9200 === e ||
          9203 === e ||
          (e >= 9728 && e <= 10175) ||
          11088 === e ||
          11093 === e ||
          (e >= 127744 && e <= 128591) ||
          (e >= 128640 && e <= 128764) ||
          (e >= 128992 && e <= 129003) ||
          (e >= 129280 && e <= 129535) ||
          (e >= 129648 && e <= 129750)
        )
      }
      function v(e, t) {
        return 0 === e
          ? 5 !== t && 7 !== t
          : !(
              (2 === e && 3 === t) ||
              (4 !== e &&
                2 !== e &&
                3 !== e &&
                4 !== t &&
                2 !== t &&
                3 !== t &&
                ((8 === e && (8 === t || 9 === t || 11 === t || 12 === t)) ||
                  ((11 === e || 9 === e) && (9 === t || 10 === t)) ||
                  ((12 === e || 10 === e) && 10 === t) ||
                  5 === t ||
                  13 === t ||
                  7 === t ||
                  1 === e ||
                  (13 === e && 14 === t) ||
                  (6 === e && 6 === t)))
            )
      }
      ;(t.isBasicASCII = function (e) {
        return p.test(e)
      }),
        (t.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/),
        (t.containsUnusualLineTerminators = function (e) {
          return t.UNUSUAL_LINE_TERMINATORS.test(e)
        }),
        (t.containsFullWidthCharacter = function (e) {
          for (let t = 0, n = e.length; t < n; t++) if (_(e.charCodeAt(t))) return !0
          return !1
        }),
        (t.isFullWidthCharacter = _),
        (t.isEmojiImprecise = C),
        (t.UTF8_BOM_CHARACTER = String.fromCharCode(65279)),
        (t.startsWithUTF8BOM = function (e) {
          return !!(e && e.length > 0 && 65279 === e.charCodeAt(0))
        }),
        (t.containsUppercaseCharacter = function (e, t = !1) {
          return !!e && (t && (e = e.replace(/\\./g, '')), e.toLowerCase() !== e)
        }),
        (t.singleLetterHash = function (e) {
          return (e %= 52) < 26 ? String.fromCharCode(97 + e) : String.fromCharCode(65 + e - 26)
        }),
        (t.getGraphemeBreakType = function (e) {
          return y.getInstance().getGraphemeBreakType(e)
        }),
        (t.breakBetweenGraphemeBreakType = v)
      class y {
        constructor() {
          this._data = JSON.parse(
            '[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]',
          )
        }
        static getInstance() {
          return y._INSTANCE || (y._INSTANCE = new y()), y._INSTANCE
        }
        getGraphemeBreakType(e) {
          if (e < 32) return 10 === e ? 3 : 13 === e ? 2 : 4
          if (e < 127) return 0
          const t = this._data,
            n = t.length / 3
          let i = 1
          for (; i <= n; )
            if (e < t[3 * i]) i *= 2
            else {
              if (!(e > t[3 * i + 1])) return t[3 * i + 2]
              i = 2 * i + 1
            }
          return 0
        }
      }
      function b(e) {
        return e >= 65536 ? 2 : 1
      }
      function E(e) {
        return 127995 <= e && e <= 127999
      }
      ;(y._INSTANCE = null),
        (t.getLeftDeleteOffset = function (e, t) {
          if (0 === e) return 0
          const n = (function (e, t) {
            let n = f(t, e)
            for (e -= b(n); E(n) || 65039 === n || 8419 === n; ) {
              if (0 === e) return
              ;(n = f(t, e)), (e -= b(n))
            }
            if (C(n)) {
              if (e >= 0) {
                const n = f(t, e)
                8205 === n && (e -= b(n))
              }
              return e
            }
          })(e, t)
          return void 0 !== n ? n : (e -= b(f(t, e)))
        })
    }),
    n(r[22], o([0, 1, 4]), function (e, t, n) {
      'use strict'
      function i(e, t) {
        switch (typeof e) {
          case 'object':
            return null === e
              ? r(349, t)
              : Array.isArray(e)
              ? (function (e, t) {
                  return (t = r(104579, t)), e.reduce((e, t) => i(t, e), t)
                })(e, t)
              : (function (e, t) {
                  return (
                    (t = r(181387, t)),
                    Object.keys(e)
                      .sort()
                      .reduce((t, n) => ((t = o(n, t)), i(e[n], t)), t)
                  )
                })(e, t)
          case 'string':
            return o(e, t)
          case 'boolean':
            return (function (e, t) {
              return r(e ? 433 : 863, t)
            })(e, t)
          case 'number':
            return r(e, t)
          case 'undefined':
            return r(937, t)
          default:
            return r(617, t)
        }
      }
      function r(e, t) {
        return ((t << 5) - t + e) | 0
      }
      function o(e, t) {
        t = r(149417, t)
        for (let n = 0, i = e.length; n < i; n++) t = r(e.charCodeAt(n), t)
        return t
      }
      function s(e, t, n = 32) {
        const i = n - t
        return ((e << t) | ((~((1 << i) - 1) & e) >>> i)) >>> 0
      }
      function a(e, t = 0, n = e.byteLength, i = 0) {
        for (let r = 0; r < n; r++) e[t + r] = i
      }
      function l(e, t = 32) {
        return e instanceof ArrayBuffer
          ? Array.from(new Uint8Array(e))
              .map(e => e.toString(16).padStart(2, '0'))
              .join('')
          : (function (e, t, n = '0') {
              for (; e.length < t; ) e = n + e
              return e
            })((e >>> 0).toString(16), t / 4)
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.StringSHA1 = t.toHexString = t.stringHash = t.numberHash = t.doHash = t.hash = void 0),
        (t.hash = function (e) {
          return i(e, 0)
        }),
        (t.doHash = i),
        (t.numberHash = r),
        (t.stringHash = o),
        (t.toHexString = l)
      class u {
        constructor() {
          ;(this._h0 = 1732584193),
            (this._h1 = 4023233417),
            (this._h2 = 2562383102),
            (this._h3 = 271733878),
            (this._h4 = 3285377520),
            (this._buff = new Uint8Array(67)),
            (this._buffDV = new DataView(this._buff.buffer)),
            (this._buffLen = 0),
            (this._totalLen = 0),
            (this._leftoverHighSurrogate = 0),
            (this._finished = !1)
        }
        update(e) {
          const t = e.length
          if (0 === t) return
          const i = this._buff
          let r,
            o,
            s = this._buffLen,
            a = this._leftoverHighSurrogate
          for (0 !== a ? ((r = a), (o = -1), (a = 0)) : ((r = e.charCodeAt(0)), (o = 0)); ; ) {
            let l = r
            if (n.isHighSurrogate(r)) {
              if (!(o + 1 < t)) {
                a = r
                break
              }
              {
                const t = e.charCodeAt(o + 1)
                n.isLowSurrogate(t) ? (o++, (l = n.computeCodePoint(r, t))) : (l = 65533)
              }
            } else n.isLowSurrogate(r) && (l = 65533)
            if (((s = this._push(i, s, l)), o++, !(o < t))) break
            r = e.charCodeAt(o)
          }
          ;(this._buffLen = s), (this._leftoverHighSurrogate = a)
        }
        _push(e, t, n) {
          return (
            n < 128
              ? (e[t++] = n)
              : n < 2048
              ? ((e[t++] = 192 | ((1984 & n) >>> 6)), (e[t++] = 128 | ((63 & n) >>> 0)))
              : n < 65536
              ? ((e[t++] = 224 | ((61440 & n) >>> 12)),
                (e[t++] = 128 | ((4032 & n) >>> 6)),
                (e[t++] = 128 | ((63 & n) >>> 0)))
              : ((e[t++] = 240 | ((1835008 & n) >>> 18)),
                (e[t++] = 128 | ((258048 & n) >>> 12)),
                (e[t++] = 128 | ((4032 & n) >>> 6)),
                (e[t++] = 128 | ((63 & n) >>> 0))),
            t >= 64 &&
              (this._step(),
              (t -= 64),
              (this._totalLen += 64),
              (e[0] = e[64]),
              (e[1] = e[65]),
              (e[2] = e[66])),
            t
          )
        }
        digest() {
          return (
            this._finished ||
              ((this._finished = !0),
              this._leftoverHighSurrogate &&
                ((this._leftoverHighSurrogate = 0),
                (this._buffLen = this._push(this._buff, this._buffLen, 65533))),
              (this._totalLen += this._buffLen),
              this._wrapUp()),
            l(this._h0) + l(this._h1) + l(this._h2) + l(this._h3) + l(this._h4)
          )
        }
        _wrapUp() {
          ;(this._buff[this._buffLen++] = 128),
            a(this._buff, this._buffLen),
            this._buffLen > 56 && (this._step(), a(this._buff))
          const e = 8 * this._totalLen
          this._buffDV.setUint32(56, Math.floor(e / 4294967296), !1),
            this._buffDV.setUint32(60, e % 4294967296, !1),
            this._step()
        }
        _step() {
          const e = u._bigBlock32,
            t = this._buffDV
          for (let n = 0; n < 64; n += 4) e.setUint32(n, t.getUint32(n, !1), !1)
          for (let t = 64; t < 320; t += 4)
            e.setUint32(
              t,
              s(
                e.getUint32(t - 12, !1) ^
                  e.getUint32(t - 32, !1) ^
                  e.getUint32(t - 56, !1) ^
                  e.getUint32(t - 64, !1),
                1,
              ),
              !1,
            )
          let n,
            i,
            r,
            o = this._h0,
            a = this._h1,
            l = this._h2,
            c = this._h3,
            d = this._h4
          for (let t = 0; t < 80; t++)
            t < 20
              ? ((n = (a & l) | (~a & c)), (i = 1518500249))
              : t < 40
              ? ((n = a ^ l ^ c), (i = 1859775393))
              : t < 60
              ? ((n = (a & l) | (a & c) | (l & c)), (i = 2400959708))
              : ((n = a ^ l ^ c), (i = 3395469782)),
              (r = (s(o, 5) + n + d + i + e.getUint32(4 * t, !1)) & 4294967295),
              (d = c),
              (c = l),
              (l = s(a, 30)),
              (a = o),
              (o = r)
          ;(this._h0 = (this._h0 + o) & 4294967295),
            (this._h1 = (this._h1 + a) & 4294967295),
            (this._h2 = (this._h2 + l) & 4294967295),
            (this._h3 = (this._h3 + c) & 4294967295),
            (this._h4 = (this._h4 + d) & 4294967295)
        }
      }
      ;(t.StringSHA1 = u), (u._bigBlock32 = new DataView(new ArrayBuffer(320)))
    }),
    n(r[10], o([0, 1, 14, 22]), function (e, t, n, i) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.LcsDiff = t.MyArray = t.Debug = t.stringDiff = t.StringDiffSequence = void 0)
      class r {
        constructor(e) {
          this.source = e
        }
        getElements() {
          const e = this.source,
            t = new Int32Array(e.length)
          for (let n = 0, i = e.length; n < i; n++) t[n] = e.charCodeAt(n)
          return t
        }
      }
      ;(t.StringDiffSequence = r),
        (t.stringDiff = function (e, t, n) {
          return new l(new r(e), new r(t)).ComputeDiff(n).changes
        })
      class o {
        static Assert(e, t) {
          if (!e) throw new Error(t)
        }
      }
      t.Debug = o
      class s {
        static Copy(e, t, n, i, r) {
          for (let o = 0; o < r; o++) n[i + o] = e[t + o]
        }
        static Copy2(e, t, n, i, r) {
          for (let o = 0; o < r; o++) n[i + o] = e[t + o]
        }
      }
      t.MyArray = s
      class a {
        constructor() {
          ;(this.m_changes = []),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0)
        }
        MarkNextChange() {
          ;(this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
            this.m_changes.push(
              new n.DiffChange(
                this.m_originalStart,
                this.m_originalCount,
                this.m_modifiedStart,
                this.m_modifiedCount,
              ),
            ),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824)
        }
        AddOriginalElement(e, t) {
          ;(this.m_originalStart = Math.min(this.m_originalStart, e)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, t)),
            this.m_originalCount++
        }
        AddModifiedElement(e, t) {
          ;(this.m_originalStart = Math.min(this.m_originalStart, e)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, t)),
            this.m_modifiedCount++
        }
        getChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(),
            this.m_changes
          )
        }
        getReverseChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(),
            this.m_changes.reverse(),
            this.m_changes
          )
        }
      }
      class l {
        constructor(e, t, n = null) {
          ;(this.ContinueProcessingPredicate = n),
            (this._originalSequence = e),
            (this._modifiedSequence = t)
          const [i, r, o] = l._getElements(e),
            [s, a, u] = l._getElements(t)
          ;(this._hasStrings = o && u),
            (this._originalStringElements = i),
            (this._originalElementsOrHash = r),
            (this._modifiedStringElements = s),
            (this._modifiedElementsOrHash = a),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = [])
        }
        static _isStringArray(e) {
          return e.length > 0 && 'string' == typeof e[0]
        }
        static _getElements(e) {
          const t = e.getElements()
          if (l._isStringArray(t)) {
            const e = new Int32Array(t.length)
            for (let n = 0, r = t.length; n < r; n++) e[n] = (0, i.stringHash)(t[n], 0)
            return [t, e, !0]
          }
          return t instanceof Int32Array ? [[], t, !1] : [[], new Int32Array(t), !1]
        }
        ElementsAreEqual(e, t) {
          return (
            this._originalElementsOrHash[e] === this._modifiedElementsOrHash[t] &&
            (!this._hasStrings ||
              this._originalStringElements[e] === this._modifiedStringElements[t])
          )
        }
        ElementsAreStrictEqual(e, t) {
          return (
            !!this.ElementsAreEqual(e, t) &&
            l._getStrictElement(this._originalSequence, e) ===
              l._getStrictElement(this._modifiedSequence, t)
          )
        }
        static _getStrictElement(e, t) {
          return 'function' == typeof e.getStrictElement ? e.getStrictElement(t) : null
        }
        OriginalElementsAreEqual(e, t) {
          return (
            this._originalElementsOrHash[e] === this._originalElementsOrHash[t] &&
            (!this._hasStrings ||
              this._originalStringElements[e] === this._originalStringElements[t])
          )
        }
        ModifiedElementsAreEqual(e, t) {
          return (
            this._modifiedElementsOrHash[e] === this._modifiedElementsOrHash[t] &&
            (!this._hasStrings ||
              this._modifiedStringElements[e] === this._modifiedStringElements[t])
          )
        }
        ComputeDiff(e) {
          return this._ComputeDiff(
            0,
            this._originalElementsOrHash.length - 1,
            0,
            this._modifiedElementsOrHash.length - 1,
            e,
          )
        }
        _ComputeDiff(e, t, n, i, r) {
          const o = [!1]
          let s = this.ComputeDiffRecursive(e, t, n, i, o)
          return r && (s = this.PrettifyChanges(s)), { quitEarly: o[0], changes: s }
        }
        ComputeDiffRecursive(e, t, i, r, s) {
          for (s[0] = !1; e <= t && i <= r && this.ElementsAreEqual(e, i); ) e++, i++
          for (; t >= e && r >= i && this.ElementsAreEqual(t, r); ) t--, r--
          if (e > t || i > r) {
            let s
            return (
              i <= r
                ? (o.Assert(e === t + 1, 'originalStart should only be one more than originalEnd'),
                  (s = [new n.DiffChange(e, 0, i, r - i + 1)]))
                : e <= t
                ? (o.Assert(i === r + 1, 'modifiedStart should only be one more than modifiedEnd'),
                  (s = [new n.DiffChange(e, t - e + 1, i, 0)]))
                : (o.Assert(e === t + 1, 'originalStart should only be one more than originalEnd'),
                  o.Assert(i === r + 1, 'modifiedStart should only be one more than modifiedEnd'),
                  (s = [])),
              s
            )
          }
          const a = [0],
            l = [0],
            u = this.ComputeRecursionPoint(e, t, i, r, a, l, s),
            c = a[0],
            d = l[0]
          if (null !== u) return u
          if (!s[0]) {
            const o = this.ComputeDiffRecursive(e, c, i, d, s)
            let a = []
            return (
              (a = s[0]
                ? [new n.DiffChange(c + 1, t - (c + 1) + 1, d + 1, r - (d + 1) + 1)]
                : this.ComputeDiffRecursive(c + 1, t, d + 1, r, s)),
              this.ConcatenateChanges(o, a)
            )
          }
          return [new n.DiffChange(e, t - e + 1, i, r - i + 1)]
        }
        WALKTRACE(e, t, i, r, o, s, l, u, c, d, h, f, m, g, p, _, C, v) {
          let y = null,
            b = null,
            E = new a(),
            S = t,
            L = i,
            N = m[0] - _[0] - r,
            A = -1073741824,
            M = this.m_forwardHistory.length - 1
          do {
            const t = N + e
            t === S || (t < L && c[t - 1] < c[t + 1])
              ? ((g = (h = c[t + 1]) - N - r),
                h < A && E.MarkNextChange(),
                (A = h),
                E.AddModifiedElement(h + 1, g),
                (N = t + 1 - e))
              : ((g = (h = c[t - 1] + 1) - N - r),
                h < A && E.MarkNextChange(),
                (A = h - 1),
                E.AddOriginalElement(h, g + 1),
                (N = t - 1 - e)),
              M >= 0 && ((e = (c = this.m_forwardHistory[M])[0]), (S = 1), (L = c.length - 1))
          } while (--M >= -1)
          if (((y = E.getReverseChanges()), v[0])) {
            let e = m[0] + 1,
              t = _[0] + 1
            if (null !== y && y.length > 0) {
              const n = y[y.length - 1]
              ;(e = Math.max(e, n.getOriginalEnd())), (t = Math.max(t, n.getModifiedEnd()))
            }
            b = [new n.DiffChange(e, f - e + 1, t, p - t + 1)]
          } else {
            ;(E = new a()),
              (S = s),
              (L = l),
              (N = m[0] - _[0] - u),
              (A = 1073741824),
              (M = C ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2)
            do {
              const e = N + o
              e === S || (e < L && d[e - 1] >= d[e + 1])
                ? ((g = (h = d[e + 1] - 1) - N - u),
                  h > A && E.MarkNextChange(),
                  (A = h + 1),
                  E.AddOriginalElement(h + 1, g + 1),
                  (N = e + 1 - o))
                : ((g = (h = d[e - 1]) - N - u),
                  h > A && E.MarkNextChange(),
                  (A = h),
                  E.AddModifiedElement(h + 1, g + 1),
                  (N = e - 1 - o)),
                M >= 0 && ((o = (d = this.m_reverseHistory[M])[0]), (S = 1), (L = d.length - 1))
            } while (--M >= -1)
            b = E.getChanges()
          }
          return this.ConcatenateChanges(y, b)
        }
        ComputeRecursionPoint(e, t, i, r, o, a, l) {
          let u = 0,
            c = 0,
            d = 0,
            h = 0,
            f = 0,
            m = 0
          e--,
            i--,
            (o[0] = 0),
            (a[0] = 0),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = [])
          const g = t - e + (r - i),
            p = g + 1,
            _ = new Int32Array(p),
            C = new Int32Array(p),
            v = r - i,
            y = t - e,
            b = e - i,
            E = t - r,
            S = (y - v) % 2 == 0
          ;(_[v] = e), (C[y] = t), (l[0] = !1)
          for (let L = 1; L <= g / 2 + 1; L++) {
            let g = 0,
              N = 0
            ;(d = this.ClipDiagonalBound(v - L, L, v, p)),
              (h = this.ClipDiagonalBound(v + L, L, v, p))
            for (let e = d; e <= h; e += 2) {
              ;(u = e === d || (e < h && _[e - 1] < _[e + 1]) ? _[e + 1] : _[e - 1] + 1),
                (c = u - (e - v) - b)
              const n = u
              for (; u < t && c < r && this.ElementsAreEqual(u + 1, c + 1); ) u++, c++
              if (
                ((_[e] = u),
                u + c > g + N && ((g = u), (N = c)),
                !S && Math.abs(e - y) <= L - 1 && u >= C[e])
              )
                return (
                  (o[0] = u),
                  (a[0] = c),
                  n <= C[e] && L <= 1448
                    ? this.WALKTRACE(v, d, h, b, y, f, m, E, _, C, u, t, o, c, r, a, S, l)
                    : null
                )
            }
            const A = (g - e + (N - i) - L) / 2
            if (
              null !== this.ContinueProcessingPredicate &&
              !this.ContinueProcessingPredicate(g, A)
            )
              return (
                (l[0] = !0),
                (o[0] = g),
                (a[0] = N),
                A > 0 && L <= 1448
                  ? this.WALKTRACE(v, d, h, b, y, f, m, E, _, C, u, t, o, c, r, a, S, l)
                  : (e++, i++, [new n.DiffChange(e, t - e + 1, i, r - i + 1)])
              )
            ;(f = this.ClipDiagonalBound(y - L, L, y, p)),
              (m = this.ClipDiagonalBound(y + L, L, y, p))
            for (let n = f; n <= m; n += 2) {
              ;(u = n === f || (n < m && C[n - 1] >= C[n + 1]) ? C[n + 1] - 1 : C[n - 1]),
                (c = u - (n - y) - E)
              const s = u
              for (; u > e && c > i && this.ElementsAreEqual(u, c); ) u--, c--
              if (((C[n] = u), S && Math.abs(n - v) <= L && u <= _[n]))
                return (
                  (o[0] = u),
                  (a[0] = c),
                  s >= _[n] && L <= 1448
                    ? this.WALKTRACE(v, d, h, b, y, f, m, E, _, C, u, t, o, c, r, a, S, l)
                    : null
                )
            }
            if (L <= 1447) {
              let e = new Int32Array(h - d + 2)
              ;(e[0] = v - d + 1),
                s.Copy2(_, d, e, 1, h - d + 1),
                this.m_forwardHistory.push(e),
                (e = new Int32Array(m - f + 2)),
                (e[0] = y - f + 1),
                s.Copy2(C, f, e, 1, m - f + 1),
                this.m_reverseHistory.push(e)
            }
          }
          return this.WALKTRACE(v, d, h, b, y, f, m, E, _, C, u, t, o, c, r, a, S, l)
        }
        PrettifyChanges(e) {
          for (let t = 0; t < e.length; t++) {
            const n = e[t],
              i = t < e.length - 1 ? e[t + 1].originalStart : this._originalElementsOrHash.length,
              r = t < e.length - 1 ? e[t + 1].modifiedStart : this._modifiedElementsOrHash.length,
              o = n.originalLength > 0,
              s = n.modifiedLength > 0
            for (
              ;
              n.originalStart + n.originalLength < i &&
              n.modifiedStart + n.modifiedLength < r &&
              (!o ||
                this.OriginalElementsAreEqual(
                  n.originalStart,
                  n.originalStart + n.originalLength,
                )) &&
              (!s ||
                this.ModifiedElementsAreEqual(n.modifiedStart, n.modifiedStart + n.modifiedLength));

            ) {
              const e = this.ElementsAreStrictEqual(n.originalStart, n.modifiedStart)
              if (
                this.ElementsAreStrictEqual(
                  n.originalStart + n.originalLength,
                  n.modifiedStart + n.modifiedLength,
                ) &&
                !e
              )
                break
              n.originalStart++, n.modifiedStart++
            }
            let a = [null]
            t < e.length - 1 &&
              this.ChangesOverlap(e[t], e[t + 1], a) &&
              ((e[t] = a[0]), e.splice(t + 1, 1), t--)
          }
          for (let t = e.length - 1; t >= 0; t--) {
            const n = e[t]
            let i = 0,
              r = 0
            if (t > 0) {
              const n = e[t - 1]
              ;(i = n.originalStart + n.originalLength), (r = n.modifiedStart + n.modifiedLength)
            }
            const o = n.originalLength > 0,
              s = n.modifiedLength > 0
            let a = 0,
              l = this._boundaryScore(
                n.originalStart,
                n.originalLength,
                n.modifiedStart,
                n.modifiedLength,
              )
            for (let e = 1; ; e++) {
              const t = n.originalStart - e,
                u = n.modifiedStart - e
              if (
                t < i ||
                u < r ||
                (o && !this.OriginalElementsAreEqual(t, t + n.originalLength)) ||
                (s && !this.ModifiedElementsAreEqual(u, u + n.modifiedLength))
              )
                break
              const c =
                (t === i && u === r ? 5 : 0) +
                this._boundaryScore(t, n.originalLength, u, n.modifiedLength)
              c > l && ((l = c), (a = e))
            }
            ;(n.originalStart -= a), (n.modifiedStart -= a)
            const u = [null]
            t > 0 &&
              this.ChangesOverlap(e[t - 1], e[t], u) &&
              ((e[t - 1] = u[0]), e.splice(t, 1), t++)
          }
          if (this._hasStrings)
            for (let t = 1, n = e.length; t < n; t++) {
              const n = e[t - 1],
                i = e[t],
                r = i.originalStart - n.originalStart - n.originalLength,
                o = n.originalStart,
                s = i.originalStart + i.originalLength,
                a = s - o,
                l = n.modifiedStart,
                u = i.modifiedStart + i.modifiedLength,
                c = u - l
              if (r < 5 && a < 20 && c < 20) {
                const e = this._findBetterContiguousSequence(o, a, l, c, r)
                if (e) {
                  const [t, o] = e
                  ;(t !== n.originalStart + n.originalLength ||
                    o !== n.modifiedStart + n.modifiedLength) &&
                    ((n.originalLength = t - n.originalStart),
                    (n.modifiedLength = o - n.modifiedStart),
                    (i.originalStart = t + r),
                    (i.modifiedStart = o + r),
                    (i.originalLength = s - i.originalStart),
                    (i.modifiedLength = u - i.modifiedStart))
                }
              }
            }
          return e
        }
        _findBetterContiguousSequence(e, t, n, i, r) {
          if (t < r || i < r) return null
          const o = e + t - r + 1,
            s = n + i - r + 1
          let a = 0,
            l = 0,
            u = 0
          for (let t = e; t < o; t++)
            for (let e = n; e < s; e++) {
              const n = this._contiguousSequenceScore(t, e, r)
              n > 0 && n > a && ((a = n), (l = t), (u = e))
            }
          return a > 0 ? [l, u] : null
        }
        _contiguousSequenceScore(e, t, n) {
          let i = 0
          for (let r = 0; r < n; r++) {
            if (!this.ElementsAreEqual(e + r, t + r)) return 0
            i += this._originalStringElements[e + r].length
          }
          return i
        }
        _OriginalIsBoundary(e) {
          return (
            e <= 0 ||
            e >= this._originalElementsOrHash.length - 1 ||
            (this._hasStrings && /^\s*$/.test(this._originalStringElements[e]))
          )
        }
        _OriginalRegionIsBoundary(e, t) {
          if (this._OriginalIsBoundary(e) || this._OriginalIsBoundary(e - 1)) return !0
          if (t > 0) {
            const n = e + t
            if (this._OriginalIsBoundary(n - 1) || this._OriginalIsBoundary(n)) return !0
          }
          return !1
        }
        _ModifiedIsBoundary(e) {
          return (
            e <= 0 ||
            e >= this._modifiedElementsOrHash.length - 1 ||
            (this._hasStrings && /^\s*$/.test(this._modifiedStringElements[e]))
          )
        }
        _ModifiedRegionIsBoundary(e, t) {
          if (this._ModifiedIsBoundary(e) || this._ModifiedIsBoundary(e - 1)) return !0
          if (t > 0) {
            const n = e + t
            if (this._ModifiedIsBoundary(n - 1) || this._ModifiedIsBoundary(n)) return !0
          }
          return !1
        }
        _boundaryScore(e, t, n, i) {
          return (
            (this._OriginalRegionIsBoundary(e, t) ? 1 : 0) +
            (this._ModifiedRegionIsBoundary(n, i) ? 1 : 0)
          )
        }
        ConcatenateChanges(e, t) {
          let n = []
          if (0 === e.length || 0 === t.length) return t.length > 0 ? t : e
          if (this.ChangesOverlap(e[e.length - 1], t[0], n)) {
            const i = new Array(e.length + t.length - 1)
            return (
              s.Copy(e, 0, i, 0, e.length - 1),
              (i[e.length - 1] = n[0]),
              s.Copy(t, 1, i, e.length, t.length - 1),
              i
            )
          }
          {
            const n = new Array(e.length + t.length)
            return s.Copy(e, 0, n, 0, e.length), s.Copy(t, 0, n, e.length, t.length), n
          }
        }
        ChangesOverlap(e, t, i) {
          if (
            (o.Assert(
              e.originalStart <= t.originalStart,
              'Left change is not less than or equal to right change',
            ),
            o.Assert(
              e.modifiedStart <= t.modifiedStart,
              'Left change is not less than or equal to right change',
            ),
            e.originalStart + e.originalLength >= t.originalStart ||
              e.modifiedStart + e.modifiedLength >= t.modifiedStart)
          ) {
            const r = e.originalStart
            let o = e.originalLength
            const s = e.modifiedStart
            let a = e.modifiedLength
            return (
              e.originalStart + e.originalLength >= t.originalStart &&
                (o = t.originalStart + t.originalLength - e.originalStart),
              e.modifiedStart + e.modifiedLength >= t.modifiedStart &&
                (a = t.modifiedStart + t.modifiedLength - e.modifiedStart),
              (i[0] = new n.DiffChange(r, o, s, a)),
              !0
            )
          }
          return (i[0] = null), !1
        }
        ClipDiagonalBound(e, t, n, i) {
          if (e >= 0 && e < i) return e
          const r = t % 2 == 0
          return e < 0 ? (r === (n % 2 == 0) ? 0 : 1) : r === ((i - n - 1) % 2 == 0) ? i - 1 : i - 2
        }
      }
      t.LcsDiff = l
    }),
    n(r[11], o([0, 1]), function (e, t) {
      'use strict'
      function n(e) {
        return 'string' == typeof e
      }
      function i(e) {
        return void 0 === e
      }
      function r(e) {
        return i(e) || null === e
      }
      function o(e) {
        return 'function' == typeof e
      }
      function s(e, t) {
        if (n(t)) {
          if (typeof e !== t) throw new Error(`argument does not match constraint: typeof ${t}`)
        } else if (o(t)) {
          try {
            if (e instanceof t) return
          } catch (e) {}
          if ((!r(e) && e.constructor === t) || (1 === t.length && !0 === t.call(void 0, e))) return
          throw new Error(
            'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true',
          )
        }
      }
      function a(e) {
        let t = [],
          n = Object.getPrototypeOf(e)
        for (; Object.prototype !== n; )
          (t = t.concat(Object.getOwnPropertyNames(n))), (n = Object.getPrototypeOf(n))
        return t
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.assertNever =
          t.withNullAsUndefined =
          t.createProxyObject =
          t.getAllMethodNames =
          t.getAllPropertyNames =
          t.validateConstraint =
          t.validateConstraints =
          t.isFunction =
          t.assertIsDefined =
          t.assertType =
          t.isUndefinedOrNull =
          t.isDefined =
          t.isUndefined =
          t.isBoolean =
          t.isNumber =
          t.isObject =
          t.isString =
          t.isArray =
            void 0),
        (t.isArray = function (e) {
          return Array.isArray(e)
        }),
        (t.isString = n),
        (t.isObject = function (e) {
          return !(
            'object' != typeof e ||
            null === e ||
            Array.isArray(e) ||
            e instanceof RegExp ||
            e instanceof Date
          )
        }),
        (t.isNumber = function (e) {
          return 'number' == typeof e && !isNaN(e)
        }),
        (t.isBoolean = function (e) {
          return !0 === e || !1 === e
        }),
        (t.isUndefined = i),
        (t.isDefined = function (e) {
          return !r(e)
        }),
        (t.isUndefinedOrNull = r),
        (t.assertType = function (e, t) {
          if (!e) throw new Error(t ? `Unexpected type, expected '${t}'` : 'Unexpected type')
        }),
        (t.assertIsDefined = function (e) {
          if (r(e)) throw new Error('Assertion Failed: argument is undefined or null')
          return e
        }),
        (t.isFunction = o),
        (t.validateConstraints = function (e, t) {
          const n = Math.min(e.length, t.length)
          for (let i = 0; i < n; i++) s(e[i], t[i])
        }),
        (t.validateConstraint = s),
        (t.getAllPropertyNames = a),
        (t.getAllMethodNames = function (e) {
          const t = []
          for (const n of a(e)) 'function' == typeof e[n] && t.push(n)
          return t
        }),
        (t.createProxyObject = function (e, t) {
          const n = e =>
            function () {
              const n = Array.prototype.slice.call(arguments, 0)
              return t(e, n)
            }
          let i = {}
          for (const t of e) i[t] = n(t)
          return i
        }),
        (t.withNullAsUndefined = function (e) {
          return null === e ? void 0 : e
        }),
        (t.assertNever = function (e, t = 'Unreachable') {
          throw new Error(t)
        })
    }),
    n(r[12], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.toUint32 = t.toUint8 = void 0),
        (t.toUint8 = function (e) {
          return e < 0 ? 0 : e > 255 ? 255 : 0 | e
        }),
        (t.toUint32 = function (e) {
          return e < 0 ? 0 : e > 4294967295 ? 4294967295 : 0 | e
        })
    }),
    n(r[13], o([0, 1, 20, 2]), function (e, t, n, i) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.uriToFsPath = t.URI = void 0)
      const r = /^\w[\w\d+.-]*$/,
        o = /^\//,
        s = /^\/\//
      function a(e, t) {
        if (!e.scheme && t)
          throw new Error(
            `[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`,
          )
        if (e.scheme && !r.test(e.scheme))
          throw new Error('[UriError]: Scheme contains illegal characters.')
        if (e.path)
          if (e.authority) {
            if (!o.test(e.path))
              throw new Error(
                '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character',
              )
          } else if (s.test(e.path))
            throw new Error(
              '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")',
            )
      }
      const l = '',
        u = '/',
        c = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/
      class d {
        constructor(e, t, n, i, r, o = !1) {
          'object' == typeof e
            ? ((this.scheme = e.scheme || l),
              (this.authority = e.authority || l),
              (this.path = e.path || l),
              (this.query = e.query || l),
              (this.fragment = e.fragment || l))
            : ((this.scheme = (function (e, t) {
                return e || t ? e : 'file'
              })(e, o)),
              (this.authority = t || l),
              (this.path = (function (e, t) {
                switch (e) {
                  case 'https':
                  case 'http':
                  case 'file':
                    t ? t[0] !== u && (t = u + t) : (t = u)
                }
                return t
              })(this.scheme, n || l)),
              (this.query = i || l),
              (this.fragment = r || l),
              a(this, o))
        }
        static isUri(e) {
          return (
            e instanceof d ||
            (!!e &&
              'string' == typeof e.authority &&
              'string' == typeof e.fragment &&
              'string' == typeof e.path &&
              'string' == typeof e.query &&
              'string' == typeof e.scheme &&
              'string' == typeof e.fsPath &&
              'function' == typeof e.with &&
              'function' == typeof e.toString)
          )
        }
        get fsPath() {
          return _(this, !1)
        }
        with(e) {
          if (!e) return this
          let { scheme: t, authority: n, path: i, query: r, fragment: o } = e
          return (
            void 0 === t ? (t = this.scheme) : null === t && (t = l),
            void 0 === n ? (n = this.authority) : null === n && (n = l),
            void 0 === i ? (i = this.path) : null === i && (i = l),
            void 0 === r ? (r = this.query) : null === r && (r = l),
            void 0 === o ? (o = this.fragment) : null === o && (o = l),
            t === this.scheme &&
            n === this.authority &&
            i === this.path &&
            r === this.query &&
            o === this.fragment
              ? this
              : new f(t, n, i, r, o)
          )
        }
        static parse(e, t = !1) {
          const n = c.exec(e)
          return n
            ? new f(n[2] || l, b(n[4] || l), b(n[5] || l), b(n[7] || l), b(n[9] || l), t)
            : new f(l, l, l, l, l)
        }
        static file(e) {
          let t = l
          if ((i.isWindows && (e = e.replace(/\\/g, u)), e[0] === u && e[1] === u)) {
            const n = e.indexOf(u, 2)
            ;-1 === n
              ? ((t = e.substring(2)), (e = u))
              : ((t = e.substring(2, n)), (e = e.substring(n) || u))
          }
          return new f('file', t, e, l, l)
        }
        static from(e) {
          const t = new f(e.scheme, e.authority, e.path, e.query, e.fragment)
          return a(t, !0), t
        }
        static joinPath(e, ...t) {
          if (!e.path) throw new Error('[UriError]: cannot call joinPath on URI without path')
          let r
          return (
            (r =
              i.isWindows && 'file' === e.scheme
                ? d.file(n.win32.join(_(e, !0), ...t)).path
                : n.posix.join(e.path, ...t)),
            e.with({ path: r })
          )
        }
        toString(e = !1) {
          return C(this, e)
        }
        toJSON() {
          return this
        }
        static revive(e) {
          if (e) {
            if (e instanceof d) return e
            {
              const t = new f(e)
              return (t._formatted = e.external), (t._fsPath = e._sep === h ? e.fsPath : null), t
            }
          }
          return e
        }
      }
      t.URI = d
      const h = i.isWindows ? 1 : void 0
      class f extends d {
        constructor() {
          super(...arguments), (this._formatted = null), (this._fsPath = null)
        }
        get fsPath() {
          return this._fsPath || (this._fsPath = _(this, !1)), this._fsPath
        }
        toString(e = !1) {
          return e
            ? C(this, !0)
            : (this._formatted || (this._formatted = C(this, !1)), this._formatted)
        }
        toJSON() {
          const e = { $mid: 1 }
          return (
            this._fsPath && ((e.fsPath = this._fsPath), (e._sep = h)),
            this._formatted && (e.external = this._formatted),
            this.path && (e.path = this.path),
            this.scheme && (e.scheme = this.scheme),
            this.authority && (e.authority = this.authority),
            this.query && (e.query = this.query),
            this.fragment && (e.fragment = this.fragment),
            e
          )
        }
      }
      const m = {
        58: '%3A',
        47: '%2F',
        63: '%3F',
        35: '%23',
        91: '%5B',
        93: '%5D',
        64: '%40',
        33: '%21',
        36: '%24',
        38: '%26',
        39: '%27',
        40: '%28',
        41: '%29',
        42: '%2A',
        43: '%2B',
        44: '%2C',
        59: '%3B',
        61: '%3D',
        32: '%20',
      }
      function g(e, t) {
        let n,
          i = -1
        for (let r = 0; r < e.length; r++) {
          const o = e.charCodeAt(r)
          if (
            (o >= 97 && o <= 122) ||
            (o >= 65 && o <= 90) ||
            (o >= 48 && o <= 57) ||
            45 === o ||
            46 === o ||
            95 === o ||
            126 === o ||
            (t && 47 === o)
          )
            -1 !== i && ((n += encodeURIComponent(e.substring(i, r))), (i = -1)),
              void 0 !== n && (n += e.charAt(r))
          else {
            void 0 === n && (n = e.substr(0, r))
            const t = m[o]
            void 0 !== t
              ? (-1 !== i && ((n += encodeURIComponent(e.substring(i, r))), (i = -1)), (n += t))
              : -1 === i && (i = r)
          }
        }
        return -1 !== i && (n += encodeURIComponent(e.substring(i))), void 0 !== n ? n : e
      }
      function p(e) {
        let t
        for (let n = 0; n < e.length; n++) {
          const i = e.charCodeAt(n)
          35 === i || 63 === i
            ? (void 0 === t && (t = e.substr(0, n)), (t += m[i]))
            : void 0 !== t && (t += e[n])
        }
        return void 0 !== t ? t : e
      }
      function _(e, t) {
        let n
        return (
          (n =
            e.authority && e.path.length > 1 && 'file' === e.scheme
              ? `//${e.authority}${e.path}`
              : 47 === e.path.charCodeAt(0) &&
                ((e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90) ||
                  (e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122)) &&
                58 === e.path.charCodeAt(2)
              ? t
                ? e.path.substr(1)
                : e.path[1].toLowerCase() + e.path.substr(2)
              : e.path),
          i.isWindows && (n = n.replace(/\//g, '\\')),
          n
        )
      }
      function C(e, t) {
        const n = t ? p : g
        let i = '',
          { scheme: r, authority: o, path: s, query: a, fragment: l } = e
        if ((r && ((i += r), (i += ':')), (o || 'file' === r) && ((i += u), (i += u)), o)) {
          let e = o.indexOf('@')
          if (-1 !== e) {
            const t = o.substr(0, e)
            ;(o = o.substr(e + 1)),
              (e = t.indexOf(':')),
              -1 === e
                ? (i += n(t, !1))
                : ((i += n(t.substr(0, e), !1)), (i += ':'), (i += n(t.substr(e + 1), !1))),
              (i += '@')
          }
          ;(o = o.toLowerCase()),
            (e = o.indexOf(':')),
            -1 === e ? (i += n(o, !1)) : ((i += n(o.substr(0, e), !1)), (i += o.substr(e)))
        }
        if (s) {
          if (s.length >= 3 && 47 === s.charCodeAt(0) && 58 === s.charCodeAt(2)) {
            const e = s.charCodeAt(1)
            e >= 65 && e <= 90 && (s = `/${String.fromCharCode(e + 32)}:${s.substr(3)}`)
          } else if (s.length >= 2 && 58 === s.charCodeAt(1)) {
            const e = s.charCodeAt(0)
            e >= 65 && e <= 90 && (s = `${String.fromCharCode(e + 32)}:${s.substr(2)}`)
          }
          i += n(s, !0)
        }
        return a && ((i += '?'), (i += n(a, !1))), l && ((i += '#'), (i += t ? l : g(l, !1))), i
      }
      function v(e) {
        try {
          return decodeURIComponent(e)
        } catch (t) {
          return e.length > 3 ? e.substr(0, 3) + v(e.substr(3)) : e
        }
      }
      t.uriToFsPath = _
      const y = /(%[0-9A-Za-z][0-9A-Za-z])+/g
      function b(e) {
        return e.match(y) ? e.replace(y, e => v(e)) : e
      }
    }),
    n(r[34], o([0, 1, 7, 5, 8, 2, 11, 4]), function (e, t, n, i, r, o, s, a) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.create =
          t.SimpleWorkerServer =
          t.SimpleWorkerClient =
          t.logOnceWebWorkerWarning =
            void 0)
      const l = '$initialize'
      let u = !1
      t.logOnceWebWorkerWarning = function (e) {
        !o.isWeb ||
          (u ||
            ((u = !0),
            console.warn(
              'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq',
            )),
          console.warn(e.message))
      }
      class c {
        constructor(e, t, n, i) {
          ;(this.vsWorker = e), (this.req = t), (this.method = n), (this.args = i), (this.type = 0)
        }
      }
      class d {
        constructor(e, t, n, i) {
          ;(this.vsWorker = e), (this.seq = t), (this.res = n), (this.err = i), (this.type = 1)
        }
      }
      class h {
        constructor(e, t, n, i) {
          ;(this.vsWorker = e),
            (this.req = t),
            (this.eventName = n),
            (this.arg = i),
            (this.type = 2)
        }
      }
      class f {
        constructor(e, t, n) {
          ;(this.vsWorker = e), (this.req = t), (this.event = n), (this.type = 3)
        }
      }
      class m {
        constructor(e, t) {
          ;(this.vsWorker = e), (this.req = t), (this.type = 4)
        }
      }
      class g {
        constructor(e) {
          ;(this._workerId = -1),
            (this._handler = e),
            (this._lastSentReq = 0),
            (this._pendingReplies = Object.create(null)),
            (this._pendingEmitters = new Map()),
            (this._pendingEvents = new Map())
        }
        setWorkerId(e) {
          this._workerId = e
        }
        sendMessage(e, t) {
          const n = String(++this._lastSentReq)
          return new Promise((i, r) => {
            ;(this._pendingReplies[n] = { resolve: i, reject: r }),
              this._send(new c(this._workerId, n, e, t))
          })
        }
        listen(e, t) {
          let n = null
          const r = new i.Emitter({
            onFirstListenerAdd: () => {
              ;(n = String(++this._lastSentReq)),
                this._pendingEmitters.set(n, r),
                this._send(new h(this._workerId, n, e, t))
            },
            onLastListenerRemove: () => {
              this._pendingEmitters.delete(n), this._send(new m(this._workerId, n)), (n = null)
            },
          })
          return r.event
        }
        handleMessage(e) {
          !e ||
            !e.vsWorker ||
            (-1 !== this._workerId && e.vsWorker !== this._workerId) ||
            this._handleMessage(e)
        }
        _handleMessage(e) {
          switch (e.type) {
            case 1:
              return this._handleReplyMessage(e)
            case 0:
              return this._handleRequestMessage(e)
            case 2:
              return this._handleSubscribeEventMessage(e)
            case 3:
              return this._handleEventMessage(e)
            case 4:
              return this._handleUnsubscribeEventMessage(e)
          }
        }
        _handleReplyMessage(e) {
          if (!this._pendingReplies[e.seq]) return void console.warn('Got reply to unknown seq')
          let t = this._pendingReplies[e.seq]
          if ((delete this._pendingReplies[e.seq], e.err)) {
            let n = e.err
            return (
              e.err.$isError &&
                ((n = new Error()),
                (n.name = e.err.name),
                (n.message = e.err.message),
                (n.stack = e.err.stack)),
              void t.reject(n)
            )
          }
          t.resolve(e.res)
        }
        _handleRequestMessage(e) {
          let t = e.req
          this._handler.handleMessage(e.method, e.args).then(
            e => {
              this._send(new d(this._workerId, t, e, void 0))
            },
            e => {
              e.detail instanceof Error &&
                (e.detail = (0, n.transformErrorForSerialization)(e.detail)),
                this._send(
                  new d(this._workerId, t, void 0, (0, n.transformErrorForSerialization)(e)),
                )
            },
          )
        }
        _handleSubscribeEventMessage(e) {
          const t = e.req,
            n = this._handler.handleEvent(
              e.eventName,
              e.arg,
            )(e => {
              this._send(new f(this._workerId, t, e))
            })
          this._pendingEvents.set(t, n)
        }
        _handleEventMessage(e) {
          this._pendingEmitters.has(e.req)
            ? this._pendingEmitters.get(e.req).fire(e.event)
            : console.warn('Got event for unknown req')
        }
        _handleUnsubscribeEventMessage(e) {
          this._pendingEvents.has(e.req)
            ? (this._pendingEvents.get(e.req).dispose(), this._pendingEvents.delete(e.req))
            : console.warn('Got unsubscribe for unknown req')
        }
        _send(e) {
          let t = []
          if (0 === e.type)
            for (let n = 0; n < e.args.length; n++)
              e.args[n] instanceof ArrayBuffer && t.push(e.args[n])
          else 1 === e.type && e.res instanceof ArrayBuffer && t.push(e.res)
          this._handler.sendMessage(e, t)
        }
      }
      class p extends r.Disposable {
        constructor(e, t, n) {
          super()
          let i = null
          ;(this._worker = this._register(
            e.create(
              'vs/base/common/worker/simpleWorker',
              e => {
                this._protocol.handleMessage(e)
              },
              e => {
                i && i(e)
              },
            ),
          )),
            (this._protocol = new g({
              sendMessage: (e, t) => {
                this._worker.postMessage(e, t)
              },
              handleMessage: (e, t) => {
                if ('function' != typeof n[e])
                  return Promise.reject(new Error('Missing method ' + e + ' on main thread host.'))
                try {
                  return Promise.resolve(n[e].apply(n, t))
                } catch (e) {
                  return Promise.reject(e)
                }
              },
              handleEvent: (e, t) => {
                if (C(e)) {
                  const i = n[e].call(n, t)
                  if ('function' != typeof i)
                    throw new Error(`Missing dynamic event ${e} on main thread host.`)
                  return i
                }
                if (_(e)) {
                  const t = n[e]
                  if ('function' != typeof t)
                    throw new Error(`Missing event ${e} on main thread host.`)
                  return t
                }
                throw new Error(`Malformed event name ${e}`)
              },
            })),
            this._protocol.setWorkerId(this._worker.getId())
          let r = null
          void 0 !== o.globals.require && 'function' == typeof o.globals.require.getConfig
            ? (r = o.globals.require.getConfig())
            : void 0 !== o.globals.requirejs && (r = o.globals.requirejs.s.contexts._.config)
          const a = s.getAllMethodNames(n)
          this._onModuleLoaded = this._protocol.sendMessage(l, [
            this._worker.getId(),
            JSON.parse(JSON.stringify(r)),
            t,
            a,
          ])
          const u = (e, t) => this._request(e, t),
            c = (e, t) => this._protocol.listen(e, t)
          this._lazyProxy = new Promise((e, n) => {
            ;(i = n),
              this._onModuleLoaded.then(
                t => {
                  e(v(t, u, c))
                },
                e => {
                  n(e), this._onError('Worker failed to load ' + t, e)
                },
              )
          })
        }
        getProxyObject() {
          return this._lazyProxy
        }
        _request(e, t) {
          return new Promise((n, i) => {
            this._onModuleLoaded.then(() => {
              this._protocol.sendMessage(e, t).then(n, i)
            }, i)
          })
        }
        _onError(e, t) {
          console.error(e), console.info(t)
        }
      }
      function _(e) {
        return 'o' === e[0] && 'n' === e[1] && a.isUpperAsciiLetter(e.charCodeAt(2))
      }
      function C(e) {
        return /^onDynamic/.test(e) && a.isUpperAsciiLetter(e.charCodeAt(9))
      }
      function v(e, t, n) {
        const i = e =>
            function () {
              const n = Array.prototype.slice.call(arguments, 0)
              return t(e, n)
            },
          r = e =>
            function (t) {
              return n(e, t)
            }
        let o = {}
        for (const t of e) C(t) ? (o[t] = r(t)) : _(t) ? (o[t] = n(t, void 0)) : (o[t] = i(t))
        return o
      }
      t.SimpleWorkerClient = p
      class y {
        constructor(e, t) {
          ;(this._requestHandlerFactory = t),
            (this._requestHandler = null),
            (this._protocol = new g({
              sendMessage: (t, n) => {
                e(t, n)
              },
              handleMessage: (e, t) => this._handleMessage(e, t),
              handleEvent: (e, t) => this._handleEvent(e, t),
            }))
        }
        onmessage(e) {
          this._protocol.handleMessage(e)
        }
        _handleMessage(e, t) {
          if (e === l) return this.initialize(t[0], t[1], t[2], t[3])
          if (!this._requestHandler || 'function' != typeof this._requestHandler[e])
            return Promise.reject(new Error('Missing requestHandler or method: ' + e))
          try {
            return Promise.resolve(this._requestHandler[e].apply(this._requestHandler, t))
          } catch (e) {
            return Promise.reject(e)
          }
        }
        _handleEvent(e, t) {
          if (!this._requestHandler) throw new Error('Missing requestHandler')
          if (C(e)) {
            const n = this._requestHandler[e].call(this._requestHandler, t)
            if ('function' != typeof n)
              throw new Error(`Missing dynamic event ${e} on request handler.`)
            return n
          }
          if (_(e)) {
            const t = this._requestHandler[e]
            if ('function' != typeof t) throw new Error(`Missing event ${e} on request handler.`)
            return t
          }
          throw new Error(`Malformed event name ${e}`)
        }
        initialize(t, n, i, r) {
          this._protocol.setWorkerId(t)
          const a = v(
            r,
            (e, t) => this._protocol.sendMessage(e, t),
            (e, t) => this._protocol.listen(e, t),
          )
          return this._requestHandlerFactory
            ? ((this._requestHandler = this._requestHandlerFactory(a)),
              Promise.resolve(s.getAllMethodNames(this._requestHandler)))
            : (n &&
                (void 0 !== n.baseUrl && delete n.baseUrl,
                void 0 !== n.paths && void 0 !== n.paths.vs && delete n.paths.vs,
                void 0 !== typeof n.trustedTypesPolicy && delete n.trustedTypesPolicy,
                (n.catchError = !0),
                o.globals.require.config(n)),
              new Promise((t, n) => {
                ;(o.globals.require || e)(
                  [i],
                  e => {
                    ;(this._requestHandler = e.create(a)),
                      this._requestHandler
                        ? t(s.getAllMethodNames(this._requestHandler))
                        : n(new Error('No RequestHandler!'))
                  },
                  n,
                )
              }))
        }
      }
      ;(t.SimpleWorkerServer = y),
        (t.create = function (e) {
          return new y(e, null)
        })
    }),
    n(r[23], o([0, 1, 12]), function (e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.CharacterSet = t.CharacterClassifier = void 0)
      class i {
        constructor(e) {
          let t = (0, n.toUint8)(e)
          ;(this._defaultValue = t),
            (this._asciiMap = i._createAsciiMap(t)),
            (this._map = new Map())
        }
        static _createAsciiMap(e) {
          let t = new Uint8Array(256)
          for (let n = 0; n < 256; n++) t[n] = e
          return t
        }
        set(e, t) {
          let i = (0, n.toUint8)(t)
          e >= 0 && e < 256 ? (this._asciiMap[e] = i) : this._map.set(e, i)
        }
        get(e) {
          return e >= 0 && e < 256 ? this._asciiMap[e] : this._map.get(e) || this._defaultValue
        }
      }
      ;(t.CharacterClassifier = i),
        (t.CharacterSet = class {
          constructor() {
            this._actual = new i(0)
          }
          add(e) {
            this._actual.set(e, 1)
          }
          has(e) {
            return 1 === this._actual.get(e)
          }
        })
    }),
    n(r[3], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.Position = void 0)
      class n {
        constructor(e, t) {
          ;(this.lineNumber = e), (this.column = t)
        }
        with(e = this.lineNumber, t = this.column) {
          return e === this.lineNumber && t === this.column ? this : new n(e, t)
        }
        delta(e = 0, t = 0) {
          return this.with(this.lineNumber + e, this.column + t)
        }
        equals(e) {
          return n.equals(this, e)
        }
        static equals(e, t) {
          return (
            (!e && !t) || (!!e && !!t && e.lineNumber === t.lineNumber && e.column === t.column)
          )
        }
        isBefore(e) {
          return n.isBefore(this, e)
        }
        static isBefore(e, t) {
          return (
            e.lineNumber < t.lineNumber || (!(t.lineNumber < e.lineNumber) && e.column < t.column)
          )
        }
        isBeforeOrEqual(e) {
          return n.isBeforeOrEqual(this, e)
        }
        static isBeforeOrEqual(e, t) {
          return (
            e.lineNumber < t.lineNumber || (!(t.lineNumber < e.lineNumber) && e.column <= t.column)
          )
        }
        static compare(e, t) {
          let n = 0 | e.lineNumber,
            i = 0 | t.lineNumber
          return n === i ? (0 | e.column) - (0 | t.column) : n - i
        }
        clone() {
          return new n(this.lineNumber, this.column)
        }
        toString() {
          return '(' + this.lineNumber + ',' + this.column + ')'
        }
        static lift(e) {
          return new n(e.lineNumber, e.column)
        }
        static isIPosition(e) {
          return e && 'number' == typeof e.lineNumber && 'number' == typeof e.column
        }
      }
      t.Position = n
    }),
    n(r[6], o([0, 1, 3]), function (e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.Range = void 0)
      class i {
        constructor(e, t, n, i) {
          e > n || (e === n && t > i)
            ? ((this.startLineNumber = n),
              (this.startColumn = i),
              (this.endLineNumber = e),
              (this.endColumn = t))
            : ((this.startLineNumber = e),
              (this.startColumn = t),
              (this.endLineNumber = n),
              (this.endColumn = i))
        }
        isEmpty() {
          return i.isEmpty(this)
        }
        static isEmpty(e) {
          return e.startLineNumber === e.endLineNumber && e.startColumn === e.endColumn
        }
        containsPosition(e) {
          return i.containsPosition(this, e)
        }
        static containsPosition(e, t) {
          return !(
            t.lineNumber < e.startLineNumber ||
            t.lineNumber > e.endLineNumber ||
            (t.lineNumber === e.startLineNumber && t.column < e.startColumn) ||
            (t.lineNumber === e.endLineNumber && t.column > e.endColumn)
          )
        }
        containsRange(e) {
          return i.containsRange(this, e)
        }
        static containsRange(e, t) {
          return !(
            t.startLineNumber < e.startLineNumber ||
            t.endLineNumber < e.startLineNumber ||
            t.startLineNumber > e.endLineNumber ||
            t.endLineNumber > e.endLineNumber ||
            (t.startLineNumber === e.startLineNumber && t.startColumn < e.startColumn) ||
            (t.endLineNumber === e.endLineNumber && t.endColumn > e.endColumn)
          )
        }
        strictContainsRange(e) {
          return i.strictContainsRange(this, e)
        }
        static strictContainsRange(e, t) {
          return !(
            t.startLineNumber < e.startLineNumber ||
            t.endLineNumber < e.startLineNumber ||
            t.startLineNumber > e.endLineNumber ||
            t.endLineNumber > e.endLineNumber ||
            (t.startLineNumber === e.startLineNumber && t.startColumn <= e.startColumn) ||
            (t.endLineNumber === e.endLineNumber && t.endColumn >= e.endColumn)
          )
        }
        plusRange(e) {
          return i.plusRange(this, e)
        }
        static plusRange(e, t) {
          let n, r, o, s
          return (
            t.startLineNumber < e.startLineNumber
              ? ((n = t.startLineNumber), (r = t.startColumn))
              : t.startLineNumber === e.startLineNumber
              ? ((n = t.startLineNumber), (r = Math.min(t.startColumn, e.startColumn)))
              : ((n = e.startLineNumber), (r = e.startColumn)),
            t.endLineNumber > e.endLineNumber
              ? ((o = t.endLineNumber), (s = t.endColumn))
              : t.endLineNumber === e.endLineNumber
              ? ((o = t.endLineNumber), (s = Math.max(t.endColumn, e.endColumn)))
              : ((o = e.endLineNumber), (s = e.endColumn)),
            new i(n, r, o, s)
          )
        }
        intersectRanges(e) {
          return i.intersectRanges(this, e)
        }
        static intersectRanges(e, t) {
          let n = e.startLineNumber,
            r = e.startColumn,
            o = e.endLineNumber,
            s = e.endColumn,
            a = t.startLineNumber,
            l = t.startColumn,
            u = t.endLineNumber,
            c = t.endColumn
          return (
            n < a ? ((n = a), (r = l)) : n === a && (r = Math.max(r, l)),
            o > u ? ((o = u), (s = c)) : o === u && (s = Math.min(s, c)),
            n > o || (n === o && r > s) ? null : new i(n, r, o, s)
          )
        }
        equalsRange(e) {
          return i.equalsRange(this, e)
        }
        static equalsRange(e, t) {
          return (
            !!e &&
            !!t &&
            e.startLineNumber === t.startLineNumber &&
            e.startColumn === t.startColumn &&
            e.endLineNumber === t.endLineNumber &&
            e.endColumn === t.endColumn
          )
        }
        getEndPosition() {
          return i.getEndPosition(this)
        }
        static getEndPosition(e) {
          return new n.Position(e.endLineNumber, e.endColumn)
        }
        getStartPosition() {
          return i.getStartPosition(this)
        }
        static getStartPosition(e) {
          return new n.Position(e.startLineNumber, e.startColumn)
        }
        toString() {
          return (
            '[' +
            this.startLineNumber +
            ',' +
            this.startColumn +
            ' -> ' +
            this.endLineNumber +
            ',' +
            this.endColumn +
            ']'
          )
        }
        setEndPosition(e, t) {
          return new i(this.startLineNumber, this.startColumn, e, t)
        }
        setStartPosition(e, t) {
          return new i(e, t, this.endLineNumber, this.endColumn)
        }
        collapseToStart() {
          return i.collapseToStart(this)
        }
        static collapseToStart(e) {
          return new i(e.startLineNumber, e.startColumn, e.startLineNumber, e.startColumn)
        }
        static fromPositions(e, t = e) {
          return new i(e.lineNumber, e.column, t.lineNumber, t.column)
        }
        static lift(e) {
          return e ? new i(e.startLineNumber, e.startColumn, e.endLineNumber, e.endColumn) : null
        }
        static isIRange(e) {
          return (
            e &&
            'number' == typeof e.startLineNumber &&
            'number' == typeof e.startColumn &&
            'number' == typeof e.endLineNumber &&
            'number' == typeof e.endColumn
          )
        }
        static areIntersectingOrTouching(e, t) {
          return !(
            e.endLineNumber < t.startLineNumber ||
            (e.endLineNumber === t.startLineNumber && e.endColumn < t.startColumn) ||
            t.endLineNumber < e.startLineNumber ||
            (t.endLineNumber === e.startLineNumber && t.endColumn < e.startColumn)
          )
        }
        static areIntersecting(e, t) {
          return !(
            e.endLineNumber < t.startLineNumber ||
            (e.endLineNumber === t.startLineNumber && e.endColumn <= t.startColumn) ||
            t.endLineNumber < e.startLineNumber ||
            (t.endLineNumber === e.startLineNumber && t.endColumn <= e.startColumn)
          )
        }
        static compareRangesUsingStarts(e, t) {
          if (e && t) {
            const n = 0 | e.startLineNumber,
              i = 0 | t.startLineNumber
            if (n === i) {
              const n = 0 | e.startColumn,
                i = 0 | t.startColumn
              if (n === i) {
                const n = 0 | e.endLineNumber,
                  i = 0 | t.endLineNumber
                return n === i ? (0 | e.endColumn) - (0 | t.endColumn) : n - i
              }
              return n - i
            }
            return n - i
          }
          return (e ? 1 : 0) - (t ? 1 : 0)
        }
        static compareRangesUsingEnds(e, t) {
          return e.endLineNumber === t.endLineNumber
            ? e.endColumn === t.endColumn
              ? e.startLineNumber === t.startLineNumber
                ? e.startColumn - t.startColumn
                : e.startLineNumber - t.startLineNumber
              : e.endColumn - t.endColumn
            : e.endLineNumber - t.endLineNumber
        }
        static spansMultipleLines(e) {
          return e.endLineNumber > e.startLineNumber
        }
      }
      t.Range = i
    }),
    n(r[24], o([0, 1, 3, 6]), function (e, t, n, i) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.Selection = void 0)
      class r extends i.Range {
        constructor(e, t, n, i) {
          super(e, t, n, i),
            (this.selectionStartLineNumber = e),
            (this.selectionStartColumn = t),
            (this.positionLineNumber = n),
            (this.positionColumn = i)
        }
        toString() {
          return (
            '[' +
            this.selectionStartLineNumber +
            ',' +
            this.selectionStartColumn +
            ' -> ' +
            this.positionLineNumber +
            ',' +
            this.positionColumn +
            ']'
          )
        }
        equalsSelection(e) {
          return r.selectionsEqual(this, e)
        }
        static selectionsEqual(e, t) {
          return (
            e.selectionStartLineNumber === t.selectionStartLineNumber &&
            e.selectionStartColumn === t.selectionStartColumn &&
            e.positionLineNumber === t.positionLineNumber &&
            e.positionColumn === t.positionColumn
          )
        }
        getDirection() {
          return this.selectionStartLineNumber === this.startLineNumber &&
            this.selectionStartColumn === this.startColumn
            ? 0
            : 1
        }
        setEndPosition(e, t) {
          return 0 === this.getDirection()
            ? new r(this.startLineNumber, this.startColumn, e, t)
            : new r(e, t, this.startLineNumber, this.startColumn)
        }
        getPosition() {
          return new n.Position(this.positionLineNumber, this.positionColumn)
        }
        setStartPosition(e, t) {
          return 0 === this.getDirection()
            ? new r(e, t, this.endLineNumber, this.endColumn)
            : new r(this.endLineNumber, this.endColumn, e, t)
        }
        static fromPositions(e, t = e) {
          return new r(e.lineNumber, e.column, t.lineNumber, t.column)
        }
        static liftSelection(e) {
          return new r(
            e.selectionStartLineNumber,
            e.selectionStartColumn,
            e.positionLineNumber,
            e.positionColumn,
          )
        }
        static selectionsArrEqual(e, t) {
          if ((e && !t) || (!e && t)) return !1
          if (!e && !t) return !0
          if (e.length !== t.length) return !1
          for (let n = 0, i = e.length; n < i; n++) if (!this.selectionsEqual(e[n], t[n])) return !1
          return !0
        }
        static isISelection(e) {
          return (
            e &&
            'number' == typeof e.selectionStartLineNumber &&
            'number' == typeof e.selectionStartColumn &&
            'number' == typeof e.positionLineNumber &&
            'number' == typeof e.positionColumn
          )
        }
        static createWithDirection(e, t, n, i, o) {
          return 0 === o ? new r(e, t, n, i) : new r(n, i, e, t)
        }
      }
      t.Selection = r
    }),
    n(r[25], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.TokenizationResult2 = t.TokenizationResult = t.Token = void 0),
        (t.Token = class {
          constructor(e, t, n) {
            ;(this._tokenBrand = void 0),
              (this.offset = 0 | e),
              (this.type = t),
              (this.language = n)
          }
          toString() {
            return '(' + this.offset + ', ' + this.type + ')'
          }
        }),
        (t.TokenizationResult = class {
          constructor(e, t) {
            ;(this._tokenizationResultBrand = void 0), (this.tokens = e), (this.endState = t)
          }
        }),
        (t.TokenizationResult2 = class {
          constructor(e, t) {
            ;(this._tokenizationResult2Brand = void 0), (this.tokens = e), (this.endState = t)
          }
        })
    }),
    n(r[26], o([0, 1, 10, 4]), function (e, t, n, i) {
      'use strict'
      function r(e, t, i, r) {
        return new n.LcsDiff(e, t, i).ComputeDiff(r)
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.DiffComputer = void 0)
      class o {
        constructor(e) {
          const t = [],
            n = []
          for (let i = 0, r = e.length; i < r; i++) (t[i] = u(e[i], 1)), (n[i] = c(e[i], 1))
          ;(this.lines = e), (this._startColumns = t), (this._endColumns = n)
        }
        getElements() {
          const e = []
          for (let t = 0, n = this.lines.length; t < n; t++)
            e[t] = this.lines[t].substring(this._startColumns[t] - 1, this._endColumns[t] - 1)
          return e
        }
        getStrictElement(e) {
          return this.lines[e]
        }
        getStartLineNumber(e) {
          return e + 1
        }
        getEndLineNumber(e) {
          return e + 1
        }
        createCharSequence(e, t, n) {
          const i = [],
            r = [],
            o = []
          let a = 0
          for (let s = t; s <= n; s++) {
            const t = this.lines[s],
              n = e ? this._startColumns[s] : 1,
              l = e ? this._endColumns[s] : t.length + 1
            for (let e = n; e < l; e++)
              (i[a] = t.charCodeAt(e - 1)), (r[a] = s + 1), (o[a] = e), a++
          }
          return new s(i, r, o)
        }
      }
      class s {
        constructor(e, t, n) {
          ;(this._charCodes = e), (this._lineNumbers = t), (this._columns = n)
        }
        getElements() {
          return this._charCodes
        }
        getStartLineNumber(e) {
          return this._lineNumbers[e]
        }
        getStartColumn(e) {
          return this._columns[e]
        }
        getEndLineNumber(e) {
          return this._lineNumbers[e]
        }
        getEndColumn(e) {
          return this._columns[e] + 1
        }
      }
      class a {
        constructor(e, t, n, i, r, o, s, a) {
          ;(this.originalStartLineNumber = e),
            (this.originalStartColumn = t),
            (this.originalEndLineNumber = n),
            (this.originalEndColumn = i),
            (this.modifiedStartLineNumber = r),
            (this.modifiedStartColumn = o),
            (this.modifiedEndLineNumber = s),
            (this.modifiedEndColumn = a)
        }
        static createFromDiffChange(e, t, n) {
          let i, r, o, s, l, u, c, d
          return (
            0 === e.originalLength
              ? ((i = 0), (r = 0), (o = 0), (s = 0))
              : ((i = t.getStartLineNumber(e.originalStart)),
                (r = t.getStartColumn(e.originalStart)),
                (o = t.getEndLineNumber(e.originalStart + e.originalLength - 1)),
                (s = t.getEndColumn(e.originalStart + e.originalLength - 1))),
            0 === e.modifiedLength
              ? ((l = 0), (u = 0), (c = 0), (d = 0))
              : ((l = n.getStartLineNumber(e.modifiedStart)),
                (u = n.getStartColumn(e.modifiedStart)),
                (c = n.getEndLineNumber(e.modifiedStart + e.modifiedLength - 1)),
                (d = n.getEndColumn(e.modifiedStart + e.modifiedLength - 1))),
            new a(i, r, o, s, l, u, c, d)
          )
        }
      }
      class l {
        constructor(e, t, n, i, r) {
          ;(this.originalStartLineNumber = e),
            (this.originalEndLineNumber = t),
            (this.modifiedStartLineNumber = n),
            (this.modifiedEndLineNumber = i),
            (this.charChanges = r)
        }
        static createFromDiffResult(e, t, n, i, o, s, u) {
          let c, d, h, f, m
          if (
            (0 === t.originalLength
              ? ((c = n.getStartLineNumber(t.originalStart) - 1), (d = 0))
              : ((c = n.getStartLineNumber(t.originalStart)),
                (d = n.getEndLineNumber(t.originalStart + t.originalLength - 1))),
            0 === t.modifiedLength
              ? ((h = i.getStartLineNumber(t.modifiedStart) - 1), (f = 0))
              : ((h = i.getStartLineNumber(t.modifiedStart)),
                (f = i.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1))),
            s &&
              t.originalLength > 0 &&
              t.originalLength < 20 &&
              t.modifiedLength > 0 &&
              t.modifiedLength < 20 &&
              o())
          ) {
            const s = n.createCharSequence(
                e,
                t.originalStart,
                t.originalStart + t.originalLength - 1,
              ),
              l = i.createCharSequence(e, t.modifiedStart, t.modifiedStart + t.modifiedLength - 1)
            let c = r(s, l, o, !0).changes
            u &&
              (c = (function (e) {
                if (e.length <= 1) return e
                const t = [e[0]]
                let n = t[0]
                for (let i = 1, r = e.length; i < r; i++) {
                  const r = e[i],
                    o = r.originalStart - (n.originalStart + n.originalLength),
                    s = r.modifiedStart - (n.modifiedStart + n.modifiedLength)
                  Math.min(o, s) < 3
                    ? ((n.originalLength = r.originalStart + r.originalLength - n.originalStart),
                      (n.modifiedLength = r.modifiedStart + r.modifiedLength - n.modifiedStart))
                    : (t.push(r), (n = r))
                }
                return t
              })(c)),
              (m = [])
            for (let e = 0, t = c.length; e < t; e++) m.push(a.createFromDiffChange(c[e], s, l))
          }
          return new l(c, d, h, f, m)
        }
      }
      function u(e, t) {
        const n = i.firstNonWhitespaceIndex(e)
        return -1 === n ? t : n + 1
      }
      function c(e, t) {
        const n = i.lastNonWhitespaceIndex(e)
        return -1 === n ? t : n + 2
      }
      function d(e) {
        if (0 === e) return () => !0
        const t = Date.now()
        return () => Date.now() - t < e
      }
      t.DiffComputer = class {
        constructor(e, t, n) {
          ;(this.shouldComputeCharChanges = n.shouldComputeCharChanges),
            (this.shouldPostProcessCharChanges = n.shouldPostProcessCharChanges),
            (this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace),
            (this.shouldMakePrettyDiff = n.shouldMakePrettyDiff),
            (this.originalLines = e),
            (this.modifiedLines = t),
            (this.original = new o(e)),
            (this.modified = new o(t)),
            (this.continueLineDiff = d(n.maxComputationTime)),
            (this.continueCharDiff = d(
              0 === n.maxComputationTime ? 0 : Math.min(n.maxComputationTime, 5e3),
            ))
        }
        computeDiff() {
          if (1 === this.original.lines.length && 0 === this.original.lines[0].length)
            return 1 === this.modified.lines.length && 0 === this.modified.lines[0].length
              ? { quitEarly: !1, changes: [] }
              : {
                  quitEarly: !1,
                  changes: [
                    {
                      originalStartLineNumber: 1,
                      originalEndLineNumber: 1,
                      modifiedStartLineNumber: 1,
                      modifiedEndLineNumber: this.modified.lines.length,
                      charChanges: [
                        {
                          modifiedEndColumn: 0,
                          modifiedEndLineNumber: 0,
                          modifiedStartColumn: 0,
                          modifiedStartLineNumber: 0,
                          originalEndColumn: 0,
                          originalEndLineNumber: 0,
                          originalStartColumn: 0,
                          originalStartLineNumber: 0,
                        },
                      ],
                    },
                  ],
                }
          if (1 === this.modified.lines.length && 0 === this.modified.lines[0].length)
            return {
              quitEarly: !1,
              changes: [
                {
                  originalStartLineNumber: 1,
                  originalEndLineNumber: this.original.lines.length,
                  modifiedStartLineNumber: 1,
                  modifiedEndLineNumber: 1,
                  charChanges: [
                    {
                      modifiedEndColumn: 0,
                      modifiedEndLineNumber: 0,
                      modifiedStartColumn: 0,
                      modifiedStartLineNumber: 0,
                      originalEndColumn: 0,
                      originalEndLineNumber: 0,
                      originalStartColumn: 0,
                      originalStartLineNumber: 0,
                    },
                  ],
                },
              ],
            }
          const e = r(
              this.original,
              this.modified,
              this.continueLineDiff,
              this.shouldMakePrettyDiff,
            ),
            t = e.changes,
            n = e.quitEarly
          if (this.shouldIgnoreTrimWhitespace) {
            const e = []
            for (let n = 0, i = t.length; n < i; n++)
              e.push(
                l.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  t[n],
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges,
                ),
              )
            return { quitEarly: n, changes: e }
          }
          const i = []
          let o = 0,
            s = 0
          for (let e = -1, n = t.length; e < n; e++) {
            const r = e + 1 < n ? t[e + 1] : null,
              a = r ? r.originalStart : this.originalLines.length,
              d = r ? r.modifiedStart : this.modifiedLines.length
            for (; o < a && s < d; ) {
              const e = this.originalLines[o],
                t = this.modifiedLines[s]
              if (e !== t) {
                {
                  let n = u(e, 1),
                    r = u(t, 1)
                  for (; n > 1 && r > 1 && e.charCodeAt(n - 2) === t.charCodeAt(r - 2); ) n--, r--
                  ;(n > 1 || r > 1) &&
                    this._pushTrimWhitespaceCharChange(i, o + 1, 1, n, s + 1, 1, r)
                }
                {
                  let n = c(e, 1),
                    r = c(t, 1)
                  const a = e.length + 1,
                    l = t.length + 1
                  for (; n < a && r < l && e.charCodeAt(n - 1) === e.charCodeAt(r - 1); ) n++, r++
                  ;(n < a || r < l) &&
                    this._pushTrimWhitespaceCharChange(i, o + 1, n, a, s + 1, r, l)
                }
              }
              o++, s++
            }
            r &&
              (i.push(
                l.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  r,
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges,
                ),
              ),
              (o += r.originalLength),
              (s += r.modifiedLength))
          }
          return { quitEarly: n, changes: i }
        }
        _pushTrimWhitespaceCharChange(e, t, n, i, r, o, s) {
          if (this._mergeTrimWhitespaceCharChange(e, t, n, i, r, o, s)) return
          let u
          this.shouldComputeCharChanges && (u = [new a(t, n, t, i, r, o, r, s)]),
            e.push(new l(t, t, r, r, u))
        }
        _mergeTrimWhitespaceCharChange(e, t, n, i, r, o, s) {
          const l = e.length
          if (0 === l) return !1
          const u = e[l - 1]
          return (
            0 !== u.originalEndLineNumber &&
            0 !== u.modifiedEndLineNumber &&
            u.originalEndLineNumber + 1 === t &&
            u.modifiedEndLineNumber + 1 === r &&
            ((u.originalEndLineNumber = t),
            (u.modifiedEndLineNumber = r),
            this.shouldComputeCharChanges &&
              u.charChanges &&
              u.charChanges.push(new a(t, n, t, i, r, o, r, s)),
            !0)
          )
        }
      }
    }),
    n(r[27], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.getWordAtText =
          t.ensureValidWordDefinition =
          t.DEFAULT_WORD_REGEXP =
          t.USUAL_WORD_SEPARATORS =
            void 0),
        (t.USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'),
        (t.DEFAULT_WORD_REGEXP = (function (e = '') {
          let n = '(-?\\d*\\.\\d\\w*)|([^'
          for (const i of t.USUAL_WORD_SEPARATORS) e.indexOf(i) >= 0 || (n += '\\' + i)
          return (n += '\\s]+)'), new RegExp(n, 'g')
        })()),
        (t.ensureValidWordDefinition = function (e) {
          let n = t.DEFAULT_WORD_REGEXP
          if (e && e instanceof RegExp)
            if (e.global) n = e
            else {
              let t = 'g'
              e.ignoreCase && (t += 'i'),
                e.multiline && (t += 'm'),
                e.unicode && (t += 'u'),
                (n = new RegExp(e.source, t))
            }
          return (n.lastIndex = 0), n
        })
      const n = { maxLen: 1e3, windowSize: 15, timeBudget: 150 }
      function i(e, t, n, i) {
        let r
        for (; (r = e.exec(t)); ) {
          const t = r.index || 0
          if (t <= n && e.lastIndex >= n) return r
          if (i > 0 && t > i) return null
        }
        return null
      }
      t.getWordAtText = function e(t, r, o, s, a = n) {
        if (o.length > a.maxLen) {
          let n = t - a.maxLen / 2
          return n < 0 ? (n = 0) : (s += n), e(t, r, (o = o.substring(n, t + a.maxLen / 2)), s, a)
        }
        const l = Date.now(),
          u = t - 1 - s
        let c = -1,
          d = null
        for (let e = 1; !(Date.now() - l >= a.timeBudget); e++) {
          const t = u - a.windowSize * e
          r.lastIndex = Math.max(0, t)
          const n = i(r, o, u, c)
          if ((!n && d) || ((d = n), t <= 0)) break
          c = t
        }
        if (d) {
          let e = {
            word: d[0],
            startColumn: s + 1 + d.index,
            endColumn: s + 1 + d.index + d[0].length,
          }
          return (r.lastIndex = 0), e
        }
        return null
      }
    }),
    n(r[28], o([0, 1, 23]), function (e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.computeLinks = t.LinkComputer = t.StateMachine = t.Uint8Matrix = void 0)
      class i {
        constructor(e, t, n) {
          const i = new Uint8Array(e * t)
          for (let r = 0, o = e * t; r < o; r++) i[r] = n
          ;(this._data = i), (this.rows = e), (this.cols = t)
        }
        get(e, t) {
          return this._data[e * this.cols + t]
        }
        set(e, t, n) {
          this._data[e * this.cols + t] = n
        }
      }
      t.Uint8Matrix = i
      class r {
        constructor(e) {
          let t = 0,
            n = 0
          for (let i = 0, r = e.length; i < r; i++) {
            let [r, o, s] = e[i]
            o > t && (t = o), r > n && (n = r), s > n && (n = s)
          }
          t++, n++
          let r = new i(n, t, 0)
          for (let t = 0, n = e.length; t < n; t++) {
            let [n, i, o] = e[t]
            r.set(n, i, o)
          }
          ;(this._states = r), (this._maxCharCode = t)
        }
        nextState(e, t) {
          return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t)
        }
      }
      t.StateMachine = r
      let o = null,
        s = null
      class a {
        static _createLink(e, t, n, i, r) {
          let o = r - 1
          do {
            const n = t.charCodeAt(o)
            if (2 !== e.get(n)) break
            o--
          } while (o > i)
          if (i > 0) {
            const e = t.charCodeAt(i - 1),
              n = t.charCodeAt(o)
            ;((40 === e && 41 === n) || (91 === e && 93 === n) || (123 === e && 125 === n)) && o--
          }
          return {
            range: { startLineNumber: n, startColumn: i + 1, endLineNumber: n, endColumn: o + 2 },
            url: t.substring(i, o + 1),
          }
        }
        static computeLinks(
          e,
          t = (function () {
            return (
              null === o &&
                (o = new r([
                  [1, 104, 2],
                  [1, 72, 2],
                  [1, 102, 6],
                  [1, 70, 6],
                  [2, 116, 3],
                  [2, 84, 3],
                  [3, 116, 4],
                  [3, 84, 4],
                  [4, 112, 5],
                  [4, 80, 5],
                  [5, 115, 9],
                  [5, 83, 9],
                  [5, 58, 10],
                  [6, 105, 7],
                  [6, 73, 7],
                  [7, 108, 8],
                  [7, 76, 8],
                  [8, 101, 9],
                  [8, 69, 9],
                  [9, 58, 10],
                  [10, 47, 11],
                  [11, 47, 12],
                ])),
              o
            )
          })(),
        ) {
          const i = (function () {
            if (null === s) {
              s = new n.CharacterClassifier(0)
              const e = ' \t<>\'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…'
              for (let t = 0; t < e.length; t++) s.set(e.charCodeAt(t), 1)
              const t = '.,;'
              for (let e = 0; e < t.length; e++) s.set(t.charCodeAt(e), 2)
            }
            return s
          })()
          let l = []
          for (let n = 1, r = e.getLineCount(); n <= r; n++) {
            const r = e.getLineContent(n),
              o = r.length
            let s = 0,
              u = 0,
              c = 0,
              d = 1,
              h = !1,
              f = !1,
              m = !1,
              g = !1
            for (; s < o; ) {
              let e = !1
              const o = r.charCodeAt(s)
              if (13 === d) {
                let t
                switch (o) {
                  case 40:
                    ;(h = !0), (t = 0)
                    break
                  case 41:
                    t = h ? 0 : 1
                    break
                  case 91:
                    ;(m = !0), (f = !0), (t = 0)
                    break
                  case 93:
                    ;(m = !1), (t = f ? 0 : 1)
                    break
                  case 123:
                    ;(g = !0), (t = 0)
                    break
                  case 125:
                    t = g ? 0 : 1
                    break
                  case 39:
                    t = 34 === c || 96 === c ? 0 : 1
                    break
                  case 34:
                    t = 39 === c || 96 === c ? 0 : 1
                    break
                  case 96:
                    t = 39 === c || 34 === c ? 0 : 1
                    break
                  case 42:
                    t = 42 === c ? 1 : 0
                    break
                  case 124:
                    t = 124 === c ? 1 : 0
                    break
                  case 32:
                    t = m ? 0 : 1
                    break
                  default:
                    t = i.get(o)
                }
                1 === t && (l.push(a._createLink(i, r, n, u, s)), (e = !0))
              } else if (12 === d) {
                let t
                91 === o ? ((f = !0), (t = 0)) : (t = i.get(o)), 1 === t ? (e = !0) : (d = 13)
              } else (d = t.nextState(d, o)), 0 === d && (e = !0)
              e && ((d = 1), (h = !1), (f = !1), (g = !1), (u = s + 1), (c = o)), s++
            }
            13 === d && l.push(a._createLink(i, r, n, u, o))
          }
          return l
        }
      }
      ;(t.LinkComputer = a),
        (t.computeLinks = function (e) {
          return e && 'function' == typeof e.getLineCount && 'function' == typeof e.getLineContent
            ? a.computeLinks(e)
            : []
        })
    }),
    n(r[29], o([0, 1]), function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.BasicInplaceReplace = void 0)
      class n {
        constructor() {
          this._defaultValueSet = [
            ['true', 'false'],
            ['True', 'False'],
            ['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'],
            ['public', 'protected', 'private'],
          ]
        }
        navigateValueSet(e, t, n, i, r) {
          if (e && t) {
            let n = this.doNavigateValueSet(t, r)
            if (n) return { range: e, value: n }
          }
          if (n && i) {
            let e = this.doNavigateValueSet(i, r)
            if (e) return { range: n, value: e }
          }
          return null
        }
        doNavigateValueSet(e, t) {
          let n = this.numberReplace(e, t)
          return null !== n ? n : this.textReplace(e, t)
        }
        numberReplace(e, t) {
          let n = Math.pow(10, e.length - (e.lastIndexOf('.') + 1)),
            i = Number(e),
            r = parseFloat(e)
          return isNaN(i) || isNaN(r) || i !== r
            ? null
            : 0 !== i || t
            ? ((i = Math.floor(i * n)), (i += t ? n : -n), String(i / n))
            : null
        }
        textReplace(e, t) {
          return this.valueSetsReplace(this._defaultValueSet, e, t)
        }
        valueSetsReplace(e, t, n) {
          let i = null
          for (let r = 0, o = e.length; null === i && r < o; r++)
            i = this.valueSetReplace(e[r], t, n)
          return i
        }
        valueSetReplace(e, t, n) {
          let i = e.indexOf(t)
          return i >= 0
            ? ((i += n ? 1 : -1), i < 0 ? (i = e.length - 1) : (i %= e.length), e[i])
            : null
        }
      }
      ;(t.BasicInplaceReplace = n), (n.INSTANCE = new n())
    }),
    n(r[30], o([0, 1]), function (e, t) {
      'use strict'
      var n
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.WrappingIndent =
          t.TrackedRangeStickiness =
          t.TextEditorCursorStyle =
          t.TextEditorCursorBlinkingStyle =
          t.SymbolTag =
          t.SymbolKind =
          t.SignatureHelpTriggerKind =
          t.SelectionDirection =
          t.ScrollbarVisibility =
          t.ScrollType =
          t.RenderMinimap =
          t.RenderLineNumbersType =
          t.OverviewRulerLane =
          t.OverlayWidgetPositionPreference =
          t.MouseTargetType =
          t.MinimapPosition =
          t.MarkerTag =
          t.MarkerSeverity =
          t.KeyCode =
          t.InlineCompletionTriggerKind =
          t.InlayHintKind =
          t.IndentAction =
          t.EndOfLineSequence =
          t.EndOfLinePreference =
          t.EditorOption =
          t.EditorAutoIndentStrategy =
          t.DocumentHighlightKind =
          t.DefaultEndOfLine =
          t.CursorChangeReason =
          t.ContentWidgetPositionPreference =
          t.CompletionTriggerKind =
          t.CompletionItemTag =
          t.CompletionItemKind =
          t.CompletionItemInsertTextRule =
          t.AccessibilitySupport =
            void 0),
        ((n = t.AccessibilitySupport || (t.AccessibilitySupport = {}))[(n.Unknown = 0)] =
          'Unknown'),
        (n[(n.Disabled = 1)] = 'Disabled'),
        (n[(n.Enabled = 2)] = 'Enabled'),
        (function (e) {
          ;(e[(e.KeepWhitespace = 1)] = 'KeepWhitespace'),
            (e[(e.InsertAsSnippet = 4)] = 'InsertAsSnippet')
        })(t.CompletionItemInsertTextRule || (t.CompletionItemInsertTextRule = {})),
        (function (e) {
          ;(e[(e.Method = 0)] = 'Method'),
            (e[(e.Function = 1)] = 'Function'),
            (e[(e.Constructor = 2)] = 'Constructor'),
            (e[(e.Field = 3)] = 'Field'),
            (e[(e.Variable = 4)] = 'Variable'),
            (e[(e.Class = 5)] = 'Class'),
            (e[(e.Struct = 6)] = 'Struct'),
            (e[(e.Interface = 7)] = 'Interface'),
            (e[(e.Module = 8)] = 'Module'),
            (e[(e.Property = 9)] = 'Property'),
            (e[(e.Event = 10)] = 'Event'),
            (e[(e.Operator = 11)] = 'Operator'),
            (e[(e.Unit = 12)] = 'Unit'),
            (e[(e.Value = 13)] = 'Value'),
            (e[(e.Constant = 14)] = 'Constant'),
            (e[(e.Enum = 15)] = 'Enum'),
            (e[(e.EnumMember = 16)] = 'EnumMember'),
            (e[(e.Keyword = 17)] = 'Keyword'),
            (e[(e.Text = 18)] = 'Text'),
            (e[(e.Color = 19)] = 'Color'),
            (e[(e.File = 20)] = 'File'),
            (e[(e.Reference = 21)] = 'Reference'),
            (e[(e.Customcolor = 22)] = 'Customcolor'),
            (e[(e.Folder = 23)] = 'Folder'),
            (e[(e.TypeParameter = 24)] = 'TypeParameter'),
            (e[(e.User = 25)] = 'User'),
            (e[(e.Issue = 26)] = 'Issue'),
            (e[(e.Snippet = 27)] = 'Snippet')
        })(t.CompletionItemKind || (t.CompletionItemKind = {})),
        (function (e) {
          e[(e.Deprecated = 1)] = 'Deprecated'
        })(t.CompletionItemTag || (t.CompletionItemTag = {})),
        (function (e) {
          ;(e[(e.Invoke = 0)] = 'Invoke'),
            (e[(e.TriggerCharacter = 1)] = 'TriggerCharacter'),
            (e[(e.TriggerForIncompleteCompletions = 2)] = 'TriggerForIncompleteCompletions')
        })(t.CompletionTriggerKind || (t.CompletionTriggerKind = {})),
        (function (e) {
          ;(e[(e.EXACT = 0)] = 'EXACT'), (e[(e.ABOVE = 1)] = 'ABOVE'), (e[(e.BELOW = 2)] = 'BELOW')
        })(t.ContentWidgetPositionPreference || (t.ContentWidgetPositionPreference = {})),
        (function (e) {
          ;(e[(e.NotSet = 0)] = 'NotSet'),
            (e[(e.ContentFlush = 1)] = 'ContentFlush'),
            (e[(e.RecoverFromMarkers = 2)] = 'RecoverFromMarkers'),
            (e[(e.Explicit = 3)] = 'Explicit'),
            (e[(e.Paste = 4)] = 'Paste'),
            (e[(e.Undo = 5)] = 'Undo'),
            (e[(e.Redo = 6)] = 'Redo')
        })(t.CursorChangeReason || (t.CursorChangeReason = {})),
        (function (e) {
          ;(e[(e.LF = 1)] = 'LF'), (e[(e.CRLF = 2)] = 'CRLF')
        })(t.DefaultEndOfLine || (t.DefaultEndOfLine = {})),
        (function (e) {
          ;(e[(e.Text = 0)] = 'Text'), (e[(e.Read = 1)] = 'Read'), (e[(e.Write = 2)] = 'Write')
        })(t.DocumentHighlightKind || (t.DocumentHighlightKind = {})),
        (function (e) {
          ;(e[(e.None = 0)] = 'None'),
            (e[(e.Keep = 1)] = 'Keep'),
            (e[(e.Brackets = 2)] = 'Brackets'),
            (e[(e.Advanced = 3)] = 'Advanced'),
            (e[(e.Full = 4)] = 'Full')
        })(t.EditorAutoIndentStrategy || (t.EditorAutoIndentStrategy = {})),
        (function (e) {
          ;(e[(e.acceptSuggestionOnCommitCharacter = 0)] = 'acceptSuggestionOnCommitCharacter'),
            (e[(e.acceptSuggestionOnEnter = 1)] = 'acceptSuggestionOnEnter'),
            (e[(e.accessibilitySupport = 2)] = 'accessibilitySupport'),
            (e[(e.accessibilityPageSize = 3)] = 'accessibilityPageSize'),
            (e[(e.ariaLabel = 4)] = 'ariaLabel'),
            (e[(e.autoClosingBrackets = 5)] = 'autoClosingBrackets'),
            (e[(e.autoClosingDelete = 6)] = 'autoClosingDelete'),
            (e[(e.autoClosingOvertype = 7)] = 'autoClosingOvertype'),
            (e[(e.autoClosingQuotes = 8)] = 'autoClosingQuotes'),
            (e[(e.autoIndent = 9)] = 'autoIndent'),
            (e[(e.automaticLayout = 10)] = 'automaticLayout'),
            (e[(e.autoSurround = 11)] = 'autoSurround'),
            (e[(e.bracketPairColorization = 12)] = 'bracketPairColorization'),
            (e[(e.guides = 13)] = 'guides'),
            (e[(e.codeLens = 14)] = 'codeLens'),
            (e[(e.codeLensFontFamily = 15)] = 'codeLensFontFamily'),
            (e[(e.codeLensFontSize = 16)] = 'codeLensFontSize'),
            (e[(e.colorDecorators = 17)] = 'colorDecorators'),
            (e[(e.columnSelection = 18)] = 'columnSelection'),
            (e[(e.comments = 19)] = 'comments'),
            (e[(e.contextmenu = 20)] = 'contextmenu'),
            (e[(e.copyWithSyntaxHighlighting = 21)] = 'copyWithSyntaxHighlighting'),
            (e[(e.cursorBlinking = 22)] = 'cursorBlinking'),
            (e[(e.cursorSmoothCaretAnimation = 23)] = 'cursorSmoothCaretAnimation'),
            (e[(e.cursorStyle = 24)] = 'cursorStyle'),
            (e[(e.cursorSurroundingLines = 25)] = 'cursorSurroundingLines'),
            (e[(e.cursorSurroundingLinesStyle = 26)] = 'cursorSurroundingLinesStyle'),
            (e[(e.cursorWidth = 27)] = 'cursorWidth'),
            (e[(e.disableLayerHinting = 28)] = 'disableLayerHinting'),
            (e[(e.disableMonospaceOptimizations = 29)] = 'disableMonospaceOptimizations'),
            (e[(e.domReadOnly = 30)] = 'domReadOnly'),
            (e[(e.dragAndDrop = 31)] = 'dragAndDrop'),
            (e[(e.emptySelectionClipboard = 32)] = 'emptySelectionClipboard'),
            (e[(e.extraEditorClassName = 33)] = 'extraEditorClassName'),
            (e[(e.fastScrollSensitivity = 34)] = 'fastScrollSensitivity'),
            (e[(e.find = 35)] = 'find'),
            (e[(e.fixedOverflowWidgets = 36)] = 'fixedOverflowWidgets'),
            (e[(e.folding = 37)] = 'folding'),
            (e[(e.foldingStrategy = 38)] = 'foldingStrategy'),
            (e[(e.foldingHighlight = 39)] = 'foldingHighlight'),
            (e[(e.foldingImportsByDefault = 40)] = 'foldingImportsByDefault'),
            (e[(e.unfoldOnClickAfterEndOfLine = 41)] = 'unfoldOnClickAfterEndOfLine'),
            (e[(e.fontFamily = 42)] = 'fontFamily'),
            (e[(e.fontInfo = 43)] = 'fontInfo'),
            (e[(e.fontLigatures = 44)] = 'fontLigatures'),
            (e[(e.fontSize = 45)] = 'fontSize'),
            (e[(e.fontWeight = 46)] = 'fontWeight'),
            (e[(e.formatOnPaste = 47)] = 'formatOnPaste'),
            (e[(e.formatOnType = 48)] = 'formatOnType'),
            (e[(e.glyphMargin = 49)] = 'glyphMargin'),
            (e[(e.gotoLocation = 50)] = 'gotoLocation'),
            (e[(e.hideCursorInOverviewRuler = 51)] = 'hideCursorInOverviewRuler'),
            (e[(e.hover = 52)] = 'hover'),
            (e[(e.inDiffEditor = 53)] = 'inDiffEditor'),
            (e[(e.inlineSuggest = 54)] = 'inlineSuggest'),
            (e[(e.letterSpacing = 55)] = 'letterSpacing'),
            (e[(e.lightbulb = 56)] = 'lightbulb'),
            (e[(e.lineDecorationsWidth = 57)] = 'lineDecorationsWidth'),
            (e[(e.lineHeight = 58)] = 'lineHeight'),
            (e[(e.lineNumbers = 59)] = 'lineNumbers'),
            (e[(e.lineNumbersMinChars = 60)] = 'lineNumbersMinChars'),
            (e[(e.linkedEditing = 61)] = 'linkedEditing'),
            (e[(e.links = 62)] = 'links'),
            (e[(e.matchBrackets = 63)] = 'matchBrackets'),
            (e[(e.minimap = 64)] = 'minimap'),
            (e[(e.mouseStyle = 65)] = 'mouseStyle'),
            (e[(e.mouseWheelScrollSensitivity = 66)] = 'mouseWheelScrollSensitivity'),
            (e[(e.mouseWheelZoom = 67)] = 'mouseWheelZoom'),
            (e[(e.multiCursorMergeOverlapping = 68)] = 'multiCursorMergeOverlapping'),
            (e[(e.multiCursorModifier = 69)] = 'multiCursorModifier'),
            (e[(e.multiCursorPaste = 70)] = 'multiCursorPaste'),
            (e[(e.occurrencesHighlight = 71)] = 'occurrencesHighlight'),
            (e[(e.overviewRulerBorder = 72)] = 'overviewRulerBorder'),
            (e[(e.overviewRulerLanes = 73)] = 'overviewRulerLanes'),
            (e[(e.padding = 74)] = 'padding'),
            (e[(e.parameterHints = 75)] = 'parameterHints'),
            (e[(e.peekWidgetDefaultFocus = 76)] = 'peekWidgetDefaultFocus'),
            (e[(e.definitionLinkOpensInPeek = 77)] = 'definitionLinkOpensInPeek'),
            (e[(e.quickSuggestions = 78)] = 'quickSuggestions'),
            (e[(e.quickSuggestionsDelay = 79)] = 'quickSuggestionsDelay'),
            (e[(e.readOnly = 80)] = 'readOnly'),
            (e[(e.renameOnType = 81)] = 'renameOnType'),
            (e[(e.renderControlCharacters = 82)] = 'renderControlCharacters'),
            (e[(e.renderFinalNewline = 83)] = 'renderFinalNewline'),
            (e[(e.renderLineHighlight = 84)] = 'renderLineHighlight'),
            (e[(e.renderLineHighlightOnlyWhenFocus = 85)] = 'renderLineHighlightOnlyWhenFocus'),
            (e[(e.renderValidationDecorations = 86)] = 'renderValidationDecorations'),
            (e[(e.renderWhitespace = 87)] = 'renderWhitespace'),
            (e[(e.revealHorizontalRightPadding = 88)] = 'revealHorizontalRightPadding'),
            (e[(e.roundedSelection = 89)] = 'roundedSelection'),
            (e[(e.rulers = 90)] = 'rulers'),
            (e[(e.scrollbar = 91)] = 'scrollbar'),
            (e[(e.scrollBeyondLastColumn = 92)] = 'scrollBeyondLastColumn'),
            (e[(e.scrollBeyondLastLine = 93)] = 'scrollBeyondLastLine'),
            (e[(e.scrollPredominantAxis = 94)] = 'scrollPredominantAxis'),
            (e[(e.selectionClipboard = 95)] = 'selectionClipboard'),
            (e[(e.selectionHighlight = 96)] = 'selectionHighlight'),
            (e[(e.selectOnLineNumbers = 97)] = 'selectOnLineNumbers'),
            (e[(e.showFoldingControls = 98)] = 'showFoldingControls'),
            (e[(e.showUnused = 99)] = 'showUnused'),
            (e[(e.snippetSuggestions = 100)] = 'snippetSuggestions'),
            (e[(e.smartSelect = 101)] = 'smartSelect'),
            (e[(e.smoothScrolling = 102)] = 'smoothScrolling'),
            (e[(e.stickyTabStops = 103)] = 'stickyTabStops'),
            (e[(e.stopRenderingLineAfter = 104)] = 'stopRenderingLineAfter'),
            (e[(e.suggest = 105)] = 'suggest'),
            (e[(e.suggestFontSize = 106)] = 'suggestFontSize'),
            (e[(e.suggestLineHeight = 107)] = 'suggestLineHeight'),
            (e[(e.suggestOnTriggerCharacters = 108)] = 'suggestOnTriggerCharacters'),
            (e[(e.suggestSelection = 109)] = 'suggestSelection'),
            (e[(e.tabCompletion = 110)] = 'tabCompletion'),
            (e[(e.tabIndex = 111)] = 'tabIndex'),
            (e[(e.unusualLineTerminators = 112)] = 'unusualLineTerminators'),
            (e[(e.useShadowDOM = 113)] = 'useShadowDOM'),
            (e[(e.useTabStops = 114)] = 'useTabStops'),
            (e[(e.wordSeparators = 115)] = 'wordSeparators'),
            (e[(e.wordWrap = 116)] = 'wordWrap'),
            (e[(e.wordWrapBreakAfterCharacters = 117)] = 'wordWrapBreakAfterCharacters'),
            (e[(e.wordWrapBreakBeforeCharacters = 118)] = 'wordWrapBreakBeforeCharacters'),
            (e[(e.wordWrapColumn = 119)] = 'wordWrapColumn'),
            (e[(e.wordWrapOverride1 = 120)] = 'wordWrapOverride1'),
            (e[(e.wordWrapOverride2 = 121)] = 'wordWrapOverride2'),
            (e[(e.wrappingIndent = 122)] = 'wrappingIndent'),
            (e[(e.wrappingStrategy = 123)] = 'wrappingStrategy'),
            (e[(e.showDeprecated = 124)] = 'showDeprecated'),
            (e[(e.inlayHints = 125)] = 'inlayHints'),
            (e[(e.editorClassName = 126)] = 'editorClassName'),
            (e[(e.pixelRatio = 127)] = 'pixelRatio'),
            (e[(e.tabFocusMode = 128)] = 'tabFocusMode'),
            (e[(e.layoutInfo = 129)] = 'layoutInfo'),
            (e[(e.wrappingInfo = 130)] = 'wrappingInfo')
        })(t.EditorOption || (t.EditorOption = {})),
        (function (e) {
          ;(e[(e.TextDefined = 0)] = 'TextDefined'),
            (e[(e.LF = 1)] = 'LF'),
            (e[(e.CRLF = 2)] = 'CRLF')
        })(t.EndOfLinePreference || (t.EndOfLinePreference = {})),
        (function (e) {
          ;(e[(e.LF = 0)] = 'LF'), (e[(e.CRLF = 1)] = 'CRLF')
        })(t.EndOfLineSequence || (t.EndOfLineSequence = {})),
        (function (e) {
          ;(e[(e.None = 0)] = 'None'),
            (e[(e.Indent = 1)] = 'Indent'),
            (e[(e.IndentOutdent = 2)] = 'IndentOutdent'),
            (e[(e.Outdent = 3)] = 'Outdent')
        })(t.IndentAction || (t.IndentAction = {})),
        (function (e) {
          ;(e[(e.Other = 0)] = 'Other'),
            (e[(e.Type = 1)] = 'Type'),
            (e[(e.Parameter = 2)] = 'Parameter')
        })(t.InlayHintKind || (t.InlayHintKind = {})),
        (function (e) {
          ;(e[(e.Automatic = 0)] = 'Automatic'), (e[(e.Explicit = 1)] = 'Explicit')
        })(t.InlineCompletionTriggerKind || (t.InlineCompletionTriggerKind = {})),
        (function (e) {
          ;(e[(e.DependsOnKbLayout = -1)] = 'DependsOnKbLayout'),
            (e[(e.Unknown = 0)] = 'Unknown'),
            (e[(e.Backspace = 1)] = 'Backspace'),
            (e[(e.Tab = 2)] = 'Tab'),
            (e[(e.Enter = 3)] = 'Enter'),
            (e[(e.Shift = 4)] = 'Shift'),
            (e[(e.Ctrl = 5)] = 'Ctrl'),
            (e[(e.Alt = 6)] = 'Alt'),
            (e[(e.PauseBreak = 7)] = 'PauseBreak'),
            (e[(e.CapsLock = 8)] = 'CapsLock'),
            (e[(e.Escape = 9)] = 'Escape'),
            (e[(e.Space = 10)] = 'Space'),
            (e[(e.PageUp = 11)] = 'PageUp'),
            (e[(e.PageDown = 12)] = 'PageDown'),
            (e[(e.End = 13)] = 'End'),
            (e[(e.Home = 14)] = 'Home'),
            (e[(e.LeftArrow = 15)] = 'LeftArrow'),
            (e[(e.UpArrow = 16)] = 'UpArrow'),
            (e[(e.RightArrow = 17)] = 'RightArrow'),
            (e[(e.DownArrow = 18)] = 'DownArrow'),
            (e[(e.Insert = 19)] = 'Insert'),
            (e[(e.Delete = 20)] = 'Delete'),
            (e[(e.Digit0 = 21)] = 'Digit0'),
            (e[(e.Digit1 = 22)] = 'Digit1'),
            (e[(e.Digit2 = 23)] = 'Digit2'),
            (e[(e.Digit3 = 24)] = 'Digit3'),
            (e[(e.Digit4 = 25)] = 'Digit4'),
            (e[(e.Digit5 = 26)] = 'Digit5'),
            (e[(e.Digit6 = 27)] = 'Digit6'),
            (e[(e.Digit7 = 28)] = 'Digit7'),
            (e[(e.Digit8 = 29)] = 'Digit8'),
            (e[(e.Digit9 = 30)] = 'Digit9'),
            (e[(e.KeyA = 31)] = 'KeyA'),
            (e[(e.KeyB = 32)] = 'KeyB'),
            (e[(e.KeyC = 33)] = 'KeyC'),
            (e[(e.KeyD = 34)] = 'KeyD'),
            (e[(e.KeyE = 35)] = 'KeyE'),
            (e[(e.KeyF = 36)] = 'KeyF'),
            (e[(e.KeyG = 37)] = 'KeyG'),
            (e[(e.KeyH = 38)] = 'KeyH'),
            (e[(e.KeyI = 39)] = 'KeyI'),
            (e[(e.KeyJ = 40)] = 'KeyJ'),
            (e[(e.KeyK = 41)] = 'KeyK'),
            (e[(e.KeyL = 42)] = 'KeyL'),
            (e[(e.KeyM = 43)] = 'KeyM'),
            (e[(e.KeyN = 44)] = 'KeyN'),
            (e[(e.KeyO = 45)] = 'KeyO'),
            (e[(e.KeyP = 46)] = 'KeyP'),
            (e[(e.KeyQ = 47)] = 'KeyQ'),
            (e[(e.KeyR = 48)] = 'KeyR'),
            (e[(e.KeyS = 49)] = 'KeyS'),
            (e[(e.KeyT = 50)] = 'KeyT'),
            (e[(e.KeyU = 51)] = 'KeyU'),
            (e[(e.KeyV = 52)] = 'KeyV'),
            (e[(e.KeyW = 53)] = 'KeyW'),
            (e[(e.KeyX = 54)] = 'KeyX'),
            (e[(e.KeyY = 55)] = 'KeyY'),
            (e[(e.KeyZ = 56)] = 'KeyZ'),
            (e[(e.Meta = 57)] = 'Meta'),
            (e[(e.ContextMenu = 58)] = 'ContextMenu'),
            (e[(e.F1 = 59)] = 'F1'),
            (e[(e.F2 = 60)] = 'F2'),
            (e[(e.F3 = 61)] = 'F3'),
            (e[(e.F4 = 62)] = 'F4'),
            (e[(e.F5 = 63)] = 'F5'),
            (e[(e.F6 = 64)] = 'F6'),
            (e[(e.F7 = 65)] = 'F7'),
            (e[(e.F8 = 66)] = 'F8'),
            (e[(e.F9 = 67)] = 'F9'),
            (e[(e.F10 = 68)] = 'F10'),
            (e[(e.F11 = 69)] = 'F11'),
            (e[(e.F12 = 70)] = 'F12'),
            (e[(e.F13 = 71)] = 'F13'),
            (e[(e.F14 = 72)] = 'F14'),
            (e[(e.F15 = 73)] = 'F15'),
            (e[(e.F16 = 74)] = 'F16'),
            (e[(e.F17 = 75)] = 'F17'),
            (e[(e.F18 = 76)] = 'F18'),
            (e[(e.F19 = 77)] = 'F19'),
            (e[(e.NumLock = 78)] = 'NumLock'),
            (e[(e.ScrollLock = 79)] = 'ScrollLock'),
            (e[(e.Semicolon = 80)] = 'Semicolon'),
            (e[(e.Equal = 81)] = 'Equal'),
            (e[(e.Comma = 82)] = 'Comma'),
            (e[(e.Minus = 83)] = 'Minus'),
            (e[(e.Period = 84)] = 'Period'),
            (e[(e.Slash = 85)] = 'Slash'),
            (e[(e.Backquote = 86)] = 'Backquote'),
            (e[(e.BracketLeft = 87)] = 'BracketLeft'),
            (e[(e.Backslash = 88)] = 'Backslash'),
            (e[(e.BracketRight = 89)] = 'BracketRight'),
            (e[(e.Quote = 90)] = 'Quote'),
            (e[(e.OEM_8 = 91)] = 'OEM_8'),
            (e[(e.IntlBackslash = 92)] = 'IntlBackslash'),
            (e[(e.Numpad0 = 93)] = 'Numpad0'),
            (e[(e.Numpad1 = 94)] = 'Numpad1'),
            (e[(e.Numpad2 = 95)] = 'Numpad2'),
            (e[(e.Numpad3 = 96)] = 'Numpad3'),
            (e[(e.Numpad4 = 97)] = 'Numpad4'),
            (e[(e.Numpad5 = 98)] = 'Numpad5'),
            (e[(e.Numpad6 = 99)] = 'Numpad6'),
            (e[(e.Numpad7 = 100)] = 'Numpad7'),
            (e[(e.Numpad8 = 101)] = 'Numpad8'),
            (e[(e.Numpad9 = 102)] = 'Numpad9'),
            (e[(e.NumpadMultiply = 103)] = 'NumpadMultiply'),
            (e[(e.NumpadAdd = 104)] = 'NumpadAdd'),
            (e[(e.NUMPAD_SEPARATOR = 105)] = 'NUMPAD_SEPARATOR'),
            (e[(e.NumpadSubtract = 106)] = 'NumpadSubtract'),
            (e[(e.NumpadDecimal = 107)] = 'NumpadDecimal'),
            (e[(e.NumpadDivide = 108)] = 'NumpadDivide'),
            (e[(e.KEY_IN_COMPOSITION = 109)] = 'KEY_IN_COMPOSITION'),
            (e[(e.ABNT_C1 = 110)] = 'ABNT_C1'),
            (e[(e.ABNT_C2 = 111)] = 'ABNT_C2'),
            (e[(e.AudioVolumeMute = 112)] = 'AudioVolumeMute'),
            (e[(e.AudioVolumeUp = 113)] = 'AudioVolumeUp'),
            (e[(e.AudioVolumeDown = 114)] = 'AudioVolumeDown'),
            (e[(e.BrowserSearch = 115)] = 'BrowserSearch'),
            (e[(e.BrowserHome = 116)] = 'BrowserHome'),
            (e[(e.BrowserBack = 117)] = 'BrowserBack'),
            (e[(e.BrowserForward = 118)] = 'BrowserForward'),
            (e[(e.MediaTrackNext = 119)] = 'MediaTrackNext'),
            (e[(e.MediaTrackPrevious = 120)] = 'MediaTrackPrevious'),
            (e[(e.MediaStop = 121)] = 'MediaStop'),
            (e[(e.MediaPlayPause = 122)] = 'MediaPlayPause'),
            (e[(e.LaunchMediaPlayer = 123)] = 'LaunchMediaPlayer'),
            (e[(e.LaunchMail = 124)] = 'LaunchMail'),
            (e[(e.LaunchApp2 = 125)] = 'LaunchApp2'),
            (e[(e.MAX_VALUE = 126)] = 'MAX_VALUE')
        })(t.KeyCode || (t.KeyCode = {})),
        (function (e) {
          ;(e[(e.Hint = 1)] = 'Hint'),
            (e[(e.Info = 2)] = 'Info'),
            (e[(e.Warning = 4)] = 'Warning'),
            (e[(e.Error = 8)] = 'Error')
        })(t.MarkerSeverity || (t.MarkerSeverity = {})),
        (function (e) {
          ;(e[(e.Unnecessary = 1)] = 'Unnecessary'), (e[(e.Deprecated = 2)] = 'Deprecated')
        })(t.MarkerTag || (t.MarkerTag = {})),
        (function (e) {
          ;(e[(e.Inline = 1)] = 'Inline'), (e[(e.Gutter = 2)] = 'Gutter')
        })(t.MinimapPosition || (t.MinimapPosition = {})),
        (function (e) {
          ;(e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
            (e[(e.TEXTAREA = 1)] = 'TEXTAREA'),
            (e[(e.GUTTER_GLYPH_MARGIN = 2)] = 'GUTTER_GLYPH_MARGIN'),
            (e[(e.GUTTER_LINE_NUMBERS = 3)] = 'GUTTER_LINE_NUMBERS'),
            (e[(e.GUTTER_LINE_DECORATIONS = 4)] = 'GUTTER_LINE_DECORATIONS'),
            (e[(e.GUTTER_VIEW_ZONE = 5)] = 'GUTTER_VIEW_ZONE'),
            (e[(e.CONTENT_TEXT = 6)] = 'CONTENT_TEXT'),
            (e[(e.CONTENT_EMPTY = 7)] = 'CONTENT_EMPTY'),
            (e[(e.CONTENT_VIEW_ZONE = 8)] = 'CONTENT_VIEW_ZONE'),
            (e[(e.CONTENT_WIDGET = 9)] = 'CONTENT_WIDGET'),
            (e[(e.OVERVIEW_RULER = 10)] = 'OVERVIEW_RULER'),
            (e[(e.SCROLLBAR = 11)] = 'SCROLLBAR'),
            (e[(e.OVERLAY_WIDGET = 12)] = 'OVERLAY_WIDGET'),
            (e[(e.OUTSIDE_EDITOR = 13)] = 'OUTSIDE_EDITOR')
        })(t.MouseTargetType || (t.MouseTargetType = {})),
        (function (e) {
          ;(e[(e.TOP_RIGHT_CORNER = 0)] = 'TOP_RIGHT_CORNER'),
            (e[(e.BOTTOM_RIGHT_CORNER = 1)] = 'BOTTOM_RIGHT_CORNER'),
            (e[(e.TOP_CENTER = 2)] = 'TOP_CENTER')
        })(t.OverlayWidgetPositionPreference || (t.OverlayWidgetPositionPreference = {})),
        (function (e) {
          ;(e[(e.Left = 1)] = 'Left'),
            (e[(e.Center = 2)] = 'Center'),
            (e[(e.Right = 4)] = 'Right'),
            (e[(e.Full = 7)] = 'Full')
        })(t.OverviewRulerLane || (t.OverviewRulerLane = {})),
        (function (e) {
          ;(e[(e.Off = 0)] = 'Off'),
            (e[(e.On = 1)] = 'On'),
            (e[(e.Relative = 2)] = 'Relative'),
            (e[(e.Interval = 3)] = 'Interval'),
            (e[(e.Custom = 4)] = 'Custom')
        })(t.RenderLineNumbersType || (t.RenderLineNumbersType = {})),
        (function (e) {
          ;(e[(e.None = 0)] = 'None'), (e[(e.Text = 1)] = 'Text'), (e[(e.Blocks = 2)] = 'Blocks')
        })(t.RenderMinimap || (t.RenderMinimap = {})),
        (function (e) {
          ;(e[(e.Smooth = 0)] = 'Smooth'), (e[(e.Immediate = 1)] = 'Immediate')
        })(t.ScrollType || (t.ScrollType = {})),
        (function (e) {
          ;(e[(e.Auto = 1)] = 'Auto'),
            (e[(e.Hidden = 2)] = 'Hidden'),
            (e[(e.Visible = 3)] = 'Visible')
        })(t.ScrollbarVisibility || (t.ScrollbarVisibility = {})),
        (function (e) {
          ;(e[(e.LTR = 0)] = 'LTR'), (e[(e.RTL = 1)] = 'RTL')
        })(t.SelectionDirection || (t.SelectionDirection = {})),
        (function (e) {
          ;(e[(e.Invoke = 1)] = 'Invoke'),
            (e[(e.TriggerCharacter = 2)] = 'TriggerCharacter'),
            (e[(e.ContentChange = 3)] = 'ContentChange')
        })(t.SignatureHelpTriggerKind || (t.SignatureHelpTriggerKind = {})),
        (function (e) {
          ;(e[(e.File = 0)] = 'File'),
            (e[(e.Module = 1)] = 'Module'),
            (e[(e.Namespace = 2)] = 'Namespace'),
            (e[(e.Package = 3)] = 'Package'),
            (e[(e.Class = 4)] = 'Class'),
            (e[(e.Method = 5)] = 'Method'),
            (e[(e.Property = 6)] = 'Property'),
            (e[(e.Field = 7)] = 'Field'),
            (e[(e.Constructor = 8)] = 'Constructor'),
            (e[(e.Enum = 9)] = 'Enum'),
            (e[(e.Interface = 10)] = 'Interface'),
            (e[(e.Function = 11)] = 'Function'),
            (e[(e.Variable = 12)] = 'Variable'),
            (e[(e.Constant = 13)] = 'Constant'),
            (e[(e.String = 14)] = 'String'),
            (e[(e.Number = 15)] = 'Number'),
            (e[(e.Boolean = 16)] = 'Boolean'),
            (e[(e.Array = 17)] = 'Array'),
            (e[(e.Object = 18)] = 'Object'),
            (e[(e.Key = 19)] = 'Key'),
            (e[(e.Null = 20)] = 'Null'),
            (e[(e.EnumMember = 21)] = 'EnumMember'),
            (e[(e.Struct = 22)] = 'Struct'),
            (e[(e.Event = 23)] = 'Event'),
            (e[(e.Operator = 24)] = 'Operator'),
            (e[(e.TypeParameter = 25)] = 'TypeParameter')
        })(t.SymbolKind || (t.SymbolKind = {})),
        (function (e) {
          e[(e.Deprecated = 1)] = 'Deprecated'
        })(t.SymbolTag || (t.SymbolTag = {})),
        (function (e) {
          ;(e[(e.Hidden = 0)] = 'Hidden'),
            (e[(e.Blink = 1)] = 'Blink'),
            (e[(e.Smooth = 2)] = 'Smooth'),
            (e[(e.Phase = 3)] = 'Phase'),
            (e[(e.Expand = 4)] = 'Expand'),
            (e[(e.Solid = 5)] = 'Solid')
        })(t.TextEditorCursorBlinkingStyle || (t.TextEditorCursorBlinkingStyle = {})),
        (function (e) {
          ;(e[(e.Line = 1)] = 'Line'),
            (e[(e.Block = 2)] = 'Block'),
            (e[(e.Underline = 3)] = 'Underline'),
            (e[(e.LineThin = 4)] = 'LineThin'),
            (e[(e.BlockOutline = 5)] = 'BlockOutline'),
            (e[(e.UnderlineThin = 6)] = 'UnderlineThin')
        })(t.TextEditorCursorStyle || (t.TextEditorCursorStyle = {})),
        (function (e) {
          ;(e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] = 'AlwaysGrowsWhenTypingAtEdges'),
            (e[(e.NeverGrowsWhenTypingAtEdges = 1)] = 'NeverGrowsWhenTypingAtEdges'),
            (e[(e.GrowsOnlyWhenTypingBefore = 2)] = 'GrowsOnlyWhenTypingBefore'),
            (e[(e.GrowsOnlyWhenTypingAfter = 3)] = 'GrowsOnlyWhenTypingAfter')
        })(t.TrackedRangeStickiness || (t.TrackedRangeStickiness = {})),
        (function (e) {
          ;(e[(e.None = 0)] = 'None'),
            (e[(e.Same = 1)] = 'Same'),
            (e[(e.Indent = 2)] = 'Indent'),
            (e[(e.DeepIndent = 3)] = 'DeepIndent')
        })(t.WrappingIndent || (t.WrappingIndent = {}))
    }),
    n(
      r[31],
      o([0, 1, 21, 5, 17, 13, 3, 6, 24, 25, 30]),
      function (e, t, n, i, r, o, s, a, l, u, c) {
        'use strict'
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.createMonacoBaseAPI = t.KeyMod = void 0)
        class d {
          static chord(e, t) {
            return (0, r.KeyChord)(e, t)
          }
        }
        ;(t.KeyMod = d),
          (d.CtrlCmd = 2048),
          (d.Shift = 1024),
          (d.Alt = 512),
          (d.WinCtrl = 256),
          (t.createMonacoBaseAPI = function () {
            return {
              editor: void 0,
              languages: void 0,
              CancellationTokenSource: n.CancellationTokenSource,
              Emitter: i.Emitter,
              KeyCode: c.KeyCode,
              KeyMod: d,
              Position: s.Position,
              Range: a.Range,
              Selection: l.Selection,
              SelectionDirection: c.SelectionDirection,
              MarkerSeverity: c.MarkerSeverity,
              MarkerTag: c.MarkerTag,
              Uri: o.URI,
              Token: u.Token,
            }
          })
      },
    ),
    n(r[32], o([0, 1, 12]), function (e, t, n) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.PrefixSumComputer = t.PrefixSumIndexOfResult = void 0)
      class i {
        constructor(e, t) {
          ;(this._prefixSumIndexOfResultBrand = void 0), (this.index = e), (this.remainder = t)
        }
      }
      ;(t.PrefixSumIndexOfResult = i),
        (t.PrefixSumComputer = class {
          constructor(e) {
            ;(this.values = e),
              (this.prefixSum = new Uint32Array(e.length)),
              (this.prefixSumValidIndex = new Int32Array(1)),
              (this.prefixSumValidIndex[0] = -1)
          }
          insertValues(e, t) {
            e = (0, n.toUint32)(e)
            const i = this.values,
              r = this.prefixSum,
              o = t.length
            return (
              0 !== o &&
              ((this.values = new Uint32Array(i.length + o)),
              this.values.set(i.subarray(0, e), 0),
              this.values.set(i.subarray(e), e + o),
              this.values.set(t, e),
              e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1),
              (this.prefixSum = new Uint32Array(this.values.length)),
              this.prefixSumValidIndex[0] >= 0 &&
                this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)),
              !0)
            )
          }
          changeValue(e, t) {
            return (
              (e = (0, n.toUint32)(e)),
              (t = (0, n.toUint32)(t)),
              this.values[e] !== t &&
                ((this.values[e] = t),
                e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1),
                !0)
            )
          }
          removeValues(e, t) {
            ;(e = (0, n.toUint32)(e)), (t = (0, n.toUint32)(t))
            const i = this.values,
              r = this.prefixSum
            if (e >= i.length) return !1
            let o = i.length - e
            return (
              t >= o && (t = o),
              0 !== t &&
                ((this.values = new Uint32Array(i.length - t)),
                this.values.set(i.subarray(0, e), 0),
                this.values.set(i.subarray(e + t), e),
                (this.prefixSum = new Uint32Array(this.values.length)),
                e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1),
                this.prefixSumValidIndex[0] >= 0 &&
                  this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)),
                !0)
            )
          }
          getTotalSum() {
            return 0 === this.values.length ? 0 : this._getPrefixSum(this.values.length - 1)
          }
          getPrefixSum(e) {
            return e < 0 ? 0 : ((e = (0, n.toUint32)(e)), this._getPrefixSum(e))
          }
          _getPrefixSum(e) {
            if (e <= this.prefixSumValidIndex[0]) return this.prefixSum[e]
            let t = this.prefixSumValidIndex[0] + 1
            0 === t && ((this.prefixSum[0] = this.values[0]), t++),
              e >= this.values.length && (e = this.values.length - 1)
            for (let n = t; n <= e; n++) this.prefixSum[n] = this.prefixSum[n - 1] + this.values[n]
            return (
              (this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], e)),
              this.prefixSum[e]
            )
          }
          getIndexOf(e) {
            ;(e = Math.floor(e)), this.getTotalSum()
            let t = 0,
              n = this.values.length - 1,
              r = 0,
              o = 0,
              s = 0
            for (; t <= n; )
              if (
                ((r = (t + (n - t) / 2) | 0),
                (o = this.prefixSum[r]),
                (s = o - this.values[r]),
                e < s)
              )
                n = r - 1
              else {
                if (!(e >= o)) break
                t = r + 1
              }
            return new i(r, e - s)
          }
        })
    }),
    n(r[33], o([0, 1, 4, 3, 32]), function (e, t, n, i, r) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.MirrorTextModel = void 0),
        (t.MirrorTextModel = class {
          constructor(e, t, n, i) {
            ;(this._uri = e),
              (this._lines = t),
              (this._eol = n),
              (this._versionId = i),
              (this._lineStarts = null),
              (this._cachedTextValue = null)
          }
          dispose() {
            this._lines.length = 0
          }
          get version() {
            return this._versionId
          }
          getText() {
            return (
              null === this._cachedTextValue &&
                (this._cachedTextValue = this._lines.join(this._eol)),
              this._cachedTextValue
            )
          }
          onEvents(e) {
            e.eol && e.eol !== this._eol && ((this._eol = e.eol), (this._lineStarts = null))
            const t = e.changes
            for (const e of t)
              this._acceptDeleteRange(e.range),
                this._acceptInsertText(
                  new i.Position(e.range.startLineNumber, e.range.startColumn),
                  e.text,
                )
            ;(this._versionId = e.versionId), (this._cachedTextValue = null)
          }
          _ensureLineStarts() {
            if (!this._lineStarts) {
              const e = this._eol.length,
                t = this._lines.length,
                n = new Uint32Array(t)
              for (let i = 0; i < t; i++) n[i] = this._lines[i].length + e
              this._lineStarts = new r.PrefixSumComputer(n)
            }
          }
          _setLineText(e, t) {
            ;(this._lines[e] = t),
              this._lineStarts &&
                this._lineStarts.changeValue(e, this._lines[e].length + this._eol.length)
          }
          _acceptDeleteRange(e) {
            if (e.startLineNumber !== e.endLineNumber)
              this._setLineText(
                e.startLineNumber - 1,
                this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) +
                  this._lines[e.endLineNumber - 1].substring(e.endColumn - 1),
              ),
                this._lines.splice(e.startLineNumber, e.endLineNumber - e.startLineNumber),
                this._lineStarts &&
                  this._lineStarts.removeValues(
                    e.startLineNumber,
                    e.endLineNumber - e.startLineNumber,
                  )
            else {
              if (e.startColumn === e.endColumn) return
              this._setLineText(
                e.startLineNumber - 1,
                this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) +
                  this._lines[e.startLineNumber - 1].substring(e.endColumn - 1),
              )
            }
          }
          _acceptInsertText(e, t) {
            if (0 === t.length) return
            let i = (0, n.splitLines)(t)
            if (1 === i.length)
              return void this._setLineText(
                e.lineNumber - 1,
                this._lines[e.lineNumber - 1].substring(0, e.column - 1) +
                  i[0] +
                  this._lines[e.lineNumber - 1].substring(e.column - 1),
              )
            ;(i[i.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1)),
              this._setLineText(
                e.lineNumber - 1,
                this._lines[e.lineNumber - 1].substring(0, e.column - 1) + i[0],
              )
            let r = new Uint32Array(i.length - 1)
            for (let t = 1; t < i.length; t++)
              this._lines.splice(e.lineNumber + t - 1, 0, i[t]),
                (r[t - 1] = i[t].length + this._eol.length)
            this._lineStarts && this._lineStarts.insertValues(e.lineNumber, r)
          }
        })
    })
  var l =
    (this && this.__awaiter) ||
    function (e, t, n, i) {
      return new (n || (n = Promise))(function (r, o) {
        function s(e) {
          try {
            l(i.next(e))
          } catch (e) {
            o(e)
          }
        }
        function a(e) {
          try {
            l(i.throw(e))
          } catch (e) {
            o(e)
          }
        }
        function l(e) {
          e.done
            ? r(e.value)
            : (function (e) {
                return e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e)
                    })
              })(e.value).then(s, a)
        }
        l((i = i.apply(e, t || [])).next())
      })
    }
  n(
    r[35],
    o([0, 1, 10, 2, 13, 3, 6, 26, 33, 27, 28, 29, 31, 11, 9]),
    function (e, t, n, i, r, o, s, a, u, c, d, h, f, m, g) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.create = t.EditorSimpleWorker = t.MirrorModel = void 0)
      class p extends u.MirrorTextModel {
        get uri() {
          return this._uri
        }
        get eol() {
          return this._eol
        }
        getValue() {
          return this.getText()
        }
        getLinesContent() {
          return this._lines.slice(0)
        }
        getLineCount() {
          return this._lines.length
        }
        getLineContent(e) {
          return this._lines[e - 1]
        }
        getWordAtPosition(e, t) {
          let n = (0, c.getWordAtText)(
            e.column,
            (0, c.ensureValidWordDefinition)(t),
            this._lines[e.lineNumber - 1],
            0,
          )
          return n ? new s.Range(e.lineNumber, n.startColumn, e.lineNumber, n.endColumn) : null
        }
        words(e) {
          const t = this._lines,
            n = this._wordenize.bind(this)
          let i = 0,
            r = '',
            o = 0,
            s = []
          return {
            *[Symbol.iterator]() {
              for (;;)
                if (o < s.length) {
                  const e = r.substring(s[o].start, s[o].end)
                  ;(o += 1), yield e
                } else {
                  if (!(i < t.length)) break
                  ;(r = t[i]), (s = n(r, e)), (o = 0), (i += 1)
                }
            },
          }
        }
        getLineWords(e, t) {
          let n = this._lines[e - 1],
            i = this._wordenize(n, t),
            r = []
          for (const e of i)
            r.push({
              word: n.substring(e.start, e.end),
              startColumn: e.start + 1,
              endColumn: e.end + 1,
            })
          return r
        }
        _wordenize(e, t) {
          const n = []
          let i
          for (t.lastIndex = 0; (i = t.exec(e)) && 0 !== i[0].length; )
            n.push({ start: i.index, end: i.index + i[0].length })
          return n
        }
        getValueInRange(e) {
          if ((e = this._validateRange(e)).startLineNumber === e.endLineNumber)
            return this._lines[e.startLineNumber - 1].substring(e.startColumn - 1, e.endColumn - 1)
          let t = this._eol,
            n = e.startLineNumber - 1,
            i = e.endLineNumber - 1,
            r = []
          r.push(this._lines[n].substring(e.startColumn - 1))
          for (let e = n + 1; e < i; e++) r.push(this._lines[e])
          return r.push(this._lines[i].substring(0, e.endColumn - 1)), r.join(t)
        }
        offsetAt(e) {
          return (
            (e = this._validatePosition(e)),
            this._ensureLineStarts(),
            this._lineStarts.getPrefixSum(e.lineNumber - 2) + (e.column - 1)
          )
        }
        positionAt(e) {
          ;(e = Math.floor(e)), (e = Math.max(0, e)), this._ensureLineStarts()
          let t = this._lineStarts.getIndexOf(e),
            n = this._lines[t.index].length
          return { lineNumber: 1 + t.index, column: 1 + Math.min(t.remainder, n) }
        }
        _validateRange(e) {
          const t = this._validatePosition({
              lineNumber: e.startLineNumber,
              column: e.startColumn,
            }),
            n = this._validatePosition({ lineNumber: e.endLineNumber, column: e.endColumn })
          return t.lineNumber !== e.startLineNumber ||
            t.column !== e.startColumn ||
            n.lineNumber !== e.endLineNumber ||
            n.column !== e.endColumn
            ? {
                startLineNumber: t.lineNumber,
                startColumn: t.column,
                endLineNumber: n.lineNumber,
                endColumn: n.column,
              }
            : e
        }
        _validatePosition(e) {
          if (!o.Position.isIPosition(e)) throw new Error('bad position')
          let { lineNumber: t, column: n } = e,
            i = !1
          if (t < 1) (t = 1), (n = 1), (i = !0)
          else if (t > this._lines.length)
            (t = this._lines.length), (n = this._lines[t - 1].length + 1), (i = !0)
          else {
            let e = this._lines[t - 1].length + 1
            n < 1 ? ((n = 1), (i = !0)) : n > e && ((n = e), (i = !0))
          }
          return i ? { lineNumber: t, column: n } : e
        }
      }
      t.MirrorModel = p
      class _ {
        constructor(e, t) {
          ;(this._host = e),
            (this._models = Object.create(null)),
            (this._foreignModuleFactory = t),
            (this._foreignModule = null)
        }
        dispose() {
          this._models = Object.create(null)
        }
        _getModel(e) {
          return this._models[e]
        }
        _getModels() {
          let e = []
          return Object.keys(this._models).forEach(t => e.push(this._models[t])), e
        }
        acceptNewModel(e) {
          this._models[e.url] = new p(r.URI.parse(e.url), e.lines, e.EOL, e.versionId)
        }
        acceptModelChanged(e, t) {
          this._models[e] && this._models[e].onEvents(t)
        }
        acceptRemovedModel(e) {
          !this._models[e] || delete this._models[e]
        }
        computeDiff(e, t, n, i) {
          return l(this, void 0, void 0, function* () {
            const r = this._getModel(e),
              o = this._getModel(t)
            if (!r || !o) return null
            const s = r.getLinesContent(),
              l = o.getLinesContent(),
              u = new a.DiffComputer(s, l, {
                shouldComputeCharChanges: !0,
                shouldPostProcessCharChanges: !0,
                shouldIgnoreTrimWhitespace: n,
                shouldMakePrettyDiff: !0,
                maxComputationTime: i,
              }).computeDiff(),
              c = !(u.changes.length > 0) && this._modelsAreIdentical(r, o)
            return { quitEarly: u.quitEarly, identical: c, changes: u.changes }
          })
        }
        _modelsAreIdentical(e, t) {
          const n = e.getLineCount()
          if (n !== t.getLineCount()) return !1
          for (let i = 1; i <= n; i++) if (e.getLineContent(i) !== t.getLineContent(i)) return !1
          return !0
        }
        computeMoreMinimalEdits(e, t) {
          return l(this, void 0, void 0, function* () {
            const i = this._getModel(e)
            if (!i) return t
            const r = []
            let o
            t = t
              .slice(0)
              .sort((e, t) =>
                e.range && t.range
                  ? s.Range.compareRangesUsingStarts(e.range, t.range)
                  : (e.range ? 0 : 1) - (t.range ? 0 : 1),
              )
            for (let { range: e, text: a, eol: l } of t) {
              if (('number' == typeof l && (o = l), s.Range.isEmpty(e) && !a)) continue
              const t = i.getValueInRange(e)
              if (((a = a.replace(/\r\n|\n|\r/g, i.eol)), t === a)) continue
              if (Math.max(a.length, t.length) > _._diffLimit) {
                r.push({ range: e, text: a })
                continue
              }
              const u = (0, n.stringDiff)(t, a, !1),
                c = i.offsetAt(s.Range.lift(e).getStartPosition())
              for (const e of u) {
                const t = i.positionAt(c + e.originalStart),
                  n = i.positionAt(c + e.originalStart + e.originalLength),
                  o = {
                    text: a.substr(e.modifiedStart, e.modifiedLength),
                    range: {
                      startLineNumber: t.lineNumber,
                      startColumn: t.column,
                      endLineNumber: n.lineNumber,
                      endColumn: n.column,
                    },
                  }
                i.getValueInRange(o.range) !== o.text && r.push(o)
              }
            }
            return (
              'number' == typeof o &&
                r.push({
                  eol: o,
                  text: '',
                  range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 },
                }),
              r
            )
          })
        }
        computeLinks(e) {
          return l(this, void 0, void 0, function* () {
            let t = this._getModel(e)
            return t ? (0, d.computeLinks)(t) : null
          })
        }
        textualSuggest(e, t, n, i) {
          return l(this, void 0, void 0, function* () {
            const r = new g.StopWatch(!0),
              o = new RegExp(n, i),
              s = new Set()
            e: for (let n of e) {
              const e = this._getModel(n)
              if (e)
                for (let n of e.words(o))
                  if (n !== t && isNaN(Number(n)) && (s.add(n), s.size > _._suggestionsLimit))
                    break e
            }
            return { words: Array.from(s), duration: r.elapsed() }
          })
        }
        computeWordRanges(e, t, n, i) {
          return l(this, void 0, void 0, function* () {
            let r = this._getModel(e)
            if (!r) return Object.create(null)
            const o = new RegExp(n, i),
              s = Object.create(null)
            for (let e = t.startLineNumber; e < t.endLineNumber; e++) {
              let t = r.getLineWords(e, o)
              for (const n of t) {
                if (!isNaN(Number(n.word))) continue
                let t = s[n.word]
                t || ((t = []), (s[n.word] = t)),
                  t.push({
                    startLineNumber: e,
                    startColumn: n.startColumn,
                    endLineNumber: e,
                    endColumn: n.endColumn,
                  })
              }
            }
            return s
          })
        }
        navigateValueSet(e, t, n, i, r) {
          return l(this, void 0, void 0, function* () {
            let o = this._getModel(e)
            if (!o) return null
            let s = new RegExp(i, r)
            t.startColumn === t.endColumn &&
              (t = {
                startLineNumber: t.startLineNumber,
                startColumn: t.startColumn,
                endLineNumber: t.endLineNumber,
                endColumn: t.endColumn + 1,
              })
            let a = o.getValueInRange(t),
              l = o.getWordAtPosition({ lineNumber: t.startLineNumber, column: t.startColumn }, s)
            if (!l) return null
            let u = o.getValueInRange(l)
            return h.BasicInplaceReplace.INSTANCE.navigateValueSet(t, a, l, u, n)
          })
        }
        loadForeignModule(t, n, i) {
          let r = {
            host: m.createProxyObject(i, (e, t) => this._host.fhr(e, t)),
            getMirrorModels: () => this._getModels(),
          }
          return this._foreignModuleFactory
            ? ((this._foreignModule = this._foreignModuleFactory(r, n)),
              Promise.resolve(m.getAllMethodNames(this._foreignModule)))
            : new Promise((i, o) => {
                e(
                  [t],
                  e => {
                    ;(this._foreignModule = e.create(r, n)),
                      i(m.getAllMethodNames(this._foreignModule))
                  },
                  o,
                )
              })
        }
        fmr(e, t) {
          if (!this._foreignModule || 'function' != typeof this._foreignModule[e])
            return Promise.reject(new Error('Missing requestHandler or method: ' + e))
          try {
            return Promise.resolve(this._foreignModule[e].apply(this._foreignModule, t))
          } catch (e) {
            return Promise.reject(e)
          }
        }
      }
      ;(t.EditorSimpleWorker = _),
        (_._diffLimit = 1e5),
        (_._suggestionsLimit = 1e4),
        (t.create = function (e) {
          return new _(e, null)
        }),
        'function' == typeof importScripts && (i.globals.monaco = (0, f.createMonacoBaseAPI)())
    },
  ),
    (function () {
      var e, t
      const n = self.MonacoEnvironment,
        i = n && n.baseUrl ? n.baseUrl : '../../../',
        r =
          'function' ==
          typeof (null === (e = self.trustedTypes) || void 0 === e ? void 0 : e.createPolicy)
            ? null === (t = self.trustedTypes) || void 0 === t
              ? void 0
              : t.createPolicy('amdLoader', {
                  createScriptURL: e => e,
                  createScript: (e, ...t) =>
                    `(function anonymous(${t.slice(0, -1).join(',')}) {\n${t.pop().toString()}\n})`,
                })
            : void 0
      let o = !0,
        s = []
      self.onmessage = e => {
        o
          ? ((o = !1),
            (function (e) {
              new Promise((e, t) => {
                if ('function' == typeof self.define && self.define.amd) return e()
                const n = i + 'vs/loader.js'
                ;(/^((http:)|(https:)|(file:))/.test(n) &&
                  n.substring(0, self.origin.length) !== self.origin) ||
                !(function () {
                  try {
                    return (
                      (r ? self.eval(r.createScript('', 'true')) : new Function('true')).call(self),
                      !0
                    )
                  } catch (e) {
                    return !1
                  }
                })()
                  ? (r ? importScripts(r.createScriptURL(n)) : importScripts(n), e())
                  : fetch(n)
                      .then(e => {
                        if (200 !== e.status) throw new Error(e.statusText)
                        return e.text()
                      })
                      .then(t => {
                        ;(t = `${t}\n//# sourceURL=${n}`),
                          (r ? self.eval(r.createScript('', t)) : new Function(t)).call(self),
                          e()
                      })
                      .then(void 0, t)
              }).then(() => {
                require.config({
                  baseUrl: i,
                  catchError: !0,
                  trustedTypesPolicy: r,
                  amdModulesPattern: /^vs\//,
                }),
                  require([e], function (e) {
                    setTimeout(function () {
                      let t = e.create((e, t) => {
                        self.postMessage(e, t)
                      }, null)
                      for (self.onmessage = e => t.onmessage(e.data, e.ports); s.length > 0; )
                        self.onmessage(s.shift())
                    }, 0)
                  })
              })
            })(e.data))
          : s.push(e)
      }
    })()
}.call(this))
