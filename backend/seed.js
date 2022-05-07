const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
require('./models/User');
require('./models/Item');
require('./models/Comment');

const User = mongoose.model('User');
const Item = mongoose.model('Item');
const Comment = mongoose.model('Comment');

async function createUser() {
  const username = crypto.randomUUID().split('-')[0];
  const pass = crypto.randomUUID().split('-')[1];
  const user = new User();
  user.username = `test${username}`;
  user.email = `test+${username}@test.com`;
  user.setPassword(pass);
  try {
    await user.save();
    return user._id;
  } catch (err) {
    console.log(err, "Error creating user");
  }
}

async function createItem(userId) {
  const uuid = crypto.randomUUID().split('-')[0];
  const item = new Item();
  item.slug = `itemSlug${uuid}`;
  item.title = 'just tile';
  item.description = 'some description';
  item.image = 'https://picsum.photos/536/354';
  item.tagList = ['test1', 'test2'];
  item.seller = userId;
  try {
    await item.save();
    return item._id;
  } catch (err) {
    console.log(err, "Error createing item");
  }
}

async function createComment(userId, itemId) {
  const comment = new Comment();
  comment.body = 'some comment';
  comment.seller = userId;
  comment.item = itemId;
  try {
    await comment.save();
  } catch (err) {
    console.log(err, "Error creating comment");
  }
}

async function populate() {
  let counter = 0;
  for (let i = 0; i < 100; i++) {
    const userId = await createUser();
    const itemId = await createItem(userId);
    await createComment(userId, itemId);
    counter++;
  }
  console.log(`done seed database with 100 users, items and comments`);
}

(async () => {
  await populate();
  process.exit();
})();