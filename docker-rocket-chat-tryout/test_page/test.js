const http = require('http')

const requestListener = function (req, res) {
  res.writeHead(200)
  res.end(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>rocket.chat test page</h1>

  <!-- Start of Rocket.Chat Livechat Script -->
	<script type="text/javascript">
    (function(w, d, s, u) {
      w.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;
      var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
      j.async = true; j.src = 'http://192.168.10.21:3000/livechat/rocketchat-livechat.min.js?_=201903270000';
      h.parentNode.insertBefore(j, h);
    })(window, document, 'script', 'http://192.168.10.21:3000/livechat');
    </script>
</body>
</html>
`,
  )
}

const server = http.createServer(requestListener)
server.listen(8080)
