const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/infoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
});

let Person = mongoose.model("Person", personSchema);
// create and save one person
var createAndSave = function () {
  let person = new Person({
    name: "john",
    age: 34,
    favoriteFoods: ["banana", "pizza"],
  });
  person.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};
// creating many people
var arrayOfPeople = [
  { name: "jack", age: 35, favoriteFoods: ["apple"] },
  { name: "james", age: 23, favoriteFoods: ["orange"] },
  { name: "val", age: 48, favoriteFoods: ["banana"] },
];
var createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};
//Use model.find() to Search Your Database

var findPeople = (personName, done) => {
  Person.find(personName, (err, peopleFound) => {
    if (err) {
      console.log(err);
    } else {
      done(null, peopleFound);
    }
  });
};
//Use model.findOne() to Return a Single Matching Document from Your Database

var findFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, foodFound) => {
    if (err) {
      return console.log(err);
    } else {
      done(null, foodFound);
    }
  });
};
//Use model.findById() to Search Your Database By _id
var findPersonId = (personId, done) => {
  Person.findById(personId, (err, idFound) => {
    if (err) {
      return console.log(err);
    } else {
      done(null, idFound);
    }
  });
};
//Perform Classic Updates by Running Find, Edit, then Save
var findPersonId = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  });
};
//Perform New Updates on a Document Using model.findOneAndUpdate()
var findTheName = (personName, done) => {
  var filter = { name: personName };
  var update = { age: 20 };
  Person.findOneAndUpdate(
    filter,
    update,
    { new: true },
    (err, personUpdated) => {
      if (err) return console.log(err);
      done(null, personUpdated);
    }
  );
};
//Delete One Document Using model.findByIdAndRemove
var deleteById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, personDeleted) => {
    if (err) return console.log(err);
    done(null, personDeleted);
  });
};
//MongoDB and Mongoose - Delete Many Documents with model.remove()
var deleteNameMary = (personName, done) => {
  var nameToRemove = { name: "Mary" };
  Person.remove(nameToRemove, (err, Maryremoved) => {
    if (err) return console.log(err);
    done(null, Maryremoved);
  });
};
//Chain Search Query Helpers to Narrow Search Results
var chainAndExec = (done) => {
  var foodToFind = { favoriteFoods: "burrito" };
  Person.find(foodToFind)
    .sort({ name: "asc" })
    .limit(2)
    .select(["name", "favoriteFoods"])
    .exec((err, result) => {
      if (err) return console.log(err);
      done(null, result);
    });
};
