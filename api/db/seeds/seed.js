'use strict';
const listSeeds = [
  'assessments',
  'assessment-results',
  'answers',
  'certification-courses',
  'certification-challenges',
  'competence-marks',
  'organizations',
  'users',
  'sessions',
  'snapshots',
  'users_pix_roles',
];

function addData(knex, table, data) {
  return Promise.all(data)
    .then(data => {
      return knex(table)
        .insert(data)
        .catch((err) => {
          console.log(err);
        });
    });
}

function createDataByTables() {
  return listSeeds.map(tableName => {
    return {
      table: tableName,
      data: require('./data/'+tableName+'.js')
    };
  });
}

exports.seed = (knex) => {
  const dataByTables = createDataByTables();
  const dataToAdd = dataByTables.map(dataByTable => {
    return addData(knex, dataByTable.table, dataByTable.data);
  });
  return Promise.all(dataToAdd);
};
