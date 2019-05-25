var dbConnection = require('./databaseConnection');

var Batch = function() {};

Batch.getAllBatches = function getAllBatches(callback) {

  dbConnection.query (
    "SELECT b.id, p.name FROM batch b, program p WHERE b.program_id = p.id and b.start_date > '2018-01-01'",
    function (err, result) {
        if(err) {
            console.log("error: ", err);
            callback(err, null);
        }
        else {
            var batchArray = [];
            result.forEach(function(item) {
                batchArray.push( {
                    programId : item.id,
                    programName : item.name,
                 });
            });

            callback(null, { batches: batchArray});
        }
     }
  );
}


module.exports = Batch;



