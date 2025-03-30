// document.addEventListener("DOMContentLoaded", () => {
//     fetchEmployees();
// });

// function fetchEmployees() {
//     fetch("http://localhost:8080/api/admin/employees") 
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById("employeeTableBody");
//             tableBody.innerHTML = "";

//             data.forEach(employee => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${employee.name}</td>
//                     <td>${employee.email}</td>
//                     <td>
//                         <button onclick="viewReport(${employee.id})">View Report</button>
//                     </td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error("Error fetching employees:", error));
// }

// function viewReport(employeeId) {
//     window.location.href = `employee-report.html?employeeId=${employeeId}`;
// }


document.addEventListener("DOMContentLoaded", () => {
    fetchEmployees();
    document.getElementById("departmentFilter").addEventListener("change", applyFilters);
    document.getElementById("locationFilter").addEventListener("change", applyFilters);
});

let employeesData = []; // Store fetched employee data

async function fetchEmployees() {
    try {
        const response = await fetch("http://localhost:8080/api/admin/employees");
        employeesData = await response.json(); // Store data for filtering
        displayEmployees(employeesData); // Show all employees initially
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
}

// Function to display employees
function displayEmployees(filteredData) {
    const tableBody = document.getElementById("employeeTableBody");
    tableBody.innerHTML = ""; // Clear previous data

    if (filteredData.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No employees found</td></tr>";
        return;
    }

    filteredData.forEach(employee => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td>${employee.location}</td>
            <td>
                <button onclick="viewReport(${employee.id})">View Report</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Apply filtering
function applyFilters() {
    const selectedDepartment = document.getElementById("departmentFilter").value;
    const selectedLocation = document.getElementById("locationFilter").value;

    let filteredData = employeesData;

    if (selectedDepartment !== "") {
        filteredData = filteredData.filter(emp => emp.department === selectedDepartment);
    }

    if (selectedLocation !== "") {
        filteredData = filteredData.filter(emp => emp.location === selectedLocation);
    }

    displayEmployees(filteredData);
}

// Function to view report
function viewReport(employeeId) {
    window.location.href = `employee-report.html?employeeId=${employeeId}`;
}
