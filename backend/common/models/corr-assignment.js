'use strict';

module.exports = function(Corrassignment) {

  // Corrassignment.observe('after save', function(ctx, next) {
  //
  //   console.log('ctx',ctx)
  //
  //   console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
  //   next();
  // });

  Corrassignment.sendEmail = function (cb) {
    // console.log('cb',cb)
console.log('to mail',cb.data.email)
    Corrassignment.app.models.Email.send({
      

      to: cb.data.email,
      from: 'jmosesessel21@gmail.com',
      subject: 'test mail',
      text: 'my text',
      html: `Testing mail settings`
    },function (err, mail) {
      if (err) {
        console.log('err', err.data)
        return cb(err)
      }else{
        console.log('email sent!', mail)
        return cb(null)
      }
      
      
      
      // cb(null)
    })
  }

  Corrassignment.remoteMethod('sendEmail', {returns: {type:'string'}})
};
