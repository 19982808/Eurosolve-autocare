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
