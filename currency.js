
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
        if (select.name === "from" && currcode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "USD") {
      newOption.selected = "selected";
    }
    
    select.append(newOption);
  }
    select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  
  try {
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    
    let data = await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    
    let finalamount = (amtval * rate).toFixed(2);
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
    
  } catch (error) {
    msg.innerText = "Error: Unable to fetch exchange rate. Please try again.";
    console.error("Error fetching exchange rate:", error);
  }

});

