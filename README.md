getElementsByStyle
==================

Get elements by a style matcher.

Usage
-----

```js

getElementsByStyle(matcher)

// matcher is a function like:

function matcher(style) {
  // return all translucent elements
  return parseFloat(style.opacity) < 1
}

```

License
-------

MIT