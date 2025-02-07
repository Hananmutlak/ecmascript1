let cours = [];

window.onload = () => {
    loadcours();
};

document.querySelector("#sok").addEventListener("input", function() {
    filterData();
});

async function loadcours() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if (!response.ok) {
            throw new Error("fel vid hämtning av data..");
        }
        cours = await response.json();
        printcours(cours);
    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>fel vid anslutning - prova igen senare</p>";
    }
}

function printcours(data) {
    const tbody = document.querySelector("#tabell tbody");
    tbody.innerHTML = ""; // Clear the table body

    data.forEach(course => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
        `;
        tbody.appendChild(row);
    });
}

function filterData() {
    const search = document.querySelector("#sok").value.toLowerCase();
    const filteredData = cours.filter(course => 
        course.code.toLowerCase().includes(search) || 
        course.coursename.toLowerCase().includes(search)
    );
    printcours(filteredData);
}

function sortData(by) {
    let sortedData = [...cours];
    sortedData.sort((a, b) => {
        if (a[by] < b[by]) return -1;
        if (a[by] > b[by]) return 1;
        return 0;
    });
    printcours(sortedData);
}

// Add event listeners for sorting
document.querySelector("#kod").addEventListener("click", () => sortData("code"));
document.querySelector("#namn").addEventListener("click", () => sortData("coursename"));
document.querySelector("#progression").addEventListener("click", () => sortData("progression"));