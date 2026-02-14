function payDiagnostic() {
  FlutterwaveCheckout({
    public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY",
    tx_ref: "eurosolve_" + Date.now(),
    amount: 3500,
    currency: "KES",
    payment_options: "card, mobilemoneykenya",
    customer: {
      email: document.getElementById("email").value || "customer@email.com",
      name: document.getElementById("name").value || "Customer Name",
      phonenumber: document.getElementById("phone").value || "2547XXXXXXX"
    },
    customizations: {
      title: "Eurosolve Auto Tech",
      description: "Diagnostic Fee"
    },
    callback: function (data) {
      alert("Payment completed! Transaction ID: " + data.transaction_id);
      // Optional: trigger invoice generation here
    },
    onclose: function() {
      console.log("Payment closed without completion");
    }
  });
}

// Make it global so index.html button can use it
window.payDiagnostic = payDiagnostic;
import { generateInvoice } from "./invoice.js";

function payDiagnostic() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const car = document.getElementById("car").value;
  const plate = document.getElementById("plate").value;
  const date = document.getElementById("date").value;

  FlutterwaveCheckout({
    public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY",
    tx_ref: "eurosolve_" + Date.now(),
    amount: 3500,
    currency: "KES",
    payment_options: "card, mobilemoneykenya",
    customer: { email, name, phonenumber: phone },
    customizations: { title: "Eurosolve Auto Tech", description: "Diagnostic Fee" },
    callback: function (data) {
      alert("Payment completed! Transaction ID: " + data.transaction_id);
      generateInvoice(name, car, date, 3500, plate);
    },
    onclose: function() {
      console.log("Payment closed without completion");
    }
  });
}

window.payDiagnostic = payDiagnostic;
