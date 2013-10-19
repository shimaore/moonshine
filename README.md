MoonShine
=========

A dash of [Zappa](https://github.com/zappajs/zappajs) for the client.

    $(document).ready -> moonshine ->

      # Routing is based on the hash (without the `#` sign).

      @get '': ->
        ($ 'body').html @render 'index', title: 'Foo Bar'

      @get '/foo': ->
        ($ 'body').html @render 'foo'
        ($ '.boo').click =>
          @post '/boo'

      @get '/boo': ->
        ($ 'body').html @render 'boo', lines: [ 'hello', 'world' ]

      # Render may use HTML or CSS snippets:

      @view index: ->
        # HTML via coffeecup
        div ->
          h1 @title
          p 'Welcome!'
          p ->
            a href:'#/foo', 'Go foo!'
            span ' | '
            a href:'#/boo', 'Go boo!'

      @view foo: ->
        div ->
          a href:'#', 'Back home'
          a class:'boo' # This one is activated via a `.click` method above.

      @view boo: ->
        ul ->
          for line in @lines
            li -> line

        p -> "That's all folks!"

Install
=======

    bower intall moonshine

Note: jQuery is used in the examples above to locate entities but is not required for moonshine to work.

API (root scope)
================

`@helper` inserts helpers inside views.

`@view` defines new (coffeecup) views.

`@get` routes based on the hash-tag.

API (route-handler scope)
=========================

`@render view, {params}` renders a view with the given parameters.

`@post route, {query}` re-routes, optionally with new query paramaters.

`@redirect route` re-routes by changing the hash-tag.

`@query` contains the query parameters sent by `@post`, if any.
