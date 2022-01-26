
let categorie = require("../models/categorie.js");

let categorieController = {};

// Show list of categories
categorieController.list = function(req, res) {
  console.log(req.params.user_id);
  categorie.findOne({user: req.params.user_id},(function (err, categorie) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: categorie});
    }
  }));
};

// Show categorie by id
categorieController.show = function(req, res) {
  categorie.findOne({}).exec(function (err, categorie) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: categorie});
    }
  });
};


// Save new categorie
categorieController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newcategorie = req.body.data;
  ///////////////////////////////
  let c = new categorie(newcategorie)
  c.save((err, ncategorie) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json({success: true, _id: ncategorie._id})
    }
  });
};

// Update one categorie
categorieController.update = function(req, res) {
  categorie.findByIdAndUpdate(req.params.id, { $set: { content: req.body.content} }, { new: true }, function (err, categorie) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: categorie._id});
    }
  });
};

// Delete one categorie
categorieController.delete = function(req, res) {
  categorie.findOneAndUpdate({user: req.params.user_id}, {
    $pull: {
      categories: req.body.categorie
    }
  }, function (err, result) {
    if (err) {
      console.log(err);
      res.json({success: false, error: err})
    } else {
      res.json({success: true})
    }
  });
};

categorieController.add = function(req, res) {
  console.log(req.body);
  categorie.findOneAndUpdate({user: req.params.user_id}, {
    $push: {
      categories: req.body.data
    }
  }, function (err, result) {
    if (err) {
      console.log(err);
      res.json({success: false, error: err})
    } else {
      res.json({success: true})
    }
  });
}
categorieController.addMany = function(req, res) {
  categorie.findOneAndUpdate(
    { user: req.params.user_id },
    {
      $addToSet: {
        categories: {$each: req.body.data}
      }
    }, function (err, result) {
    if (err) {
      console.log(err);
      res.json({success: false, error: err})
    } else {
      res.json({success: true})
    }
  });
}

module.exports = categorieController;