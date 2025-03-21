const statement = require('../index');

const normalize = (str) => str.replace(/\s+/g, ' ').trim();

test('statement', () => {
  const invoices = require('../invoices.json');
  const plays = require('../plays.json');
  const result = statement(invoices[0], plays);

  const expectedResult = `
  Statement for BigCo
   Hamlet: $650.00 (55 seats)
   As You Like It: $580.00 (35 seats)
   Othello: $500.00 (40 seats)
  Amount owned is $1,730.00
  You earned 47 credits
  `;

  expect(normalize(result)).toEqual(normalize(expectedResult));
})