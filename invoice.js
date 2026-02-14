export function generateInvoice(name, car, date, amount, plate) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Eurosolve Auto Tech", 20, 20);
  doc.setFontSize(12);
  doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 20, 30);
  doc.text(`Customer Name: ${name}`, 20, 40);
  doc.text(`Car: ${car}`, 20, 50);
  doc.text(`Plate Number: ${plate}`, 20, 60);
  doc.text(`Service Date: ${date}`, 20, 70);
  doc.text(`Amount Paid: KES ${amount}`, 20, 80);

  doc.setFontSize(10);
  doc.text("Thank you for choosing Eurosolve Auto Tech!", 20, 100);

  doc.save(`Invoice_${plate}_${Date.now()}.pdf`);
}
