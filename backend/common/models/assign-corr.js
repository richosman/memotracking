'use strict';

module.exports = function(Assigncorr) {

  // Assigncorr.observe('after save', function (ctx, next) {
  //   console.log(ctx)
  //
  //   // var task_name = ctx.instance.task_name;
  //   // var task_status = ctx.instance.task_status;
  //   var assigner_name = '';
  //   var assigner_email = '';
  //   var assignee_name = '';
  //   var assignee_email = '';
  //   // status_after = task_status;
  //
  //   //send email when the Task is newly created
  //   if (!ctx.isNewInstance) {
  //     console.log('is new instance')
  //
  //     // Assigncorr.app.models.MemoUser.findById(ctx.instance.fromUserId, {where: {id: ctx.instance.fromUserId}}, function (err, data) {
  //     //   console.log('selected user', data)
  //     //   if (err) {
  //     //     return err
  //     //   }
  //     //   assigner_name = data.fullname;
  //     //   assigner_email = data.email;
  //     //
  //     // });
  //
  //     //send mail to assingee
  //     Assigncorr.app.models.MemoUser.findById(ctx.instance.toUserId, {where: {id: ctx.instance.toUserId}}, function (err, data) {
  //     console.log('selected user', data)
  //       if (err) {
  //         return err
  //       }
  //
  //       assignee_name = data.fullname;
  //       // assignee_email = data.email;
  //       assignee_email = 'richosmanthus@gmail.com';
  //       //
  //       if (data) {
  //         console.log('data', data)
  //         // var renderer = loopback.template(path.resolve(__dirname, '../../../common/views/assign-corr-email-template.ejs'));
  //         // var html_body = renderer({assignee_name: assignee_name});
  //         // var html = html_body;
  //         var html = 'html_body';
  //
  //         console.log('html', html)
  //
  //         Assigncorr.app.models.Email.send({
  //           to: assignee_email,
  //           from: 'Memo Tracking <no-reply@nca.org.gh>',
  //           subject: 'Memo Assignment',
  //           html: html,
  //         }, function (err) {
  //           if (err) return console.log('> error sending email');
  //           console.log('> sending email to:', assignee_email);
  //         });
  //       }
  //
  //     });
  //
  //
  //   }
  //   if (ctx.isNewInstance) {
  //     console.log('is not new instance')
  //   }
  // })

};
