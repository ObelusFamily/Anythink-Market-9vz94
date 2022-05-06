require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

require("./models/User");
require("./models/Item");
var Item = mongoose.model("Item");
var User = mongoose.model("User");
makeSeed();

async function makeSeed(){
    var user = new User();

    user.username = "xomri14";
    user.email = "xomri14@alink.co.il";
    user.setPassword("12345678");
    user.save().then(async function () {
      for (var i = 0; i < 101; i++) {
        await saveItem(user, i)
      }
      process.exit(0);
    })
}


async function saveItem(user,i){
    var tmpItem = {
        title: "verynewitem " + i,
      };
      var item = new Item(tmpItem);
      item.seller = user;
      console.log(item)
      await item.save()
}

