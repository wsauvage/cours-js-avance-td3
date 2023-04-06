import adresses from '../../data/adresses.json'
import { slugify } from '../modules/utils.mjs'
import * as BulmaModal from '../modules/bulma-modals.mjs'
import swal from 'sweetalert';

window.onload = () => {

    BulmaModal.initModals()

    let searchInput = document.querySelector('#searchInput')
    let searchButton = document.querySelector('#searchButton')
    let output = document.querySelector('#output')
    let saveButton = document.querySelector("#saveButton")

    searchButton.addEventListener("click", (event) => {
        let query = searchInput.value
        let results = search(query)
        output.innerHTML = ''
        results.map(result => {
            appendResultElement(result, output)
        })

        if (results.length === 0) {
            output.innerHTML = `
            <article class="message is-info">
                <div class="message-body">
                    Aucune adresse à afficher.
                </div>
            </article>
            `
        }
    })

    saveButton.addEventListener("click", event => {
        const modalTarget = document.getElementById("modalSaveAddress")
        let nameInput = modalTarget.querySelector('input[name="name"]')
        let descriptionInput = modalTarget.querySelector('textarea[name="description"]')

        const name = nameInput.value
        const description = descriptionInput.value

        const selectedAddress = JSON.parse(localStorage.getItem('selectedAddress'));

        let newPoi = {
            ...selectedAddress, ...{
                name: name,
                description: description
            }
        }

        let savedPois = localStorage.getItem('savedPois') ? JSON.parse(localStorage.getItem('savedPois')) : [];

        //On vérifie si le point d'intêret existe déjà avant de l'ajouter
        let existingPoi = savedPois.filter(poi => poi.label === newPoi.label)
        if (existingPoi.length === 0) {
            savedPois = [...savedPois, newPoi]
            localStorage.setItem('savedPois', JSON.stringify(savedPois))
            swal({
                title: "Good job!",
                text: "Point d'intérêt ajouté",
                icon: "success",
            });
        }
        else {
            swal({
                title: "Oups !",
                text: "Le point d'intérêt existe déjà",
                icon: "error",
            });
        }

        nameInput.value = ''
        descriptionInput.value = ''

    })
};

const search = query => {

    let resuts = [];
    adresses.map(adresse => {
        if (slugify(adresse.label).includes(slugify(query))) {
            resuts.push(adresse)
        }
    })

    return resuts
}

// En créant les éléments un par un
const appendResultElement = (adresse, output) => {

    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("mt-4");
    let cardHeader = document.createElement("header");
    cardHeader.classList.add("card-header");
    cardHeader.classList.add("has-background-link");
    let cardTitle = document.createElement("p");
    cardTitle.classList.add("card-header-title");
    cardTitle.classList.add("has-text-white");
    cardTitle.innerHTML = adresse.label
    let cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    let content = document.createElement("div");
    content.classList.add("content");
    content.innerHTML = `
    <ul>
        <li>City : ${adresse.city}</li>
        <li>PostCode : ${adresse.postcode}</li>
        <li>Context : ${adresse.context}</li>
    </ul>
    `;

    let cardFooter = document.createElement("footer")
    cardFooter.classList.add("card-footer")
    let saveButton = document.createElement("a")
    saveButton.classList.add("card-footer-item")
    saveButton.classList.add("has-text-white")
    saveButton.classList.add("has-background-success")
    saveButton.innerHTML = "Ajouter"

    cardHeader.appendChild(cardTitle)
    cardContent.appendChild(content)
    cardFooter.appendChild(saveButton)
    card.appendChild(cardHeader)
    card.appendChild(cardContent)
    card.appendChild(cardFooter)
    output.appendChild(card)

    //EventLiteners
    saveButton.addEventListener("click", (event) => {
        const modalTarget = document.getElementById("modalSaveAddress")
        let modalTitle = modalTarget.querySelector(".modal-card-title")
        let addressDetails = modalTarget.querySelector(".address-details")
        modalTitle.innerHTML = adresse.label
        addressDetails.innerHTML = content.innerHTML
        BulmaModal.openModal(modalTarget);

        localStorage.setItem('selectedAddress', JSON.stringify(adresse));

    });

}




