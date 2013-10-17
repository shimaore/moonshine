The idea is that when I build a client-side application I will need:

- Some HTML (a main file or more + snippets)
- Some CSS (mine and other's)
- Some Javascript (mine and other's)

Ideally during development I want all these as separate pieces; but for deployment I want one HTML file, one CSS file, and one Javascript file. Although it could all be one Javascript file.


Also my current pattern for HTML is:

* snippets in the DOM (or as compiled coffeecup bits I guess)
* insert with

  form = ($ '#form-source').clone().removeAttr('id')
  content.find('.form-target').html form
  form.show()

Allow for this to work in Node.js as well.

    if not define?
      if module? and module.exports? and require? # Node.js
        define = (f) ->
          module.exports = f require
      if window? and not require? # Regular client-side
        define = (f) ->
          require = -> # do nothing
          window.moonshine = f require

This should work in RequireJS.

    define (require) ->
      coffeecup = require 'coffeecup'
      ccss = require 'ccss'

      app = (f) ->

        helpers = {}
        views = {}
        context = {app}

Syntax
======

@helper textbox: (attrs) ->
  attrs.type = 'text'
  attrs.name = attrs.id
  input attrs

        context.helper = (obj) ->
          for k,v of obj
            helpers[k] = v

@view example: ->
  html -> etc.

        context.view = (obj) ->
          if typeof obj is 'string'
            return obj
          if typeof obj is 'function'
            return coffeecup.render obj, hardcode: helpers
          for k,v of obj
            views[k] = coffeecup.compile v, hardcode: helpers

@css example_css: ->
  html

        context.css = (obj) ->
          if typeof obj is 'string'
            return obj
          if typeof obj is 'function'
            return ccss.compile obj()
          for k,v of obj
            if typeof v is 'function'
              views[k] = (values) ->
                ccss.compile v.apply values
            else
              views[k] = -> v

form = @render 'example', {values}

        context.render = (name,values) ->
          views[name](values)

        context.get = (obj) ->
          for k,v of obj
            route k, v

        routes = []
        route = (path,next) ->
          # FIXME path-to-regex translation
          routes.push
            path: path
            route: (params,query) ->
              ctx =
                render: context.render
                params: params
                query: query

              next.apply ctx

        f.apply context

        if window?.onhashchange?
          window.onhashchange ->
            # FIXME parse the hash into the hash-proper, and the query
            hash = window.location.hash
            query = {}

            for route in routes
              # String
              if typeof route.path is string
                if route.path is hash
                  return route.route {}, query
              # Regex
              if route.path.exec?
                if params = route.path.exec hash
                  return route.route params, query
              # Parsed string
              if route.path.regex?
                if result = route.path.regex.exec hash
                  params = {}
                  for k,n of route.path.map
                    params[k] = result[n]
                  return route.route params, query

        else
          # No hashonchange, need to monitor the hash
          'Not implemented'

      return app
