;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.4.0
var cache, coffee, coffeecup, coffeescript_helpers, compiler, elements, fs, merge_elements, skeleton,
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof window !== "undefined" && window !== null) {
  coffeecup = window.coffeecup = {};
  coffee = typeof CoffeeScript !== "undefined" && CoffeeScript !== null ? CoffeeScript : null;
} else {
  coffeecup = exports;
  coffee = require('coffee-script');
  compiler = require(__dirname + '/compiler');
  compiler.setup(coffeecup);
  fs = require('fs');
}

coffeecup.version = '0.3.21';

coffeecup.doctypes = {
  'default': '<!DOCTYPE html>',
  '5': '<!DOCTYPE html>',
  'xml': '<?xml version="1.0" encoding="utf-8" ?>',
  'transitional': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
  'strict': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
  'frameset': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">',
  '1.1': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
  'basic': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">',
  'mobile': '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">',
  'ce': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "ce-html-1.0-transitional.dtd">'
};

coffeescript_helpers = "var __slice = Array.prototype.slice;\nvar __hasProp = Object.prototype.hasOwnProperty;\nvar __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };\nvar __extends = function(child, parent) {\n  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }\n  function ctor() { this.constructor = child; }\n  ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype;\n  return child; };\nvar __indexOf = Array.prototype.indexOf || function(item) {\n  for (var i = 0, l = this.length; i < l; i++) {\n    if (this[i] === item) return i;\n  } return -1; };".replace(/\n/g, '');

elements = {
  regular: 'a abbr address article aside audio b bdi bdo blockquote body button\
 canvas caption cite code colgroup datalist dd del details dfn div dl dt em\
 fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup\
 html i iframe ins kbd label legend li main map mark menu meter nav noscript object\
 ol optgroup option output p pre progress q rp rt ruby s samp script section\
 select small span strong style sub summary sup table tbody td textarea tfoot\
 th thead time title tr u ul video',
  svg: 'a altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion\
 animateTransform circle clipPath color-profile cursor defs desc ellipse\
 feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix\
 feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB\
 feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology\
 feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence\
 filter font font-face font-face-format font-face-name font-face-src\
 font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient\
 marker mask metadata missing-glyph mpath path pattern polygon polyline\
 radialGradient rect script set stop style svg symbol text textPath\
 title tref tspan use view vkern',
  "void": 'area base br col command embed hr img input keygen link meta param\
 source track wbr',
  xml: 'urlset url loc lastmod changefreq priority',
  obsolete: 'applet acronym bgsound dir frameset noframes isindex listing\
 nextid noembed plaintext rb strike xmp big blink center font marquee multicol\
 nobr spacer tt',
  obsolete_void: 'basefont frame'
};

merge_elements = function() {
  var a, args, element, result, _i, _j, _len, _len1, _ref;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  result = [];
  for (_i = 0, _len = args.length; _i < _len; _i++) {
    a = args[_i];
    _ref = elements[a].split(' ');
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      element = _ref[_j];
      if (__indexOf.call(result, element) < 0) {
        result.push(element);
      }
    }
  }
  return result;
};

coffeecup.tags = merge_elements('regular', 'obsolete', 'void', 'obsolete_void', 'svg', 'xml');

coffeecup.self_closing = merge_elements('void', 'obsolete_void');

skeleton = function(data) {
  var cede, coffeescript, comment, doctype, h, ie, stylus, tag, text, __cc, _ref, _ref1;
  if (data == null) {
    data = {};
  }
  if ((_ref = data.format) == null) {
    data.format = false;
  }
  if ((_ref1 = data.autoescape) == null) {
    data.autoescape = false;
  }
  __cc = {
    buffer: [],
    esc: function(txt) {
      if (data.autoescape) {
        return h(txt);
      } else {
        return txt.toString();
      }
    },
    tabs: 0,
    repeat: function(string, count) {
      return Array(count + 1).join(string);
    },
    indent: function() {
      if (data.format) {
        return text(this.repeat('  ', this.tabs));
      }
    },
    tag: function(name, args) {
      var combo, i, _i, _len;
      combo = [name];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        i = args[_i];
        combo.push(i);
      }
      return tag.apply(data, combo);
    },
    render_idclass: function(str) {
      var c, classes, i, id, idx, _i, _j, _len, _len1, _ref2;
      classes = [];
      _ref2 = str.split('.');
      for (idx = _i = 0, _len = _ref2.length; _i < _len; idx = ++_i) {
        i = _ref2[idx];
        if (i !== '') {
          if (idx === 0 && i.indexOf('#') === 0) {
            id = i.slice(1);
          } else {
            classes.push(i);
          }
        }
      }
      if (id) {
        text(" id=\"" + id + "\"");
      }
      if (classes.length > 0) {
        text(" class=\"");
        for (_j = 0, _len1 = classes.length; _j < _len1; _j++) {
          c = classes[_j];
          if (c !== classes[0]) {
            text(' ');
          }
          text(c);
        }
        return text('"');
      }
    },
    render_attrs: function(obj, prefix) {
      var k, v, _results;
      if (prefix == null) {
        prefix = '';
      }
      _results = [];
      for (k in obj) {
        v = obj[k];
        if (typeof v === 'boolean' && v) {
          v = k;
        }
        if (typeof v === 'function') {
          v = "(" + v + ").call(this);";
        }
        if (typeof v === 'object' && !(v instanceof Array)) {
          _results.push(this.render_attrs(v, prefix + k + '-'));
        } else if (v || v === 0 || v === '') {
          _results.push(text(" " + (prefix + k) + "=\"" + (this.esc(v)) + "\""));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    render_contents: function(contents, safe) {
      var result;
      if (safe == null) {
        safe = false;
      }
      switch (typeof contents) {
        case 'string':
        case 'number':
        case 'boolean':
          return text(safe ? contents : this.esc(contents));
        case 'function':
          if (data.format) {
            text('\n');
          }
          this.tabs++;
          result = contents.call(data);
          if (typeof result === 'string') {
            this.indent();
            text(safe ? result : this.esc(result));
            if (data.format) {
              text('\n');
            }
          }
          this.tabs--;
          return this.indent();
      }
    },
    render_tag: function(name, idclass, attrs, inline, contents) {
      this.indent();
      text("<" + name);
      if (idclass) {
        this.render_idclass(idclass);
      }
      if (attrs) {
        this.render_attrs(attrs);
      }
      if (inline) {
        text(" " + inline);
      }
      if (__indexOf.call(this.self_closing, name) >= 0) {
        text(' />');
        if (data.format) {
          text('\n');
        }
      } else {
        text('>');
        this.render_contents(contents);
        text("</" + name + ">");
        if (data.format) {
          text('\n');
        }
      }
      return null;
    }
  };
  tag = function() {
    var a, args, attrs, contents, first, idclass, inline, name, _i, _len;
    name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      a = args[_i];
      switch (typeof a) {
        case 'function':
          contents = a;
          break;
        case 'object':
          attrs = a;
          break;
        case 'number':
        case 'boolean':
          contents = a;
          break;
        case 'string':
          if (args.length === 1) {
            contents = a;
          } else {
            if (a === args[0]) {
              first = a.charAt(0);
              if (first === '#' || first === '.') {
                idclass = a.substr(0, a.indexOf(' '));
                inline = a.substr(a.indexOf(' ') + 1);
                if (idclass === '') {
                  idclass = inline;
                  inline = void 0;
                }
              } else {
                inline = a;
                if (inline === '') {
                  inline = void 0;
                }
              }
            } else {
              contents = a;
            }
          }
      }
    }
    return __cc.render_tag(name, idclass, attrs, inline, contents);
  };
  cede = function(f) {
    var old_buffer, temp_buffer;
    temp_buffer = [];
    old_buffer = __cc.buffer;
    __cc.buffer = temp_buffer;
    f();
    __cc.buffer = old_buffer;
    return temp_buffer.join('');
  };
  h = function(txt) {
    return txt.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  doctype = function(type) {
    if (type == null) {
      type = 'default';
    }
    text(__cc.doctypes[type]);
    if (data.format) {
      return text('\n');
    }
  };
  text = function(txt) {
    __cc.buffer.push(txt.toString());
    return null;
  };
  comment = function(cmt) {
    text("<!--" + cmt + "-->");
    if (data.format) {
      return text('\n');
    }
  };
  coffeescript = function(param) {
    switch (typeof param) {
      case 'function':
        return script("" + __cc.coffeescript_helpers + "(" + param + ").call(this);");
      case 'string':
        return script({
          type: 'text/coffeescript'
        }, function() {
          return param;
        });
      case 'object':
        param.type = 'text/coffeescript';
        return script(param);
    }
  };
  stylus = function(s) {
    if (data.stylus == null) {
      throw new TemplateError('stylus is not available');
    }
    text('<style>');
    if (data.format) {
      text('\n');
    }
    data.stylus.render(s, {
      compress: !data.format
    }, function(err, css) {
      if (err) {
        throw err;
      }
      return text(css);
    });
    text('</style>');
    if (data.format) {
      return text('\n');
    }
  };
  ie = function(condition, contents) {
    __cc.indent();
    text("<!--[if " + condition + "]>");
    __cc.render_contents(contents);
    text("<![endif]-->");
    if (data.format) {
      return text('\n');
    }
  };
  return null;
};

skeleton = skeleton.toString().replace(/function\s*\(.*\)\s*\{/, '').replace(/return null;\s*\}$/, '');

skeleton = coffeescript_helpers + skeleton;

coffeecup.compile = function(template, options) {
  var code, hardcoded_locals, k, t, tag_functions, tags_used, v, _i, _j, _len, _len1, _ref, _ref1;
  if (options == null) {
    options = {};
  }
  if (typeof template === 'function') {
    template = template.toString();
  } else if (typeof template === 'string' && (coffee != null)) {
    template = coffee.compile(template, {
      bare: true
    });
    template = "function(){" + template + "}";
  }
  hardcoded_locals = '';
  if (options.hardcode) {
    _ref = options.hardcode;
    for (k in _ref) {
      v = _ref[k];
      if (typeof v === 'function') {
        hardcoded_locals += "var " + k + " = function(){return (" + v + ").apply(data, arguments);};";
      } else {
        hardcoded_locals += "var " + k + " = " + (JSON.stringify(v)) + ";";
      }
    }
  }
  if (options.optimize && (compiler != null)) {
    return compiler.compile(template, hardcoded_locals, options);
  }
  tag_functions = '';
  tags_used = [];
  _ref1 = coffeecup.tags;
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    t = _ref1[_i];
    if (template.indexOf(t) > -1 || hardcoded_locals.indexOf(t) > -1) {
      tags_used.push(t);
    }
  }
  tag_functions += "var " + (tags_used.join(',')) + ";";
  for (_j = 0, _len1 = tags_used.length; _j < _len1; _j++) {
    t = tags_used[_j];
    tag_functions += "" + t + " = function(){return __cc.tag('" + t + "', arguments);};";
  }
  code = tag_functions + hardcoded_locals + skeleton;
  code += "__cc.doctypes = " + (JSON.stringify(coffeecup.doctypes)) + ";";
  code += "__cc.coffeescript_helpers = " + (JSON.stringify(coffeescript_helpers)) + ";";
  code += "__cc.self_closing = " + (JSON.stringify(coffeecup.self_closing)) + ";";
  if (options.locals) {
    code += 'with(data.locals){';
  }
  code += "(" + template + ").call(data);";
  if (options.locals) {
    code += '}';
  }
  code += "return __cc.buffer.join('');";
  return new Function('data', code);
};

cache = {};

coffeecup.render = function(template, data, options) {
  var k, tpl, v, _ref;
  if (data == null) {
    data = {};
  }
  if (options == null) {
    options = {};
  }
  for (k in options) {
    v = options[k];
    data[k] = v;
  }
  if ((_ref = data.cache) == null) {
    data.cache = false;
  }
  if (!(typeof window !== "undefined" && window !== null)) {
    data.stylus = require('stylus');
  }
  if (data.optimize && !data.cache) {
    data.optimize = false;
  }
  if (data.cache && (cache[template] != null)) {
    tpl = cache[template];
  } else if (data.cache) {
    tpl = cache[template] = coffeecup.compile(template, data);
  } else {
    tpl = coffeecup.compile(template, data);
  }
  return tpl(data);
};

if (typeof window === "undefined" || window === null) {
  coffeecup.__express = function(path, options, fn) {
    var render, tpl;
    if (options == null) {
      options = {};
    }
    options.stylus = require('stylus');
    if (options.optimize && !options.cache) {
      options.optimize = false;
    }
    render = function(tpl) {
      try {
        return fn(null, tpl(options));
      } catch (err) {
        return fn(err);
      }
    };
    if (options.cache && (cache[path] != null)) {
      tpl = cache[path];
      return render(tpl);
    } else {
      return fs.readFile(path, 'utf8', function(err, str) {
        if (err) {
          return fn(err);
        }
        try {
          tpl = coffeecup.compile(str, options);
        } catch (err) {
          return fn(err);
        }
        if (options.cache) {
          cache[path] = tpl;
        }
        return render(tpl);
      });
    }
  };
  coffeecup.adapters = {
    simple: coffeecup.render,
    meryl: coffeecup.render,
    express: {
      TemplateError: (function(_super) {

        __extends(_Class, _super);

        function _Class(message) {
          this.message = message;
          Error.call(this, this.message);
          Error.captureStackTrace(this, arguments.callee);
        }

        _Class.prototype.name = 'TemplateError';

        return _Class;

      })(Error),
      compile: function(template, data) {
        var TemplateError, tpl, _ref;
        if ((_ref = data.hardcode) == null) {
          data.hardcode = {};
        }
        data.hardcode.partial = function() {
          return text(this.partial.apply(this, arguments));
        };
        TemplateError = this.TemplateError;
        try {
          tpl = coffeecup.compile(template, data);
        } catch (e) {
          throw new TemplateError("Error compiling " + data.filename + ": " + e.message);
        }
        return function() {
          try {
            return tpl.apply(null, arguments);
          } catch (e) {
            throw new TemplateError("Error rendering " + data.filename + ": " + e.message);
          }
        };
      }
    }
  };
}

},{}],2:[function(require,module,exports){
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


},{}],3:[function(require,module,exports){
var ccss, moonshine;

ccss = require('./ccss.coffee.md');

require('../bower_components/coffeecup.js');

moonshine = function(f) {
  var context, handle_change, handle_hash_change, helpers, last_hash, monitorHash, route, routes, views;
  helpers = {};
  views = {};
  context = {};
  context.helper = function(obj) {
    var k, v;
    for (k in obj) {
      v = obj[k];
      helpers[k] = v;
    }
  };
  context.view = function(obj) {
    var k, v;
    if (typeof obj === 'string') {
      return obj;
    }
    if (typeof obj === 'function') {
      return coffeecup.render(obj, {
        hardcode: helpers
      });
    }
    for (k in obj) {
      v = obj[k];
      views[k] = coffeecup.compile(v, {
        hardcode: helpers
      });
    }
  };
  context.css = function(obj) {
    var k, v;
    if (typeof obj === 'string') {
      return obj;
    }
    if (typeof obj === 'function') {
      return ccss.compile(obj());
    }
    for (k in obj) {
      v = obj[k];
      if (typeof v === 'function') {
        views[k] = function(values) {
          return ccss.compile(v.apply(values));
        };
      } else {
        views[k] = function() {
          return v;
        };
      }
    }
  };
  context.render = function(name, values) {
    return views[name](values);
  };
  context.get = function(obj) {
    var k, v;
    for (k in obj) {
      v = obj[k];
      route(k, v);
    }
  };
  routes = [];
  route = function(path, next) {
    routes.push({
      path: path,
      route: function(params, query) {
        var ctx;
        ctx = {
          render: context.render,
          params: params,
          query: query,
          post: handle_change,
          redirect: function(fragment) {
            return window.location.hash = "#" + fragment;
          }
        };
        return next.apply(ctx);
      }
    });
  };
  f.apply(context);
  handle_change = function(fragment, query) {
    var k, n, params, result, _i, _len, _ref;
    console.log("Routing to '" + fragment + "'");
    for (_i = 0, _len = routes.length; _i < _len; _i++) {
      route = routes[_i];
      if (typeof route.path === 'string') {
        if (route.path === fragment) {
          return route.route({}, query);
        }
      }
      if (route.path.exec != null) {
        if (params = route.path.exec(fragment)) {
          return route.route(params, query);
        }
      }
      if (route.path.regex != null) {
        if (result = route.path.regex.exec(fragment)) {
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
  handle_hash_change = function() {
    var fragment, _ref, _ref1;
    fragment = (_ref = (_ref1 = window.location.hash) != null ? _ref1.replace(/^#/, '') : void 0) != null ? _ref : '';
    return handle_change(fragment, {});
  };
  if ((typeof window !== "undefined" && window !== null ? window.onhashchange : void 0) != null) {
    window.onhashchange(handle_hash_change);
  } else {
    last_hash = window.location.hash;
    monitorHash = function() {
      var new_hash;
      new_hash = window.location.hash;
      if (new_hash !== last_hash) {
        handle_hash_change();
      }
      return last_hash = new_hash;
    };
    setInterval(monitorHash, 250);
  }
  handle_hash_change();
  return context;
};

if (typeof window !== "undefined" && window !== null) {
  window.moonshine = moonshine;
}

if (typeof module !== "undefined" && module !== null) {
  module.exports = moonshine;
}


},{"../bower_components/coffeecup.js":1,"./ccss.coffee.md":2}]},{},[3])
;