    require('./moonshine') ->
      @view index: ->
        html ->
          head ->
            title @title

      form = @render 'index', title: 'Foo bar'

      console.log form

      @css css: ->
        body:
          margin: '30%'
          color: @color

      form = @render 'css', color: 'blue'

      console.log form

      @helper my_title: 'Some title'
      console.log @view ->
        html ->
          head ->
            title my_title

      my_color = 'brownish'
      console.log @css ->
        body:
          color: my_color
