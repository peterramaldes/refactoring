const createStatementData = require('./createStatementData.js');

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owned is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
  return `
  <h1>Statement for BigCo</h1>
  <table>
    <tr>
      <th>Play</th>
      <th>Seats</th>
      <th>Cost</th>
    </tr>
    ${renderPerformancesHtml(data.performances)}
  </table>
  <p>Amount owed is <em>${usd(data.totalAmount)}</em></p>
  <p>You earned <em>${data.totalVolumeCredits}</em> credits</p>
  `

  function renderPerformancesHtml(performances) {
    let result = "";
    for (let perf of performances) {
      result += `
      <tr>
        <td>${perf.play.name}</td>
        <td>${perf.audience}</td>
        <td>${usd(perf.amount)}</td>
      </tr>  
      `
    }
    return result;
  }
}

function usd(aNumber) {
  return new Intl.NumberFormat(
    "en-US",
    { style: "currency", currency: "USD", minimumFractionDigits: 2 }
  ).format(aNumber / 100);
}

module.exports = { statement, htmlStatement };