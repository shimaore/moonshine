Moonshine
=========

Moonshine may be used without jQuery, but we use it here to instrument the tests.

    $(document).ready -> moonshine ->

We'll use a list inside the document as log space.

      log = (msg) =>
        $('.log').append @render 'log', {msg}

      @view log: ->
        p "> #{@msg}"

      stats =
        total: 0
        failed: 0

      equals = (v1,v2,msg) ->
        stats.total += 1
        if v1 is v2
          log "OK: #{msg}"
        else
          stats.failed += 1
          log "Failed: #{msg}, expected `#{v2}`, got `#{v1}`"

      summarize = ->
        log "Tests: failed #{stats.failed}/#{stats.total}"
        if stats.failed is 0
          log "All tests successful!"

The default target.

      @get '': ->
        $('body').html @render 'index', title: 'Test'
        # Test
        equals $('h1.test').text(), 'Test', 'Render title'
        @post 'test2'

      @view index: ->
        div ->
          h1 class:'test', -> @title

        div class:'log', ->
          p 'Logger'

      @get 'test2': ->
        equals window.location.hash, '', 'No hash update on post'
        @redirect 'test3'

      @get 'test3': ->
        equals window.location.hash, '#test3', 'Hash update on redirect'
        @post 'test4', foo: 42

      @get 'test4': ->
        equals @query.foo, 42, 'Get query parameter on post'
        summarize()
