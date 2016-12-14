// mongoose
var mongoose = require('mongoose');
//Retreive the User mongoose object

//Model Call
var Friend = mongoose.model('Friend');

//Module Export
module.exports = (function() {
    return {
        index: function(req, res) {
            Friend.find({}, function(err, data) {
                if (err) {
                    res.json(err);
                } else {
                    console.log('FRIEND DATA:', data);
                    res.json(data);
                }
            })
        },
        create: function(req, res) {
            console.log('REQ BODY:', req.body);
            var friend = new Friend({name: req.body.name, age: req.body.age});
            friend.save(function(err) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    console.log('FRIEND:', friend);
                    res.redirect('/friends');
                }
            })
        },
        delete: function(req, res) {
            console.log('REQ.PARAMS',req.params);

            Friend.findOne({_id: req.params.id}, function(err, data) {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    console.log(data);
                    Friend.remove(data, function(err) {
                        if (err) {
                            console.log(err);
                            res.json(err);
                        } else {
                            res.json({sucess: true});
                        }
                    })
                }
            })
        }
    }
})();
