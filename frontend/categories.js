const API_URL = "http://localhost:8080/getCategories";

const categoryGrid =
    document.getElementById("categoryGrid");


// ================= CATEGORY ICONS =================

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


// ================= GET CATEGORIES =================

async function loadCategories() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                "Failed to fetch categories"
            );

        }

        const result = await response.json();

        console.log(
            "Categories received:",
            result
        );


        categoryGrid.innerHTML = "";


        // API response:
        // {
        //     data: [...],
        //     message: "...",
        //     status: "SUCCESS"
        // }

        const categories = result.data;


        categories.forEach(category => {

            const card =
                document.createElement("div");

            card.className =
                "category-card";


            // Get icon based on category name

            const icon =
                categoryIcons[category.name] || "🛍️";


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


            // ================= CATEGORY CLICK =================

            card.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "products.html?categoryId="
                        + category.id;

                }
            );


            categoryGrid.appendChild(card);

        });


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


// ================= LOAD CATEGORIES =================

loadCategories();