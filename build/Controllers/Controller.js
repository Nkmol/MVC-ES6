(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _View = require("../Views/View");

var _View2 = _interopRequireDefault(_View);

var _Model = require("../Models/Model");

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);

        this._view = new _View2.default();
        this._model = new _Model2.default();
    }

    _createClass(Controller, [{
        key: "loadViewPromise",
        value: function loadViewPromise() {
            var _this = this;

            return this._view.loadView().then(function () {

                // Bind to view events
                $(_this._view).on('change', function (evt) {
                    try {
                        _this._model.validate(evt.val);
                    } catch (e) {
                        _this._view.showError(e.message);
                    }
                });
                $(_this._view).on('submit', function (evt) {
                    return _this._model.submit(evt.input);
                });
            });
        }
    }]);

    return Controller;
}();

exports.default = Controller;

},{"../Models/Model":2,"../Views/View":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_ALLOWED_VALUE = exports.MAX_ALLOWED_VALUE = 10;

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);
    }

    _createClass(Model, [{
        key: 'validate',
        value: function validate(input) {
            console.log(input <= MAX_ALLOWED_VALUE, input > 0, input);
            // This would normally be checked by HTML input attributes, but for the sake of testing.
            if (!(input <= MAX_ALLOWED_VALUE && input > 0)) throw new Error('Wrong input.');
        }
    }, {
        key: 'sumbit',
        value: function sumbit(data) {
            // Submit code etc
        }
    }]);

    return Model;
}();

exports.default = Model;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utility = function () {
    function Utility() {
        _classCallCheck(this, Utility);
    }

    _createClass(Utility, null, [{
        key: 'getView',

        // Load HTML view from Template folder
        // @return html/text
        value: function getView(url) {
            url = 'src/Templates/' + url;
            return fetch(url, {
                headers: {
                    'Content-Type': 'text/html'
                }
            }).then(function (response) {
                return response.text();
            }).catch(function (e) {
                return console.error(e);
            });
        }
    }]);

    return Utility;
}();

exports.default = Utility;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utility = require('../Utility');

var _Utility2 = _interopRequireDefault(_Utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View() {
        _classCallCheck(this, View);
    }

    _createClass(View, [{
        key: 'loadView',
        value: function loadView() {
            var _this = this;

            return _Utility2.default.getView('template').then(function (html) {
                // Load html inside DOM
                $('main').empty().append(html);

                // view event binding
                $('#inputNumber').on('change', function (e) {
                    _this.showError(); // reset error
                    $(_this).customTriggerHandler('change', {
                        val: $(e.target).val()
                    });
                });
                $('button').on('click', function () {
                    return $(_this).customTriggerHandler('submit', {
                        input: $('#inputNumber').val()
                    });
                });
            });
        }
    }, {
        key: 'showError',
        value: function showError() {
            var msg = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            $('main').find('.error').text(msg);
        }
    }]);

    return View;
}();

exports.default = View;

},{"../Utility":3}]},{},[1]);
