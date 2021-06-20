var Sherlock = require('../sherlock.js');
var tests = require('./tests');
var chalk = require('chalk');
var ora = require('ora');

var log = console.log;

var i = 0,
  testCases = null,
  fails = 0,
  success = 0;

while(i < tests.dates.length) {
  // set a fake time for Sherlock
  Sherlock._setNow(tests.getNow());
  // run the test cases using this time
  var cases = tests.runTestCases(Sherlock, false
    );
  // merge with existing results
  if (testCases === null)
    testCases = cases;
  else
    for (var k = 0; k < cases.length; k++) {
      testCases[k][1] = (testCases[k][1] && cases[k][1]);
    }
  i++;
}

var spinner = ora(`Starting ${testCases.length} tests, Success: 0, Fail:0`).start();

// clear the fake Sherlock time
Sherlock._setNow(null);

// Run all tests and mark them as pass/fail
for (var j = 0; j < testCases.length; j++) {
  var t = testCases[j];

  if (t[1]) {
    success++;
    spinner.succeed(`${t[0]} Passed`);
  } else {
    fails++;
    spinner.fail(`${t[0]} Failed`);
  }
}

if (fails > 0) {
  log(chalk.red(`${fails}/${testCases.length} Failures`));
  log('\u0007');
  process.exit(1);
}
else {
  spinner.stop();
  process.exit(0);
}