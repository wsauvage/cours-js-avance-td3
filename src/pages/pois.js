import swal from 'sweetalert';

window.onload = () => {
    renderPoiElements()
};

const renderPoiElements = () => {
    let output = document.querySelector('#output')
    output.innerHTML = ''
    let savedPois = localStorage.getItem('savedPois') ? JSON.parse(localStorage.getItem('savedPois')) : [];

    savedPois.map(poi => {
        renderPoiElement(poi, output)
    })

    if (savedPois.length === 0) {
        output.innerHTML = `
        <article class="message is-info">
            <div class="message-body">
                Aucune point d'intérêt à afficher.
            </div>
        </article>
        `
    }
}

const renderPoiElement = (poi, output) => {
    let card = document.createElement("div");
    card.innerHTML = `
    <div class="card mt-4 poi-item" data-poi-id="${poi.id}">
        <header class="card-header has-background-dark">
            <p class="card-header-title has-text-white">${poi.name}</p>
        </header>
        <div class="card-content">
            <div class="content">
                <div class="mt-3 mb-3">
                    <p>${poi.description}</p>
                </div>
                <h6 class="title">Adresse</h6>
                <ul>
                    <li>City : ${poi.city}</li>
                    <li>PostCode : ${poi.postcode}</li>
                    <li>Context : ${poi.context}</li>
                </ul>
            </div>
        </div>
        <footer class="card-footer ">
            <a class="card-footer-item has-background-danger has-text-white" id="removeButton">Delete</a>
        </footer>
    </div>
    `;

    let removeButton = card.querySelector('#removeButton')

    removeButton.addEventListener("click", (event) => {
        let savedPois = localStorage.getItem('savedPois') ? JSON.parse(localStorage.getItem('savedPois')) : [];
        savedPois = savedPois.filter(el => el.id !== poi.id)
        localStorage.setItem('savedPois', JSON.stringify(savedPois))
        swal({
            title: "Good job!",
            text: "Point d'intérêt supprimé",
            icon: "success",
        });

        renderPoiElements()

    });


    output.appendChild(card)
}
