const cleanDB = require('./cleanDB');

const cleanReportsAndResults = async () => {
  try {
    await cleanDB('Report', 'reports');
    await cleanDB('Result', 'results');

  } catch (err) {
    console.error(err);
    return ('Error clearing collections!');
  }
  console.log('Collections successfully cleared!');
  return ('Collections successfully cleared!');
};

module.exports = cleanReportsAndResults;