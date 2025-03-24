const { statement, htmlStatement } = require('../statement');
const createStatementData = require('../createStatementData');

const normalize = (str) => str.replace(/\s+/g, ' ').trim();

test('plainText', () => {
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
});

test('html', () => {
  const invoices = require('../invoices.json');
  const plays = require('../plays.json');
  const result = htmlStatement(invoices[0], plays);

  const expectedResult = `
  <h1>Statement for BigCo</h1>
  <table>
    <tr>
      <th>Play</th>
      <th>Seats</th>
      <th>Cost</th>
    </tr>
    <tr>
      <td>Hamlet</td>
      <td>55</td>
      <td>$650.00</td>
    </tr>
    <tr>
      <td>As You Like It</td>
      <td>35</td>
      <td>$580.00</td>
    </tr>
    <tr>
      <td>Othello</td>
      <td>40</td>
      <td>$500.00</td>
    </tr>
  </table>
  <p>Amount owed is <em>$1,730.00</em></p>
  <p>You earned <em>47</em> credits</p>
  `;

  expect(normalize(result)).toEqual(normalize(expectedResult));
});

test('createStatementData', () => {
  // Given
  const invoices = require('../invoices.json');
  const plays = require('../plays.json');

  // When
  const statementData = createStatementData(invoices[0], plays);

  // Then
  const expected = {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55,
        "play": {
          "name": "Hamlet",
          "type": "tragedy"
        },
        "amount": 65000,
        "volumeCredits": 25
      },
      {
        "playID": "as-like",
        "audience": 35,
        "play": {
          "name": "As You Like It",
          "type": "comedy"
        },
        "amount": 58000,
        "volumeCredits": 12
      },
      {
        "playID": "othello",
        "audience": 40,
        "play": {
          "name": "Othello",
          "type": "tragedy"
        },
        "amount": 50000,
        "volumeCredits": 10
      }
    ],
    "totalAmount": 173000,
    "totalVolumeCredits": 47
  };

  expect(statementData).toEqual(expected);
});