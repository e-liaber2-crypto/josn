
let alleVapen = [];

// Hentar alle våpena frå JSON-fila
fetch("vapen.json")
    .then(response => response.json())
    .then(data => {
        alleVapen = data;
        visVapen(alleVapen);
    });

// Funksjonen som viser våpena på nettsida
function visVapen(vapen) {
    const liste = document.getElementById("vapenListe");

    liste.innerHTML = "";

    // Alle kategoriane frå JSON-fila
    const kategoriar = [
        "Assault Rifle",
        "Pistol",
        "Sniper Rifle",
        "SMG",
        "Shotgun",
        "Machine Gun"
    ];

    // Går gjennom kvar kategori
    kategoriar.forEach(kategori => {

        // Finn våpena som høyrer til kategorien
        let filtrert = vapen.filter(v => v.type === kategori);

        // Hoppar over kategoriar utan våpen
        if (filtrert.length === 0) {
            return;
        }

        // Lagar ein ny seksjon
        const seksjon = document.createElement("section");
        seksjon.className = "kategori";

        seksjon.innerHTML = `<h2>${kategori}</h2>`;

        // Lagar eit område for våpenkorta
        const rutenett = document.createElement("div");
        rutenett.className = "vapenGrid";

        // Legg våpena inn i riktig seksjon
        filtrert.forEach(v => {
            rutenett.innerHTML += `
                <article class="vapen">
                    <h3>${v.name}</h3>
                    <p>Type: ${v.type}</p>
                    <p>Pris: $${v.price}</p>
                    ${v.bilete ? `<img src="${v.bilete}" alt="${v.name}">` : ""}
                </article>
            `;
        });

        // Legg rutenettet inn i seksjonen
        seksjon.appendChild(rutenett);

        // Legg seksjonen inn på nettsida
        liste.appendChild(seksjon);
    });
}

// Søkefunksjonen
document.getElementById("sok").addEventListener("input", function() {

    let soketekst = this.value.toLowerCase();

    let resultat = alleVapen.filter(vapen =>
        vapen.name.toLowerCase().includes(soketekst)
    );

    visVapen(resultat);
});
