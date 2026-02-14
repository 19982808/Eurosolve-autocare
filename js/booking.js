import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Select form
const form = document.getElementById("bookingForm");

// Listen for submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const car = document.getElementById("car").value;
  const plate = document.getElementById("plate").value;
  const date = document.getElementById("date").value;

  try {
    await addDoc(collection(db, "bookings"), {
      name,
      email,
      phone,
      car,
      plate,
      date,
      status: "pending",
      createdAt: serverTimestamp()
    });

    alert("Booking confirmed! You will receive a confirmation soon.");
    form.reset();

  } catch (err) {
    console.error("Error saving booking:", err);
    alert("Error booking. Try again later.");
  }
});
