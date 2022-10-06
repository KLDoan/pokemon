const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    const limit = 200;  
    for (let i = 1; i <= limit; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) =>
                `
                <table>
        <tr class="card">
            <td><img class="card-image" src="${pokeman.image}"/></td>
            <th class="card-title">${pokeman.id}. ${pokeman.name}</th>
            <td class="card-subtitle">Type: ${pokeman.type}</td>
        </tr>
        </table>
    `
        )

        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
