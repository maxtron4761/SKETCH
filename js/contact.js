const contactForm = document.getElementById("contactForm");

const contactMessage = document.getElementById("contactMessage");


contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const contactData = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        subject: document.getElementById("subject").value,

        message: document.getElementById("message").value.trim()

    };


    if (contactData.message.length < 10) {

        contactMessage.textContent =
            "Message must contain at least 10 characters.";

        contactMessage.style.color = "red";

        return;

    }


    try {

        const response = await fetch("/api/contacts", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(contactData)

        });


        const result = await response.json();


        if (response.ok) {

            contactMessage.textContent = result.message;

            contactMessage.style.color = "green";

            contactForm.reset();

        }

        else {

            contactMessage.textContent = result.message;

            contactMessage.style.color = "red";

        }


    }

    catch (error) {

        contactMessage.textContent =
            "Unable to submit your message. Please try again.";

        contactMessage.style.color = "red";

        console.error(error);

    }

});