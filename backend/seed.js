require("dotenv").config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);


require("./models/User");
require("./models/Item");
var Item = mongoose.model("Item");
var User = mongoose.model("User");


function saveItem(num) {
    User.findById('627139709177580048e354b9')
    .then(function(user) {
    var tmpItem = {
        title: 'item ' + num
    }
      var item = new Item(tmpItem);
      item.seller = user;
      item.save();
      console.log(item)
    });
   
}
for(var i = 101; i < 102; i++){
    saveItem(i);

}

