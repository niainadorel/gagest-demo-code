let product = require("../models/product.js");
let categorie = require("../models/categorie.js");

let productController = {};
// Show list of products
productController.list = function(req, res) {
  product.find( {user: req.params.user_id},(function (err, product) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: product});
    }
  }));
};
productController.getUserProductForClient = function(req, res) {
  product.find( {user: req.params.user_id},(function (err, products) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      const modifiedProduct = [];
      for(let product of products) {
        const temp = {
          _id: '' + product._id,
          price: product.sell_price,
          name: product.title,
          img: product.img,
          description: product.description,
          unit: product.unit,
          category: product.category
        }
        modifiedProduct.push(temp);
      }
      res.json({success: true, data: modifiedProduct});
    }
  }));
};


productController.search = function(req, res) {
  produc.find({$text: {$search: req.params.search_string}}).exec(function(err, result) {
    if (err) {
      res.json({success: false, error: err})
    } else {
      res.json({success: true, data: result})
    }
  })
}

productController.getOne = function(req, res) {
  product.findOne( {user: req.params.user_id, _id: req.params.product_id},(function (err, product) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: product});
    }
  }));
};

// Show product by id
productController.show = function(req, res) {
  product.findOne({_id: req.params.id}).exec(function (err, product) {
    if (err) {
      console.log("Error:", err);
      res.json({success: false})
    }
    else {
      res.json({success: true, data: product});
    }
  });
};


// Save new product
productController.save = function(req, res) {
  ///////////////////////////////
  let newproduct = req.body.data;
  ///////////////////////////////

  let p = new product(newproduct)
  p.save((err, nproduct) => {
    if(err) {
      console.log(err);
      res.json({success: false});
    } else {
      if (req.body.data.newCategorie) {
          categorie.findOneAndUpdate({user: req.body.data.user}, {
            $push: {
              categories: req.body.data.category
            }
          }, function (err, result) {
            if (err) {
              console.log(err);
              res.json({success: false, error: err})
            } else {
              res.json({success: true, _id: nproduct._id})
            }
          });
      } else {
        res.json({success: true, _id: nproduct._id})
      }
    }
  });
};

productController.insertMany = function(req, res) {
  product.insertMany(req.body.data, function(err, result) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      console.log('done');
      res.json({success: true, data: result})
    }
  })
}


// Update one product
productController.update = function(req, res) {
  console.log(req.params.id)
  const setting = req.body.content.$inc ? req.body.content : {$set: req.body.content};
  setting.lastUpdate = new Date();
  product.findByIdAndUpdate(req.params.id, setting, { new: true }, function (err, nproduct) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      if (req.body.content.quantity !== undefined || req.body.content.$inc) {
        req.io.to(req.params.user_id).emit('should_check_quantity');
      }
      res.json({success: true, data: nproduct});
    }
  });
};

productController.validate = function(req, res) {
  console.log(req.params.id)
  product.findByIdAndUpdate(req.params.id, {
    $set: {
      lastCheck: new Date()
    }
  }, { new: true }, function (err, product) {
    if (err) {
      console.log(err);
      res.json({success: false})
    } else {
      res.json({success: true, data: product._id});
    }
  });
};


// Delete one product
productController.delete = function(req, res) {
  product.deleteOne({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      console.log("product deleted!");
      res.json({success: true})
    }
  });
};

// delete many products

productController.deleteMany = function(req, res) {
  product.deleteMany({_id: {$in : req.body.data}}, function(err, data) {
    if (err) {
      console.log(err);
      res.json({success: false, error: err});
    } else {
      res.json({success: true, data: data});
    }
  })
}

productController.decreaseMany = function(req, res) {
  let bulkUpdateOps = [];
  for (let p of req.body.products) {
    bulkUpdateOps.push({
      "updateOne": {
        filter: {
          _id: p.product._id,
          quantity: {$gt: p.quantity - 1}
        },
        update: {
          $inc: {quantity: - p.quantity}
        }
      }
    });
  }
  product.bulkWrite(bulkUpdateOps, {"ordered": true, "w": 1}).then(result => {
    req.io.to(req.params.user_id).emit('should_check_quantity');
    res.json({success: true})
  })

}
productController.checkQty = function(req, res) {
  product.find({
    user: req.params.user_id,
    $expr: {
      $gt: [ "$stockDAlert", "$quantity"]
    }
  }, function(err, results) {
    if (err) {
      res.json({success: false, error: err})
    } else {
      res.json({success: true, data: results})
    }

  });
}

productController.getUserProductByBarcode = function(req, res) {
  console.log(req.params.user_id, req.params.barcode);
  product.findOne({
    user: req.params.user_id,
    barcode: req.params.barcode
  }, function(err, result){
    if (err || !result) {
      res.json({success: false})
    } else {
      res.json({success: true, data: result})
    }
  })
}

module.exports = productController;