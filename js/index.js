const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");
const fetch = require("node-fetch"); // for WhatsApp Cloud API

admin.initializeApp();

// --------------------
// Twilio SMS CONFIG
// --------------------
const twilioClient = new twilio("TWILIO_SID", "TWILIO_AUTH_TOKEN");
const twilioFrom = "+1XXXXXXXXXX"; // Your Twilio number

// --------------------
// Trigger SMS + WhatsApp on new booking
// --------------------
exports.sendBookingNotification = functions.firestore
    .document('bookings/{bookingId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();

        // 1️⃣ Send SMS via Twilio
        try {
            await twilioClient.messages.create({
                body: `Hi ${data.name}, your booking at Eurosolve is confirmed for ${data.date}.`,
                from: twilioFrom,
                to: data.phone
            });
            console.log("SMS sent successfully");
        } catch (err) {
            console.error("SMS error:", err);
        }

        // 2️⃣ Send WhatsApp via Meta Cloud API
        try {
            await fetch("https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer YOUR_WHATSAPP_TOKEN",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: data.phone,
                    type: "text",
                    text: { body: `Hi ${data.name}, your booking at Eurosolve is confirmed for ${data.date}.` }
                })
            });
            console.log("WhatsApp sent successfully");
        } catch (err) {
            console.error("WhatsApp error:", err);
        }
    });
