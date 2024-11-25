let html = "";
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
for (const day of daysOfWeek) {
    const dayLower = day.toLowerCase();
    html += `
                <h4>${day}</h4>
                <label for="${dayLower}Breakfast">Breakfast:</label>
                <input type="text" id="${dayLower}Breakfast" name="${dayLower}Breakfast"><br><br>

                <label for="${dayLower}Snack">Snack:</label>
                <input type="text" id="${dayLower}Snack" name="${dayLower}Snack"><br><br>

                <label for="${dayLower}Lunch">Lunch:</label>
                <input type="text" id="${dayLower}Lunch" name="${dayLower}Lunch"><br><br>

                <label for="${dayLower}SecondSnack">Second Snack:</label>
                <input type="text" id="${dayLower}SecondSnack" name="${dayLower}SecondSnack"><br><br>
                
                <label for="${dayLower}Dinner">Dinner:</label>
                <input type="text" id="${dayLower}Dinner" name="${dayLower}Dinner"><br><br>`;
}
document.getElementById("dailyPlans").innerHTML = html

// Function to generate the meal plan after form submission
function generateMealPlan(event) {
    event.preventDefault();  // Prevent form from submitting and refreshing the page

    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const goal = document.getElementById("goal").value;

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    let mealPlan = {};
    for (const day of daysOfWeek) {
        const dayLower = day.toLowerCase();
        mealPlan[dayLower] = {
            breakfast: document.getElementById(`${dayLower}Breakfast`).value,
            snack: document.getElementById(`${dayLower}Snack`).value,
            lunch: document.getElementById(`${dayLower}Lunch`).value,
            secondSnack: document.getElementById(`${dayLower}SecondSnack`).value,
            dinner: document.getElementById(`${dayLower}Dinner`).value
        };

    }


    // Generate meal plan page
    let mealPlanHtml = `
        <html>
        <head>
            <title>Meal Plan for ${name}</title>
    <style>
            body {
                font-family: "Courier New", monospace;
                margin: 20px;
                background-color: #f4f4f4;
            }
            h2 {
                color: #68cb1d;
                text-align: center;
            }
            h3 {
                margin-top: 20px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            th, td {
                padding: 10px;
                text-align: center;
                border: 1px solid #ddd;
            }
            th {
                background-color: #68cb1d;
                color: white;
            }
            td:nth-child(even) {
                background-color: #f9f9f9;
            }
            .meal-day {
                font-weight: bold;
                background-color: #e3f2fd;
                color: #007bff;
            }
            .actions button, .actions a {
                background-color: #e3f2fd;
                text-decoration: none;
                color: #007bff;
                font-family: "Courier New", sans-serif;
                border: 1px solid #007bff;
                padding: 10px;
                font-size: 15px;
            }
        </style>
        </head>
        <body>
            <h2>Meal Plan for ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Goal for the Week:</strong> ${goal}</p>
            
            <h3>Meal Plan</h3>

            <div class="actions">
                <button onclick="clearPlanner()">Clear Planner</button>
                <button onclick="printPlanner()">Print Planner</button>
               
                <a download="MealPlanner.html" id="downloadLink">Download Planner</a>
            </div>

            <table>
            <thead>
            <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Snack</th>
                <th>Lunch</th>
                <th>Second Snack</th>
                <th>Dinner</th>
            </tr>
            </thead>
            <tbody>
        `;

    for (const day of daysOfWeek) {
        const dayLower = day.toLowerCase();
        mealPlanHtml += `<tr><td class="day"><strong>${day}</strong></td>
            <td>${mealPlan[dayLower].breakfast}</td>
            <td>${mealPlan[dayLower].snack}</td>
            <td>${mealPlan[dayLower].lunch}</td>
            <td>${mealPlan[dayLower].secondSnack}</td>
            <td>${mealPlan[dayLower].dinner}</td></tr>`;
    }

    mealPlanHtml += `
        </tbody>
        </table>

        <footer>
                <p>&copy; 2024 Perfectly Portioned Fitness</p>
            </footer>
        
        <script>
        function printPlanner() {
            window.print();
        }
        
        function clearPlanner() {
            let plannerTd = document.querySelectorAll("td:not(.day)"); 
            for(let i = 0; i < plannerTd.length; i++){
                plannerTd[i].innerText = ""; 
            
            }
                
        }
        
        function downloadPlanner(){
            const pageContent = encodeURIComponent(document.documentElement.outerHTML);
            let link = document.getElementById("downloadLink");
            link.href = "data:text/html;charset=utf-8," + pageContent;
        }
        downloadPlanner();
        
        </script>

        </body>
        </html>
    `;

    // Open a new window to display the meal plan
    const newWindow = window.open();
    newWindow.document.write(mealPlanHtml);
    newWindow.document.close();
}

// Validate email address using regex
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}