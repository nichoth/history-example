# HTML5 history example

Example from [css-tricks](https://css-tricks.com/using-the-html5-history-api/), adapted for node.


    $ git clone https://github.com/nichoth/history-example.git
    $ cd history-example
    $ npm install
    $ npm run build
    $ node server.js

Checkout [pjax](https://github.com/defunkt/jquery-pjax) &mdash; uses a special request header, so the server can decide whether to send full pages or partials based on the header.

* Use `virtual-dom` for all rendering
* Same rendering code on client and server
* Server serves full pages &mdash; works without any JS


## todo
* use `vdom-virtualize` to start the client side rendering.
