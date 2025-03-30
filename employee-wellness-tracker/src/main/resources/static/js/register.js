const signup = document.getElementById("signupBtn");

// Function to handle user registration
signup.addEventListener("click", async () => {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const department = document.getElementById("department").value;
            const location = document.getElementById("location").value;

            if (!name || !email || !password || !department || !location) {
                alert("Please fill in all fields.");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password, department, location })
                });

                const data = await response.json();
                alert(data.message);
                window.location.href = "login.html"; 
            } catch (error) {
                alert("Something went wrong! Please try again later.");
            }
        });