// routes.js

var Account = require('./models/accounts.js');

//expose routes
module.exports = function(app) {
    // authenticate user info
    app.post('/api/accounts/authenticate', function(req, res) {
        // initialize response
        var data = {
            valid: false
        }
        // parse query data
        var username = req.body.username;
        var password = req.body.password;
        // find account
        Account.find({"username": username, "password": password}, function(err, accounts) {
            if (err) {
                res.json(data);
            }
            // found
            if (accounts.length > 0) {
                data.valid = true;
            } 
            res.json(data);
        })
    })

    // add an account
    app.put('/api/accounts/add', function(req, res) {
        // initialize response
        var data = {
            registered: false
        }
        // parse query data
        var uname = req.body.username;
        var pass = req.body.password;
        // check if account already exists
        Account.find({'username': uname, 'password': pass}, function(err, accounts) {
            if (accounts.length > 0) {
                res.json(data);
                return;
            }
            // create and add account
            var account = new Account({'username': uname, 'password': pass});
            account.save(function(err, account) {
                if (err) {
                    data.registered = false;
                } else {
                    data.registered = true;
                }
                // return json response
                res.json(data);
            });
        })
        return;
    })


    // route all requests to angular frontend
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    })
}
