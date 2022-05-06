
var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/admin')
require("./models/User");
require("./models/Item");

var mongoose = require("mongoose");
var Item = mongoose.model("Item");
var User = mongoose.model("User");


const saveItem = async (num) => {
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
for(var i = 0; i < 100; i++){
    saveItem(i);

}

