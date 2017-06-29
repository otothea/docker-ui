(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

var _AppStore = require('./stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_Router2.default, { store: new _AppStore2.default() }), document.getElementById('app'));
});
___scope___.file("Router.js", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobxReact = require("mobx-react");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _AppStore = require("~/stores/AppStore");

var _AppStore2 = _interopRequireDefault(_AppStore);

var _App = require("./components/App");

var _App2 = _interopRequireDefault(_App);

var _Images = require("./components/Images/Images");

var _Images2 = _interopRequireDefault(_Images);

var _Containers = require("./components/Containers/Containers");

var _Containers2 = _interopRequireDefault(_Containers);

var _Volumes = require("./components/Volumes/Volumes");

var _Volumes2 = _interopRequireDefault(_Volumes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    _classCallCheck(this, Router);

    return _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).apply(this, arguments));
  }

  _createClass(Router, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _mobxReact.Provider,
        { store: this.props.store },
        _react2.default.createElement(
          _reactRouter.Router,
          { history: _reactRouter.browserHistory },
          _react2.default.createElement(
            _reactRouter.Route,
            { path: "/", component: _App2.default },
            _react2.default.createElement(_reactRouter.IndexRedirect, { to: "images" }),
            _react2.default.createElement(_reactRouter.Route, { path: "images", component: _Images2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: "containers", component: _Containers2.default }),
            _react2.default.createElement(_reactRouter.Route, { path: "volumes", component: _Volumes2.default })
          )
        )
      );
    }
  }]);

  return Router;
}(_react2.default.Component);

exports.default = Router;
});
___scope___.file("stores/AppStore.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _Containers = require('./Containers/Containers');

var _Containers2 = _interopRequireDefault(_Containers);

var _Images = require('./Images/Images');

var _Images2 = _interopRequireDefault(_Images);

var _Volumes = require('./Volumes/Volumes');

var _Volumes2 = _interopRequireDefault(_Volumes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppStore = function AppStore() {
  _classCallCheck(this, AppStore);

  this.containers = new _Containers2.default(this);
  this.images = new _Images2.default(this);
  this.volumes = new _Volumes2.default(this);
};

exports.default = AppStore;
});
___scope___.file("stores/Containers/Containers.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _mobx = require('mobx');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Containers = (_class = function Containers(appStore) {
  _classCallCheck(this, Containers);

  _initDefineProp(this, 'error', _descriptor, this);

  _initDefineProp(this, 'containers', _descriptor2, this);

  _initDefineProp(this, 'inspect', _descriptor3, this);

  _initDefineProp(this, 'setError', _descriptor4, this);

  _initDefineProp(this, 'destroyContainer', _descriptor5, this);

  _initDefineProp(this, 'inspectContainer', _descriptor6, this);

  _initDefineProp(this, 'loadContainers', _descriptor7, this);

  _initDefineProp(this, 'pruneContainers', _descriptor8, this);

  _initDefineProp(this, 'renameContainer', _descriptor9, this);

  _initDefineProp(this, 'restartContainer', _descriptor10, this);

  _initDefineProp(this, 'startContainer', _descriptor11, this);

  _initDefineProp(this, 'stopContainer', _descriptor12, this);

  _initDefineProp(this, 'killContainer', _descriptor13, this);

  this.appStore = appStore;
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'error', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'containers', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'inspect', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'setError', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this = this;

    return function () {
      var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _this.error = (((err || {}).response || {}).data || {}).message || null;
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'destroyContainer', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (id) {
      _this2.setError();

      _axios2.default.delete('/api/v1/containers/' + id).then(function () {
        _this2.loadContainers();
      }).catch(_this2.setError);
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'inspectContainer', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (id) {
      _this3.setError();

      _axios2.default.get('/api/v1/containers/' + id).then(function (res) {
        _this3.inspect = res.data;
      }).catch(_this3.setError);
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'loadContainers', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.setError();

      _axios2.default.get('/api/v1/containers').then(function (res) {
        _this4.containers = (0, _lodash.sortBy)(res.data, function (container) {
          return -container.Created;
        }).map(function (container) {
          return {
            id: container.Id.substr(0, 12),
            image: container.Image,
            command: container.Command.length > 20 ? container.Command.substr(0, 17) + '...' : container.Command,
            created: _moment2.default.unix(container.Created).fromNow(),
            status: container.Status,
            ports: container.Ports.map(function (p) {
              return '' + ((p.IP || '') && (p.IP || '') + ':' + (p.PublicPort || '') + '->') + p.PrivatePort + '/' + p.Type;
            }).join(', '),
            names: container.Names.map(function (name) {
              return name.slice(1);
            }).join(', '),
            state: container.State
          };
        });
      }).catch(_this4.setError);
    };
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'pruneContainers', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      _this5.setError();

      _axios2.default.post('/api/v1/containers/prune').then(function () {
        _this5.loadContainers();
      }).catch(_this5.setError);
    };
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'renameContainer', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (id, name) {
      _this6.setError();

      _axios2.default.put('/api/v1/containers/' + id + '/rename', { name: name }).then(function () {
        _this6.loadContainers();
      }).catch(_this6.setError);
    };
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'restartContainer', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (id) {
      _this7.setError();

      _axios2.default.put('/api/v1/containers/' + id + '/restart', { name: name }).then(function () {
        _this7.loadContainers();
      }).catch(_this7.setError);
    };
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'startContainer', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (id) {
      _this8.setError();

      _axios2.default.put('/api/v1/containers/' + id + '/start', { name: name }).then(function () {
        _this8.loadContainers();
      }).catch(_this8.setError);
    };
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'stopContainer', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function (id) {
      _this9.setError();

      _axios2.default.put('/api/v1/containers/' + id + '/stop', { name: name }).then(function () {
        _this9.loadContainers();
      }).catch(_this9.setError);
    };
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'killContainer', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function (id) {
      _this10.setError();

      _axios2.default.put('/api/v1/containers/' + id + '/kill', { name: name }).then(function () {
        _this10.loadContainers();
      }).catch(_this10.setError);
    };
  }
})), _class);
exports.default = Containers;
});
___scope___.file("stores/Images/Images.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _mobx = require('mobx');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var sizeOf = function sizeOf(bytes) {
  if (Number(bytes) === 0) {
    return '0.00 B';
  }
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B';
};

var Images = (_class = function Images(appStore) {
  _classCallCheck(this, Images);

  _initDefineProp(this, 'error', _descriptor, this);

  _initDefineProp(this, 'images', _descriptor2, this);

  _initDefineProp(this, 'inspect', _descriptor3, this);

  _initDefineProp(this, 'setError', _descriptor4, this);

  _initDefineProp(this, 'destroyImage', _descriptor5, this);

  _initDefineProp(this, 'inspectImage', _descriptor6, this);

  _initDefineProp(this, 'loadImages', _descriptor7, this);

  _initDefineProp(this, 'pruneImages', _descriptor8, this);

  this.appStore = appStore;
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'error', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'images', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'inspect', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'setError', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this = this;

    return function () {
      var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _this.error = (((err || {}).response || {}).data || {}).message || null;
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'destroyImage', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (id) {
      _this2.setError();

      _axios2.default.delete('/api/v1/images/' + id).then(function () {
        _this2.loadImages();
      }).catch(_this2.setError);
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'inspectImage', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (id) {
      _this3.setError();

      _axios2.default.get('/api/v1/images/' + id).then(function (res) {
        _this3.inspect = res.data;
      }).catch(_this3.setError);
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'loadImages', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.setError();

      _axios2.default.get('/api/v1/images').then(function (res) {
        _this4.images = (0, _lodash.sortBy)(res.data, function (image) {
          return -image.Created;
        }).map(function (image) {
          return {
            repository: image.RepoTags ? image.RepoTags[0].split(':')[0] : image.RepoDigests ? image.RepoDigests[0].split('@')[0] : '<none>',
            tag: image.RepoTags ? image.RepoTags[0].split(':')[1] : '<none>',
            image: image.Id.split(':')[1].substr(0, 12),
            created: _moment2.default.unix(image.Created).fromNow(),
            size: sizeOf(image.Size)
          };
        });
      }).catch(_this4.setError);
    };
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'pruneImages', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      _this5.setError();

      _axios2.default.post('/api/v1/images/prune').then(function () {
        _this5.loadImages();
      }).catch(_this5.setError);
    };
  }
})), _class);
exports.default = Images;
});
___scope___.file("stores/Volumes/Volumes.js", function(exports, require, module, __filename, __dirname){

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Volumes = (_class = function Volumes(appStore) {
  _classCallCheck(this, Volumes);

  _initDefineProp(this, 'error', _descriptor, this);

  _initDefineProp(this, 'volumes', _descriptor2, this);

  _initDefineProp(this, 'inspect', _descriptor3, this);

  _initDefineProp(this, 'setError', _descriptor4, this);

  _initDefineProp(this, 'createVolume', _descriptor5, this);

  _initDefineProp(this, 'destroyVolume', _descriptor6, this);

  _initDefineProp(this, 'inspectVolume', _descriptor7, this);

  _initDefineProp(this, 'loadVolumes', _descriptor8, this);

  _initDefineProp(this, 'pruneVolumes', _descriptor9, this);

  this.appStore = appStore;
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'error', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'volumes', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'inspect', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'setError', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this = this;

    return function () {
      var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _this.error = (((err || {}).response || {}).data || {}).message || null;
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'createVolume', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (volume) {
      _this2.setError();

      _axios2.default.post('/api/v1/volumes', volume).then(function () {
        _this2.loadVolumes();
      }).catch(_this2.setError);
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'destroyVolume', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (id) {
      _this3.setError();

      _axios2.default.delete('/api/v1/volumes/' + id).then(function () {
        _this3.loadVolumes();
      }).catch(_this3.setError);
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'inspectVolume', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (id) {
      _this4.setError();

      _axios2.default.get('/api/v1/volumes/' + id).then(function (res) {
        _this4.inspect = res.data;
      }).catch(_this4.setError);
    };
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'loadVolumes', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      _this5.setError();

      _axios2.default.get('/api/v1/volumes').then(function (res) {
        _this5.volumes = (0, _lodash.sortBy)(res.data, function (volume) {
          return volume.Name.toLowerCase();
        }).map(function (volume) {
          return {
            driver: volume.Driver,
            name: volume.Name
          };
        });
      }).catch(_this5.setError);
    };
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'pruneVolumes', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function () {
      _this6.setError();

      _axios2.default.post('/api/v1/volumes/prune').then(function () {
        _this6.loadVolumes();
      }).catch(_this6.setError);
    };
  }
})), _class);
exports.default = Volumes;
});
___scope___.file("components/App.js", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _mobxReact = require("mobx-react");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterActiveComponent = require("react-router-active-component");

var _reactRouterActiveComponent2 = _interopRequireDefault(_reactRouterActiveComponent);

var _AppStore = require("~/stores/AppStore");

var _AppStore2 = _interopRequireDefault(_AppStore);

require("./App.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Li = (0, _reactRouterActiveComponent2.default)('li');

var App = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.pruneContainers = function () {
      if (confirm('Are you sure you want to delete stopped containers?')) {
        _this.containersStore.pruneContainers();
      }
    };

    _this.pruneImages = function () {
      if (confirm('Are you sure you want to delete unused images?')) {
        _this.imagesStore.pruneImages();
      }
    };

    _this.pruneVolumes = function () {
      if (confirm('Are you sure you want to delete unused volumes?')) {
        _this.volumesStore.pruneVolumes();
      }
    };

    _this.appStore = props.store;
    _this.containersStore = _this.appStore.containers;
    _this.imagesStore = _this.appStore.images;
    _this.volumesStore = _this.appStore.volumes;
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var route = this.props.routes[this.props.routes.length - 1].path;

      var button = void 0;
      switch (route) {
        case 'images':
          button = _react2.default.createElement(
            "button",
            { type: "button", className: "btn btn-danger", onClick: function onClick() {
                return _this2.pruneImages();
              } },
            "Delete all unused images"
          );
          break;
        case 'containers':
          button = _react2.default.createElement(
            "button",
            { type: "button", className: "btn btn-danger", onClick: function onClick() {
                return _this2.pruneContainers();
              } },
            "Delete all stopped containers"
          );
          break;
        case 'volumes':
          button = _react2.default.createElement(
            "button",
            { type: "button", className: "btn btn-danger", onClick: function onClick() {
                return _this2.pruneVolumes();
              } },
            "Delete all unused volumes"
          );
          break;
      }

      return _react2.default.createElement(
        "div",
        { className: "App" },
        _react2.default.createElement(
          "nav",
          { className: "navbar navbar-default" },
          _react2.default.createElement(
            "div",
            { className: "container-fluid" },
            _react2.default.createElement(
              "div",
              { className: "navbar-header" },
              _react2.default.createElement(
                "button",
                { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1", "aria-expanded": "false" },
                _react2.default.createElement("span", { className: "icon-bar" }),
                _react2.default.createElement("span", { className: "icon-bar" }),
                _react2.default.createElement("span", { className: "icon-bar" })
              ),
              _react2.default.createElement(
                "span",
                { className: "navbar-brand" },
                "Docker UI"
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
              _react2.default.createElement(
                "ul",
                { className: "nav navbar-nav" },
                _react2.default.createElement(
                  Li,
                  { to: "/images" },
                  "Images"
                ),
                _react2.default.createElement(
                  Li,
                  { to: "/containers" },
                  "Containers"
                ),
                _react2.default.createElement(
                  Li,
                  { to: "/volumes" },
                  "Volumes"
                )
              ),
              _react2.default.createElement(
                "form",
                { className: "navbar-form navbar-right" },
                button
              )
            )
          )
        ),
        this.props.children
      );
    }
  }]);

  return App;
}(_react2.default.Component)) || _class);
exports.default = App;
});
___scope___.file("components/App.scss", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("components/App.scss", ".App .master-detail {\n  display: flex;\n  flex-direction: row; }\n  .App .master-detail .master {\n    flex: 1;\n    overflow: auto; }\n  .App .master-detail .detail {\n    flex: 1;\n    max-width: 50%;\n    overflow: auto; }\n\n/*# sourceMappingURL=App.scss.map */")
});
___scope___.file("components/Images/Images.js", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _mobxReact = require("mobx-react");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AppStore = require("~/stores/AppStore");

var _AppStore2 = _interopRequireDefault(_AppStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Images = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Images, _React$Component);

  function Images(props) {
    _classCallCheck(this, Images);

    var _this = _possibleConstructorReturn(this, (Images.__proto__ || Object.getPrototypeOf(Images)).call(this, props));

    _this.destroyImage = function (id) {
      if (confirm("Are you sure you want to delete image " + id)) {
        _this.imagesStore.destroyImage(id);
      }
    };

    _this.inspectImage = function (e, id) {
      e.preventDefault();

      _this.imagesStore.inspectImage(id);
    };

    _this.loadImages = function () {
      _this.imagesStore.loadImages();
    };

    _this.appStore = props.store;
    _this.imagesStore = _this.appStore.images;
    return _this;
  }

  _createClass(Images, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadImages();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _imagesStore = this.imagesStore,
          error = _imagesStore.error,
          images = _imagesStore.images,
          inspect = _imagesStore.inspect;


      return _react2.default.createElement(
        "div",
        { className: "Images" },
        _react2.default.createElement(
          "div",
          { className: "master-detail" },
          _react2.default.createElement(
            "div",
            { className: "master" },
            error && _react2.default.createElement(
              "div",
              { className: "alert alert-danger", role: "alert" },
              error
            ),
            _react2.default.createElement(
              "div",
              { className: "table-responsive" },
              _react2.default.createElement(
                "table",
                { className: "table" },
                _react2.default.createElement(
                  "thead",
                  null,
                  _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                      "th",
                      null,
                      "Repository"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Tag"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Image ID"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Created"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Size"
                    ),
                    _react2.default.createElement("th", null)
                  )
                ),
                _react2.default.createElement(
                  "tbody",
                  null,
                  images.map(function (image, i) {
                    return _react2.default.createElement(
                      "tr",
                      { key: i },
                      _react2.default.createElement(
                        "td",
                        { title: image.repository },
                        image.repository
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: image.tag },
                        image.tag
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: image.image },
                        _react2.default.createElement(
                          "a",
                          { href: "#", onClick: function onClick(e) {
                              return _this2.inspectImage(e, image.image);
                            } },
                          image.image
                        )
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: image.created },
                        image.created
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: image.size },
                        image.size
                      ),
                      _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(
                          "div",
                          { className: "dropdown pull-right" },
                          _react2.default.createElement(
                            "button",
                            { className: "btn btn-default dropdown-toggle", type: "button", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "true" },
                            _react2.default.createElement("span", { className: "glyphicon glyphicon-cog" })
                          ),
                          _react2.default.createElement(
                            "ul",
                            { className: "dropdown-menu dropdown-menu-right" },
                            _react2.default.createElement(
                              "li",
                              null,
                              _react2.default.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                    return _this2.destroyImage(image.image);
                                  } },
                                "Delete"
                              )
                            )
                          )
                        )
                      )
                    );
                  })
                )
              )
            )
          ),
          inspect && _react2.default.createElement(
            "div",
            { className: "detail" },
            _react2.default.createElement(
              "pre",
              null,
              _react2.default.createElement(
                "code",
                null,
                JSON.stringify(inspect, undefined, 2)
              )
            )
          )
        )
      );
    }
  }]);

  return Images;
}(_react2.default.Component)) || _class) || _class);
exports.default = Images;
});
___scope___.file("components/Containers/Containers.js", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _mobxReact = require("mobx-react");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AppStore = require("~/stores/AppStore");

var _AppStore2 = _interopRequireDefault(_AppStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Containers = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Containers, _React$Component);

  function Containers(props) {
    _classCallCheck(this, Containers);

    var _this = _possibleConstructorReturn(this, (Containers.__proto__ || Object.getPrototypeOf(Containers)).call(this, props));

    _this.destroyContainer = function (id) {
      if (confirm("Are you sure you want to delete container " + id)) {
        _this.containersStore.destroyContainer(id);
      }
    };

    _this.inspectContainer = function (e, id) {
      e.preventDefault();

      _this.containersStore.inspectContainer(id);
    };

    _this.loadContainers = function () {
      _this.containersStore.loadContainers();
    };

    _this.renameContainer = function (container) {
      var name = prompt('What would you like the new name to be?', container.names);

      if (name) {
        _this.containersStore.renameContainer(container.id, name);
      }
    };

    _this.restartContainer = function (id) {
      if (confirm("Are you sure you want to restart container " + id + "?")) {
        _this.containersStore.restartContainer(id);
      }
    };

    _this.startContainer = function (id) {
      if (confirm("Are you sure you want to start container " + id + "?")) {
        _this.containersStore.startContainer(id);
      }
    };

    _this.stopContainer = function (id) {
      if (confirm("Are you sure you want to stop container " + id + "?")) {
        _this.containersStore.stopContainer(id);
      }
    };

    _this.killContainer = function (id) {
      if (confirm("Are you sure you want to kill container " + id + "?")) {
        _this.containersStore.killContainer(id);
      }
    };

    _this.appStore = props.store;
    _this.containersStore = _this.appStore.containers;
    return _this;
  }

  _createClass(Containers, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadContainers();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _containersStore = this.containersStore,
          containers = _containersStore.containers,
          error = _containersStore.error,
          inspect = _containersStore.inspect;


      return _react2.default.createElement(
        "div",
        { className: "Containers" },
        _react2.default.createElement(
          "div",
          { className: "master-detail" },
          _react2.default.createElement(
            "div",
            { className: "master" },
            error && _react2.default.createElement(
              "div",
              { className: "alert alert-danger", role: "alert" },
              error
            ),
            _react2.default.createElement(
              "div",
              { className: "table-responsive" },
              _react2.default.createElement(
                "table",
                { className: "table" },
                _react2.default.createElement(
                  "thead",
                  null,
                  _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                      "th",
                      null,
                      "Container ID"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Image"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Command"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Created"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Status"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Ports"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Names"
                    ),
                    _react2.default.createElement("th", null)
                  )
                ),
                _react2.default.createElement(
                  "tbody",
                  null,
                  containers.map(function (container, i) {
                    return _react2.default.createElement(
                      "tr",
                      { key: i },
                      _react2.default.createElement(
                        "td",
                        { title: container.id },
                        _react2.default.createElement(
                          "a",
                          { href: "#", onClick: function onClick(e) {
                              return _this2.inspectContainer(e, container.id);
                            } },
                          container.id
                        )
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: container.image },
                        container.image
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: container.command },
                        container.command
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: container.created },
                        container.created
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: container.status },
                        container.status
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: container.ports },
                        container.ports
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: container.names },
                        container.names
                      ),
                      _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(
                          "div",
                          { className: "dropdown pull-right" },
                          _react2.default.createElement(
                            "button",
                            { className: "btn btn-default dropdown-toggle", type: "button", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "true" },
                            _react2.default.createElement("span", { className: "glyphicon glyphicon-cog" })
                          ),
                          _react2.default.createElement(
                            "ul",
                            { className: "dropdown-menu dropdown-menu-right" },
                            container.state !== 'running' && _react2.default.createElement(
                              "li",
                              null,
                              _react2.default.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                    return _this2.startContainer(container.id);
                                  } },
                                "Start"
                              )
                            ),
                            container.state === 'running' && _react2.default.createElement(
                              "li",
                              null,
                              _react2.default.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                    return _this2.restartContainer(container.id);
                                  } },
                                "Restart"
                              )
                            ),
                            container.state === 'running' && _react2.default.createElement(
                              "li",
                              null,
                              _react2.default.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                    return _this2.stopContainer(container.id);
                                  } },
                                "Stop"
                              )
                            ),
                            container.state === 'running' && _react2.default.createElement(
                              "li",
                              null,
                              _react2.default.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                    return _this2.killContainer(container.id);
                                  } },
                                "Kill"
                              )
                            ),
                            container.state !== 'running' && _react2.default.createElement(
                              "li",
                              null,
                              _react2.default.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                    return _this2.destroyContainer(container.id);
                                  } },
                                "Delete"
                              )
                            ),
                            _react2.default.createElement(
                              "li",
                              null,
                              _react2.default.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                    return _this2.renameContainer(container);
                                  } },
                                "Rename"
                              )
                            )
                          )
                        )
                      )
                    );
                  })
                )
              )
            )
          ),
          inspect && _react2.default.createElement(
            "div",
            { className: "detail" },
            _react2.default.createElement(
              "pre",
              null,
              JSON.stringify(inspect, undefined, 2)
            )
          )
        )
      );
    }
  }]);

  return Containers;
}(_react2.default.Component)) || _class) || _class);
exports.default = Containers;
});
___scope___.file("components/Volumes/Volumes.js", function(exports, require, module, __filename, __dirname){

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _mobxReact = require("mobx-react");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AppStore = require("~/stores/AppStore");

var _AppStore2 = _interopRequireDefault(_AppStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Volumes = (_dec = (0, _mobxReact.inject)('store'), _dec(_class = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Volumes, _React$Component);

  function Volumes(props) {
    _classCallCheck(this, Volumes);

    var _this = _possibleConstructorReturn(this, (Volumes.__proto__ || Object.getPrototypeOf(Volumes)).call(this, props));

    _this.createVolume = function (e) {
      e.preventDefault();

      _this.volumesStore.createVolume(_this.state.volume);
    };

    _this.destroyVolume = function (id) {
      if (confirm("Are you sure you want to delete volume " + id + "?")) {
        _this.volumesStore.destroyVolume(id);
      }
    };

    _this.inspectVolume = function (e, id) {
      e.preventDefault();

      _this.volumesStore.inspectVolume(id);
    };

    _this.loadVolumes = function () {
      _this.volumesStore.loadVolumes();
    };

    _this.onChange = function (e) {
      var name = e.currentTarget.name;
      var value = e.currentTarget.value;
      _this.setState({
        volume: Object.assign({}, _this.state.volume, _defineProperty({}, name, value))
      });
    };

    _this.state = {
      volume: {
        name: ''
      }
    };

    _this.appStore = props.store;
    _this.volumesStore = _this.appStore.volumes;
    return _this;
  }

  _createClass(Volumes, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadVolumes();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _volumesStore = this.volumesStore,
          error = _volumesStore.error,
          inspect = _volumesStore.inspect,
          volumes = _volumesStore.volumes;


      return _react2.default.createElement(
        "div",
        { className: "Volumes" },
        _react2.default.createElement(
          "div",
          { className: "master-detail" },
          _react2.default.createElement(
            "div",
            { className: "master" },
            error && _react2.default.createElement(
              "div",
              { className: "alert alert-danger", role: "alert" },
              error
            ),
            _react2.default.createElement(
              "form",
              { onSubmit: this.createVolume },
              _react2.default.createElement("input", { name: "name", value: this.state.volume.name, onChange: this.onChange }),
              _react2.default.createElement("input", { type: "submit", value: "Create" })
            ),
            _react2.default.createElement(
              "div",
              { className: "table-responsive" },
              _react2.default.createElement(
                "table",
                { className: "table" },
                _react2.default.createElement(
                  "thead",
                  null,
                  _react2.default.createElement(
                    "tr",
                    null,
                    _react2.default.createElement(
                      "th",
                      null,
                      "Driver"
                    ),
                    _react2.default.createElement(
                      "th",
                      null,
                      "Name"
                    ),
                    _react2.default.createElement("th", null)
                  )
                ),
                _react2.default.createElement(
                  "tbody",
                  null,
                  volumes.map(function (volume, i) {
                    return _react2.default.createElement(
                      "tr",
                      { key: i },
                      _react2.default.createElement(
                        "td",
                        { title: volume.driver },
                        volume.driver
                      ),
                      _react2.default.createElement(
                        "td",
                        { title: volume.name },
                        _react2.default.createElement(
                          "a",
                          { href: "#", onClick: function onClick(e) {
                              return _this2.inspectVolume(e, volume.name);
                            } },
                          volume.name
                        )
                      ),
                      _react2.default.createElement(
                        "td",
                        null,
                        _react2.default.createElement(
                          "div",
                          { className: "dropdown pull-right" },
                          _react2.default.createElement(
                            "button",
                            { className: "btn btn-default dropdown-toggle", type: "button", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "true" },
                            _react2.default.createElement("span", { className: "glyphicon glyphicon-cog" })
                          ),
                          _react2.default.createElement(
                            "ul",
                            { className: "dropdown-menu dropdown-menu-right" },
                            _react2.default.createElement(
                              "li",
                              null,
                              _react2.default.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                    return _this2.destroyVolume(volume.name);
                                  } },
                                "Delete"
                              )
                            )
                          )
                        )
                      )
                    );
                  })
                )
              )
            )
          ),
          inspect && _react2.default.createElement(
            "div",
            { className: "detail" },
            _react2.default.createElement(
              "pre",
              null,
              JSON.stringify(inspect, undefined, 2)
            )
          )
        )
      );
    }
  }]);

  return Volumes;
}(_react2.default.Component)) || _class) || _class);
exports.default = Volumes;
});
});

FuseBox.import("default/index.js");
FuseBox.main("default/index.js");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((d||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),u=e.substring(o+1);return[a,u]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(d){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function u(e){return{server:require(e)}}function f(e,n){var o=n.path||"./",a=n.pkg||"default",f=r(e);if(f&&(o="./",a=f[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=f[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!d&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return u(e);var s=h[a];if(!s){if(d&&"electron"!==g.target)throw"Package not found "+a;return u(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,c=t(o,e),v=i(c),p=s.f[v];return!p&&v.indexOf("*")>-1&&(l=v),p||l||(v=t(c,"/","index.js"),p=s.f[v],p||(v=c+".js",p=s.f[v]),p||(p=s.f[c+".jsx"]),p||(v=c+"/index.jsx",p=s.f[v])),{file:p,wildcard:l,pkgName:a,versions:s.v,filePath:c,validPath:v}}function s(e,r,n){if(void 0===n&&(n={}),!d)return r(/\.(js|json)$/.test(e)?v.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);g.dynamic(a,o),r(g.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=m[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=f(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),u=h[t.pkgName];if(u){var p={};for(var m in u.f)a.test(m)&&(p[m]=c(t.pkgName+"/"+m));return p}}if(!i){var g="function"==typeof r,x=l("async",[e,r]);if(x===!1)return;return s(e,function(e){return g?r(e):null},r)}var _=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var w=i.locals={},y=n(t.validPath);w.exports={},w.module={exports:w.exports},w.require=function(e,r){return c(e,{pkg:_,path:y,v:t.versions})},w.require.main={filename:d?"./":v.require.main.filename,paths:d?[]:v.require.main.paths};var j=[w.module.exports,w.require,w.module,t.validPath,y,_];return l("before-import",j),i.fn.apply(0,j),l("after-import",j),w.module.exports}if(e.FuseBox)return e.FuseBox;var d="undefined"!=typeof window&&window.navigator,v=d?window:global;d&&(v.global=window),e=d&&"undefined"==typeof __fbx__dnm__?e:module.exports;var p=d?window.__fsbx__=window.__fsbx__||{}:v.$fsbx=v.$fsbx||{};d||(v.require=require);var h=p.p=p.p||{},m=p.e=p.e||{},g=function(){function r(){}return r.global=function(e,r){return void 0===r?v[e]:void(v[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){m[e]=m[e]||[],m[e].push(r)},r.exists=function(e){try{var r=f(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=f(e,{}),n=h[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var u=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);u(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=h.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(h[e])return n(h[e].s);var t=h[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r}();return g.packages=h,g.isBrowser=d,g.isServer=!d,g.plugins=[],d||(v.FuseBox=g),e.FuseBox=g}(this))