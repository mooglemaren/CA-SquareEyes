const btn = document.getElementById("orderdone_button");
btn.addEventListener("click", handleConfirmOrder);


function handleConfirmOrder() {
  // Åpne en pop up som sier at handel er done
  window.alert("Checkout complete");
  localStorage.clear();
  console.log("klarert");
    
}