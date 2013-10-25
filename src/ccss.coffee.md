    extend = (object, properties) ->
      for key, value of properties
        object[key] = value
      object

    ccss = {}
    ccss.compile = (rules) ->
      css = ''

      for selector, pairs of rules
        declarations = ''
        nested = {}

        #add mixins to the current level
        if {mixins} = pairs
          delete pairs.mixins
          for mixin in [].concat mixins
            extend pairs, mixin

        #a pair is either a css declaration, or a nested rule
        for key, value of pairs
          if typeof value is 'object'
            children = []
            split = key.split /\s*,\s*/
            children.push "#{selector} #{child}" for child in split
            nested[children.join ','] = value
          else
            #borderRadius -> border-radius
            key = key.replace /[A-Z]/g, (s) -> '-' + s.toLowerCase()
            declarations += " #{key}: #{value};\n"

        declarations and css += "#{selector} {\n#{declarations}}\n"

        css += @compile nested

      css

    module.exports = ccss

Copyright (c) 2011 James Campos <james.r.campos@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
