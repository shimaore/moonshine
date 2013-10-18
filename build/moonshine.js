(function() {
  var extend;

  extend = function(object, properties) {
    var key, value;
    for (key in properties) {
      value = properties[key];
      object[key] = value;
    }
    return object;
  };

  this.ccss = {};

  this.ccss.compile = function(rules) {
    var child, children, css, declarations, key, mixin, mixins, nested, pairs, selector, split, value, _i, _j, _len, _len1, _ref;
    css = '';
    for (selector in rules) {
      pairs = rules[selector];
      declarations = '';
      nested = {};
      if (mixins = pairs.mixins, pairs) {
        delete pairs.mixins;
        _ref = [].concat(mixins);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          mixin = _ref[_i];
          extend(pairs, mixin);
        }
      }
      for (key in pairs) {
        value = pairs[key];
        if (typeof value === 'object') {
          children = [];
          split = key.split(/\s*,\s*/);
          for (_j = 0, _len1 = split.length; _j < _len1; _j++) {
            child = split[_j];
            children.push("" + selector + " " + child);
          }
          nested[children.join(',')] = value;
        } else {
          key = key.replace(/[A-Z]/g, function(s) {
            return '-' + s.toLowerCase();
          });
          declarations += " " + key + ": " + value + ";\n";
        }
      }
      declarations && (css += "" + selector + " {\n" + declarations + "}\n");
      css += this.compile(nested);
    }
    return css;
  };

}).call(this);

/*
//@ sourceMappingURL=ccss.js.map
*/
(function() {
  this.moonshine = function(f) {
    var context, handle_hash_change, helpers, route, routes, views;
    helpers = {};
    views = {};
    context = {};
    context.helper = function(obj) {
      var k, v, _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push(helpers[k] = v);
      }
      return _results;
    };
    context.view = function(obj) {
      var k, v, _results;
      if (typeof obj === 'string') {
        return obj;
      }
      if (typeof obj === 'function') {
        return coffeecup.render(obj, {
          hardcode: helpers
        });
      }
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push(views[k] = coffeecup.compile(v, {
          hardcode: helpers
        }));
      }
      return _results;
    };
    context.css = function(obj) {
      var k, v, _results;
      if (typeof obj === 'string') {
        return obj;
      }
      if (typeof obj === 'function') {
        return ccss.compile(obj());
      }
      _results = [];
      for (k in obj) {
        v = obj[k];
        if (typeof v === 'function') {
          _results.push(views[k] = function(values) {
            return ccss.compile(v.apply(values));
          });
        } else {
          _results.push(views[k] = function() {
            return v;
          });
        }
      }
      return _results;
    };
    context.render = function(name, values) {
      return views[name](values);
    };
    context.get = function(obj) {
      var k, v, _results;
      _results = [];
      for (k in obj) {
        v = obj[k];
        _results.push(route(k, v));
      }
      return _results;
    };
    routes = [];
    route = function(path, next) {
      return routes.push({
        path: path,
        route: function(params, query) {
          var ctx;
          ctx = {
            render: context.render,
            params: params,
            query: query
          };
          return next.apply(ctx);
        }
      });
    };
    f.apply(context);
    handle_hash_change = function() {
      var hash, k, n, params, query, result, _i, _len, _ref;
      hash = window.location.hash;
      query = {};
      for (_i = 0, _len = routes.length; _i < _len; _i++) {
        route = routes[_i];
        if (typeof route.path === string) {
          if (route.path === hash) {
            return route.route({}, query);
          }
        }
        if (route.path.exec != null) {
          if (params = route.path.exec(hash)) {
            return route.route(params, query);
          }
        }
        if (route.path.regex != null) {
          if (result = route.path.regex.exec(hash)) {
            params = {};
            _ref = route.path.map;
            for (k in _ref) {
              n = _ref[k];
              params[k] = result[n];
            }
            return route.route(params, query);
          }
        }
      }
    };
    if ((typeof window !== "undefined" && window !== null ? window.onhashchange : void 0) != null) {
      window.onhashchange(handle_hash_change);
    } else {
      'Not implemented';
    }
    handle_hash_change();
    return context;
  };

}).call(this);

/*
//@ sourceMappingURL=moonshine.js.map
*/