const BASE_URL = "https://buynest-qbzg.onrender.com";


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadUsers();

});


// ==========================================
// GET ALL USERS
// ==========================================

function loadUsers() {

    fetch(`${BASE_URL}/getUsers`)

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load users");
            }

            return response.json();

        })

        .then(users => {

            displayUsers(users);

        })

        .catch(error => {

            console.error(
                "Error loading users:",
                error
            );

            alert("Unable to load users.");

        });

}


// ==========================================
// DISPLAY USERS
// ==========================================

function displayUsers(users) {

    const tableBody =
        document.getElementById(
            "usersTableBody"
        );

    tableBody.innerHTML = "";


    // Total users

    document.getElementById(
        "totalUsers"
    ).textContent = users.length;


    // Display each user

    users.forEach(user => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${user.id}
            </td>

            <td>
                ${user.name}
            </td>

            <td>
                ${user.email}
            </td>

            <td>
                ${user.phone}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editUser(${user.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteUser(${user.id})">

                    Delete

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ==========================================
// EDIT USER
// ==========================================

function editUser(id) {

    fetch(`${BASE_URL}/getUser/${id}`)

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "User not found"
                );
            }

            return response.json();

        })

        .then(user => {

            document.getElementById(
                "editId"
            ).value = user.id;


            document.getElementById(
                "editName"
            ).value = user.name;


            document.getElementById(
                "editEmail"
            ).value = user.email;


            document.getElementById(
                "editPhone"
            ).value = user.phone;


            document.getElementById(
                "editPassword"
            ).value = user.password;


            document.getElementById(
                "editModal"
            ).style.display = "flex";

        })

        .catch(error => {

            console.error(
                "Error loading user:",
                error
            );

            alert(
                "Unable to load user."
            );

        });

}


// ==========================================
// CLOSE EDIT MODAL
// ==========================================