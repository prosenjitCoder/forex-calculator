const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const showResult = document.querySelector("#result");

  let accountSize = parseFloat(document.querySelector("#accountSize").value);
  let riskAmount = parseFloat(document.querySelector("#riskAmount").value);
  let swingPrice = parseFloat(document.querySelector("#swingPrice").value);
  let atrValue = parseFloat(document.querySelector("#atrValue").value);
  let entryPrice = parseFloat(document.querySelector("#entryPrice").value);
  let takeProfit = parseFloat(document.querySelector("#takeProfit").value);
  let direction = document
    .querySelector('input[name="rad_direction"]:checked')
    .value.toUpperCase();

  if (!riskAmount) {
    riskAmount = 2;
  }

  if (direction == "LONG" && swingPrice > entryPrice) {
    showResult.innerHTML = `<div class="bg-result">
      <span class="red text-center">Swing price must be less than entry price!</span>
    </div>`;
    return;
  }

  if (direction == "SHORT" && swingPrice < entryPrice) {
    showResult.innerHTML = `<div class="bg-result">
      <span class="red text-center">Swing price must be greater than entry price!</span>
    </div>`;
    return;
  }

  let rewardRisk;

  if (
    accountSize &&
    riskAmount &&
    swingPrice &&
    (atrValue || atrValue == 0) &&
    entryPrice &&
    takeProfit
  ) {
    if (direction == "LONG") {
      // Formula
      let riskAmountInUsd = accountSize * (riskAmount / 100); // risk percentage of total account
      let stopLossPrice = swingPrice - atrValue; // final stop loss price
      let SLamountInPips = (entryPrice - stopLossPrice) * 10; //pips
      let takeProfitInPips = (takeProfit - entryPrice) * 10; // pips
      let lotSize = riskAmountInUsd / SLamountInPips / 10;
      let takeProfitInUsd =
        (riskAmountInUsd * takeProfitInPips) / SLamountInPips;
      rewardRisk = (takeProfitInPips / SLamountInPips).toFixed(2);

      // Showing results
      showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Direction<span style="margin-left:45px;">=</span></span>
      <span class="l_price"><span class="green">${direction}</span></span><br>

      <span class="l_entry">Lot Size<span style="margin-left:59px;">=</span></span>
      <span class="l_price"><span class="">${lotSize.toFixed(
        4
      )}</span></span><br>

      <span class="l_entry">SL Price<span style="margin-left:58px;">=</span></span>
      <span class="l_price"><span class="red">$${stopLossPrice.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry">SL Amount<span style="margin-left:33px;">=</span></span>
      <span class="l_price"><span class="red">$${riskAmountInUsd.toFixed(
        2
      )}(${SLamountInPips.toFixed(2)} pips)</span></span><br>

      <span class="l_entry">TP Amount<span style="margin-left:31px;">=</span></span>
      <span class="l_price"><span class="green">$${takeProfitInUsd.toFixed(
        2
      )}(${takeProfitInPips.toFixed(2)} pips)</span></span><br>

      <span class="l_entry riskRewardLabel">Risk : Reward<span style="margin-left:16px;">=</span></span>
      <span class="l_price"><span class="riskRewardRatio" style="position:relative;">1 : ${rewardRisk}</span></span><br>
    `;
    }

    if (direction == "SHORT") {
      // Formula
      let riskAmountInUsd = accountSize * (riskAmount / 100); // risk percentage of total account
      let stopLossPrice = swingPrice + atrValue; // final stop loss price
      let SLamountInPips = (stopLossPrice - entryPrice) * 10; //pips
      let takeProfitInPips = (entryPrice - takeProfit) * 10; // pips
      let lotSize = riskAmountInUsd / SLamountInPips / 10;
      let takeProfitInUsd =
        (riskAmountInUsd * takeProfitInPips) / SLamountInPips;
      rewardRisk = (takeProfitInPips / SLamountInPips).toFixed(2);

      // Showing results
      showResult.innerHTML = `<div class="bg-result">
      <span class="l_entry">Direction<span style="margin-left:45px;">=</span></span>
      <span class="l_price"><span class="red">${direction}</span></span><br>

      <span class="l_entry">Lot Size<span style="margin-left:59px;">=</span></span>
      <span class="l_price"><span class="">${lotSize.toFixed(
        4
      )}</span></span><br>

      <span class="l_entry">SL Price<span style="margin-left:58px;">=</span></span>
      <span class="l_price"><span class="red">$${stopLossPrice.toFixed(
        2
      )}</span></span><br>

      <span class="l_entry">SL Amount<span style="margin-left:33px;">=</span></span>
      <span class="l_price"><span class="red">$${riskAmountInUsd.toFixed(
        2
      )}(${SLamountInPips.toFixed(2)} pips)</span></span><br>

      <span class="l_entry">TP Amount<span style="margin-left:31px;">=</span></span>
      <span class="l_price"><span class="green">$${takeProfitInUsd.toFixed(
        2
      )}(${takeProfitInPips.toFixed(2)} pips)</span></span><br>

      <span class="l_entry riskRewardLabel">Risk : Reward<span style="margin-left:16px;">=</span></span>
      <span class="l_price"><span class="riskRewardRatio" style="position:relative;">1 : ${rewardRisk}</span></span><br>
    `;
    }
  } else {
    showResult.innerHTML = `<div class="bg-result">
      <span class="normal red">Missing Inputs</span>
    </div>`;
  }

  if (rewardRisk < 2) {
    document.querySelector(".riskRewardLabel").classList.add("red");
    document.querySelector(".riskRewardRatio").classList.add("red");
  } else {
    document.querySelector(".riskRewardLabel").classList.add("green");
    document.querySelector(".riskRewardRatio").classList.add("green");
  }
});
