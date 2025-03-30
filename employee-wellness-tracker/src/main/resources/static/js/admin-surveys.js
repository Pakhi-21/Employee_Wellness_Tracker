const API_BASE_URL = "http://localhost:8080/api/admin/surveys";
        const surveyTableBody = document.getElementById("survey-table-body");
        const surveyForm = document.getElementById("surveyForm");
        const openSurveyForm = document.getElementById("openSurveyForm");
        const surveyFormElement = document.getElementById("surveyFormElement");
       

        document.addEventListener("DOMContentLoaded", fetchSurveys);

        async function fetchSurveys() {
            const response = await fetch(`${API_BASE_URL}/all`);
            const surveys = await response.json();

            surveyTableBody.innerHTML = "";

            surveys.forEach(survey => {
                const startDate = survey.startDate ? new Date(survey.startDate).toLocaleDateString() : "N/A";
                const endDate = survey.endDate ? new Date(survey.endDate).toLocaleDateString() : "N/A";
                const status = survey.status ? "Active" : "Inactive";
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${survey.title}</td>
                    <td>${startDate}</td>
                    <td>${endDate}</td>
                    <td>${status}</td>
                    <td>
                        <button onclick="editSurvey(${survey.id})">Edit</button>
                        <button onclick="deleteSurvey(${survey.id})">Delete</button>
                    </td>
                `;
                surveyTableBody.appendChild(row);
            });
        }

        if (openSurveyForm) {
             openSurveyForm.addEventListener("click", () => {
             console.log("Create Survey button clicked!");
             window.location.href = "create-survey-form.html";
            });
        } else {
              console.error("Button not found! Check if the ID is correct.");
        }

        surveyFormElement.addEventListener("submit", async (event) => {
            event.preventDefault();

            const surveyId = document.getElementById("surveyId").value;
            const surveyData = {
                title: document.getElementById("surveyTitle").value,
                description: document.getElementById("surveyDescription").value,
                start_date: document.getElementById("surveyStartDate").value,
                end_date: document.getElementById("surveyEndDate").value,
                status: document.getElementById("surveyStatus").value === "true"
            };

            const method = surveyId ? "PUT" : "POST";
            const url = surveyId ? `${API_BASE_URL}/${surveyId}` : API_BASE_URL;

            await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(surveyData),
            });

            surveyForm.style.display = "none";
            fetchSurveys();
        });

        
        // Deletes a survey by ID
        async function deleteSurvey(id) {
            if (confirm("Are you sure you want to delete this survey?")) {
                try {
                    await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
                    fetchSurveys(); // Refresh the list after deletion
                } catch (error) {
                    console.error("Error deleting survey:", error);
                } 
            }
        }

        /**
        * Redirects to the edit survey page with the survey ID
        * @param {number} id - ID of the survey to edit
        */
        function editSurvey(id) {
            window.location.href = `admin-edit-survey.html?id=${id}`;
        }
        
        //Logs out the admin user and redirects to the login page
        function logout() {
            alert("Logging out...");
            window.location.href = "index.html";
        }