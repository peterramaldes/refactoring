main();

function main() {
  const invoices = require('./invoices.json');
  const plays = require('./plays.json');
  const result = statement(invoices[0], plays);
  console.log(result);
}

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`
  const format = new Intl.NumberFormat("en-US",
    { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID]
    let thisAmount = amountFor(perf, play);

    // Sum credits per volume
    volumeCredits += Math.max(perf.audience - 30, 0)

    // Sum extra credit each comedy audience
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // Show the line for this request
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }

  result += `Amount owned is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function amountFor(perf, play) {
  let thisAmount = 0;
  switch (play.type) {
    case "tragedy":
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30)
      }
      break;
    case "comedy":
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`)
  }
  return thisAmount;
}

module.exports = statement;