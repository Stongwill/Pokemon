const PATH = 'https://pokeapi.co/api/v2';


const pokemonWrapper = document.querySelector('.pokemon__items');

const getPokemon = async (url, id) => {
    try{
        const res = await fetch(`${url}/pokemon/${id}`);
        if(!res.ok){
            throw new Error(res.status);
        }
        return res.json();
    } catch (e){
        console.error(e)
    }
   
}


document.addEventListener('DOMContentLoaded', () => {
    const btnNext = document.createElement('button');
    const btnPrev = document.createElement('button');
    const btnWrapper = document.createElement('div');
    
    btnWrapper.classList.add('pokemon__btn-wrapper');
    btnWrapper.append(btnPrev, btnNext)
    btnNext.classList.add('pokemon__next-list');
    btnNext.textContent = 'Next';
    btnPrev.textContent = 'Prev';
    btnPrev.classList.add('pokemon__prev-list');
    let id = 1;
    const pokemon = () => {
        getPokemon(PATH, id).then(({name, sprites}) => {
                pokemonWrapper.innerHTML = `<div class="pokemon__item">
                    <img src="${sprites.front_default}" alt="${name}" />
                    <h3 class="pokemon__name">${name}</h3>
                    </div>`;
                    pokemonWrapper.append(btnWrapper);
            }).catch(e => console.error(e));;
        
    }
    pokemon();

    document.addEventListener('click', (e) => {
        if(e.target.closest('.pokemon__next-list')){
            id++;
            pokemon()
        }
        if(id > 1 && e.target.closest('.pokemon__prev-list')){
            id--;
            pokemon()
        }
    });

    document.addEventListener('click', (e) => {
        if(e.target.closest('.pokemon__search-btn')){
            const name = e.target.previousElementSibling.value.toLowerCase();

            name !== '' && getPokemon(PATH, name === '' ? id : name).then(({sprites, name}) => {
                pokemonWrapper.innerHTML = ` <h2>Found according to your request: </h2>
                <div class="pokemon__item">
                    <img src="${sprites.front_default}" alt="${name}" />
                    <h3 class="pokemon__name">${name}</h3>
                </div>
                <a href="/" class="pokemon__btn-home">Go home</a>`;
             
            }).catch(e => {
                pokemonWrapper.innerHTML = ` <h2>Not found</h2>`;
                console.error(e);
            });
         
        }

    })

})