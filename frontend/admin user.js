const BASE_URL = "http://localhost:8080";


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

function closeEditModal() {

    document.getElementById(
        "editModal"
    ).style.display = "none";

}


// ==========================================
// UPDATE USER
// ==========================================

function updateUser() {

    const id =
        document.getElementById(
            "editId"
        ).value;


    const name =
        document.getElementById(
            "editName"
        ).value;


    const email =
        document.getElementById(
            "editEmail"
        ).value;


    const phone =
        document.getElementById(
            "editPhone"
        ).value;


    const password =
        document.getElementById(
            "editPassword"
        ).value;


    const user = {

        name: name,

        email: email,

        phone: Number(phone),

        password: password

    };


    fetch(
        `${BASE_URL}/updateUser/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(user)

        }
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to update user"
                );

            }

            return response.json();

        })

        .then(data => {

            alert(
                "User updated successfully!"
            );


            closeEditModal();

            loadUsers();

        })

        .catch(error => {

            console.error(
                "Error updating user:",
                error
            );

            alert(
                "Unable to update user."
            );

        });

}


// ==========================================
// DELETE USER
// ==========================================

function deleteUser(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this user?"
        );


    if (!confirmation) {
        return;
    }


    fetch(
        `${BASE_URL}/deleteUser/${id}`,
        {

            method: "DELETE"

        }
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to delete user"
                );

            }

            return response.json();

        })

        .then(data => {

            alert(
                "User deleted successfully!"
            );


            loadUsers();

        })

        .catch(error => {

            console.error(
                "Error deleting user:",
                error
            );

            alert(
                "Unable to delete user."
            );

        });

}