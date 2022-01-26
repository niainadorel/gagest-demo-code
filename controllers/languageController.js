
let language = require("../models/language.js");

let languageController = {};

// Show list of languages
languageController.list = function(req, res) {
  language.find((function (err, language) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: language});
    }
  }));
};

// Show language by id
languageController.show = function(req, res) {
  language.findOne({_id: req.params.id}).exec(function (err, language) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: language});
    }
  });
};


// Save new language
languageController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newlanguage = req.body.data;
  ///////////////////////////////
  let l = new language(newlanguage)
  l.save((err, nlanguage) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json({success: true, language: nlanguage})
    }
  });
};

// Update one language
languageController.update = function(req, res) {
  language.findByIdAndUpdate(req.params.id, { $set: { content: req.body.content} }, { new: true }, function (err, language) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else{
      res.json({success: true, data: language._id});
    }
  });
};

// Delete one language
languageController.delete = function(req, res) {
  language.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("language deleted!");
      res.json({success: true})
    }
  });
};

module.exports = languageController;