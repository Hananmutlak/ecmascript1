const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";

async function hämtaData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Något gick fel vid hämtning av data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fel:", error.message);
        return [];
    }
}

function visaData(data) {
    const tabellBody = document.getElementById("tabell").getElementsByTagName("tbody")[0];
    tabellBody.innerHTML = "";

    data.forEach(kurs => {
        const rad = tabellBody.insertRow();
        rad.insertCell().textContent = kurs.code;
        rad.insertCell().textContent = kurs.coursename;
        rad.insertCell().textContent = kurs.progression;
    });
}

function sökData(data, söktext) {
    return data.filter(kurs =>
        kurs.code.toLowerCase().includes(söktext) ||
        kurs.coursename.toLowerCase().includes(söktext)
    );
}

function sorteraData(data, kolumn, riktning = "stigande") {
    return data.sort((a, b) => {
        if (a[kolumn] < b[kolumn]) return riktning === "stigande" ? -1 : 1;
        if (a[kolumn] > b[kolumn]) return riktning === "stigande" ? 1 : -1;
        return 0;
    });
}

async function main() {
    const data = await hämtaData();
    let filtreradData = [...data];

    visaData(filtreradData);

    document.getElementById("sok").addEventListener("input", (e) => {
        const söktext = e.target.value.toLowerCase();
        filtreradData = sökData(data, söktext);
        visaData(filtreradData);
    });

    document.getElementById("kod").addEventListener("click", () => {
        filtreradData = sorteraData(filtreradData, "code");
        visaData(filtreradData);
    });

    document.getElementById("namn").addEventListener("click", () => {
        filtreradData = sorteraData(filtreradData, "coursename");
        visaData(filtreradData);
    });

    document.getElementById("progression").addEventListener("click", () => {
        filtreradData = sorteraData(filtreradData, "progression");
        visaData(filtreradData);
    });
}

main();