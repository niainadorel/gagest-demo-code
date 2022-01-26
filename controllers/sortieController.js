
let sortie = require("../models/sortie.js");
// let product = rquire("../models/product.js");
let sortieController = {};

// Show list of sorties
sortieController.list = function(req, res) {
  console.log(req.params.user_id)
  sortie.find({user: req.params.user_id}).exec((function (err, nentry) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: nentry});
    }
  }));
};

// Show sortie by id
sortieController.show = function(req, res) {
  sortie.findOne({_id: req.params.id}).exec(function (err, sortie) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: sortie});
    }
  });
};


// Save new sortie
sortieController.save = function(req, res) {
  /* change the data below to personalize your data */
  ///////////////////////////////
  let newsortie = req.body.data;
  ///////////////////////////////
  let s = new sortie(newsortie)
  s.save((err, nsortie) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      res.json({success: true, _id: nsortie._id})
    }
  });
};

// Update one sortie
sortieController.update = function(req, res) {
  sortie.findByIdAndUpdate(req.params.id, { $set: { content: req.body.content} }, { new: true }, function (err, sortie) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: sortie._id});
    }
  });
};
sortieController.showAll = function(req, res) {
  sortie.find({}, function(err, result) {
    if (err) {
      res.json({success: false, err})
    } else {
      res.json({success: true, result})
    }
  })
}
sortieController.add = function(req, res) {
  sortie.findOneAndUpdate({user: req.params.user_id},
    {$push: 
      {sorties: req.body.sortie }
    }, {useFindAndModify: false, new: true}, function (err, result) {
    if (err) {
      console.log(err)
      res.json({success: false, error: err})
    } else {
      res.json({success: true, data: result})
    }
  })
}


// Delete one sortie
sortieController.delete = function(req, res) {
  sortie.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("sortie deleted!");
      res.json({success: true})
    }
  });
};

module.exports = sortieController;