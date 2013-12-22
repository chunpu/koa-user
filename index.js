// check signin by username and passwd
// check token by username and passwd

var crypto = require('crypto')

var app = module.exports = function(check) {
  return function* (next) {
    var token = this.cookies.get('token')
    if (!token) {
      // TODO
      return this.body = 'token fail'
    }
    var arr = parseToken(token, 'secret')
    var user = yield check(arr[0], arr[1])
    if (!user) {
      // TODO
      return this.body = 'no such user'
    }
    this.user = user
    yield next
  }
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret)
  var dec = decipher.update(str, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
  //var arr = str.split('\t')
  //return arr // name, passwd, secret
}

function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret)
  var enc = cipher.update(str, 'utf8', 'hex')
  enc += cipher.final('hex')
  return enc
}

function parseToken(token, secret) { 
  var str = decrypt(token, secret)
  var arr = str.split('\t')
  return arr
}

function genToken(name, passwd) {
  var secret = 'secret' // will be random
  var str = [name, passwd, secret].join('\t')
  var token = encrypt(str, secret)
  return token
}
