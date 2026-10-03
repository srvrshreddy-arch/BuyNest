const BASE_URL = "http://localhost:8080";

document
    .getElementById("deliveryLoginForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        console.log("Login Email:", email);

        fetch(
            `${BASE_URL}/deliveryperson/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
            {
                method: "POST"
            }
        )

        .then(response => {

            console.log("Login Response:", response.status);

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            return response.json();
        })

        .then(deliveryPerson => {

            console.log(
                "Logged in Delivery Person:",
                deliveryPerson
            );

            // Save logged-in person's details
            localStorage.setItem(
                "deliveryPersonId",
                deliveryPerson.id
            );

            localStorage.setItem(
                "deliveryPersonName",
                deliveryPerson.name
            );

            localStorage.setItem(
                "deliveryPersonEmail",
                deliveryPerson.email
            );

            // Open dashboard
            window.location.href =
                "delivery dashboard.html";
        })

        .catch(error => {

            console.error(
                "Login Error:",
                error
            );

            alert("Invalid email or password");
        });

    });