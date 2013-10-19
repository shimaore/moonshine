Moonshine
=========

This code is in the Public Domain.

Overview
========

The idea is that when I build a client-side application I will need:

- Some HTML (a main file or more + snippets)
- Some CSS (mine and other's)
- Some Javascript (mine and other's)

Ideally during development I want all these as separate pieces; but for deployment I want one HTML file, one CSS file, and one Javascript file. Although it could all be one Javascript file.

Also my current pattern for HTML is:

* snippets in the DOM (or as compiled coffeecup bits I guess)
* insert as:
  form = ($ '#form-source').clone().removeAttr('id')
  content.find('.form-target').html form
  form.show()

Main
====

    @moonshine = (f) ->

      helpers = {}
      views = {}
      context = {}

Syntax
======

@helper textbox: (attrs) ->
  attrs.type = 'text'
  attrs.name = attrs.id
  input attrs

      context.helper = (obj) ->
        for k,v of obj
          helpers[k] = v
        return

@view example: ->
  html -> etc.

      context.view = (obj) ->
        if typeof obj is 'string'
          return obj
        if typeof obj is 'function'
          return coffeecup.render obj, hardcode: helpers
        for k,v of obj
          views[k] = coffeecup.compile v, hardcode: helpers
        return

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
        return

form = @render 'example', {values}

      context.render = (name,values) ->
        views[name](values)

      context.get = (obj) ->
        for k,v of obj
          route k, v
        return

Route handler
=============

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
              post: handle_change # (fragment,query)
              redirect: (fragment) ->
                window.location.hash = "##{fragment}"

            next.apply ctx

        return

      f.apply context

      handle_change = (fragment,query) ->
        console.log "Routing to '#{fragment}'"
        for route in routes
          # String
          if typeof route.path is 'string'
            if route.path is fragment
              return route.route {}, query
          # Regex
          if route.path.exec?
            if params = route.path.exec fragment
              return route.route params, query
          # Parsed string
          if route.path.regex?
            if result = route.path.regex.exec fragment
              params = {}
              for k,n of route.path.map
                params[k] = result[n]
              return route.route params, query

        return

      handle_hash_change = ->
        fragment = window.location.hash?.replace(/^#/,'') ? ''
        handle_change fragment, {}

      if window?.onhashchange?
        window.onhashchange handle_hash_change
      else
        # No hashonchange, need to monitor the hash
        last_hash = window.location.hash
        monitorHash = ->
          new_hash = window.location.hash
          if new_hash isnt last_hash
            do handle_hash_change
          last_hash = new_hash
        setInterval monitorHash, 250

      do handle_hash_change
      return context
