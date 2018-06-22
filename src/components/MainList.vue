<template>
  <div id="MainList">
    <div v-if="pokemonListGenerated" v-for="pokemon in pokemonList"
    :key="pokemon.number" class="pokemon-card">
      <div class="pokemon-sprite-container">
        <img class="pokemon-sprite" v-lazy="`${pokemon.sprite}`">
      </div>
      <div class="pokemon-information-container">
        <span class="pokemon-number">{{pokemon.number}}</span>
        <span class="pokemon-name">{{pokemon.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
const Pokedex = require("pokeapi-js-wrapper");
const options = {
  protocol: "https"
};
const P = new Pokedex.Pokedex(options);

export default {
  name: "MainList",
  data: function() {
    return {
      pokemonList: null,
      pokemonListGenerated: false
    };
  },
  created() {
    // fetchs all Gen 1 data
    P.getGenerationByName("generation-i").then(response => {
      // adds Gen 1 Pokemon to list
      this.pokemonList = response.pokemon_species;

      this.pokemonList.forEach(function(element) {
        // assigns each pokemon their number
        element.number = Number(
          element.url
            .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
            .replace("/", "")
        );

        // assigns each pokemon their sprite
        element.sprite =
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
          element.number +
          ".png";
      });

      // sorts pokemon numberically
      this.pokemonList.sort((a, b) => (a.number > b.number ? 1 : -1));

      // allows pokemon list to be displayed
      this.pokemonListGenerated = true;
    });
  }
};
</script>

<style scoped>
#MainList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(192px, 1fr));
  grid-gap: 10px;
  width: 100%;
}

.pokemon-card {
  grid-column: auto / auto;
  grid-row: auto / auto;
  text-align: center;
  padding: 5px;
  box-shadow: var(--shadow);
  border: 1px solid var(--black);
}

.pokemon-sprite-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 96px;
}

.pokemon-sprite {
  max-height: 100%;
}

.pokemon-information-container {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
}

.pokemon-number {
  background-color: var(--black);
  color: var(--white);
  padding: 0 4px 2px;
}
</style>
