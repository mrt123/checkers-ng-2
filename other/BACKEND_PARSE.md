# CHECKERS BACKEND with Parse
[parse-server](https://github.com/ParsePlatform/parse-server)
(TODO: create separate repo checkers_backend)

### Pre-requisites
* Nodejs ( suggested v4.4.5)

## Install & run local server

```
$ npm install -g parse-server mongodb-runner
$ mongodb-runner start
$ parse-server --appId CHECKERS_2 --masterKey MASTER_KEY
```


to test:
```bash
curl -X POST \
-H "X-Parse-Application-Id: CHECKERS_2" \
-H "Content-Type: application/json" \
-d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
http://localhost:1337/parse/classes/GameScore
```

You should get a response similar to this:
```js
{
  "objectId": "2ntvSpRGIK",
  "createdAt": "2016-03-11T23:51:48.050Z"
}
```

#### links
Test JavaScript: [using-parse-sdks-with-parse-server](https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide#using-parse-sdks-with-parse-server)
JavaScript SDK GUIDE: https://parse.com/docs/js/guide#users
JavaScript SDK API: https://parse.com/docs/js/api/classes/Parse.User.html
##### LiveQuery
[Setup LiveQuery for Server and Client](https://github.com/ParsePlatform/parse-server/wiki/Parse-LiveQuery)
[LiveQuery guide to client](http://parseplatform.github.io/docs/js/guide/#live-queries)


