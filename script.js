const UNIT = {PENNY:0.01, NICKEL:0.05, DIME:0.1, QUARTER:0.25, ONE:1, FIVE:5, TEN:10, TWENTY:20, "ONE HUNDRED":100};

function checkCashRegister(price, cash, cid) {
  let change = Math.round((cash - price) * 100);
  const total = Math.round(cid.reduce((a, [, v]) => a + v, 0) * 100);
  if (total < change) return {status: "INSUFFICIENT_FUNDS", change: []};
  if (total === change) return {status: "CLOSED", change: cid.map(([n, v]) => [n, v])};
  const out = [];
  for (let i = cid.length - 1; i >= 0; i--) {
    const [name, amt] = cid[i];
    const u = Math.round(UNIT[name] * 100);
    const avail = Math.round(amt * 100);
    const take = Math.min(avail, Math.floor(change / u) * u);
    if (take > 0) { out.push([name, take / 100]); change -= take; }
  }
  if (change > 0) return {status: "INSUFFICIENT_FUNDS", change: []};
  return {status: "OPEN", change: out};
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
