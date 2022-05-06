require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

require("./models/User");
require("./models/Item");
var Item = mongoose.model("Item");
var User = mongoose.model("User");

var user = new User();

user.username = "xomri3";
user.email = "xomri3@alink.co.il";
user.setPassword("12345678");
user.save().then(function () {
  for (var i = 0; i < 101; i++) {
    var tmpItem = {
      title: "newitem " + i,
    };
    var item = new Item(tmpItem);
    item.seller = user;
    item.save().then(() => {
      process.exit(0);
    });
  }
});

