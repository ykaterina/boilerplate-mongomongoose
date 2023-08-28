require("dotenv").config();
var express = require("express");
var app = express();
const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let JohnSmith = new Person({
    name: "John Smith",
    age: 24,
    favoriteFoods: ["Mango", "Siomai", "Baked Oyster"],
  });

  JohnSmith.save(function (err, data) {
    err ? console.log(err) : done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  arrayOfPeople.forEach(function (person) {
    let newentry = new Person({
      name: person.name,
      age: person.age,
      favoriteFoods: person.favoriteFoods,
    });

    newentry.save(function (err, data) {
      err ? console.log(err) : done(null, data);
    });
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    err ? console.log(err) : done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food }, function (err, personFound) {
    err ? console.log(err) : done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, personFound) {
    err ? console.log(err) : done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, personFound) {
    err ? console.log(err)
      :  personFound.favoriteFoods.push(foodToAdd);
    personFound.save(function (err, person) {
        err ? console.log(err) : done(null, person)
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
      function (err, personFound) {
        err ? console.log(err) : done(null, personFound);
      });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, personFound){
    err ? console.log(err) : done(null, personFound);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function (err, people){
    err ? console.log(err) : done(null, people);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch })
    .sort({name: 1})
    .limit(2)
    .select('name favoriteFoods')
    .exec(function (err, people) {
      err ? console.log(err) : done(null, people);
    });
};

/*
Modify the queryChain function to find people who like the food specified 
by the variable named foodToSearch. 
Sort them by name, limit the results to two documents, and hide their age. 
Chain .find(), .sort(), .limit(), .select(), and then .exec(). 
Pass the done(err, data) callback to exec().
*/

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
