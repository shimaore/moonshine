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


    define (require) ->
      coffeecup = require 'coffeecup'
      ccss = require 'ccss'

      @app = (f) ->

        helpers = {}
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
        for k,v of obj
          views[k] = coffeecup.compile v, hardcode: helpers

form = @render 'example', {values}

      context.render = (name,values) ->
        views[name](values)

@css example: ->
  html

      context.css = (obj) ->
        for k,v of obj
          views[k] = ccss.compile v

      f.apply context
