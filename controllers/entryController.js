
let entry = require("../models/entry.js");
let product = require("../models/product.js");
let entryController = {};

// Show list of entry
entryController.list = function(req, res) {
  console.log(req.params.user_id)
  entry.find({user: req.params.user_id}).exec((function (err, nentry) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: nentry});
    }
  }));
};

// Show entry by id
entryController.show = function(req, res) {
  entry.findOne({_id: req.params.id}).exec(function (err, entry) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: entry});
    }
  });
};


// Save new entry
entryController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newentry = req.body.data;
  ///////////////////////////////
  let a = new entry(newentry)
  a.save((err, nentry) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json({success: true, _id: nentry._id})
    }
  });
};

// Update one entry
entryController.update = function(req, res) {
  entry.findByIdAndUpdate(req.params.id, { $set: { content: req.body.content} }, { new: true }, function (err, entry) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: entry._id});
    }
  });
};

entryController.add = function(req, res) {
  entry.findOneAndUpdate({user: req.params.user_id},
    {$push: 
      {entry: req.body.entry }
    }, {useFindAndModify: false, new: true}, function (err, result) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err})
    } else {
      res.json({success: true, data: result})
    }
  })
}


entryController.delete = function (req, res) {
  console.log(req.params.user_id)
  console.log(req.params.entry_id)
  entry.updateOne({
    user: req.params.user_id,
  },{$pull: {'entry': {_id: req.params.entry_id}}}, { upsert: false }, function(err, result) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err});
    } else {
      console.log(result)
      res.json({success: true, data: result});
    }
  })
}
module.exports = entryController;