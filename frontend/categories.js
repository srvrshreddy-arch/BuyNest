const API_URL =
    "https://buynest-qbzg.onrender.com/getCategories";


const categoryGrid =
    document.getElementById("categoryGrid");


const categoryIcons = {

    "Fashion": "👗",

    "Electronics": "📱",

    "Home & Kitchen": "🏠",

    "Beauty": "💄",

    "Footwear": "👟",

    "Toys & Kids": "🧸",

    "Books": "📚",

    "Grocery": "🛒",

    "Sports & Fitness": "🏋️",

    "Accessories": "👜"

};


// ===============================
// LOAD CATEGORIES
// ===============================

async function loadCategories() {

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to fetch categories"
            );
        }


        const result =
            await response.json();


        console.log(
            "Categories received:",
            result
        );


        categoryGrid.innerHTML = "";


        const categories =
            Array.isArray(result)
                ? result
                : result.data;


        if (!categories) {

            throw new Error(
                "No categories found"
            );
        }


        categories.forEach(
            category => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "category-card";


                const icon =
                    categoryIcons[
                        category.name
                    ] || "🛍️";


                card.innerHTML = `

                    <div class="category-icon">
                        ${icon}
                    </div>

                    <h2>
                        ${category.name}
                    </h2>

                    <p>
                        Explore ${category.name}
                    </p>

                `;


                // ===============================
                // CATEGORY CLICK
                // ===============================

                card.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            "products.html?categoryId=" +
                            category.id;

                    }
                );


                categoryGrid.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading categories:",
            error
        );


        categoryGrid.innerHTML = `

            <p style="
                text-align:center;
                grid-column:1/-1;
                color:red;
                font-size:18px;
            ">

                Unable to load categories.

            </p>

        `;
    }
}


// ===============================
// INITIAL LOAD
// ===============================

loadCategories();