'use strict';

module.exports = function(Assigncorr) {

  Assigncorr.observe('after save', function (ctx,cb, next) {
   
    var assigner_name = '';
    var assigner_email = '';
    var assignee_name = '';
    var assignee_email = '';
    var corr_name = '';
    var from_where = '';
    

      //send mail to assingee
      Assigncorr.app.models.MemoUser.findById(ctx.instance.toUserId, {where: {id: ctx.instance.toUserId}}, function (err, data) {
        if (err) {
          return err
        }

        assignee_name = data.fullname;
        assignee_email = data.email;

        if (data) {

          Assigncorr.app.models.AddMemo.findById(ctx.instance.correspondenceId, {where: {id: ctx.instance.correspondenceId}}, function (err, corr_data) {
            if (err) {
              return err
            }

            corr_name = corr_data.subject
            from_where = corr_data.fromWhere

            let html = `Hello ${assignee_name},<br>
          A correspondence with the subject: ${corr_name} from: ${from_where} has been assigned to you. <br>
           Kindly login to the Corresponence Tracker System to re-assign this correspondence after you have completed the task on the correspondence.`;

            Assigncorr.app.models.Email.send({
      
              to: 'osman.alhassan@nca.org.gh',
              from: '"Memo Tracking" <osman.alhassan@nca.org.gh>',
              subject: 'Memo Tracker Assignment',
              html: html
            },function (err, mail) {
              if (err) {
                console.log('err', err)
                return cb(err)
              }else{
                console.log('email sent!', mail)
                return cb(null)
              }
            });

           
          })
          
        }

      });


  })

};
