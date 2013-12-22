Simple user module of [koa](http://koajs.com/)
===

Installation
---

```shell
npm install koa-user
```

Example

```javascript
var user = require('koa-user')
var koa = require('koa')
var app = koa()

function check(username, passwd) {
  // username & passwd are given from koa-user
  // check, always by db search
  return function(fn) {
    db.query('SELECT * from users where username=' + username, function(err, results) {
      if (!err) {
        fn(null, results[0])
        // the second arg expect to be the user object
        // just like {id: 100, name: 'myname', ...}
        // user will be bind on `this`
      } else {
        fn(err)
      }
    })
  }
}

app.use(user(check))

app.use(function* () {
  this.body = this.user // this.user is the result you given from check handler
})

app.listen(3000)
```

Todo
---

- add setting cookie
- add options

License
---

MIT
