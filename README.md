
[1]: https://raw.github.com/litejs/liquid-filters-lite/master/min.js
[2]: https://raw.github.com/litejs/liquid-filters-lite/master/liquid-filters-lite.js
[date-format-lite]: http://www.litejs.com/date-format-lite/
[liquid-lite]: http://www.litejs.com/liquid-lite/


Liquid Filters
==============

Standard Filters for [liquid-lite][] extending native prototypes.
Download [compressed][1] 
(346 bytes or 210 bytes gzipped)
or [uncompressed][2] source.


### Currently supported filters

- **date** - reformat a date syntax reference  
    Require [date-format-lite][]
    ```javascript
    var item = { "timestamp": 1363770186, "datetime": "2013-03-20T09:03:06Z" }
    {{ timestamp | date:"isoUtcDateTime" }}
    {{ datetime | date:"hh:mm" }}
    ```

- **capitalize** - capitalize words in the input sentence
- **downcase** - convert an input string to lowercase
- **upcase** - convert an input string to uppercase
- **first** - get the first element of the passed in array
- **last** - get the last element of the passed in array
- **join** - join elements of the array with certain character between them.
    _Native in javascript_

- **sort** - sort elements of the array
- **size** - return the size of an array or string
- **replace** - replace each occurrence e.g. {{ 'foofoo' | replace:'foo','bar' }} #=> 'barbar'.
    _Native in javascript_
- **split** - split a string on a matching pattern e.g. {{ "a~b" | split:~ }} #=> ['a','b'].
    _Native in javascript_


### Todo

- **map** - map/collect an array on a given property
- **escape** - escape a string
- **escape_once** - returns an escaped version of html without affecting existing escaped entities
- **strip_html** - strip html from string
- **strip_newlines** - strip all newlines (\n) from string
- **newline_to_br** - replace each newline (\n) with html break
- **replace_first** - replace the first occurrence e.g. {{ 'barbar' | replace_first:'bar','foo' }} #=> 'foobar'
- **remove** - remove each occurrence e.g. {{ 'foobarfoobar' | remove:'foo' }} #=> 'barbar'
- **remove_first** - remove the first occurrence e.g. {{ 'barbar' | remove_first:'bar' }} #=> 'bar'
- **truncate** - truncate a string down to x characters
- **truncatewords** - truncate a string down to x words
- **prepend** - prepend a string e.g. {{ 'bar' | prepend:'foo' }} #=> 'foobar'
- **append** - append a string e.g. {{ 'foo' | append:'bar' }} #=> 'foobar'
- **minus** - subtraction e.g. {{ 4 | minus:2 }} #=> 2
- **plus** - addition e.g. {{ '1' | plus:'1' }} #=> '11', {{ 1 | plus:1 }} #=> 2
- **times** - multiplication e.g {{ 5 | times:4 }} #=> 20
- **divided_by** - division e.g. {{ 10 | divided_by:2 }} #=> 5
- **modulo** - remainder, e.g. {{ 3 | modulo:2 }} #=> 1


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


