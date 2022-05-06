require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

require("./models/User");
require("./models/Item");
var Item = mongoose.model("Item");
var User = mongoose.model("User");

function saveItem(num) {
  User.findOne().then(function (user) {
    if (user) {
      var tmpItem = {
        title: "item " + num,
      };
      var item = new Item(tmpItem);
      item.seller = user;
      item.save();
    }
  });
}
for (var i = 101; i < 102; i++) {
  saveItem(i);
}
