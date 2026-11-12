const reservationForm = document.getElementById("reservationForm");

const message = document.getElementById("reservationMessage");

// Prevent past dates
const dateInput = document.getElementById("date");

const today = new Date();
const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localDate;


// Handle form submission
reservationForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const reservationData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("remail").value.trim(),
        date: dateInput.value,
        guests: document.getElementById("party").value,
        time: document.getElementById("time").value,
        seating: document.getElementById("seat").value,
        notes: document.getElementById("notes").value.trim()
    };

    try {

        const response = await fetch("/api/reservations", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(reservationData)

        });

        const result = await response.json();

        if (response.ok) {

            message.textContent = result.message;
            message.style.color = "green";

            reservationForm.reset();

        } else {

            message.textContent = result.message;
            message.style.color = "red";

        }

    } catch (error) {

        message.textContent = "Something went wrong. Please try again.";
        message.style.color = "red";

        console.error(error);

    }

});