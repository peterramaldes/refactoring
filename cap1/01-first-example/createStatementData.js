module.exports = createStatementData;

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('subclass responsability');
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
    return result;
  }

}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 0;
    result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30)
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
}

function createPerformanceCalculator(aPerformance, play) {
  switch (play.type) {
    case "tragedy": return new TragedyCalculator(aPerformance, play);
    case "comedy": return new ComedyCalculator(aPerformance, play);
    default: throw new Error(`unknown type: ${play.type}`);
  }
}

function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}