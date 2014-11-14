module.exports = function(app) {
    var signIn = require('./signIn');
    var signUp = require('./signUp');
    var myAccount = require('./myAccount');
    var index = require('./index');
    var signOut = require('./signOut');
    var info = require('./info');
    var viewDraws = require('./viewDraws');
    var viewOldBets = require('./viewOldBets');
    var forgotPassword = require('./forgotPassword');
    var playNow = require('./playNow');



    app.use('/signIn', signIn);
    app.use('/signUp', signUp);
    app.use('/myAccount', myAccount);
    app.use('/index', index);
    app.use('/signOut', signOut);
    app.use('/info', info);
    app.use('/viewDraws', viewDraws);
    app.use('/viewOldBets', viewOldBets);
    app.use('/forgotPassword', forgotPassword);
    app.use('/playNow', playNow);



    //tests
    var test = require('./test');
    var promise = require('./promise');
    var callback = require('./callback');

    app.use('/test', test);
    app.use('/test/:params', test);
    app.use('/promise', promise);
    app.use('/promise/:userName/:userEmail', promise);
    app.use('/callback/:userName/:userEmail', callback);

}