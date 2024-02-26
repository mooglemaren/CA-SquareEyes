const btn = document.getElementById("orderdone_button");
btn.addEventListener("click", handleConfirmOrder);

function handleConfirmOrder() {
  // Åpne en pop up som sier at handel er done
  window.alert("Checkout complete");
  localStorage.clear();
  //console.log("klarert");
}

//summerer og parser desimaler på filmer som også er lagret i localstorage som vises i checkout
function updateTotalSum() {
  let sum = 0.0;
  try {
    sum = parseFloat(localStorage.getItem("totalsum"));
  } catch (e) {}
  const sumElement = document.getElementById("sum");

  sumElement.textContent = "Sum: $" + sum.toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
  updateTotalSum();
});
