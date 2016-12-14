//Require the controller
var friend = require('../controllers/friend.js');
//////////////////////////////////////////////////////////
//                        Routes                        //
//////////////////////////////////////////////////////////
module.exports = function(app) {
    app.get('/friends', function(req, res) {
        friend.index(req, res);
    })
    app.post('/friends', function(req, res) {
        friend.create(req, res);
    })
    app.delete('/friends/:id', function(req, res) {
        friend.delete(req, res);
    })
}
