const { batch } = require('../batchTreatment');

const TABLE_NAME_CORRECTIONS = 'corrections';
const TABLE_NAME_MARKS = 'marks';

exports.up = function(knex, Promise) {

  return knex.schema.table(TABLE_NAME_MARKS, function(table) {
    table.integer('correctionId').unsigned();
    table.foreign('correctionId').references('corrections.id');
  })
    .then(() => knex(TABLE_NAME_CORRECTIONS).select('id', 'assessmentId'))
    .then((allCorrections) => {

      return batch(knex, allCorrections, (correction) => {
        return knex(TABLE_NAME_MARKS)
          .where('assessmentId', '=', correction.assessmentId)
          .update({
            correctionId: correction.id
          });
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.table(TABLE_NAME_MARKS, function(table) {
    table.dropColumn('correctionId');
    console.log('Column correctionId remove from Marks');
  });
};
