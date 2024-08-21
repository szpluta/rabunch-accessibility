(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else {
        var a = factory();
        for (var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
    }
})(globalThis, () => {
    return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/regenerator-runtime/runtime.js":
/*!******************************************************!*\
  !*** ../node_modules/regenerator-runtime/runtime.js ***!
  \******************************************************/
/***/ ((module) => {

                    /**
                     * Copyright (c) 2014-present, Facebook, Inc.
                     *
                     * This source code is licensed under the MIT license found in the
                     * LICENSE file in the root directory of this source tree.
                     */

                    var runtime = (function (exports) {
                        "use strict";

                        var Op = Object.prototype;
                        var hasOwn = Op.hasOwnProperty;
                        var defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; };
                        var undefined; // More compressible than void 0.
                        var $Symbol = typeof Symbol === "function" ? Symbol : {};
                        var iteratorSymbol = $Symbol.iterator || "@@iterator";
                        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
                        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

                        function define(obj, key, value) {
                            Object.defineProperty(obj, key, {
                                value: value,
                                enumerable: true,
                                configurable: true,
                                writable: true
                            });
                            return obj[key];
                        }
                        try {
                            // IE 8 has a broken Object.defineProperty that only works on DOM objects.
                            define({}, "");
                        } catch (err) {
                            define = function (obj, key, value) {
                                return obj[key] = value;
                            };
                        }

                        function wrap(innerFn, outerFn, self, tryLocsList) {
                            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
                            var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
                            var generator = Object.create(protoGenerator.prototype);
                            var context = new Context(tryLocsList || []);

                            // The ._invoke method unifies the implementations of the .next,
                            // .throw, and .return methods.
                            defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });

                            return generator;
                        }
                        exports.wrap = wrap;

                        // Try/catch helper to minimize deoptimizations. Returns a completion
                        // record like context.tryEntries[i].completion. This interface could
                        // have been (and was previously) designed to take a closure to be
                        // invoked without arguments, but in all the cases we care about we
                        // already have an existing method we want to call, so there's no need
                        // to create a new function object. We can even get away with assuming
                        // the method takes exactly one argument, since that happens to be true
                        // in every case, so we don't have to touch the arguments object. The
                        // only additional allocation required is the completion record, which
                        // has a stable shape and so hopefully should be cheap to allocate.
                        function tryCatch(fn, obj, arg) {
                            try {
                                return { type: "normal", arg: fn.call(obj, arg) };
                            } catch (err) {
                                return { type: "throw", arg: err };
                            }
                        }

                        var GenStateSuspendedStart = "suspendedStart";
                        var GenStateSuspendedYield = "suspendedYield";
                        var GenStateExecuting = "executing";
                        var GenStateCompleted = "completed";

                        // Returning this object from the innerFn has the same effect as
                        // breaking out of the dispatch switch statement.
                        var ContinueSentinel = {};

                        // Dummy constructor functions that we use as the .constructor and
                        // .constructor.prototype properties for functions that return Generator
                        // objects. For full spec compliance, you may wish to configure your
                        // minifier not to mangle the names of these two functions.
                        function Generator() { }
                        function GeneratorFunction() { }
                        function GeneratorFunctionPrototype() { }

                        // This is a polyfill for %IteratorPrototype% for environments that
                        // don't natively support it.
                        var IteratorPrototype = {};
                        define(IteratorPrototype, iteratorSymbol, function () {
                            return this;
                        });

                        var getProto = Object.getPrototypeOf;
                        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
                        if (NativeIteratorPrototype &&
                            NativeIteratorPrototype !== Op &&
                            hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
                            // This environment has a native %IteratorPrototype%; use it instead
                            // of the polyfill.
                            IteratorPrototype = NativeIteratorPrototype;
                        }

                        var Gp = GeneratorFunctionPrototype.prototype =
                            Generator.prototype = Object.create(IteratorPrototype);
                        GeneratorFunction.prototype = GeneratorFunctionPrototype;
                        defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
                        defineProperty(
                            GeneratorFunctionPrototype,
                            "constructor",
                            { value: GeneratorFunction, configurable: true }
                        );
                        GeneratorFunction.displayName = define(
                            GeneratorFunctionPrototype,
                            toStringTagSymbol,
                            "GeneratorFunction"
                        );

                        // Helper for defining the .next, .throw, and .return methods of the
                        // Iterator interface in terms of a single ._invoke method.
                        function defineIteratorMethods(prototype) {
                            ["next", "throw", "return"].forEach(function (method) {
                                define(prototype, method, function (arg) {
                                    return this._invoke(method, arg);
                                });
                            });
                        }

                        exports.isGeneratorFunction = function (genFun) {
                            var ctor = typeof genFun === "function" && genFun.constructor;
                            return ctor
                                ? ctor === GeneratorFunction ||
                                // For the native GeneratorFunction constructor, the best we can
                                // do is to check its .name property.
                                (ctor.displayName || ctor.name) === "GeneratorFunction"
                                : false;
                        };

                        exports.mark = function (genFun) {
                            if (Object.setPrototypeOf) {
                                Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
                            } else {
                                genFun.__proto__ = GeneratorFunctionPrototype;
                                define(genFun, toStringTagSymbol, "GeneratorFunction");
                            }
                            genFun.prototype = Object.create(Gp);
                            return genFun;
                        };

                        // Within the body of any async function, `await x` is transformed to
                        // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
                        // `hasOwn.call(value, "__await")` to determine if the yielded value is
                        // meant to be awaited.
                        exports.awrap = function (arg) {
                            return { __await: arg };
                        };

                        function AsyncIterator(generator, PromiseImpl) {
                            function invoke(method, arg, resolve, reject) {
                                var record = tryCatch(generator[method], generator, arg);
                                if (record.type === "throw") {
                                    reject(record.arg);
                                } else {
                                    var result = record.arg;
                                    var value = result.value;
                                    if (value &&
                                        typeof value === "object" &&
                                        hasOwn.call(value, "__await")) {
                                        return PromiseImpl.resolve(value.__await).then(function (value) {
                                            invoke("next", value, resolve, reject);
                                        }, function (err) {
                                            invoke("throw", err, resolve, reject);
                                        });
                                    }

                                    return PromiseImpl.resolve(value).then(function (unwrapped) {
                                        // When a yielded Promise is resolved, its final value becomes
                                        // the .value of the Promise<{value,done}> result for the
                                        // current iteration.
                                        result.value = unwrapped;
                                        resolve(result);
                                    }, function (error) {
                                        // If a rejected Promise was yielded, throw the rejection back
                                        // into the async generator function so it can be handled there.
                                        return invoke("throw", error, resolve, reject);
                                    });
                                }
                            }

                            var previousPromise;

                            function enqueue(method, arg) {
                                function callInvokeWithMethodAndArg() {
                                    return new PromiseImpl(function (resolve, reject) {
                                        invoke(method, arg, resolve, reject);
                                    });
                                }

                                return previousPromise =
                                    // If enqueue has been called before, then we want to wait until
                                    // all previous Promises have been resolved before calling invoke,
                                    // so that results are always delivered in the correct order. If
                                    // enqueue has not been called before, then it is important to
                                    // call invoke immediately, without waiting on a callback to fire,
                                    // so that the async generator function has the opportunity to do
                                    // any necessary setup in a predictable way. This predictability
                                    // is why the Promise constructor synchronously invokes its
                                    // executor callback, and why async functions synchronously
                                    // execute code before the first await. Since we implement simple
                                    // async functions in terms of async generators, it is especially
                                    // important to get this right, even though it requires care.
                                    previousPromise ? previousPromise.then(
                                        callInvokeWithMethodAndArg,
                                        // Avoid propagating failures to Promises returned by later
                                        // invocations of the iterator.
                                        callInvokeWithMethodAndArg
                                    ) : callInvokeWithMethodAndArg();
                            }

                            // Define the unified helper method that is used to implement .next,
                            // .throw, and .return (see defineIteratorMethods).
                            defineProperty(this, "_invoke", { value: enqueue });
                        }

                        defineIteratorMethods(AsyncIterator.prototype);
                        define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
                            return this;
                        });
                        exports.AsyncIterator = AsyncIterator;

                        // Note that simple async functions are implemented on top of
                        // AsyncIterator objects; they just return a Promise for the value of
                        // the final result produced by the iterator.
                        exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
                            if (PromiseImpl === void 0) PromiseImpl = Promise;

                            var iter = new AsyncIterator(
                                wrap(innerFn, outerFn, self, tryLocsList),
                                PromiseImpl
                            );

                            return exports.isGeneratorFunction(outerFn)
                                ? iter // If outerFn is a generator, return the full iterator.
                                : iter.next().then(function (result) {
                                    return result.done ? result.value : iter.next();
                                });
                        };

                        function makeInvokeMethod(innerFn, self, context) {
                            var state = GenStateSuspendedStart;

                            return function invoke(method, arg) {
                                if (state === GenStateExecuting) {
                                    throw new Error("Generator is already running");
                                }

                                if (state === GenStateCompleted) {
                                    if (method === "throw") {
                                        throw arg;
                                    }

                                    // Be forgiving, per GeneratorResume behavior specified since ES2015:
                                    // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume
                                    // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume
                                    return doneResult();
                                }

                                context.method = method;
                                context.arg = arg;

                                while (true) {
                                    var delegate = context.delegate;
                                    if (delegate) {
                                        var delegateResult = maybeInvokeDelegate(delegate, context);
                                        if (delegateResult) {
                                            if (delegateResult === ContinueSentinel) continue;
                                            return delegateResult;
                                        }
                                    }

                                    if (context.method === "next") {
                                        // Setting context._sent for legacy support of Babel's
                                        // function.sent implementation.
                                        context.sent = context._sent = context.arg;

                                    } else if (context.method === "throw") {
                                        if (state === GenStateSuspendedStart) {
                                            state = GenStateCompleted;
                                            throw context.arg;
                                        }

                                        context.dispatchException(context.arg);

                                    } else if (context.method === "return") {
                                        context.abrupt("return", context.arg);
                                    }

                                    state = GenStateExecuting;

                                    var record = tryCatch(innerFn, self, context);
                                    if (record.type === "normal") {
                                        // If an exception is thrown from innerFn, we leave state ===
                                        // GenStateExecuting and loop back for another invocation.
                                        state = context.done
                                            ? GenStateCompleted
                                            : GenStateSuspendedYield;

                                        if (record.arg === ContinueSentinel) {
                                            continue;
                                        }

                                        return {
                                            value: record.arg,
                                            done: context.done
                                        };

                                    } else if (record.type === "throw") {
                                        state = GenStateCompleted;
                                        // Dispatch the exception by looping back around to the
                                        // context.dispatchException(context.arg) call above.
                                        context.method = "throw";
                                        context.arg = record.arg;
                                    }
                                }
                            };
                        }

                        // Call delegate.iterator[context.method](context.arg) and handle the
                        // result, either by returning a { value, done } result from the
                        // delegate iterator, or by modifying context.method and context.arg,
                        // setting context.delegate to null, and returning the ContinueSentinel.
                        function maybeInvokeDelegate(delegate, context) {
                            var methodName = context.method;
                            var method = delegate.iterator[methodName];
                            if (method === undefined) {
                                // A .throw or .return when the delegate iterator has no .throw
                                // method, or a missing .next method, always terminate the
                                // yield* loop.
                                context.delegate = null;

                                // Note: ["return"] must be used for ES3 parsing compatibility.
                                if (methodName === "throw" && delegate.iterator["return"]) {
                                    // If the delegate iterator has a return method, give it a
                                    // chance to clean up.
                                    context.method = "return";
                                    context.arg = undefined;
                                    maybeInvokeDelegate(delegate, context);

                                    if (context.method === "throw") {
                                        // If maybeInvokeDelegate(context) changed context.method from
                                        // "return" to "throw", let that override the TypeError below.
                                        return ContinueSentinel;
                                    }
                                }
                                if (methodName !== "return") {
                                    context.method = "throw";
                                    context.arg = new TypeError(
                                        "The iterator does not provide a '" + methodName + "' method");
                                }

                                return ContinueSentinel;
                            }

                            var record = tryCatch(method, delegate.iterator, context.arg);

                            if (record.type === "throw") {
                                context.method = "throw";
                                context.arg = record.arg;
                                context.delegate = null;
                                return ContinueSentinel;
                            }

                            var info = record.arg;

                            if (!info) {
                                context.method = "throw";
                                context.arg = new TypeError("iterator result is not an object");
                                context.delegate = null;
                                return ContinueSentinel;
                            }

                            if (info.done) {
                                // Assign the result of the finished delegate to the temporary
                                // variable specified by delegate.resultName (see delegateYield).
                                context[delegate.resultName] = info.value;

                                // Resume execution at the desired location (see delegateYield).
                                context.next = delegate.nextLoc;

                                // If context.method was "throw" but the delegate handled the
                                // exception, let the outer generator proceed normally. If
                                // context.method was "next", forget context.arg since it has been
                                // "consumed" by the delegate iterator. If context.method was
                                // "return", allow the original .return call to continue in the
                                // outer generator.
                                if (context.method !== "return") {
                                    context.method = "next";
                                    context.arg = undefined;
                                }

                            } else {
                                // Re-yield the result returned by the delegate method.
                                return info;
                            }

                            // The delegate iterator is finished, so forget it and continue with
                            // the outer generator.
                            context.delegate = null;
                            return ContinueSentinel;
                        }

                        // Define Generator.prototype.{next,throw,return} in terms of the
                        // unified ._invoke helper method.
                        defineIteratorMethods(Gp);

                        define(Gp, toStringTagSymbol, "Generator");

                        // A Generator should always return itself as the iterator object when the
                        // @@iterator function is called on it. Some browsers' implementations of the
                        // iterator prototype chain incorrectly implement this, causing the Generator
                        // object to not be returned from this call. This ensures that doesn't happen.
                        // See https://github.com/facebook/regenerator/issues/274 for more details.
                        define(Gp, iteratorSymbol, function () {
                            return this;
                        });

                        define(Gp, "toString", function () {
                            return "[object Generator]";
                        });

                        function pushTryEntry(locs) {
                            var entry = { tryLoc: locs[0] };

                            if (1 in locs) {
                                entry.catchLoc = locs[1];
                            }

                            if (2 in locs) {
                                entry.finallyLoc = locs[2];
                                entry.afterLoc = locs[3];
                            }

                            this.tryEntries.push(entry);
                        }

                        function resetTryEntry(entry) {
                            var record = entry.completion || {};
                            record.type = "normal";
                            delete record.arg;
                            entry.completion = record;
                        }

                        function Context(tryLocsList) {
                            // The root entry object (effectively a try statement without a catch
                            // or a finally block) gives us a place to store values thrown from
                            // locations where there is no enclosing try statement.
                            this.tryEntries = [{ tryLoc: "root" }];
                            tryLocsList.forEach(pushTryEntry, this);
                            this.reset(true);
                        }

                        exports.keys = function (val) {
                            var object = Object(val);
                            var keys = [];
                            for (var key in object) {
                                keys.push(key);
                            }
                            keys.reverse();

                            // Rather than returning an object with a next method, we keep
                            // things simple and return the next function itself.
                            return function next() {
                                while (keys.length) {
                                    var key = keys.pop();
                                    if (key in object) {
                                        next.value = key;
                                        next.done = false;
                                        return next;
                                    }
                                }

                                // To avoid creating an additional object, we just hang the .value
                                // and .done properties off the next function object itself. This
                                // also ensures that the minifier will not anonymize the function.
                                next.done = true;
                                return next;
                            };
                        };

                        function values(iterable) {
                            if (iterable != null) {
                                var iteratorMethod = iterable[iteratorSymbol];
                                if (iteratorMethod) {
                                    return iteratorMethod.call(iterable);
                                }

                                if (typeof iterable.next === "function") {
                                    return iterable;
                                }

                                if (!isNaN(iterable.length)) {
                                    var i = -1, next = function next() {
                                        while (++i < iterable.length) {
                                            if (hasOwn.call(iterable, i)) {
                                                next.value = iterable[i];
                                                next.done = false;
                                                return next;
                                            }
                                        }

                                        next.value = undefined;
                                        next.done = true;

                                        return next;
                                    };

                                    return next.next = next;
                                }
                            }

                            throw new TypeError(typeof iterable + " is not iterable");
                        }
                        exports.values = values;

                        function doneResult() {
                            return { value: undefined, done: true };
                        }

                        Context.prototype = {
                            constructor: Context,

                            reset: function (skipTempReset) {
                                this.prev = 0;
                                this.next = 0;
                                // Resetting context._sent for legacy support of Babel's
                                // function.sent implementation.
                                this.sent = this._sent = undefined;
                                this.done = false;
                                this.delegate = null;

                                this.method = "next";
                                this.arg = undefined;

                                this.tryEntries.forEach(resetTryEntry);

                                if (!skipTempReset) {
                                    for (var name in this) {
                                        // Not sure about the optimal order of these conditions:
                                        if (name.charAt(0) === "t" &&
                                            hasOwn.call(this, name) &&
                                            !isNaN(+name.slice(1))) {
                                            this[name] = undefined;
                                        }
                                    }
                                }
                            },

                            stop: function () {
                                this.done = true;

                                var rootEntry = this.tryEntries[0];
                                var rootRecord = rootEntry.completion;
                                if (rootRecord.type === "throw") {
                                    throw rootRecord.arg;
                                }

                                return this.rval;
                            },

                            dispatchException: function (exception) {
                                if (this.done) {
                                    throw exception;
                                }

                                var context = this;
                                function handle(loc, caught) {
                                    record.type = "throw";
                                    record.arg = exception;
                                    context.next = loc;

                                    if (caught) {
                                        // If the dispatched exception was caught by a catch block,
                                        // then let that catch block handle the exception normally.
                                        context.method = "next";
                                        context.arg = undefined;
                                    }

                                    return !!caught;
                                }

                                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                    var entry = this.tryEntries[i];
                                    var record = entry.completion;

                                    if (entry.tryLoc === "root") {
                                        // Exception thrown outside of any try block that could handle
                                        // it, so set the completion value of the entire function to
                                        // throw the exception.
                                        return handle("end");
                                    }

                                    if (entry.tryLoc <= this.prev) {
                                        var hasCatch = hasOwn.call(entry, "catchLoc");
                                        var hasFinally = hasOwn.call(entry, "finallyLoc");

                                        if (hasCatch && hasFinally) {
                                            if (this.prev < entry.catchLoc) {
                                                return handle(entry.catchLoc, true);
                                            } else if (this.prev < entry.finallyLoc) {
                                                return handle(entry.finallyLoc);
                                            }

                                        } else if (hasCatch) {
                                            if (this.prev < entry.catchLoc) {
                                                return handle(entry.catchLoc, true);
                                            }

                                        } else if (hasFinally) {
                                            if (this.prev < entry.finallyLoc) {
                                                return handle(entry.finallyLoc);
                                            }

                                        } else {
                                            throw new Error("try statement without catch or finally");
                                        }
                                    }
                                }
                            },

                            abrupt: function (type, arg) {
                                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                    var entry = this.tryEntries[i];
                                    if (entry.tryLoc <= this.prev &&
                                        hasOwn.call(entry, "finallyLoc") &&
                                        this.prev < entry.finallyLoc) {
                                        var finallyEntry = entry;
                                        break;
                                    }
                                }

                                if (finallyEntry &&
                                    (type === "break" ||
                                        type === "continue") &&
                                    finallyEntry.tryLoc <= arg &&
                                    arg <= finallyEntry.finallyLoc) {
                                    // Ignore the finally entry if control is not jumping to a
                                    // location outside the try/catch block.
                                    finallyEntry = null;
                                }

                                var record = finallyEntry ? finallyEntry.completion : {};
                                record.type = type;
                                record.arg = arg;

                                if (finallyEntry) {
                                    this.method = "next";
                                    this.next = finallyEntry.finallyLoc;
                                    return ContinueSentinel;
                                }

                                return this.complete(record);
                            },

                            complete: function (record, afterLoc) {
                                if (record.type === "throw") {
                                    throw record.arg;
                                }

                                if (record.type === "break" ||
                                    record.type === "continue") {
                                    this.next = record.arg;
                                } else if (record.type === "return") {
                                    this.rval = this.arg = record.arg;
                                    this.method = "return";
                                    this.next = "end";
                                } else if (record.type === "normal" && afterLoc) {
                                    this.next = afterLoc;
                                }

                                return ContinueSentinel;
                            },

                            finish: function (finallyLoc) {
                                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                    var entry = this.tryEntries[i];
                                    if (entry.finallyLoc === finallyLoc) {
                                        this.complete(entry.completion, entry.afterLoc);
                                        resetTryEntry(entry);
                                        return ContinueSentinel;
                                    }
                                }
                            },

                            "catch": function (tryLoc) {
                                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                                    var entry = this.tryEntries[i];
                                    if (entry.tryLoc === tryLoc) {
                                        var record = entry.completion;
                                        if (record.type === "throw") {
                                            var thrown = record.arg;
                                            resetTryEntry(entry);
                                        }
                                        return thrown;
                                    }
                                }

                                // The context.catch method must only be called with a location
                                // argument that corresponds to a known catch block.
                                throw new Error("illegal catch attempt");
                            },

                            delegateYield: function (iterable, resultName, nextLoc) {
                                this.delegate = {
                                    iterator: values(iterable),
                                    resultName: resultName,
                                    nextLoc: nextLoc
                                };

                                if (this.method === "next") {
                                    // Deliberately forget the last sent value so that we don't
                                    // accidentally pass it on to the delegate.
                                    this.arg = undefined;
                                }

                                return ContinueSentinel;
                            }
                        };

                        // Regardless of whether this script is executing as a CommonJS module
                        // or not, return the runtime object so that we can declare the variable
                        // regeneratorRuntime in the outer scope, which allows this module to be
                        // injected easily by `bin/regenerator --include-runtime script.js`.
                        return exports;

                    }(
                        // If this script is executing as a CommonJS module, use module.exports
                        // as the regeneratorRuntime namespace. Otherwise create a new empty
                        // object. Either way, the resulting object will be used to initialize
                        // the regeneratorRuntime variable at the top of this file.
                        true ? module.exports : 0
                    ));

                    try {
                        regeneratorRuntime = runtime;
                    } catch (accidentalStrictMode) {
                        // This module should not be running in strict mode, so the above
                        // assignment should always work unless something is misconfigured. Just
                        // in case runtime.js accidentally runs in strict mode, in modern engines
                        // we can explicitly access window. In older engines we can escape
                        // strict mode using a global Function call. This could conceivably fail
                        // if a Content Security Policy forbids using Function, but in that case
                        // the proper solution is to fix the accidental strict mode problem. If
                        // you've misconfigured your bundler to force strict mode and applied a
                        // CSP to forbid Function, and you're not willing to fix either of those
                        // problems, please detail your unique predicament in a GitHub issue.
                        if (typeof globalThis === "object") {
                            window.regeneratorRuntime = runtime;
                        } else {
                            Function("r", "regeneratorRuntime = r")(runtime);
                        }
                    }


                    /***/
}),

/***/ "./common.ts":
/*!*******************!*\
  !*** ./common.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    "use strict";
                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Common": () => (/* binding */ Common)
                        /* harmony export */
});

                    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                        return new (P || (P = Promise))(function (resolve, reject) {
                            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                            step((generator = generator.apply(thisArg, _arguments || [])).next());
                        });
                    };
                    class Common {
                        constructor() {
                            this.body = document.body || document.querySelector('body');
                            this.deployedMap = new Map();
                        }
                        isIOS() {
                            if (typeof this._isIOS === 'boolean')
                                return this._isIOS;
                            const isIOS = () => {
                                var iDevices = [
                                    'iPad Simulator',
                                    'iPhone Simulator',
                                    'iPod Simulator',
                                    'iPad',
                                    'iPhone',
                                    'iPod'
                                ];
                                if (!!navigator.platform) {
                                    while (iDevices.length) {
                                        if (navigator.platform === iDevices.pop()) {
                                            return true;
                                        }
                                    }
                                }
                                return false;
                            };
                            this._isIOS = isIOS();
                            return this._isIOS;
                        }
                        jsonToHtml(obj) {
                            let elm = document.createElement(obj.type);
                            for (let i in obj.attrs) {
                                elm.setAttribute(i, obj.attrs[i]);
                            }
                            for (let i in obj.children) {
                                let newElem = null;
                                if (obj.children[i].type === '#text') {
                                    newElem = document.createTextNode(obj.children[i].text);
                                }
                                else
                                    newElem = this.jsonToHtml(obj.children[i]);
                                if ((newElem && newElem.tagName && newElem.tagName.toLowerCase() !== 'undefined') || newElem.nodeType === 3)
                                    elm.appendChild(newElem);
                            }
                            return elm;
                        }
                        injectStyle(css, innerOptions = {}) {
                            let sheet = document.createElement('style');
                            sheet.appendChild(document.createTextNode(css));
                            if (innerOptions.className)
                                sheet.classList.add(innerOptions.className);
                            this.body.appendChild(sheet);
                            return sheet;
                        }
                        getFormattedDim(value) {
                            if (!value)
                                return null;
                            value = String(value);
                            let returnBySuffix = function (val, suffix) {
                                return {
                                    size: val.substring(0, val.indexOf(suffix)),
                                    suffix: suffix
                                };
                            };
                            if (value.indexOf('%') > -1)
                                return returnBySuffix(value, '%');
                            if (value.indexOf('px') > -1)
                                return returnBySuffix(value, 'px');
                            if (value.indexOf('em') > -1)
                                return returnBySuffix(value, 'em');
                            if (value.indexOf('rem') > -1)
                                return returnBySuffix(value, 'rem');
                            if (value.indexOf('pt') > -1)
                                return returnBySuffix(value, 'pt');
                            if (value === 'auto')
                                return returnBySuffix(value, '');
                        }
                        extend(src, dest) {
                            for (let i in src) {
                                if (typeof src[i] === 'object') {
                                    if (dest && dest[i]) {
                                        if (dest[i] instanceof Array)
                                            src[i] = dest[i];
                                        else
                                            src[i] = this.extend(src[i], dest[i]);
                                    }
                                }
                                else if (typeof dest === 'object' && typeof dest[i] !== 'undefined') {
                                    src[i] = dest[i];
                                }
                            }
                            return src;
                        }
                        injectIconsFont(urls, callback) {
                            if (urls && urls.length) {
                                let head = document.getElementsByTagName('head')[0];
                                let counter = 0;
                                let hasErrors = false;
                                let onload = (e) => {
                                    hasErrors = hasErrors || e.type === '';
                                    if (!--counter)
                                        callback(hasErrors);
                                };
                                urls.forEach(url => {
                                    let link = document.createElement('link');
                                    link.type = 'text/css';
                                    link.rel = 'stylesheet';
                                    link.href = url;
                                    link.className = `_access-font-icon-${counter++}`;
                                    link.onload = onload;
                                    link.onerror = onload;
                                    this.deployedObjects.set('.' + link.className, true);
                                    head.appendChild(link);
                                });
                            }
                        }
                        getFixedFont(name) {
                            if (this.isIOS())
                                return name.replaceAll(' ', '+');
                            return name;
                        }
                        getFixedPseudoFont(name) {
                            if (this.isIOS())
                                return name.replaceAll('+', ' ');
                            return name;
                        }
                        isFontLoaded(fontFamily, callback) {
                            try {
                                const onReady = () => {
                                    return callback(document.fonts.check(`1em ${fontFamily.replaceAll('+', ' ')}`));
                                    // return callback(document.fonts.check(`1em ${fontFamily}`));
                                };
                                document.fonts.ready.then(() => {
                                    onReady();
                                }, () => {
                                    onReady();
                                });
                            }
                            catch (e) {
                                return callback(true);
                            }
                        }
                        warn(msg) {
                            let prefix = 'Accessibility: ';
                            if (console.warn)
                                console.warn(prefix + msg);
                            else
                                console.log(prefix + msg);
                        }
                        get deployedObjects() {
                            return {
                                get: (key) => {
                                    return this.deployedMap.get(key);
                                },
                                contains: (key) => {
                                    return this.deployedMap.has(key);
                                },
                                set: (key, val) => {
                                    this.deployedMap.set(key, val);
                                },
                                remove: (key) => {
                                    this.deployedMap.delete(key);
                                },
                                getAll: () => {
                                    return this.deployedMap;
                                }
                            };
                        }
                        createScreenshot(url) {
                            return new Promise((resolve, reject) => {
                                if (!this._canvas)
                                    this._canvas = document.createElement('canvas');
                                const img = new Image();
                                this._canvas.style.position = 'fixed';
                                this._canvas.style.top = '0';
                                this._canvas.style.left = '0';
                                this._canvas.style.opacity = '0.05';
                                this._canvas.style.transform = 'scale(0.05)';
                                img.crossOrigin = 'anonymous';
                                img.onload = () => __awaiter(this, void 0, void 0, function* () {
                                    document.body.appendChild(this._canvas);
                                    const ctx = this._canvas.getContext('2d');
                                    this._canvas.width = img.naturalWidth;
                                    this._canvas.height = img.naturalHeight;
                                    ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
                                    // await this.setTimeout(1500);
                                    ctx.drawImage(img, 0, 0);
                                    let res = Common.DEFAULT_PIXEL;
                                    try {
                                        res = this._canvas.toDataURL('image/png');
                                    }
                                    catch (e) { }
                                    resolve(res);
                                    this._canvas.remove();
                                });
                                img.onerror = () => {
                                    // Return a 1X1 pixels transparent image as a fallback
                                    resolve(Common.DEFAULT_PIXEL);
                                };
                                img.src = url;
                            });
                        }
                        getFileExtension(filename) {
                            return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
                        }
                    }
                    Common.DEFAULT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=';


                    /***/
}),

/***/ "./interfaces/accessibility.interface.ts":
/*!***********************************************!*\
  !*** ./interfaces/accessibility.interface.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    "use strict";
                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccessibilityModulesType": () => (/* binding */ AccessibilityModulesType)
                        /* harmony export */
});
                    var AccessibilityModulesType;
                    (function (AccessibilityModulesType) {
                        AccessibilityModulesType[AccessibilityModulesType["increaseText"] = 1] = "increaseText";
                        AccessibilityModulesType[AccessibilityModulesType["decreaseText"] = 2] = "decreaseText";
                        AccessibilityModulesType[AccessibilityModulesType["increaseTextSpacing"] = 3] = "increaseTextSpacing";
                        AccessibilityModulesType[AccessibilityModulesType["decreaseTextSpacing"] = 4] = "decreaseTextSpacing";
                        AccessibilityModulesType[AccessibilityModulesType["increaseLineHeight"] = 5] = "increaseLineHeight";
                        AccessibilityModulesType[AccessibilityModulesType["decreaseLineHeight"] = 6] = "decreaseLineHeight";
                        AccessibilityModulesType[AccessibilityModulesType["invertColors"] = 7] = "invertColors";
                        AccessibilityModulesType[AccessibilityModulesType["grayHues"] = 8] = "grayHues";
                        AccessibilityModulesType[AccessibilityModulesType["bigCursor"] = 9] = "bigCursor";
                        AccessibilityModulesType[AccessibilityModulesType["readingGuide"] = 10] = "readingGuide";
                        AccessibilityModulesType[AccessibilityModulesType["underlineLinks"] = 11] = "underlineLinks";
                        AccessibilityModulesType[AccessibilityModulesType["textToSpeech"] = 12] = "textToSpeech";
                        AccessibilityModulesType[AccessibilityModulesType["speechToText"] = 13] = "speechToText";
                        AccessibilityModulesType[AccessibilityModulesType["disableAnimations"] = 14] = "disableAnimations";
                        AccessibilityModulesType[AccessibilityModulesType["iframeModals"] = 15] = "iframeModals";
                        AccessibilityModulesType[AccessibilityModulesType["customFunctions"] = 16] = "customFunctions";
                    })(AccessibilityModulesType || (AccessibilityModulesType = {}));


                    /***/
}),

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    "use strict";
                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Accessibility": () => (/* binding */ Accessibility),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                        /* harmony export */
});
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common */ "./common.ts");
/* harmony import */ var _interfaces_accessibility_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interfaces/accessibility.interface */ "./interfaces/accessibility.interface.ts");
/* harmony import */ var _menu_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu-interface */ "./menu-interface.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storage */ "./storage.ts");

                    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                        return new (P || (P = Promise))(function (resolve, reject) {
                            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                            step((generator = generator.apply(thisArg, _arguments || [])).next());
                        });
                    };
                    // Do not delete this as it allows importing the package with other projects





                    class Accessibility {
                        constructor(options = {}) {
                            this._common = new _common__WEBPACK_IMPORTED_MODULE_1__.Common();
                            this._storage = new _storage__WEBPACK_IMPORTED_MODULE_4__.Storage();
                            this._fixedDefaultFont = this._common.getFixedFont("Material Icons");
                            this._options = this.defaultOptions;
                            this.options = this._common.extend(this._options, options);
                            this.addModuleOrderIfNotDefined();
                            this.addDefaultOptions(options);
                            // Consider adding this:
                            // if (options) {
                            //     if (!options.textToSpeechLang && document.querySelector('html').getAttribute('lang')) {
                            //         this.options.textToSpeechLang = document.querySelector('html').getAttribute('lang')
                            //     }
                            // }
                            this.disabledUnsupportedFeatures();
                            this._onKeyDownBind = this.onKeyDown.bind(this);
                            this._sessionState = {
                                textSize: 0,
                                textSpace: 0,
                                lineHeight: 0,
                                invertColors: false,
                                grayHues: false,
                                underlineLinks: false,
                                bigCursor: false,
                                readingGuide: false,
                            };
                            if (this.options.icon.useEmojis) {
                                this.fontFallback();
                                this.build();
                            }
                            else {
                                this._common.injectIconsFont(this.options.icon.fontFaceSrc, (hasError) => {
                                    this.build();
                                    if (this.options.icon.fontFamilyValidation) {
                                        setTimeout(() => {
                                            this._common.isFontLoaded(this.options.icon.fontFamilyValidation, (isLoaded) => {
                                                if (!isLoaded || hasError) {
                                                    console.log("!isLoaded || hasError", !isLoaded || hasError);
                                                    this._common.warn(`${this.options.icon.fontFamilyValidation} font was not loaded, using emojis instead`);
                                                    this.fontFallback();
                                                    this.destroy();
                                                    this.build();
                                                }
                                            });
                                        });
                                    }
                                });
                            }
                            if (this.options.modules.speechToText) {
                                window.addEventListener("beforeunload", () => {
                                    if (this._isReading) {
                                        window.speechSynthesis.cancel();
                                        this._isReading = false;
                                    }
                                });
                            }
                        }
                        get stateValues() {
                            return this._stateValues;
                        }
                        set stateValues(value) {
                            this._stateValues = value;
                        }
                        get html() {
                            return this._html;
                        }
                        get body() {
                            return this._body;
                        }
                        get sessionState() {
                            return this._sessionState;
                        }
                        set sessionState(value) {
                            this._sessionState = value;
                        }
                        get common() {
                            return this._common;
                        }
                        get recognition() {
                            return this._recognition;
                        }
                        get isReading() {
                            return this._isReading;
                        }
                        set isReading(value) {
                            this._isReading = value;
                        }
                        get fixedDefaultFont() {
                            return this._fixedDefaultFont;
                        }
                        // Default options
                        get defaultOptions() {
                            const res = {
                                icon: {
                                    img: "accessibility",
                                    fontFaceSrc: [
                                        "https://fonts.googleapis.com/icon?family=Material+Icons",
                                    ],
                                    fontClass: "material-icons",
                                    useEmojis: false,
                                    closeIcon: "close",
                                    resetIcon: "refresh",
                                },
                                hotkeys: {
                                    enabled: false,
                                    helpTitles: true,
                                    keys: {
                                        toggleMenu: ["ctrlKey", "altKey", 65],
                                        invertColors: ["ctrlKey", "altKey", 73],
                                        grayHues: ["ctrlKey", "altKey", 71],
                                        underlineLinks: ["ctrlKey", "altKey", 85],
                                        bigCursor: ["ctrlKey", "altKey", 67],
                                        readingGuide: ["ctrlKey", "altKey", 82],
                                        textToSpeech: ["ctrlKey", "altKey", 84],
                                        speechToText: ["ctrlKey", "altKey", 83],
                                        disableAnimations: ["ctrlKey", "altKey", 81],
                                    },
                                },
                                guide: {
                                    cBorder: "#20ff69",
                                    cBackground: "#000000",
                                    height: "12px",
                                },
                                suppressCssInjection: false,
                                suppressDomInjection: false,
                                labels: {
                                    resetTitle: "Reset",
                                    closeTitle: "Close",
                                    menuTitle: "Accessibility Options",
                                    increaseText: "increase text size",
                                    decreaseText: "decrease text size",
                                    increaseTextSpacing: "increase text spacing",
                                    decreaseTextSpacing: "decrease text spacing",
                                    invertColors: "invert colors",
                                    grayHues: "gray hues",
                                    bigCursor: "big cursor",
                                    readingGuide: "reading guide",
                                    underlineLinks: "underline links",
                                    textToSpeech: "text to speech",
                                    speechToText: "speech to text",
                                    disableAnimations: "disable animations",
                                    increaseLineHeight: "increase line height",
                                    decreaseLineHeight: "decrease line height",
                                    hotkeyPrefix: "Hotkey: ",
                                },
                                textPixelMode: false,
                                textEmlMode: true,
                                animations: {
                                    buttons: true,
                                },
                                modules: {
                                    increaseText: true,
                                    decreaseText: true,
                                    increaseTextSpacing: true,
                                    decreaseTextSpacing: true,
                                    increaseLineHeight: true,
                                    decreaseLineHeight: true,
                                    invertColors: true,
                                    grayHues: true,
                                    bigCursor: true,
                                    readingGuide: true,
                                    underlineLinks: true,
                                    textToSpeech: true,
                                    speechToText: true,
                                    disableAnimations: true,
                                    iframeModals: true,
                                    customFunctions: true,
                                },
                                modulesOrder: [],
                                session: {
                                    persistent: true,
                                },
                                iframeModals: [],
                                customFunctions: [],
                                statement: {
                                    url: "",
                                },
                                feedback: {
                                    url: "",
                                },
                                language: {
                                    textToSpeechLang: "",
                                    speechToTextLang: "",
                                },
                            };
                            const keys = Object.keys(_interfaces_accessibility_interface__WEBPACK_IMPORTED_MODULE_2__.AccessibilityModulesType);
                            keys.forEach((key, index) => {
                                const keyNum = parseInt(key);
                                if (!isNaN(keyNum)) {
                                    res.modulesOrder.push({
                                        type: keyNum,
                                        order: keyNum,
                                    });
                                }
                            });
                            return res;
                        }
                        initFontSize() {
                            // store this values only once.
                            if (!this._htmlInitFS) {
                                let htmlInitFS = this._common.getFormattedDim(getComputedStyle(this._html).fontSize);
                                let bodyInitFS = this._common.getFormattedDim(getComputedStyle(this._body).fontSize);
                                this._html.style.fontSize =
                                    (htmlInitFS.size / 16) * 100 + "%";
                                this._htmlOrgFontSize = this._html.style.fontSize;
                                this._body.style.fontSize =
                                    bodyInitFS.size / htmlInitFS.size + "em";
                            }
                        }
                        fontFallback() {
                            this.options.icon.useEmojis = true;
                            this.options.icon.img = "♿";
                            this.options.icon.fontClass = "";
                        }
                        addDefaultOptions(options) {
                            var _a, _b, _c;
                            if ((_a = options.icon) === null || _a === void 0 ? void 0 : _a.closeIconElem)
                                this.options.icon.closeIconElem = options.icon.closeIconElem;
                            if ((_b = options.icon) === null || _b === void 0 ? void 0 : _b.resetIconElem)
                                this.options.icon.resetIconElem = options.icon.resetIconElem;
                            if ((_c = options.icon) === null || _c === void 0 ? void 0 : _c.imgElem)
                                this.options.icon.imgElem = options.icon.imgElem;
                            if (!this.options.icon.closeIconElem)
                                this.options.icon.closeIconElem = {
                                    type: "#text",
                                    text: `${!this.options.icon.useEmojis ? this.options.icon.closeIcon : "X"}`,
                                };
                            if (!this.options.icon.resetIconElem)
                                this.options.icon.resetIconElem = {
                                    type: "#text",
                                    text: `${!this.options.icon.useEmojis ? this.options.icon.resetIcon : "♲"}`,
                                };
                            if (!this.options.icon.imgElem)
                                this.options.icon.imgElem = {
                                    type: "#text",
                                    text: this.options.icon.img,
                                };
                        }
                        addModuleOrderIfNotDefined() {
                            this.defaultOptions.modulesOrder.forEach((mo) => {
                                if (!this.options.modulesOrder.find((imo) => imo.type === mo.type))
                                    this.options.modulesOrder.push(mo);
                            });
                        }
                        disabledUnsupportedFeatures() {
                            if (!("webkitSpeechRecognition" in window) ||
                                location.protocol !== "https:") {
                                this._common.warn("speech to text isn't supported in this browser or in http protocol (https required)");
                                this.options.modules.speechToText = false;
                            }
                            const windowAny = window;
                            if (!windowAny.SpeechSynthesisUtterance || !windowAny.speechSynthesis) {
                                this._common.warn("text to speech isn't supported in this browser");
                                this.options.modules.textToSpeech = false;
                            }
                        }
                        injectCss(injectFull) {
                            const iconTop = "7px", iconLeft = "5px";
                            let css;
                            const mandatory = `
        html._access_cursor * {
            cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==),auto!important;
        }
        @keyframes _access-dialog-backdrop {
            0% {
                background: var(--_access-menu-dialog-backdrop-background-start, rgba(0, 0, 0, 0.1))
            }
            100% {
                background: var(--_access-menu-dialog-backdrop-background-end, rgba(0, 0, 0, 0.5))
            }
        }
        dialog._access::backdrop, dialog._access {
            transition-duration: var(--_access-menu-dialog-backdrop-transition-duration, 0.35s);
            transition-timing-function: var(--_access-menu-dialog-backdrop-transition-timing-function, ease-in-out);
        }
        dialog._access:modal {
            border-color: transparent;
            border-width: 0;
            padding: 0;
        }
        dialog._access[open]::backdrop {
            background: var(--_access-menu-dialog-backdrop-background-end, rgba(0, 0, 0, 0.5));
            animation: _access-dialog-backdrop var(--_access-menu-dialog-backdrop-transition-duration, 0.35s) ease-in-out;
        }
        dialog._access.closing[open]::backdrop {
            background: var(--_access-menu-dialog-backdrop-background-start, rgba(0, 0, 0, 0.1));
        }
        dialog._access.closing[open] {
            opacity: 0;
        }
        .screen-reader-wrapper {
            margin: 0;
            position: absolute;
            bottom: -4px;
            width: calc(100% - 2px);
            left: 1px;
        }
        .screen-reader-wrapper-step-1, .screen-reader-wrapper-step-2,.screen-reader-wrapper-step-3 {
            float: left;
            background: var(--_access-menu-background-color, #fff);
            width: 33.33%;
            height: 3px;
            border-radius: 10px;
        }
        .screen-reader-wrapper-step-1.active, .screen-reader-wrapper-step-2.active,.screen-reader-wrapper-step-3.active {
            background: var(--_access-menu-item-button-background, #f9f9f9);
        }
        .access_read_guide_bar {
            box-sizing: border-box;
            background: var(--_access-menu-read-guide-bg, ${this.options.guide.cBackground});
            width: 100%!important;
            min-width: 100%!important;
            position: fixed!important;
            height: var(--_access-menu-read-guide-height, ${this.options.guide.height}) !important;
            border: var(--_access-menu-read-guide-border, solid 3px ${this.options.guide.cBorder});
            border-radius: 5px;
            top: 15px;
            z-index: 2147483647;
        }`;
                            if (injectFull) {
                                css = `
            ._access-scrollbar::-webkit-scrollbar-track, .mat-autocomplete-panel::-webkit-scrollbar-track, .mat-tab-body-content::-webkit-scrollbar-track, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-track, .mat-menu-panel::-webkit-scrollbar-track {
                -webkit-box-shadow: var(--_access-scrollbar-track-box-shadow, inset 0 0 6px rgba(0,0,0,0.3));
                background-color: var(--_access-scrollbar-track-background-color, #F5F5F5);
            }
            ._access-scrollbar::-webkit-scrollbar, .mat-autocomplete-panel::-webkit-scrollbar, .mat-tab-body-content::-webkit-scrollbar, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar, .mat-menu-panel::-webkit-scrollbar {
                width: var(--_access-scrollbar-width, 6px);
                background-color: var(--_access-scrollbar-background-color, #F5F5F5);
            }
            ._access-scrollbar::-webkit-scrollbar-thumb, .mat-autocomplete-panel::-webkit-scrollbar-thumb, .mat-tab-body-content::-webkit-scrollbar-thumb, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-thumb, .mat-menu-panel::-webkit-scrollbar-thumb {
                background-color: var(--_access-scrollbar-thumb-background-color, #999999);
            }
            ._access-icon {
                position: var(--_access-icon-position, fixed);
                width: var(--_access-icon-width, 50px);
                height: var(--_access-icon-height, 50px);
                bottom: var(--_access-icon-bottom, 50px);
                top: var(--_access-icon-top, unset);
                left: var(--_access-icon-left, unset);
                right: var(--_access-icon-right, 10px);
                z-index: var(--_access-icon-z-index, 9999);
                font: var(--_access-icon-font, 40px / 45px "Material Icons");
                background: var(--_access-icon-bg, #4054b2);
                color: var(--_access-icon-color, #fff);
                background-repeat: no-repeat;
                background-size: contain;
                cursor: pointer;
                opacity: 0;
                transition-duration: .35s;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                ${!this.options.icon.useEmojis
                                        ? "box-shadow: 1px 1px 5px rgba(0,0,0,.5);"
                                        : ""}
                transform: ${!this.options.icon.useEmojis ? "scale(1)" : "skewX(14deg)"};
                border-radius: var(--_access-icon-border-radius);
                border: var(--_access-icon-border);
                text-align: var(--_access-icon-text-align, center);
            }
            ._access-icon:hover {
                transform: var(--_access-icon-transform-hover, scale(1.1));
                vertical-align: var(--_access-icon-vertical-align-hover);
            }
            ._access-menu {
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                position: fixed;
                width: var(--_access-menu-width, ${Accessibility.MENU_WIDTH});
                height: var(--_access-menu-height, auto);
                transition-duration: var(--_access-menu-transition-duration, .35s);
                z-index: var(--_access-menu-z-index, 99991);
                opacity: 1;
                background-color: var(--_access-menu-background-color, #fff);
                color: var(--_access-menu-color, #000);
                border-radius: var(--_access-menu-border-radius, 3px);
                border: var(--_access-menu-border, solid 1px #f1f0f1);
                font-family: var(--_access-menu-font-family, RobotoDraft, Roboto, sans-serif, Arial);
                min-width: var(--_access-menu-min-width, 300px);
                box-shadow: var(--_access-menu-box-shadow, 0px 0px 1px #aaa);
                max-height: calc(100vh - 80px);
                ${getComputedStyle(this._body).direction === "rtl"
                                        ? "text-indent: -5px"
                                        : ""}
                top: var(--_access-menu-top, unset);
                left: var(--_access-menu-left, unset);
                bottom: var(--_access-menu-bottom, 0);
                right: var(--_access-menu-right, 0);
            }
            ._access-menu.close {
                z-index: -1;
                width: 0;
                opacity: 0;
                background-color: transparent;
                left: calc(-1 * var(--_access-menu-left), unset);
                right: calc(-1 * var(--_access-menu-width, ${Accessibility.MENU_WIDTH}));
            }
            ._access-menu ._text-center {
                font-size: var(--_access-menu-header-font-size, 22px);
                font-weight: var(--_access-menu-header-font-weight, nornal);
                margin: var(--_access-menu-header-margin, 20px 0 10px);
                padding: 0;
                color: var(--_access-menu-header-color, rgba(0,0,0,.87));
                letter-spacing: var(--_access-menu-header-letter-spacing, initial);
                word-spacing: var(--_access-menu-header-word-spacing, initial);
                text-align: var(--_access-menu-header-text-align, center);
            }
            ._access-menu ._menu-close-btn {
                left: 5px;
                color: #d63c3c;
                transition: .3s ease;
                transform: rotate(0deg);
                font-style: normal !important;
            }
            ._access-menu ._menu-reset-btn:hover,._access-menu ._menu-close-btn:hover {
                transform: var(--_access-menu-header-btn-hover-rotate, rotate(180deg));
            }
            ._access-menu ._menu-reset-btn {
                right: 5px;
                color: #4054b2;
                transition: .3s ease;
                transform: rotate(0deg);
                font-style: normal !important;
            }
            ._access-menu ._menu-btn {
                position: absolute;
                top: 5px;
                cursor: pointer;
                font-size: 24px !important;
                font-weight: bold;
                background: transparent;
                border: none;
            }
            ._access-menu ul {
                padding: 0 0 5px;
                position: relative;
                font-size: var(--_access-menu-font-size, 18px);
                margin: 0;
                overflow: auto;
                max-height: var(--_access-menu-max-height, calc(100vh - 145px));
                display: flex;
                flex-flow: column;
                gap: 5px;
            }
            ${mandatory}
            ._access-menu ul li {
                position: relative;
                list-style-type: none;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                user-select: none;
                margin: 0 5px 0 8px;
                font: { size: 18, units: 'px' }
                font-size: var(--_access-menu-item-font-size, 18px) !important;
                line-height: var(--_access-menu-item-line-height, 18px) !important;
                color: var(--_access-menu-item-color, rgba(0,0,0,.6));
                letter-spacing: var(--_access-menu-item-letter-spacing, initial);
                word-spacing: var(--_access-menu-item-word-spacing, initial);
                width: calc(100% - 17px);
            }
            ._access-menu ul li button {
                background: var(--_access-menu-item-button-background, #f9f9f9);
                padding: var(--_access-menu-item-button-padding, 10px 0);
                width: 100%;
                text-indent: var(--_access-menu-item-button-text-indent, 35px);
                text-align: start;
                position: relative;
                transition-duration: var(--_access-menu-item-button-transition-duration, .35s);
                transition-timing-function: var(--_access-menu-item-button-transition-timing-function, ease-in-out);
                border: var(--_access-menu-item-button-border, solid 1px #f1f0f1);
                border-radius: var(--_access-menu-item-button-border-radius, 4px);
                cursor: pointer;
            }
            ._access-menu ul li.position {
                display: inline-block;
                width: auto;
            }
            ._access-menu ul.before-collapse li button {
                opacity: var(--_access-menu-item-button-before-collapse-opacity, 0.05);
            }
            ._access-menu ul li button.active, ._access-menu ul li button.active:hover {
                background-color: var(--_access-menu-item-button-active-background-color, #000);
            }
            ._access-menu div.active {
                color: var(--_access-menu-div-active-color, #fff);
                background-color: var(--_access-menu-div-active-background-color, #000);
            }
            ._access-menu ul li button.active, ._access-menu ul li button.active:hover, ._access-menu ul li button.active:before, ._access-menu ul li button.active:hover:before {
                color: var(--_access-menu-item-button-active-color, #fff);
            }
            ._access-menu ul li button:hover {
                color: var(--_access-menu-item-button-hover-color, rgba(0,0,0,.8));
                background-color: var(--_access-menu-item-button-hover-background-color, #eaeaea);
            }
            ._access-menu ul li.not-supported {
                display: none;
            }
            ._access-menu ul li button:before {
                content: ' ';
                font-family: var(--_access-menu-button-font-family-before, ${this._fixedDefaultFont});
                text-rendering: optimizeLegibility;
                font-feature-settings: "liga" 1;
                font-style: normal;
                text-transform: none;
                line-height: ${!this.options.icon.useEmojis ? "1" : "1.1"};
                font-size: ${!this.options.icon.useEmojis ? "24px" : "20px"} !important;
                width: 30px;
                height: 30px;
                display: inline-block;
                overflow: hidden;
                -webkit-font-smoothing: antialiased;
                top: 7px;
                left: 5px;
                position: absolute;
                color: var(--_access-menu-item-icon-color, rgba(0,0,0,.6));
                direction: ltr;
                text-indent: 0;
                transition-duration: .35s;
                transition-timing-function: ease-in-out;
            }
            ._access-menu ul li button svg path {
                fill: var(--_access-menu-item-icon-color, rgba(0,0,0,.6));
                transition-duration: .35s;
                transition-timing-function: ease-in-out;
            }
            ._access-menu ul li button:hover svg path {
                fill: var(--_access-menu-item-hover-icon-color, rgba(0,0,0,.8));
            }
            ._access-menu ul li button.active svg path {
                fill: var(--_access-menu-item-active-icon-color, #fff);
            }
            ._access-menu ul li:hover button:before {
                color: var(--_access-menu-item-hover-icon-color, rgba(0,0,0,.8));
            }
            ._access-menu ul li button.active button:before {
                color: var(--_access-menu-item-active-icon-color, #fff);
            }
            ._access-menu ul li button[data-access-action="increaseText"]:before {
                content: var(--_access-menu-item-icon-increase-text, ${!this.options.icon.useEmojis ? '"zoom_in"' : '"🔼"'});
                transform: var(--_access-menu-item-icon-increase-text-transform, unset);
                top: var(--_access-menu-item-icon-increase-text-top, ${iconTop});
                left: var(--_access-menu-item-icon-increase-text-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="decreaseText"]:before {
                content: var(--_access-menu-item-icon-decrease-text, ${!this.options.icon.useEmojis ? '"zoom_out"' : '"🔽"'});
                transform: var(--_access-menu-item-icon-decrease-text-spacing-transform, unset);
                top: var(--_access-menu-item-icon-decrease-text-spacing-top, ${iconTop});
                left: var(--_access-menu-item-icon-decrease-text-spacing-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="increaseTextSpacing"]:before {
                content: var(--_access-menu-item-icon-increase-text-spacing, ${!this.options.icon.useEmojis ? '"unfold_more"' : '"🔼"'});
                transform: var(--_access-menu-item-icon-increase-text-spacing-transform, rotate(90deg) translate(-7px, 2px));
                top: var(--_access-menu-item-icon-increase-text-spacing-top, 14px);
                left: var(--_access-menu-item-icon-increase-text-spacing-left, 0);
            }
            ._access-menu ul li button[data-access-action="decreaseTextSpacing"]:before {
                content: var(--_access-menu-item-icon-decrease-text-spacing, ${!this.options.icon.useEmojis ? '"unfold_less"' : '"🔽"'});
                transform: var(--_access-menu-item-icon-decrease-text-spacing-transform, rotate(90deg) translate(-7px, 2px));
                top: var(--_access-menu-item-icon-decrease-text-spacing-top, 14px);
                left: var(--_access-menu-item-icon-decrease-text-spacing-left, 0);
            }
            ._access-menu ul li button[data-access-action="invertColors"]:before {
                content: var(--_access-menu-item-icon-invert-colors, ${!this.options.icon.useEmojis ? '"invert_colors"' : '"🎆"'});
                transform: var(--_access-menu-item-icon-invert-colors-transform, unset);
                top: var(--_access-menu-item-icon-invert-colors-top, ${iconTop});
                left: var(--_access-menu-item-icon-invert-colors-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="grayHues"]:before {
                content: var(--_access-menu-item-icon-gray-hues, ${!this.options.icon.useEmojis ? '"format_color_reset"' : '"🌫️"'});
                transform: var(--_access-menu-item-icon-gray-hues-transform, unset);
                top: var(--_access-menu-item-icon-gray-hues-top, ${iconTop});
                left: var(--_access-menu-item-icon-gray-hues-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="underlineLinks"]:before {
                content: var(--_access-menu-item-icon-underline-links, ${!this.options.icon.useEmojis ? '"format_underlined"' : '"🔗"'});
                transform: var(--_access-menu-item-icon-underline-links-transform, unset);
                top: var(--_access-menu-item-icon-underline-links-top, ${iconTop});
                left: var(--_access-menu-item-icon-underline-links-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="bigCursor"]:before {
                /*content: 'touch_app';*/
                content: var(--_access-menu-item-icon-big-cursor, inherit);
                transform: var(--_access-menu-item-icon-big-cursor-transform, unset);
                top: var(--_access-menu-item-icon-big-cursor-top, ${iconTop});
                left: var(--_access-menu-item-icon-big-cursor-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="readingGuide"]:before {
                content: var(--_access-menu-item-icon-reading-guide, ${!this.options.icon.useEmojis ? '"border_horizontal"' : '"↔️"'});
                transform: var(--_access-menu-item-icon-reading-guide-transform, unset);
                top: var(--_access-menu-item-icon-reading-guide-top, ${iconTop});
                left: var(--_access-menu-item-icon-reading-guide-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="textToSpeech"]:before {
                content: var(--_access-menu-item-icon-text-to-speech, ${!this.options.icon.useEmojis ? '"record_voice_over"' : '"⏺️"'});
                transform: var(--_access-menu-item-icon-text-to-speech-transform, unset);
                top: var(--_access-menu-item-icon-text-to-speech-top, ${iconTop});
                left: var(--_access-menu-item-icon-text-to-speech-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="speechToText"]:before {
                content: var(--_access-menu-item-icon-speech-to-text, ${!this.options.icon.useEmojis ? '"mic"' : '"🎤"'});
                transform: var(--_access-menu-item-icon-speech-to-text-transform, unset);
                top: var(--_access-menu-item-icon-speech-to-text-top, ${iconTop});
                left: var(--_access-menu-item-icon-speech-to-text-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="disableAnimations"]:before {
                content: var(--_access-menu-item-icon-disable-animations, ${!this.options.icon.useEmojis ? '"animation"' : '"🏃‍♂️"'});
                transform: var(--_access-menu-item-icon-disable-animations-transform, unset);
                top: var(--_access-menu-item-icon-disable-animations-top, ${iconTop});
                left: var(--_access-menu-item-icon-disable-animations-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="iframeModals"]:before {
                content: var(--_access-menu-item-icon-iframe-modals, ${!this.options.icon.useEmojis ? '"policy"' : '"⚖️"'});
                transform: var(--_access-menu-item-icon-iframe-transform, unset);
                top: var(--_access-menu-item-icon-iframe-top, ${iconTop});
                left: var(--_access-menu-item-icon-iframe-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="customFunctions"]:before {
                content: var(--_access-menu-item-icon-custom-functions, ${!this.options.icon.useEmojis ? '"psychology_alt"' : '"❓"'});
                transform: var(--_access-menu-item-icon-custom-functions-transform, unset);
                top: var(--_access-menu-item-icon-custom-functions-top, ${iconTop});
                left: var(--_access-menu-item-icon-custom-functions-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="increaseLineHeight"]:before {
                content: var(--_access-menu-item-icon-increase-line-height, ${!this.options.icon.useEmojis ? '"unfold_more"' : '"🔼"'});
                transform: var(--_access-menu-item-icon-increase-line-height-transform, unset);
                top: var(--_access-menu-item-icon-increase-line-height-top, ${iconTop});
                left: var(--_access-menu-item-icon-increase-line-height-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="decreaseLineHeight"]:before {
                content: var(--_access-menu-item-icon-decrease-line-height, ${!this.options.icon.useEmojis ? '"unfold_less"' : '"🔽"'});
                transform: var(--_access-menu-item-icon-decrease-line-height-transform, unset);
                top: var(--_access-menu-item-icon-decrease-line-height-top, ${iconTop});
                left: var(--_access-menu-item-icon-decrease-line-height-left, ${iconLeft});
            }`;
                            }
                            else {
                                css = mandatory;
                            }
                            const className = Accessibility.CSS_CLASS_NAME;
                            this._common.injectStyle(css, { className: className });
                            this._common.deployedObjects.set(`.${className}`, false);
                        }
                        removeCSS() {
                            const existing = document.querySelector(`.${Accessibility.CSS_CLASS_NAME}`);
                            if (existing)
                                existing.remove();
                        }
                        injectIcon() {
                            // let fontSize = (this.options.icon.dimensions.width.size as number) * 0.8;
                            // let lineHeight = (this.options.icon.dimensions.width.size as number) * 0.9;
                            // let textIndent = (this.options.icon.dimensions.width.size as number) * 0.1;
                            // let iStyle = `width: ${this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units}
                            //     ;height: ${this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units}
                            //     ;font-size: ${fontSize + this.options.icon.dimensions.width.units}
                            //     ;line-height: ${lineHeight + this.options.icon.dimensions.width.units}
                            //     ;text-indent: ${textIndent + this.options.icon.dimensions.width.units}
                            //     ;background-color: ${!this.options.icon.useEmojis ? this.options.icon.backgroundColor : 'transparent'};color: ${this.options.icon.color}`;
                            // for (let i in this.options.icon.position) {
                            //     let pos = this.options.icon.position as any;
                            //     pos = pos[i];
                            //     iStyle += ';' + i + ':' + pos.size + pos.units;
                            // }
                            // iStyle += `;z-index: ${this.options.icon.zIndex}`;
                            let className = `_access-icon ${this.options.icon.fontClass} _access`;
                            let iconElem = this._common.jsonToHtml({
                                type: "i",
                                attrs: {
                                    class: className,
                                    // 'style': iStyle,
                                    title: this.options.hotkeys.enabled
                                        ? this.parseKeys(this.options.hotkeys.keys.toggleMenu)
                                        : this.options.labels.menuTitle,
                                    tabIndex: 0,
                                },
                                children: [this.options.icon.imgElem],
                            });
                            this._body.appendChild(iconElem);
                            this._common.deployedObjects.set("._access-icon", false);
                            return iconElem;
                        }
                        parseKeys(arr) {
                            return this.options.hotkeys.enabled
                                ? this.options.hotkeys.helpTitles
                                    ? this.options.labels.hotkeyPrefix +
                                    arr
                                        .map(function (val) {
                                            return Number.isInteger(val)
                                                ? String.fromCharCode(val).toLowerCase()
                                                : val.replace("Key", "");
                                        })
                                        .join("+")
                                    : ""
                                : "";
                        }
                        injectMenu() {
                            const json = {
                                type: "div",
                                attrs: {
                                    class: "_access-menu close _access",
                                },
                                children: [
                                    {
                                        type: "p",
                                        attrs: {
                                            class: "_text-center",
                                            role: "presentation",
                                        },
                                        children: [
                                            {
                                                type: "button",
                                                attrs: {
                                                    class: `_menu-close-btn _menu-btn ${this.options.icon.fontClass}`,
                                                    style: `font-family: var(--_access-menu-close-btn-font-family, ${this._fixedDefaultFont})`,
                                                    title: this.options.hotkeys.enabled
                                                        ? this.parseKeys(this.options.hotkeys.keys.toggleMenu)
                                                        : this.options.labels.closeTitle,
                                                },
                                                children: [this.options.icon.closeIconElem],
                                            },
                                            {
                                                type: "#text",
                                                text: this.options.labels.menuTitle,
                                            },
                                            {
                                                type: "button",
                                                attrs: {
                                                    class: `_menu-reset-btn _menu-btn ${this.options.icon.fontClass}`,
                                                    style: `font-family: var(--_access-menu-reset-btn-font-family, ${this._fixedDefaultFont})`,
                                                    title: this.options.labels.resetTitle,
                                                },
                                                children: [this.options.icon.resetIconElem],
                                            },
                                        ],
                                    },
                                    {
                                        type: "ul",
                                        attrs: {
                                            class: "before-collapse _access-scrollbar",
                                        },
                                        children: [
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "increaseText",
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.increaseText,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "decreaseText",
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.decreaseText,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "increaseTextSpacing",
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.increaseTextSpacing,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "decreaseTextSpacing",
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.decreaseTextSpacing,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "increaseLineHeight",
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.increaseLineHeight,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "decreaseLineHeight",
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.decreaseLineHeight,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "invertColors",
                                                            title: this.parseKeys(this.options.hotkeys.keys.invertColors),
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.invertColors,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "grayHues",
                                                            title: this.parseKeys(this.options.hotkeys.keys.grayHues),
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.grayHues,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "underlineLinks",
                                                            title: this.parseKeys(this.options.hotkeys.keys.underlineLinks),
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.underlineLinks,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "bigCursor",
                                                            title: this.parseKeys(this.options.hotkeys.keys.bigCursor),
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "div",
                                                                attrs: {
                                                                    id: "iconBigCursor",
                                                                },
                                                            },
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.bigCursor,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "readingGuide",
                                                            title: this.parseKeys(this.options.hotkeys.keys.readingGuide),
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.readingGuide,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "button",
                                                        attrs: {
                                                            "data-access-action": "disableAnimations",
                                                            title: this.parseKeys(this.options.hotkeys.keys.disableAnimations),
                                                            tabIndex: "-1",
                                                        },
                                                        children: [
                                                            {
                                                                type: "#text",
                                                                text: this.options.labels.disableAnimations,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            };
                            if (this.options.iframeModals) {
                                this.options.iframeModals.forEach((im, i) => {
                                    const btn = {
                                        type: "li",
                                        children: [
                                            {
                                                type: "button",
                                                attrs: {
                                                    "data-access-action": "iframeModals",
                                                    "data-access-url": im.iframeUrl,
                                                },
                                                children: [
                                                    {
                                                        type: "#text",
                                                        text: im.buttonText,
                                                    },
                                                ],
                                            },
                                        ],
                                    };
                                    let icon = null;
                                    if (im.icon && !this.options.icon.useEmojis)
                                        icon = im.icon;
                                    else if (im.emoji && this.options.icon.useEmojis)
                                        icon = im.emoji;
                                    if (icon) {
                                        btn.children[0].attrs["data-access-iframe-index"] = i;
                                        const css = `._access-menu ul li button[data-access-action="iframeModals"][data-access-iframe-index="${i}"]:before {
                        content: "${icon}";
                    }`;
                                        let className = "_data-access-iframe-index-" + i;
                                        this._common.injectStyle(css, { className: className });
                                        this._common.deployedObjects.set("." + className, false);
                                    }
                                    if (this.options.modules.textToSpeech)
                                        json.children[1].children.splice(json.children[1].children.length - 2, 0, btn);
                                    else
                                        json.children[1].children.push(btn);
                                });
                            }
                            if (this.options.customFunctions) {
                                this.options.customFunctions.forEach((cf, i) => {
                                    const btn = {
                                        type: "li",
                                        children: [
                                            {
                                                type: "button",
                                                attrs: {
                                                    "data-access-action": "customFunctions",
                                                    "data-access-custom-id": cf.id,
                                                    "data-access-custom-index": i,
                                                },
                                                children: [
                                                    {
                                                        type: "#text",
                                                        text: cf.buttonText,
                                                    },
                                                ],
                                            },
                                        ],
                                    };
                                    let icon = null;
                                    if (cf.icon && !this.options.icon.useEmojis)
                                        icon = cf.icon;
                                    else if (cf.emoji && this.options.icon.useEmojis)
                                        icon = cf.emoji;
                                    if (icon) {
                                        const css = `._access-menu ul li button[data-access-action="customFunctions"][data-access-custom-id="${cf.id}"]:before {
                        content: "${icon}";
                    }`;
                                        let className = "_data-access-custom-id-" + cf.id;
                                        this._common.injectStyle(css, { className: className });
                                        this._common.deployedObjects.set("." + className, false);
                                    }
                                    if (this.options.modules.textToSpeech)
                                        json.children[1].children.splice(json.children[1].children.length - 2, 0, btn);
                                    else
                                        json.children[1].children.push(btn);
                                });
                            }
                            let menuElem = this._common.jsonToHtml(json);
                            this._body.appendChild(menuElem);
                            setTimeout(function () {
                                let ic = document.getElementById("iconBigCursor");
                                if (ic) {
                                    ic.outerHTML =
                                        ic.outerHTML +
                                        '<svg version="1.1" id="iconBigCursorSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="position: absolute;width: 19px;height: 19px;top: 9px; left: 9px;" xml:space="preserve"><path d="M 423.547 323.115 l -320 -320 c -3.051 -3.051 -7.637 -3.947 -11.627 -2.304 s -6.592 5.547 -6.592 9.856 V 480 c 0 4.501 2.837 8.533 7.083 10.048 c 4.224 1.536 8.981 0.192 11.84 -3.285 l 85.205 -104.128 l 56.853 123.179 c 1.792 3.883 5.653 6.187 9.685 6.187 c 1.408 0 2.837 -0.277 4.203 -0.875 l 74.667 -32 c 2.645 -1.131 4.736 -3.285 5.76 -5.973 c 1.024 -2.688 0.939 -5.675 -0.277 -8.299 l -57.024 -123.52 h 132.672 c 4.309 0 8.213 -2.603 9.856 -6.592 C 427.515 330.752 426.598 326.187 423.547 323.115 Z"/></svg>';
                                    document.getElementById("iconBigCursor").remove();
                                }
                            }, 1);
                            this._common.deployedObjects.set("._access-menu", false);
                            let closeBtn = document.querySelector("._access-menu ._menu-close-btn");
                            ["click", "keyup"].forEach((evt) => {
                                closeBtn.addEventListener(evt, (e) => {
                                    let et = e || window.event;
                                    if (et.detail === 0 &&
                                        et.key !== "Enter")
                                        return;
                                    this.toggleMenu();
                                }, false);
                            });
                            let resetBtn = document.querySelector("._access-menu ._menu-reset-btn");
                            ["click", "keyup"].forEach((evt) => {
                                resetBtn.addEventListener(evt, (e) => {
                                    let et = e || window.event;
                                    if (et.detail === 0 &&
                                        et.key !== "Enter")
                                        return;
                                    this.resetAll();
                                }, false);
                            });
                            return menuElem;
                        }
                        getVoices() {
                            return new Promise((resolve) => {
                                let synth = window.speechSynthesis;
                                let id;
                                id = setInterval(() => {
                                    if (synth.getVoices().length !== 0) {
                                        resolve(synth.getVoices());
                                        clearInterval(id);
                                    }
                                }, 10);
                            });
                        }
                        injectTts() {
                            return __awaiter(this, void 0, void 0, function* () {
                                let voices = yield this.getVoices();
                                let isLngSupported = false;
                                for (let i = 0; i < voices.length; i++) {
                                    if (voices[i].lang === this.options.language.textToSpeechLang) {
                                        isLngSupported = true;
                                        break;
                                    }
                                }
                                if (isLngSupported) {
                                    let tts = this.common.jsonToHtml({
                                        type: "li",
                                        children: [
                                            {
                                                type: "button",
                                                attrs: {
                                                    "data-access-action": "textToSpeech",
                                                    title: this.parseKeys(this.options.hotkeys.keys.textToSpeech),
                                                },
                                                children: [
                                                    {
                                                        type: "#text",
                                                        text: this.options.labels.textToSpeech,
                                                    },
                                                ],
                                            },
                                            {
                                                type: "div",
                                                attrs: {
                                                    class: "screen-reader-wrapper",
                                                },
                                                children: [
                                                    {
                                                        type: "div",
                                                        attrs: {
                                                            class: "screen-reader-wrapper-step-1",
                                                            tabIndex: "-1",
                                                        },
                                                    },
                                                    {
                                                        type: "div",
                                                        attrs: {
                                                            class: "screen-reader-wrapper-step-2",
                                                            tabIndex: "-1",
                                                        },
                                                    },
                                                    {
                                                        type: "div",
                                                        attrs: {
                                                            class: "screen-reader-wrapper-step-3",
                                                            tabIndex: "-1",
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    });
                                    let sts = this.common.jsonToHtml({
                                        type: "li",
                                        children: [
                                            {
                                                type: "button",
                                                attrs: {
                                                    "data-access-action": "speechToText",
                                                    title: this.parseKeys(this.options.hotkeys.keys.speechToText),
                                                },
                                                children: [
                                                    {
                                                        type: "#text",
                                                        text: this.options.labels.speechToText,
                                                    },
                                                ],
                                            },
                                        ],
                                    });
                                    let ul = document.querySelector("._access-menu ul");
                                    ul.appendChild(sts);
                                    ul.appendChild(tts);
                                }
                            });
                        }
                        addListeners() {
                            let lis = document.querySelectorAll("._access-menu ul li");
                            let step1 = document.getElementsByClassName("screen-reader-wrapper-step-1");
                            let step2 = document.getElementsByClassName("screen-reader-wrapper-step-2");
                            let step3 = document.getElementsByClassName("screen-reader-wrapper-step-3");
                            for (let i = 0; i < lis.length; i++) {
                                ["click", "keyup"].forEach((evt) => lis[i].addEventListener(evt, (e) => {
                                    let evt = e || window.event;
                                    if (evt.detail === 0 &&
                                        evt.key !== "Enter")
                                        return;
                                    this.invoke(evt.target.getAttribute("data-access-action"), evt.target);
                                }));
                            }
                            [...Array.from(step1), ...Array.from(step2), ...Array.from(step3)].forEach((el) => el.addEventListener("click", (e) => {
                                let evt = e || window.event;
                                this.invoke(evt.target.parentElement.parentElement.getAttribute("data-access-action"), evt.target);
                            }, false));
                        }
                        sortModuleTypes() {
                            this.options.modulesOrder.sort((a, b) => {
                                return a.order - b.order;
                            });
                        }
                        disableUnsupportedModulesAndSort() {
                            this.sortModuleTypes();
                            let ul = document.querySelector("._access-menu ul");
                            this.options.modulesOrder.forEach((item) => {
                                const i = item.type;
                                const module = _interfaces_accessibility_interface__WEBPACK_IMPORTED_MODULE_2__.AccessibilityModulesType[i];
                                let m = this.options.modules;
                                m = m[module];
                                let moduleLi = document.querySelector('button[data-access-action="' + module + '"]');
                                if (moduleLi) {
                                    moduleLi.parentElement.remove();
                                    ul.appendChild(moduleLi.parentElement);
                                    if (!m)
                                        moduleLi.parentElement.classList.add("not-supported");
                                }
                            });
                        }
                        resetAll() {
                            this.menuInterface.textToSpeech(true);
                            this.menuInterface.speechToText(true);
                            this.menuInterface.disableAnimations(true);
                            this.menuInterface.underlineLinks(true);
                            this.menuInterface.grayHues(true);
                            this.menuInterface.invertColors(true);
                            this.menuInterface.bigCursor(true);
                            this.menuInterface.readingGuide(true);
                            this.resetTextSize();
                            this.resetTextSpace();
                            this.resetLineHeight();
                        }
                        resetTextSize() {
                            this.resetIfDefined(this._stateValues.body.fontSize, this._body.style, "fontSize");
                            if (typeof this._htmlOrgFontSize !== "undefined")
                                this._html.style.fontSize = this._htmlOrgFontSize;
                            let all = document.querySelectorAll("[data-init-font-size]");
                            for (let i = 0; i < all.length; i++) {
                                all[i].style.fontSize = all[i].getAttribute("data-init-font-size");
                                all[i].removeAttribute("data-init-font-size");
                            }
                            this._sessionState.textSize = 0;
                            this.onChange(true);
                        }
                        resetLineHeight() {
                            this.resetIfDefined(this._stateValues.body.lineHeight, this.body.style, "lineHeight");
                            let all = document.querySelectorAll("[data-init-line-height]");
                            for (let i = 0; i < all.length; i++) {
                                all[i].style.lineHeight = all[i].getAttribute("data-init-line-height");
                                all[i].removeAttribute("data-init-line-height");
                            }
                            this.sessionState.lineHeight = 0;
                            this.onChange(true);
                        }
                        resetTextSpace() {
                            this.resetIfDefined(this._stateValues.body.wordSpacing, this._body.style, "wordSpacing");
                            this.resetIfDefined(this._stateValues.body.letterSpacing, this._body.style, "letterSpacing");
                            let all = document.querySelectorAll("[data-init-word-spacing]");
                            let all2 = document.querySelectorAll("[data-init-letter-spacing]");
                            for (let i = 0; i < all.length; i++) {
                                all[i].style.wordSpacing = all[i].getAttribute("data-init-word-spacing");
                                all[i].removeAttribute("data-init-word-spacing");
                            }
                            for (let i = 0; i < all2.length; i++) {
                                all[i].style.letterSpacing = all[i].getAttribute("data-init-letter-spacing");
                                all[i].removeAttribute("data-init-letter-spacing");
                            }
                            this._sessionState.textSpace = 0;
                            this.onChange(true);
                        }
                        alterTextSize(isIncrease) {
                            this._sessionState.textSize += isIncrease ? 1 : -1;
                            this.onChange(true);
                            let factor = 12.5;
                            if (!isIncrease)
                                factor *= -1;
                            if (this.options.textPixelMode) {
                                let all = document.querySelectorAll("*:not(._access)");
                                for (let i = 0; i < all.length; i++) {
                                    let fSize = getComputedStyle(all[i]).fontSize;
                                    if (fSize && fSize.indexOf("px") > -1) {
                                        if (!all[i].getAttribute("data-init-font-size"))
                                            all[i].setAttribute("data-init-font-size", fSize);
                                        fSize = (parseInt(fSize.replace("px", "")) + factor);
                                        all[i].style.fontSize = fSize + "px";
                                    }
                                    if (this._stateValues.textToSpeech)
                                        this.textToSpeech(`Text Size ${isIncrease ? "Increased" : "Decreased"}`);
                                }
                            }
                            else if (this.options.textEmlMode) {
                                let fp = this._html.style.fontSize;
                                if (fp.indexOf("%")) {
                                    fp = parseInt(fp.replace("%", ""));
                                    this._html.style.fontSize = fp + factor + "%";
                                    if (this._stateValues.textToSpeech)
                                        this.textToSpeech(`Text Size ${isIncrease ? "Increased" : "Decreased"}`);
                                }
                                else {
                                    this._common.warn("Accessibility.textEmlMode, html element is not set in %.");
                                }
                            }
                            else {
                                let fSize = this._common.getFormattedDim(getComputedStyle(this._body).fontSize);
                                if (typeof this._stateValues.body.fontSize === "undefined")
                                    this._stateValues.body.fontSize = fSize.size + fSize.suffix;
                                if (fSize && fSize.suffix && !isNaN(fSize.size * 1)) {
                                    this._body.style.fontSize =
                                        fSize.size * 1 + factor + fSize.suffix;
                                }
                            }
                        }
                        alterLineHeight(isIncrease) {
                            this.sessionState.lineHeight += isIncrease ? 1 : -1;
                            this.onChange(true);
                            let factor = 2;
                            if (!isIncrease)
                                factor *= -1;
                            if (this.options.textEmlMode)
                                factor *= 10;
                            let all = document.querySelectorAll("*:not(._access)");
                            let exclude = Array.prototype.slice.call(document.querySelectorAll("._access-menu *"));
                            for (let i = 0; i < all.length; i++) {
                                if (exclude.includes(all[i])) {
                                    continue;
                                }
                                if (this.options.textPixelMode) {
                                    let lHeight = getComputedStyle(all[i]).lineHeight;
                                    if (lHeight && lHeight.indexOf("px") > -1) {
                                        if (!all[i].getAttribute("data-init-line-height"))
                                            all[i].setAttribute("data-init-line-height", lHeight);
                                        const newPixel = parseInt(lHeight.replace("px", "")) + factor;
                                        all[i].style.lineHeight = `${newPixel}px`;
                                    }
                                    if (this._stateValues.textToSpeech)
                                        this.textToSpeech(`Line Height ${isIncrease ? "Increased" : "Decreased"}`);
                                }
                                else if (this.options.textEmlMode) {
                                    let lTextSize = getComputedStyle(all[i]).fontSize;
                                    let lHeight = getComputedStyle(all[i]).lineHeight;
                                    if (lHeight === "normal")
                                        lHeight =
                                            (parseInt(lTextSize.replace("px", "")) * 1.2).toString() + "px";
                                    let lHeight2 = lHeight.replace("px", "");
                                    let lTextSize2 = lTextSize.replace("px", "");
                                    let inPercent = (parseInt(lHeight2) * 100) / parseInt(lTextSize2);
                                    if (lHeight && lHeight.indexOf("px") > -1) {
                                        if (!all[i].getAttribute("data-init-line-height"))
                                            all[i].setAttribute("data-init-line-height", inPercent + "%");
                                        inPercent = inPercent + factor;
                                        all[i].style.lineHeight = inPercent + "%";
                                    }
                                    if (this._stateValues.textToSpeech)
                                        this.textToSpeech(`Line height ${isIncrease ? "Increased" : "Decreased"}`);
                                }
                            }
                        }
                        alterTextSpace(isIncrease) {
                            this._sessionState.textSpace += isIncrease ? 1 : -1;
                            this.onChange(true);
                            let factor = 2;
                            if (!isIncrease)
                                factor *= -1;
                            if (this.options.textPixelMode) {
                                let all = document.querySelectorAll("*:not(._access)");
                                let exclude = Array.prototype.slice.call(document.querySelectorAll("._access-menu *"));
                                for (let i = 0; i < all.length; i++) {
                                    if (exclude.includes(all[i])) {
                                        continue;
                                    }
                                    // wordSpacing
                                    let fSpacing = all[i].style.wordSpacing;
                                    if (fSpacing && fSpacing.indexOf("px") > -1) {
                                        if (!all[i].getAttribute("data-init-word-spacing"))
                                            all[i].setAttribute("data-init-word-spacing", fSpacing);
                                        fSpacing = fSpacing.replace("px", "") * 1 + factor;
                                        all[i].style.wordSpacing = fSpacing + "px";
                                    }
                                    else {
                                        all[i].setAttribute("data-init-word-spacing", fSpacing);
                                        all[i].style.wordSpacing = factor + "px";
                                    }
                                    // letterSpacing
                                    let fSpacing2 = all[i].style.letterSpacing;
                                    if (fSpacing2 && fSpacing2.indexOf("px") > -1) {
                                        if (!all[i].getAttribute("data-init-letter-spacing"))
                                            all[i].setAttribute("data-init-letter-spacing", fSpacing2);
                                        fSpacing2 = fSpacing2.replace("px", "") * 1 + factor;
                                        all[i].style.letterSpacing = fSpacing2 + "px";
                                    }
                                    else {
                                        all[i].setAttribute("data-init-letter-spacing", fSpacing2);
                                        all[i].style.letterSpacing = factor + "px";
                                    }
                                }
                                if (this._stateValues.textToSpeech)
                                    this.textToSpeech(`Text Spacing ${isIncrease ? "Increased" : "Decreased"}`);
                            }
                            else {
                                // wordSpacing
                                let fSpacing = this._common.getFormattedDim(getComputedStyle(this._body).wordSpacing);
                                if (typeof this._stateValues.body.wordSpacing === "undefined")
                                    this._stateValues.body.wordSpacing = "";
                                if (fSpacing && fSpacing.suffix && !isNaN(fSpacing.size * 1)) {
                                    this._body.style.wordSpacing =
                                        fSpacing.size * 1 + factor + fSpacing.suffix;
                                }
                                // letterSpacing
                                let fSpacing2 = this._common.getFormattedDim(getComputedStyle(this._body).letterSpacing);
                                if (typeof this._stateValues.body.letterSpacing === "undefined")
                                    this._stateValues.body.letterSpacing = "";
                                if (fSpacing2 && fSpacing2.sufix && !isNaN(fSpacing2.size * 1)) {
                                    this._body.style.letterSpacing =
                                        fSpacing2.size * 1 + factor + fSpacing2.sufix;
                                }
                                if (this._stateValues.textToSpeech)
                                    this.textToSpeech(`Text Spacing ${isIncrease ? "Increased" : "Decreased"}`);
                            }
                        }
                        speechToText() {
                            if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
                                this._recognition = new (window.SpeechRecognition ||
                                    window.webkitSpeechRecognition)();
                                this._recognition.continuous = true;
                                this._recognition.interimResults = true;
                                this._recognition.onstart = () => {
                                    // TODO red color on mic icon
                                    // console.log('listening . . .');
                                    // if (this.speechToTextTarget)
                                    //     this.speechToTextTarget.parentElement.classList.add('_access-listening');
                                    this._body.classList.add("_access-listening");
                                };
                                this._recognition.onend = () => {
                                    this._body.classList.remove("_access-listening");
                                };
                                this._recognition.onresult = (event) => {
                                    let finalTranscript = "";
                                    if (typeof event.results === "undefined") {
                                        return;
                                    }
                                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                                        if (event.results[i].isFinal) {
                                            finalTranscript += event.results[i][0].transcript;
                                        }
                                    }
                                    if (finalTranscript && this._speechToTextTarget) {
                                        this._speechToTextTarget.parentElement.classList.remove("_access-listening");
                                        if (this._speechToTextTarget.tagName.toLowerCase() === "input" ||
                                            this._speechToTextTarget.tagName.toLowerCase() === "textarea") {
                                            this._speechToTextTarget.value =
                                                finalTranscript;
                                        }
                                        else if (this._speechToTextTarget.getAttribute("contenteditable") !== null) {
                                            this._speechToTextTarget.innerText = finalTranscript;
                                        }
                                    }
                                };
                                this._recognition.lang = this.options.language.speechToTextLang;
                                this._recognition.start();
                            }
                        }
                        textToSpeech(text) {
                            const windowAny = window;
                            if (!windowAny.SpeechSynthesisUtterance || !windowAny.speechSynthesis)
                                return;
                            let msg = new windowAny.SpeechSynthesisUtterance(text);
                            msg.lang = this.options.language.textToSpeechLang;
                            msg.lang = this.options.textToSpeechLang;
                            msg.rate = this._stateValues.speechRate;
                            msg.onend = () => {
                                this._isReading = false;
                            };
                            let voices = windowAny.speechSynthesis.getVoices();
                            let isLngSupported = false;
                            for (let i = 0; i < voices.length; i++) {
                                if (voices[i].lang === msg.lang) {
                                    msg.voice = voices[i];
                                    isLngSupported = true;
                                    break;
                                }
                            }
                            if (!isLngSupported) {
                                this._common.warn("text to speech language not supported!");
                            }
                            if (window.speechSynthesis.pending ||
                                window.speechSynthesis.speaking) {
                                window.speechSynthesis.pause;
                                window.speechSynthesis.cancel();
                            }
                            window.speechSynthesis.speak(msg);
                            this._isReading = true;
                        }
                        createScreenShot(url) {
                            return new Promise((resolve) => {
                                let canvas = document.createElement("canvas");
                                let img = new Image();
                                canvas.style.position = "fixed";
                                canvas.style.top = "0";
                                canvas.style.left = "0";
                                canvas.style.opacity = "0";
                                canvas.style.transform = "scale(0.05)";
                                img.crossOrigin = "anonymous";
                                img.onload = () => __awaiter(this, void 0, void 0, function* () {
                                    document.body.appendChild(canvas);
                                    const ctx = canvas.getContext("2d");
                                    canvas.width = img.naturalWidth;
                                    canvas.height = img.naturalHeight;
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    ctx.drawImage(img, 0, 0);
                                    let res;
                                    try {
                                        res = canvas.toDataURL("image/png");
                                    }
                                    catch (e) { }
                                    resolve(res);
                                    canvas.remove();
                                });
                                img.onerror = () => {
                                    resolve(_common__WEBPACK_IMPORTED_MODULE_1__.Common.DEFAULT_PIXEL);
                                };
                                img.src = url;
                            });
                        }
                        listen() {
                            if (typeof this._recognition === "object" &&
                                typeof this._recognition.stop === "function")
                                this._recognition.stop();
                            this._speechToTextTarget = window.event.target;
                            this.speechToText();
                        }
                        read(e) {
                            try {
                                e = window.event || e || arguments[0];
                                if (e && e.preventDefault) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }
                            catch (ex) { }
                            let allContent = Array.prototype.slice.call(document.querySelectorAll("._access-menu *"));
                            for (const key in allContent) {
                                if (allContent[key] === window.event.target &&
                                    e instanceof MouseEvent)
                                    return;
                            }
                            if (e instanceof KeyboardEvent &&
                                ((e.shiftKey && e.key === "Tab") || e.key === "Tab")) {
                                this.textToSpeech(window.event.target.innerText);
                                return;
                            }
                            if (this._isReading) {
                                window.speechSynthesis.cancel();
                                this._isReading = false;
                            }
                            else
                                this.textToSpeech(window.event.target.innerText);
                        }
                        runHotkey(name) {
                            switch (name) {
                                case "toggleMenu":
                                    this.toggleMenu();
                                    break;
                                default:
                                    if (typeof this.menuInterface[name] === "function") {
                                        if (this._options.modules[name]) {
                                            this.menuInterface[name](false);
                                        }
                                    }
                                    break;
                            }
                        }
                        toggleMenu() {
                            const shouldClose = this._menu.classList.contains("close");
                            setTimeout(() => {
                                this._menu.querySelector("ul").classList.toggle("before-collapse");
                            }, shouldClose ? 500 : 10);
                            this._menu.classList.toggle("close");
                            this.options.icon.tabIndex = shouldClose ? 0 : -1;
                            this._menu.childNodes.forEach((child) => {
                                child.tabIndex = 0;
                                if (child.hasChildNodes()) {
                                    child.tabIndex = -1;
                                    child.childNodes.forEach((li) => {
                                        li.tabIndex = shouldClose ? 0 : -1;
                                    });
                                }
                            });
                        }
                        invoke(action, button) {
                            if (typeof this.menuInterface[action] === "function")
                                this.menuInterface[action](undefined, button);
                        }
                        onKeyDown(e) {
                            let act = Object.entries(this.options.hotkeys.keys).find(function (val) {
                                let pass = true;
                                for (var i = 0; i < val[1].length; i++) {
                                    if (Number.isInteger(val[1][i])) {
                                        if (e.keyCode !== val[1][i]) {
                                            pass = false;
                                        }
                                    }
                                    else {
                                        if (e[val[1][i]] === undefined ||
                                            e[val[1][i]] === false) {
                                            pass = false;
                                        }
                                    }
                                }
                                return pass;
                            });
                            if (act !== undefined) {
                                this.runHotkey(act[0]);
                            }
                        }
                        build() {
                            this._stateValues = {
                                underlineLinks: false,
                                textToSpeech: false,
                                bigCursor: false,
                                readingGuide: false,
                                speechRate: 1,
                                body: {},
                                html: {},
                            };
                            this._body =
                                document.body || document.getElementsByTagName("body")[0];
                            this._html =
                                document.documentElement || document.getElementsByTagName("html")[0];
                            if (this.options.textEmlMode)
                                this.initFontSize();
                            this.injectCss(!this.options.suppressCssInjection && !this.options.suppressDomInjection);
                            if (!this.options.suppressDomInjection) {
                                this._icon = this.injectIcon();
                                this._menu = this.injectMenu();
                                this.injectTts();
                                setTimeout(() => {
                                    this.addListeners();
                                    this.disableUnsupportedModulesAndSort();
                                }, 10);
                                if (this.options.hotkeys.enabled) {
                                    document.addEventListener("keydown", this._onKeyDownBind, false);
                                }
                                this._icon.addEventListener("click", () => {
                                    this.toggleMenu();
                                }, false);
                                this._icon.addEventListener("keyup", (event) => {
                                    if (event.key === "Enter") {
                                        this.toggleMenu();
                                    }
                                }, false);
                                setTimeout(() => {
                                    this._icon.style.opacity = "1";
                                }, 10);
                            }
                            this.updateReadGuide = (e) => {
                                let newPos = 0;
                                if (e.type === "touchmove") {
                                    newPos = e.changedTouches[0].clientY;
                                }
                                else {
                                    newPos = e.y;
                                }
                                document.getElementById("access_read_guide_bar").style.top =
                                    newPos -
                                    (parseInt(this.options.guide.height.replace("px", "")) + 5) +
                                    "px";
                            };
                            this.menuInterface = new _menu_interface__WEBPACK_IMPORTED_MODULE_3__.MenuInterface(this);
                            if (this.options.session.persistent)
                                this.setSessionFromCache();
                        }
                        updateReadGuide(e) {
                            let newPos = 0;
                            if (e.type === "touchmove") {
                                newPos = e.changedTouches[0].clientY;
                            }
                            else {
                                newPos = e.y;
                            }
                            document.getElementById("access_read_guide_bar").style.top =
                                newPos -
                                (parseInt(this.options.guide.height.replace("px", "")) + 5) +
                                "px";
                        }
                        resetIfDefined(src, dest, prop) {
                            if (typeof src !== "undefined")
                                dest[prop] = src;
                        }
                        onChange(updateSession) {
                            if (updateSession && this.options.session.persistent)
                                this.saveSession();
                        }
                        saveSession() {
                            this._storage.set("_accessState", this.sessionState);
                        }
                        setSessionFromCache() {
                            let sessionState = this._storage.get("_accessState");
                            if (sessionState) {
                                if (sessionState.textSize) {
                                    let textSize = sessionState.textSize;
                                    if (textSize > 0) {
                                        while (textSize--) {
                                            this.alterTextSize(true);
                                        }
                                    }
                                    else {
                                        while (textSize++) {
                                            this.alterTextSize(false);
                                        }
                                    }
                                }
                                if (sessionState.textSpace) {
                                    let textSpace = sessionState.textSpace;
                                    if (textSpace > 0) {
                                        while (textSpace--) {
                                            this.alterTextSpace(true);
                                        }
                                    }
                                    else {
                                        while (textSpace++) {
                                            this.alterTextSpace(false);
                                        }
                                    }
                                }
                                if (sessionState.lineHeight) {
                                    let lineHeight = sessionState.lineHeight;
                                    if (lineHeight > 0) {
                                        while (lineHeight--) {
                                            this.alterLineHeight(true);
                                        }
                                    }
                                    else {
                                        while (lineHeight--) {
                                            this.alterLineHeight(false);
                                        }
                                    }
                                }
                                if (sessionState.invertColors)
                                    this.menuInterface.invertColors();
                                if (sessionState.grayHues)
                                    this.menuInterface.grayHues();
                                if (sessionState.underlineLinks)
                                    this.menuInterface.underlineLinks();
                                if (sessionState.bigCursor)
                                    this.menuInterface.bigCursor();
                                if (sessionState.readingGuide)
                                    this.menuInterface.readingGuide();
                                this.sessionState = sessionState;
                            }
                        }
                        destroy() {
                            const allSelectors = this._common.deployedObjects.getAll();
                            allSelectors.forEach((value, key) => {
                                const elem = document.querySelector(key);
                                if (elem)
                                    elem.parentElement.removeChild(elem);
                            });
                            document.removeEventListener("keydown", this._onKeyDownBind, false);
                        }
                    }
                    Accessibility.CSS_CLASS_NAME = "_access-main-css";
                    Accessibility.MENU_WIDTH = "25vw";
                    Accessibility.init = (opt) => {
                        console.warn('"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead');
                        new Accessibility(opt);
                    };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Accessibility);


                    /***/
}),

/***/ "./menu-interface.ts":
/*!***************************!*\
  !*** ./menu-interface.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    "use strict";
                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuInterface": () => (/* binding */ MenuInterface)
                        /* harmony export */
});
                    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
                        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                        return new (P || (P = Promise))(function (resolve, reject) {
                            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                            step((generator = generator.apply(thisArg, _arguments || [])).next());
                        });
                    };
                    class MenuInterface {
                        constructor(accessibility) {
                            this._acc = accessibility;
                            this.readBind = this._acc.read.bind(this._acc);
                        }
                        increaseText() {
                            this._acc.alterTextSize(true);
                        }
                        decreaseText() {
                            this._acc.alterTextSize(false);
                        }
                        increaseTextSpacing() {
                            this._acc.alterTextSpace(true);
                        }
                        decreaseTextSpacing() {
                            this._acc.alterTextSpace(false);
                        }
                        invertColors(destroy) {
                            if (typeof this._acc.stateValues.html.backgroundColor === "undefined")
                                this._acc.stateValues.html.backgroundColor = getComputedStyle(this._acc.html).backgroundColor;
                            if (typeof this._acc.stateValues.html.color === "undefined")
                                this._acc.stateValues.html.color = getComputedStyle(this._acc.html).color;
                            if (destroy) {
                                this._acc.resetIfDefined(this._acc.stateValues.html.backgroundColor, this._acc.html.style, "backgroundColor");
                                this._acc.resetIfDefined(this._acc.stateValues.html.color, this._acc.html.style, "color");
                                if (!this._acc.options.suppressDomInjection)
                                    document
                                        .querySelector('._access-menu [data-access-action="invertColors"]')
                                        .classList.remove("active");
                                this._acc.stateValues.invertColors = false;
                                this._acc.sessionState.invertColors = this._acc.stateValues.invertColors;
                                this._acc.onChange(true);
                                this._acc.html.style.filter = "";
                                return;
                            }
                            if (this._acc.stateValues.invertColors &&
                                this._acc.stateValues.textToSpeech) {
                                this._acc.textToSpeech("Colors Set To Normal");
                            }
                            if (!this._acc.options.suppressDomInjection)
                                document
                                    .querySelector('._access-menu [data-access-action="invertColors"]')
                                    .classList.toggle("active");
                            this._acc.stateValues.invertColors = !this._acc.stateValues.invertColors;
                            this._acc.sessionState.invertColors = this._acc.stateValues.invertColors;
                            this._acc.onChange(true);
                            if (this._acc.stateValues.invertColors) {
                                if (this._acc.stateValues.grayHues)
                                    this._acc.menuInterface.grayHues(true);
                                this._acc.html.style.filter = "invert(1)";
                                if (this._acc.stateValues.textToSpeech) {
                                    this._acc.textToSpeech("Colors Inverted");
                                }
                            }
                            else {
                                this._acc.html.style.filter = "";
                            }
                        }
                        grayHues(destroy) {
                            if (typeof this._acc.stateValues.html.filter === "undefined")
                                this._acc.stateValues.html.filter = getComputedStyle(this._acc.html).filter;
                            if (typeof this._acc.stateValues.html.webkitFilter === "undefined")
                                this._acc.stateValues.html.webkitFilter = getComputedStyle(this._acc.html).webkitFilter;
                            if (typeof this._acc.stateValues.html.mozFilter === "undefined")
                                this._acc.stateValues.html.mozFilter = getComputedStyle(this._acc.html).mozFilter;
                            if (typeof this._acc.stateValues.html.msFilter === "undefined")
                                this._acc.stateValues.html.msFilter = getComputedStyle(this._acc.html).msFilter;
                            if (destroy) {
                                if (!this._acc.options.suppressDomInjection)
                                    document
                                        .querySelector('._access-menu [data-access-action="grayHues"]')
                                        .classList.remove("active");
                                this._acc.stateValues.grayHues = false;
                                this._acc.sessionState.grayHues = this._acc.stateValues.grayHues;
                                this._acc.onChange(true);
                                this._acc.resetIfDefined(this._acc.stateValues.html.filter, this._acc.html.style, "filter");
                                this._acc.resetIfDefined(this._acc.stateValues.html.webkitFilter, this._acc.html.style, "webkitFilter");
                                this._acc.resetIfDefined(this._acc.stateValues.html.mozFilter, this._acc.html.style, "mozFilter");
                                this._acc.resetIfDefined(this._acc.stateValues.html.msFilter, this._acc.html.style, "msFilter");
                                return;
                            }
                            if (!this._acc.options.suppressDomInjection)
                                document
                                    .querySelector('._access-menu [data-access-action="grayHues"]')
                                    .classList.toggle("active");
                            this._acc.stateValues.grayHues = !this._acc.stateValues.grayHues;
                            this._acc.sessionState.grayHues = this._acc.stateValues.grayHues;
                            this._acc.onChange(true);
                            if (this._acc.stateValues.textToSpeech && !this._acc.stateValues.grayHues)
                                this._acc.textToSpeech("Gray Hues Disabled.");
                            let val;
                            if (this._acc.stateValues.grayHues) {
                                val = "grayscale(1)";
                                if (this._acc.stateValues.invertColors) {
                                    this.invertColors(true);
                                }
                                if (this._acc.stateValues.textToSpeech) {
                                    this._acc.textToSpeech("Gray Hues Enabled.");
                                }
                            }
                            else {
                                val = "";
                            }
                            this._acc.html.style.webkitFilter = val;
                            this._acc.html.style.mozFilter = val;
                            this._acc.html.style.msFilter = val;
                            this._acc.html.style.filter = val;
                        }
                        underlineLinks(destroy) {
                            let className = "_access-underline";
                            let remove = () => {
                                let style = document.querySelector("." + className);
                                if (style) {
                                    style.parentElement.removeChild(style);
                                    this._acc.common.deployedObjects.remove("." + className);
                                }
                            };
                            if (destroy) {
                                this._acc.stateValues.underlineLinks = false;
                                this._acc.sessionState.underlineLinks =
                                    this._acc.stateValues.underlineLinks;
                                this._acc.onChange(true);
                                if (!this._acc.options.suppressDomInjection)
                                    document
                                        .querySelector('._access-menu [data-access-action="underlineLinks"]')
                                        .classList.remove("active");
                                return remove();
                            }
                            if (!this._acc.options.suppressDomInjection)
                                document
                                    .querySelector('._access-menu [data-access-action="underlineLinks"]')
                                    .classList.toggle("active");
                            this._acc.stateValues.underlineLinks =
                                !this._acc.stateValues.underlineLinks;
                            this._acc.sessionState.underlineLinks =
                                this._acc.stateValues.underlineLinks;
                            this._acc.onChange(true);
                            if (this._acc.stateValues.underlineLinks) {
                                let css = `
            body a {
                text-decoration: underline !important;
            }
        `;
                                this._acc.common.injectStyle(css, { className: className });
                                this._acc.common.deployedObjects.set("." + className, true);
                                if (this._acc.stateValues.textToSpeech) {
                                    this._acc.textToSpeech("Links UnderLined");
                                }
                            }
                            else {
                                if (this._acc.stateValues.textToSpeech) {
                                    this._acc.textToSpeech("Links UnderLine Removed");
                                }
                                remove();
                            }
                        }
                        bigCursor(destroy) {
                            if (destroy) {
                                this._acc.html.classList.remove("_access_cursor");
                                if (!this._acc.options.suppressDomInjection)
                                    document
                                        .querySelector('._access-menu [data-access-action="bigCursor"]')
                                        .classList.remove("active");
                                this._acc.stateValues.bigCursor = false;
                                this._acc.sessionState.bigCursor = false;
                                this._acc.onChange(true);
                                return;
                            }
                            if (!this._acc.options.suppressDomInjection)
                                document
                                    .querySelector('._access-menu [data-access-action="bigCursor"]')
                                    .classList.toggle("active");
                            this._acc.stateValues.bigCursor = !this._acc.stateValues.bigCursor;
                            this._acc.sessionState.bigCursor = this._acc.stateValues.bigCursor;
                            this._acc.onChange(true);
                            this._acc.html.classList.toggle("_access_cursor");
                            if (this._acc.stateValues.textToSpeech && this._acc.stateValues.bigCursor)
                                this._acc.textToSpeech("Big Cursor Enabled");
                            if (this._acc.stateValues.textToSpeech && !this._acc.stateValues.bigCursor)
                                this._acc.textToSpeech("Big Cursor Disabled");
                        }
                        readingGuide(destroy) {
                            if (destroy) {
                                if (document.getElementById("access_read_guide_bar")) {
                                    document.getElementById("access_read_guide_bar").remove();
                                }
                                if (!this._acc.options.suppressDomInjection)
                                    document
                                        .querySelector('._access-menu [data-access-action="readingGuide"]')
                                        .classList.remove("active");
                                this._acc.stateValues.readingGuide = false;
                                this._acc.sessionState.readingGuide = this._acc.stateValues.readingGuide;
                                this._acc.onChange(true);
                                document.body.removeEventListener("touchmove", this._acc.updateReadGuide, false);
                                document.body.removeEventListener("mousemove", this._acc.updateReadGuide, false);
                                if (this._acc.stateValues.textToSpeech)
                                    this._acc.textToSpeech("Reading Guide Enabled");
                                return;
                            }
                            if (!this._acc.options.suppressDomInjection)
                                document
                                    .querySelector('._access-menu [data-access-action="readingGuide"]')
                                    .classList.toggle("active");
                            this._acc.stateValues.readingGuide = !this._acc.stateValues.readingGuide;
                            this._acc.sessionState.readingGuide = this._acc.stateValues.readingGuide;
                            this._acc.onChange(true);
                            if (this._acc.stateValues.readingGuide) {
                                let read = document.createElement("div");
                                read.id = "access_read_guide_bar";
                                read.classList.add("access_read_guide_bar");
                                document.body.append(read);
                                document.body.addEventListener("touchmove", this._acc.updateReadGuide, false);
                                document.body.addEventListener("mousemove", this._acc.updateReadGuide, false);
                            }
                            else {
                                if (document.getElementById("access_read_guide_bar") !== undefined) {
                                    document.getElementById("access_read_guide_bar").remove();
                                }
                                document.body.removeEventListener("touchmove", this._acc.updateReadGuide, false);
                                document.body.removeEventListener("mousemove", this._acc.updateReadGuide, false);
                                if (this._acc.stateValues.textToSpeech)
                                    this._acc.textToSpeech("Reading Guide Disabled");
                            }
                        }
                        textToSpeech(destroy) {
                            // this.sessionState.textToSpeech = typeof destroy === 'undefined' ? true : false;
                            const tSpeechList = document.querySelector('._access-menu [data-access-action="textToSpeech"]');
                            if (!tSpeechList)
                                return;
                            let step1 = document.getElementsByClassName("screen-reader-wrapper-step-1");
                            let step2 = document.getElementsByClassName("screen-reader-wrapper-step-2");
                            let step3 = document.getElementsByClassName("screen-reader-wrapper-step-3");
                            this._acc.onChange(false);
                            const className = "_access-text-to-speech";
                            let remove = () => {
                                let style = document.querySelector("." + className);
                                if (style) {
                                    style.parentElement.removeChild(style);
                                    document.removeEventListener("click", this.readBind, false);
                                    document.removeEventListener("keyup", this.readBind, false);
                                    this._acc.common.deployedObjects.remove("." + className);
                                }
                                if (window.speechSynthesis)
                                    window.speechSynthesis.cancel();
                                this._acc.isReading = false;
                            };
                            if (destroy) {
                                tSpeechList.classList.remove("active");
                                step1[0].classList.remove("active");
                                step2[0].classList.remove("active");
                                step3[0].classList.remove("active");
                                this._acc.stateValues.textToSpeech = false;
                                window.speechSynthesis.cancel();
                                return remove();
                            }
                            if (this._acc.stateValues.speechRate === 1 &&
                                !tSpeechList.classList.contains("active")) {
                                this._acc.stateValues.textToSpeech = true;
                                this._acc.textToSpeech("Screen Reader enabled. Reading Pace - Normal");
                                tSpeechList.classList.add("active");
                                step1[0].classList.add("active");
                                step2[0].classList.add("active");
                                step3[0].classList.add("active");
                            }
                            else if (this._acc.stateValues.speechRate === 1 &&
                                tSpeechList.classList.contains("active")) {
                                this._acc.stateValues.speechRate = 1.5;
                                this._acc.textToSpeech("Reading Pace - Fast");
                                step1[0].classList.remove("active");
                            }
                            else if (this._acc.stateValues.speechRate === 1.5 &&
                                tSpeechList.classList.contains("active")) {
                                this._acc.stateValues.speechRate = 0.7;
                                this._acc.textToSpeech("Reading Pace - Slow");
                                step2[0].classList.remove("active");
                            }
                            else {
                                this._acc.stateValues.speechRate = 1;
                                this._acc.textToSpeech("Screen Reader - Disabled");
                                tSpeechList.classList.remove("active");
                                step3[0].classList.remove("active");
                                let timeout = setInterval(() => {
                                    if (this._acc.isReading) {
                                        return;
                                    }
                                    this._acc.stateValues.textToSpeech = false;
                                    remove();
                                    clearTimeout(timeout);
                                }, 500);
                                return;
                            }
                            let css = `
            *:hover {
                box-shadow: 2px 2px 2px rgba(180,180,180,0.7);
            }
        `;
                            if (tSpeechList.classList.contains("active") &&
                                this._acc.stateValues.speechRate === 1) {
                                this._acc.common.injectStyle(css, { className: className });
                                this._acc.common.deployedObjects.set("." + className, true);
                                document.addEventListener("click", this.readBind, false);
                                document.addEventListener("keyup", this.readBind, false);
                            }
                        }
                        speechToText(destroy) {
                            // this.sessionState.speechToText = typeof destroy === 'undefined' ? true : false;
                            const sTextList = document.querySelector('._access-menu [data-access-action="speechToText"]');
                            if (!sTextList)
                                return;
                            this._acc.onChange(false);
                            let className = "_access-speech-to-text";
                            let remove = () => {
                                if (this._acc.recognition) {
                                    this._acc.recognition.stop();
                                    this._acc.body.classList.remove("_access-listening");
                                }
                                let style = document.querySelector("." + className);
                                if (style) {
                                    style.parentElement.removeChild(style);
                                    this._acc.common.deployedObjects.remove("." + className);
                                }
                                let inputs = document.querySelectorAll("._access-mic");
                                for (let i = 0; i < inputs.length; i++) {
                                    inputs[i].removeEventListener("focus", this._acc.listen.bind(this._acc), false);
                                    inputs[i].classList.remove("_access-mic");
                                }
                                sTextList.classList.remove("active");
                            };
                            if (destroy) {
                                this._acc.stateValues.speechToText = false;
                                return remove();
                            }
                            this._acc.stateValues.speechToText = !this._acc.stateValues.speechToText;
                            if (this._acc.stateValues.speechToText) {
                                let css = `
                body:after {
                    content: ${!this._acc.options.icon.useEmojis
                                        ? '"mic"'
                                        : 'var(--_access-menu-item-icon-mic,"🎤")'};
                    ${!this._acc.options.icon.useEmojis
                                        ? `font-family: var(--_access-menu-item-icon-font-family-after, ${this._acc.fixedDefaultFont}`
                                        : ""}
                    position: fixed;
                    z-index: 1100;
                    top: 1vw;
                    right: 1vw;
                    width: 36px;
                    height: 36px;
                    font-size: 30px;
                    line-height: 36px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.7);
                    display: flex;
                    justify-content: center;
                    aling-items: center;
                }

                body._access-listening:after {
                    animation: _access-listening-animation 2s infinite ease;
                }

                @keyframes _access-listening-animation {
                    0%  {background-color: transparent;}
                    50%  {background-color: #EF9A9A;}
                }
            `;
                                this._acc.common.injectStyle(css, { className: className });
                                this._acc.common.deployedObjects.set("." + className, true);
                                let inputs = document.querySelectorAll('input[type="text"], input[type="search"], textarea, [contenteditable]');
                                for (let i = 0; i < inputs.length; i++) {
                                    inputs[i].addEventListener("blur", () => {
                                        if (typeof this._acc.recognition === "object" &&
                                            typeof this._acc.recognition.stop === "function")
                                            this._acc.recognition.stop();
                                    }, false);
                                    inputs[i].addEventListener("focus", this._acc.listen.bind(this._acc), false);
                                    inputs[i].parentElement.classList.add("_access-mic");
                                }
                                sTextList.classList.add("active");
                            }
                            else
                                remove();
                        }
                        disableAnimations(destroy) {
                            const className = "_access-disable-animations", autoplayStopped = "data-autoplay-stopped";
                            const remove = () => {
                                if (!this._acc.options.suppressDomInjection)
                                    document
                                        .querySelector('._access-menu [data-access-action="disableAnimations"]')
                                        .classList.remove("active");
                                this._acc.stateValues.disableAnimations = false;
                                let style = document.querySelector("." + className);
                                if (style) {
                                    style.parentElement.removeChild(style);
                                    this._acc.common.deployedObjects.remove("." + className);
                                }
                                let allImages = document.querySelectorAll("[data-org-src]");
                                allImages.forEach((i) => __awaiter(this, void 0, void 0, function* () {
                                    const screenshot = i.src;
                                    i.setAttribute("src", i.getAttribute("data-org-src"));
                                    i.setAttribute("data-org-src", screenshot);
                                }));
                                const allVideos = document.querySelectorAll(`video[${autoplayStopped}]`);
                                allVideos.forEach((v) => {
                                    v.setAttribute("autoplay", "");
                                    v.removeAttribute(autoplayStopped);
                                    v.play();
                                });
                            };
                            if (destroy) {
                                remove();
                                return;
                            }
                            this._acc.stateValues.disableAnimations =
                                !this._acc.stateValues.disableAnimations;
                            if (!this._acc.stateValues.disableAnimations) {
                                remove();
                                return;
                            }
                            if (!this._acc.options.suppressDomInjection)
                                document
                                    .querySelector('._access-menu [data-access-action="disableAnimations"]')
                                    .classList.add("active");
                            let css = `
                body * {
                    animation-duration: 0.0ms !important;
                    transition-duration: 0.0ms !important;
                }
        `;
                            this._acc.common.injectStyle(css, { className: className });
                            this._acc.common.deployedObjects.set("." + className, true);
                            const allImages = document.querySelectorAll("img");
                            allImages.forEach((i) => __awaiter(this, void 0, void 0, function* () {
                                let ext = this._acc.common.getFileExtension(i.src);
                                if (ext && ext.toLowerCase() === "gif") {
                                    let screenshot = i.getAttribute("data-org-src");
                                    if (!screenshot)
                                        screenshot = yield this._acc.common.createScreenshot(i.src);
                                    i.setAttribute("data-org-src", i.src);
                                    i.src = screenshot;
                                }
                            }));
                            const allVideos = document.querySelectorAll("video[autoplay]");
                            allVideos.forEach((v) => {
                                v.setAttribute(autoplayStopped, "");
                                v.removeAttribute("autoplay");
                                v.pause();
                            });
                        }
                        iframeModals(destroy, button) {
                            if (!button)
                                destroy = true;
                            const close = () => {
                                if (this._dialog) {
                                    this._dialog.classList.add("closing");
                                    setTimeout(() => {
                                        this._dialog.classList.remove("closing");
                                        this._dialog.close();
                                        this._dialog.remove();
                                    }, 350);
                                    detach();
                                }
                                if (button)
                                    button.classList.remove("active");
                            };
                            const onClose = () => {
                                close();
                            };
                            const detach = () => {
                                this._dialog
                                    .querySelector("button")
                                    .removeEventListener("click", onClose, false);
                                this._dialog.removeEventListener("close", onClose);
                            };
                            if (destroy) {
                                close();
                            }
                            else {
                                button.classList.add("active");
                                if (!this._dialog)
                                    this._dialog = document.createElement("dialog");
                                this._dialog.classList.add("_access");
                                this._dialog.innerHTML = "";
                                this._dialog.appendChild(this._acc.common.jsonToHtml({
                                    type: "div",
                                    children: [
                                        {
                                            type: "div",
                                            children: [
                                                {
                                                    type: "button",
                                                    attrs: {
                                                        role: "button",
                                                        class: this._acc.options.icon.useEmojis
                                                            ? ""
                                                            : this._acc.options.icon.fontClass,
                                                        style: `position: absolute;
                                    top: 5px;
                                    cursor: pointer;
                                    font-size: 24px !important;
                                    font-weight: bold;
                                    background: transparent;
                                    border: none;
                                    left: 5px;
                                    color: #d63c3c;
                                    padding: 0;`,
                                                    },
                                                    children: [
                                                        {
                                                            type: "#text",
                                                            text: this._acc.options.icon.useEmojis ? "X" : "close",
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            type: "div",
                                            children: [
                                                {
                                                    type: "iframe",
                                                    attrs: {
                                                        src: button.getAttribute("data-access-url"),
                                                        style: "width: 50vw;height: 50vh;padding: 30px;",
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                }));
                                document.body.appendChild(this._dialog);
                                this._dialog
                                    .querySelector("button")
                                    .addEventListener("click", onClose, false);
                                this._dialog.addEventListener("close", onClose);
                                this._dialog.showModal();
                            }
                        }
                        customFunctions(destroy, button) {
                            if (!button)
                                return;
                            const cf = this._acc.options.customFunctions[parseInt(button.getAttribute("data-access-custom-index"))];
                            if (cf.toggle && button.classList.contains("active"))
                                destroy = true;
                            if (destroy) {
                                if (cf.toggle)
                                    button.classList.remove("active");
                                cf.method(cf, false);
                            }
                            else {
                                if (cf.toggle)
                                    button.classList.add("active");
                                cf.method(cf, true);
                            }
                        }
                        increaseLineHeight() {
                            this._acc.alterLineHeight(true);
                        }
                        decreaseLineHeight() {
                            this._acc.alterLineHeight(false);
                        }
                    }


                    /***/
}),

/***/ "./storage.ts":
/*!********************!*\
  !*** ./storage.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    "use strict";
                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Storage": () => (/* binding */ Storage)
                        /* harmony export */
});

                    class Storage {
                        constructor() { }
                        has(key) {
                            return window.localStorage.hasOwnProperty(key);
                        }
                        set(key, value) {
                            window.localStorage.setItem(key, JSON.stringify(value));
                        }
                        get(key) {
                            let item = window.localStorage.getItem(key);
                            try {
                                return JSON.parse(item);
                            }
                            catch (e) {
                                return item;
                            }
                        }
                        clear() {
                            window.localStorage.clear();
                        }
                        remove(key) {
                            window.localStorage.removeItem(key);
                        }
                        isSupported() {
                            let test = "_test";
                            try {
                                localStorage.setItem(test, test);
                                localStorage.removeItem(test);
                                return true;
                            }
                            catch (e) {
                                return false;
                            }
                        }
                    }


                    /***/
})

            /******/
});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
                /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
                /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
            /******/
}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
                /******/
};
            /******/
})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                        /******/
}
                    /******/
}
                /******/
};
            /******/
})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
            /******/
})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                    /******/
}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
                /******/
};
            /******/
})();
        /******/
        /************************************************************************/
        var __webpack_exports__ = {};
        // This entry need to be wrapped in an IIFE because it need to be in strict mode.
        (() => {
            "use strict";
            /*!**************************!*\
              !*** ./accessibility.ts ***!
              \**************************/
            __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Accessibility": () => (/* reexport safe */ _main__WEBPACK_IMPORTED_MODULE_0__["default"])
                /* harmony export */
});
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main */ "./main.ts");


            if (typeof window !== 'undefined')
                window.Accessibility = _main__WEBPACK_IMPORTED_MODULE_0__["default"];


        })();

/******/ 	return __webpack_exports__;
        /******/
})()
        ;
});
//# sourceMappingURL=main.bundle.js.map