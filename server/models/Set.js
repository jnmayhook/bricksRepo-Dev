const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedSets` array in User.js
const setSchema = new Schema(
  {
    // saved set id 
    // _id: {
    //   type: Number,
    // },
    // set number from Lego
    Item_Number: {
      type: Number,
    },
    Name: {
      type: String,
    },
    Year: {
      type: Number,
    },
    Theme: {
      type: String,
    },
    Subtheme: {
      type: String,
    },
    Pieces: {
      type: Number,
    },
    Minifigures: {
      type: Number,
    },
    Image_URL: {
      type: String,
    }
  },
  {
    collection: "lego"
  }
);

const Set = model('Set', setSchema);


module.exports = Set;