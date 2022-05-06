require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

require("./models/User");
require("./models/Item");
var Item = mongoose.model("Item");
var User = mongoose.model("User");


for (var i = 0; i < 100; i++) {
    User.findOne().then(function (user) {
        if (user) {
          var tmpItem = {
            title: "item " + i,
          };
          var item = new Item(tmpItem);
          item.seller = user;
          item.save();
        }
      });
}
process.exit(0);
