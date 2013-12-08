# doto

A flow-control/threading HoF. The name was stolen from Clojure.

## API

### module.exports = function doto (target, steps, [callback])

Apply each function in `steps` to `target` in order. For example:

```javascript
var assert = require('assert')
var doto   = require('doto')

var result = doto({}, [
  function (o) { o.someKey = 1 },
  function (o) { o.otherKey = o.someKey * 10 }
])

assert.deepEqual(result, {someKey: 1, otherKey: 10})
```

You may pass additional arguments to a step (other than `target`, which is always
the first argument) by using an array instead of a function:

```javascript
var set = function (o, k, v) { o[k] = v }
var result = doto({}, [
  [set, 'someKey', 1]
  function (o) { o.otherKey = o.someKey * 10 }
])
```

If a callback is provided, all steps are assumed to be asynchronous, and will
receive a `next` function as their last argument:

```javascript
doto({}, [loadUser, req.userId], [checkAuthorization, req], function (err, res) {
  // etc. etc.
})
```

## License

BSD-2-Clause

