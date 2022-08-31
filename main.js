import { filterData, filterName, percentage, sortArr } from './data.js';
import data from './data/rickandmorty/rickandmorty.js';

const title = document.querySelector('#title');
const intro = document.querySelector('#intro')
const filterBox = document.querySelector('#filterbox');
const keyWords = document.querySelector('#keywords');
const buttonFilter = document.querySelector('#filter');
const buttonRestart = document.querySelector('#restart');
const buttonSearch = document.querySelector('#search');
const selectFilter = document.querySelector('#filteroptions');
const selectOrder = document.querySelector('#orderoptions');
const calculation = document.querySelector('#calculation');
const cards = document.querySelector('#cardscontainer');

intro.hidden = false;
filterBox.hidden = true;
buttonRestart.hidden = true;

title.addEventListener('click', () => {
    document.location.reload(true);
});

buttonFilter.addEventListener('click', (e) => { //exibe filtros
    filterBox.hidden = false;
    e.preventDefault();
});

function showCards(infos) { //cards template
    return infos.map((elem) => `
      <article class="cards">
        <img id="photos" src="${elem.image}" alt="imagem do personagem">
        <p id="names">${elem.name}</p>
        <ul class="cards-list">
            <li><span class="type">Status:</span> ${elem.status}</li>
            <li><span class="type">Gênero:</span> ${elem.gender}</li>
            <li><span class="type">Species:</span> ${elem.species}</li>
        </ul>
      </article>
        `
    ).join('');
}

buttonSearch.addEventListener('click', (e) => { //filtra, ordena e exibe cards
    intro.hidden = true;
    filterBox.hidden = true;
    buttonFilter.hidden = true;
    buttonRestart.hidden = false;
    e.preventDefault();

    const filterIndex = selectFilter.options[selectFilter.selectedIndex].value;
    const orderIndex = selectOrder.options[selectOrder.selectedIndex].value;

    if (keyWords.value !== '') {

        const filterByName = filterName(data, keyWords.value);
        const percentageName = percentage(data, filterByName.length);

        return cards.innerHTML = showCards(sortArr(filterByName, orderIndex)), calculation.innerHTML = `Sua pesquisa resultou em <span class="percentagenumber">${percentageName}%</span> dos personagens da série!`

    } else if (filterIndex === 'Alive' || filterIndex === 'Dead' || filterIndex === 'unknown') {
        const filterStatus = filterData(data, 'status', filterIndex);
        const percentageStatus = percentage(data, filterStatus.length);

        return cards.innerHTML = showCards(sortArr(filterStatus, orderIndex)), calculation.innerHTML = `Sua pesquisa resultou em <span class="percentagenumber">${percentageStatus}%</span> dos personagens da série!`

    } else if (filterIndex === 'Female' || filterIndex === 'Male' || filterIndex === 'Genderless') {
        const filterGender = filterData(data, 'gender', filterIndex);
        const percentageGender = percentage(data, filterGender.length);

        return cards.innerHTML = showCards(sortArr(filterGender, orderIndex)), calculation.innerHTML = `Sua pesquisa resultou em <span class="percentagenumber">${percentageGender}%</span> dos personagens da série!`

    } else if (filterIndex === 'all') {
        const percentageAll = percentage(data, 493);

        return cards.innerHTML = showCards(sortArr(data.results, orderIndex)), calculation.innerHTML = `Você está vendo <span class="percentagenumber">${percentageAll}%</span> dos personagens da série!`
    }
})

// Filterbox sobrepondo
// Como sobrepor logo e portal
// Estilizar o scroll
// Campo de busca por nome x busca por filtro (apagar nome no input?)
// Conteúdo de dentro dos cards acupando espaços diferentes