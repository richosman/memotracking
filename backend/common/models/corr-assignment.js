'use strict';

module.exports = function(Corrassignment) {

  Corrassignment.observe('after save', function(ctx, next) {

    console.log('ctx',ctx)

    console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
    next();
  });

  Corrassignment.sendEmail = function (cb) {
    console.log('cb',cb)
    Corrassignment.app.models.Email.send({

      to: 'jmosesessel21@gmail.com',
      from: 'jmosesessel21@gmail.com',
      subject: 'test mail',
      text: 'my text',
      html: 'Testing mail settings'
    },function (err, mail) {
      console.log('email sent!', mail)
      console.log('err', err)
      return cb(null)
    })
  }

  Corrassignment.remoteMethod('sendEmail', {returns: {type:'string'}})
};
