require("dotenv").config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

require("./models/User");
require("./models/Item");
var Item = mongoose.model("Item");
var User = mongoose.model("User");
makeSeed();

async function makeSeed(){
    for(var n=0; n<101;n++){
        var user = await saveUser(n)
        await user.save().then(async function () {
            for (var i = 0; i < 101; i++) {
              await saveItem(user, i)
            }
        })
    }
    process.exit(0);
}


async function saveUser(i) {
    var user = new User();

    user.username = `myuser${i}`;
    user.email = `myemailuser${i}@mydomain.com`;
    user.setPassword("12345678");
    return user;
}

async function saveItem(user,i){
    var tmpItem = {
        title: "verynewitem " + i,
      };
      var item = new Item(tmpItem);
      item.seller = user;
      await item.save()
}

