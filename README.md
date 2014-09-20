[1]: https://secure.travis-ci.org/litejs/liquid-filters-lite.png
[2]: https://travis-ci.org/litejs/liquid-filters-lite
[3]: https://coveralls.io/repos/litejs/liquid-filters-lite/badge.png
[4]: https://coveralls.io/r/litejs/liquid-filters-lite
[7]: https://ci.testling.com/litejs/liquid-filters-lite.png
[8]: https://ci.testling.com/litejs/liquid-filters-lite

[date-format-lite]: http://www.litejs.com/date-format-lite/
[liquid-lite]: http://www.litejs.com/liquid-lite/
[npm-package]: https://npmjs.org/package/liquid-filters-lite



    @version    0.1.3
    @date       2014-09-20
    @stability  2 - Unstable




Liquid Filters &ndash; [![Build][1]][2] [![Coverage][3]][4]
==============

Standard Filters for [liquid-lite][] extending native prototypes.


Currently supported filters
---------------------------

- **date** - reformat a date syntax reference  
    Require [date-format-lite][]
    ```javascript
    var item = { "timestamp": 1363770186, "datetime": "2013-03-20T09:03:06Z" }
    {{ timestamp | date:"isoUtcDateTime" }}
    {{ datetime | date:"hh:mm" }}
    ```

-   **capitalize** - capitalize words in the input sentence
-   **downcase** - convert an input string to lowercase
-   **upcase** - convert an input string to uppercase
-   **first** - get the first element of the passed in array
-   **last** - get the last element of the passed in array
-   **join** - join elements of the array with certain character between them.
    `Native in javascript`
-   **sort** - sort elements of the array
    `Native in javascript`
-   **size** - return the size of an array or string
-   **replace** - replace the first or each occurrence. 
    `Native in javascript`
    ```javascript
    {{ 'foofoo' | replace:'foo','bar' }} #=> 'barfoo'
    {{ 'foofoo' | replace:/foo/g,'bar' }} #=> 'barbar'
    ```
-   **remove** - remove each occurrence e.g. {{ 'foobarfoobar' | remove:'foo' }} #=> 'barbar'
-   **split** - split a string on a matching pattern e.g. {{ "a~b" | split:~ }} #=> ['a','b'].
    `Native in javascript`
-   **pluck** - map/collect an array on a given property
-   **truncate** - truncate a string down to x characters
-   **truncatewords** - truncate a string down to x words
-   **camelCase** - camelCase notation
-   **humanTime** - {{ "13" | humanTime }} #=> "13 seconds", {{ "78" | humanTime }} #=> "1 minute"
-   **step** - {{ "71" | step:5 }} #=> "70", {{ "12.31" | step:0.2 }} #=> "12.4"



### Todo

- **escape** - escape a string
- **escape_once** - returns an escaped version of html without affecting existing escaped entities
- **strip_html** - strip html from string
- **prepend** - prepend a string e.g. {{ 'bar' | prepend:'foo' }} #=> 'foobar'
- **append** - append a string e.g. {{ 'foo' | append:'bar' }} #=> 'foobar'
- **minus** - subtraction e.g. {{ 4 | minus:2 }} #=> 2
- **plus** - addition e.g. {{ '1' | plus:'1' }} #=> '11', {{ 1 | plus:1 }} #=> 2
- **times** - multiplication e.g {{ 5 | times:4 }} #=> 20
- **divided_by** - division e.g. {{ 10 | divided_by:2 }} #=> 5
- **modulo** - remainder, e.g. {{ 3 | modulo:2 }} #=> 1


Browser Support
---------------

[![browser support][7]][8]


External links
--------------

-   [npm-package][]


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


