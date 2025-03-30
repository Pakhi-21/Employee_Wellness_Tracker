const API_BASE_URL = "http://localhost:8080/api";

// Get user ID from session storage
const userId = sessionStorage.getItem("userId");

        // load active or past survey 
    document.addEventListener("DOMContentLoaded", () => {
            fetchActiveSurveys();
            fetchPastSurveys();
        });


        //Fetch and display active surveys from the server.  

    async function fetchActiveSurveys() {
         try {
               const response = await fetch(`${API_BASE_URL}/admin/surveys/active`);
               const surveys = await response.json();
               console.log("Active Surveys:", surveys);

               const surveyContainer = document.getElementById("survey-container");
               surveyContainer.innerHTML = ""; // Clear previous surveys

               surveys.forEach(survey => {
               const surveyCard = document.createElement("div");
               surveyCard.classList.add("survey-card");

               surveyCard.innerHTML = `
                  <h3>${survey.title}</h3>
                  <button onclick="fillSurvey(${survey.id})">Fill Survey</button>
                `;

               surveyContainer.appendChild(surveyCard);
            });

            } catch (error) {
                console.error("Error fetching active surveys:", error);
           }
         } 

    function fillSurvey(surveyId) {
          window.location.href = `fill-survey.html?surveyId=${surveyId}`;
        }

    async function fetchPastSurveys() {
            if (!userId) {
                console.error("User ID not found in sessionStorage.");
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/responses/employee/${userId}`);
                const pastSurveys = await response.json();
                console.log("Past Surveys:", pastSurveys);

                const pastSurveyContainer = document.getElementById("past-survey-container");
                pastSurveyContainer.innerHTML = ""; // Clear previous surveys

                pastSurveys.forEach(survey => {
                    const surveyCard = document.createElement("div");
                    surveyCard.classList.add("survey-card");

                    surveyCard.innerHTML = `
                        <h3>${survey.survey.title}</h3>
                        <p><strong>Submitted On:</strong> ${new Date(survey.submittedAt).toLocaleDateString()}</p>
                        <button onclick="editSurvey(${survey.id})">✏️ Edit</button>
                        <button onclick="deleteSurvey(${survey.id})" class="delete-btn">🗑️ Delete</button>
                    `;

                    pastSurveyContainer.appendChild(surveyCard);
                });

            } catch (error) {
                console.error("Error fetching past surveys:", error);
            }
        }
        
        //check if the user can edit thesurvey
    async function editSurvey(responseId) {
            try {
           const response = await fetch(`${API_BASE_URL}/responses/${responseId}`);
        
            if (!response.ok) {
            throw new Error("Failed to fetch survey response.");
            }

            const result = await response.json();

            if (result.message === "Editing time limit exceeded (24 hours).") {
            alert("You cannot edit this survey as the 24-hour limit has passed.");
            } else {
            window.location.href = `edit-survey.html?responseId=${responseId}`; // ✅ Use responseId correctly
            }
           } catch (error) {
             console.error("Error while checking edit permission:", error);
            }
            
        }

        //delete the past survey response

        async function deleteSurvey(responseId) {
            try {
            const response = await fetch(`http://localhost:8080/api/responses/${responseId}`, {
                method: 'DELETE',
            });

            const message = await response.text();

            if (response.ok) {
                alert(message);  // Success message
                location.reload();  // Refresh to remove deleted response
            } else {
                alert(message);  // Show error message (24-hour limit exceeded)
            }

           } catch (error) {
            console.error("Error deleting response:", error);
            alert("Failed to delete the survey response.");
          }
        }  
        
        // Logout the user by clearing session storage and redirecting to login page.
        function logout() {
            sessionStorage.removeItem("userId"); 
            alert("You have been logged out.");
            window.location.href = "/index.html";
        }