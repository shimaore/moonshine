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

        p -> "That's all folks!"      @view index: ->
        div ->
          h1 @content_title
          p 'Welcome'

      @css css: ->
        # CSS via ccss
        body:
          margin: '30%'
          color: @color

      # You may also render individual snippets directly.

      @helper my_title: 'Some title'
      console.log @view ->
        html ->
          head ->
            title my_title

      my_color = 'brownish'
      console.log @css ->
        body:
          color: my_color

Install
=======

    bower intall moonshine

Moonshine depends on `coffeecup` (client-side) to render `@view`.

Moonshine includes `ccss`, which is used to render `@css`.

Note: jQuery is used in the examples above to locate entities but is not required for moonshine to work.
