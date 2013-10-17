MoonShine
=========

Some Zappa for the client.


    # Works as RequireJS module.
    moonshine = require './moonshine'

    moonshine ->

      @get '#': ->
        ($ '.content').html @render 'index', content_title: 'Foo bar'

      # Render may use HTML or CSS snippets:

      @view index: ->
        # HTML via coffeecup
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
