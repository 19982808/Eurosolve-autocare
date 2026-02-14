// Import Firebase Firestore
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Add a new service record for a vehicle
 * @param {string} vehiclePlate - Car plate number
 * @param {string} serviceDescription - Description of the service done
 * @param {number} cost - Cost of the service in KES
 * @param {string} nextServiceDate - Optional: date of next scheduled service
 */
export async function addService(vehiclePlate, serviceDescription, cost, nextServiceDate) {
  try {
    await addDoc(collection(db, "services"), {
      vehiclePlate,
      serviceDescription,
      cost,
      nextServiceDate,
      timestamp: serverTimestamp()
    });
    alert("Service recorded successfully ✅");
  } catch (err) {
    console.error("Error adding service:", err);
    alert("Failed to record service.");
  }
}

/**
 * Get service history for a specific vehicle
 * @param {string} vehiclePlate - Car plate number
 * @returns {Array} history - List of service records
 */
export async function getServiceHistory(vehiclePlate) {
  const history = [];
  try {
    const snapshot = await getDocs(collection(db, "services"));
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.vehiclePlate === vehiclePlate) {
        history.push(data);
      }
    });
  } catch (err) {
    console.error("Error fetching service history:", err);
  }
  return history;
}
