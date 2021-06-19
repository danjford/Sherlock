var Sherlock = require('../sherlock.js');
var tests = require('./tests');
var chalk = require('chalk');

var log = console.log;

var i = 0,
  testCases = null;

while(i < tests.dates.length) {
  // set a fake time for Sherlock
  Sherlock._setNow(tests.getNow());
  // run the test cases using this time
  var cases = tests.runTestCases(Sherlock);
  // merge with existing results
  if (testCases === null)
    testCases = cases;
  else
    for (var k = 0; k < cases.length; k++) {
      testCases[k][1] = (testCases[k][1] && cases[k][1]);
    }
  i++;
}

// clear the fake Sherlock time
Sherlock._setNow(null);

// Run all tests and mark them as pass/fail
for (var j = 0; j < testCases.length; j++) {
  var t = testCases[j];
  //   p = document.createElement('p'),
  //   status = document.createElement('span');

  // if (t[0] === null)
  //   t[0] = "<code>null</code>";
  // else if (t[0].trim() == "")
  //   t[0] = "<code>'" + t[0] + "'</code>";
  // p.innerHTML = t[0];

  if (t[1]) {
    log(chalk.green('Pass'));
    // status.innerHTML = 'success';
    // status.className = 'pass';
  } else {
    fails++;
    log(chalk.red('Fail'));
    // status.innerHTML = 'fail';
    // status.className = 'fail';
  }
  // p.appendChild(status);
  // tests.appendChild(p);
}

// stop benchmarking
var t1 = new Date().getTime();