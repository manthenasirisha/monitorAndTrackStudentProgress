var Batch = require('../model/batch');

exports.getAllBatches = function(request, response) {

   response.header("Access-Control-Allow-Origin", "*");
   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


  Batch.getAllBatches(function(err, batch) {
    console.log('batch controller')

    if (err) {
      response.send(err);
      return;
    }

    response.send(batch);
  });

};