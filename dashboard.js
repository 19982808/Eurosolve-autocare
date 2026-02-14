import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM elements
const bookingContainer = document.getElementById("bookingList");
const revenueCanvas = document.getElementById("revenueChart");

// ------------------------------
// LOAD BOOKINGS
// ------------------------------
async function loadBookings() {
  bookingContainer.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "bookings"));
    if (snapshot.empty) {
      bookingContainer.innerHTML = "<p>No bookings yet.</p>";
      return;
    }

    snapshot.forEach((doc) => {
      const data = doc.data();

      const bookingCard = document.createElement("div");
      bookingCard.classList.add("card");
      bookingCard.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Car:</strong> ${data.car}</p>
        <p><strong>Plate:</strong> ${data.plate}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Status:</strong> ${data.status}</p>
      `;

      bookingContainer.appendChild(bookingCard);
    });
  } catch (err) {
    console.error("Error loading bookings:", err);
    bookingContainer.innerHTML = "<p>Error loading bookings</p>";
  }
}

// ------------------------------
// REVENUE ANALYTICS
// ------------------------------
async function loadRevenue() {
  try {
    const snapshot = await getDocs(collection(db, "services"));
    let totalRevenue = 0;

    snapshot.forEach(doc => {
      totalRevenue += doc.data().cost || 0;
    });

    new Chart(revenueCanvas, {
      type: "bar",
      data: {
        labels: ["Total Revenue (KES)"],
        datasets: [{
          label: "Revenue",
          data: [totalRevenue],
          backgroundColor: "rgba(0, 195, 255, 0.7)"
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: "Revenue Analytics" }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

  } catch (err) {
    console.error("Error loading revenue:", err);
  }
}

// ------------------------------
// INIT DASHBOARD
// ------------------------------
loadBookings();
loadRevenue();
