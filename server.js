const express = require("express");
const redis = require("redis"),
  client = redis.createClient({ host: "redis" });

const app = express();
client.set("visits", "0", function() {
  console.log(client.get("visits"));
});

client.on("error", function(err) {
  console.log("Error " + err);
});
app.get("/", function(req, res) {
  client.get("visits", function(err, reply) {
    reply = parseInt(reply);
    client.set("visits", (++reply).toString(), function() {
      res.send(`Total visits: ${reply}`);
    });
  });
});
app.listen(8081, function() {
  console.log("listening on  8081");
});
