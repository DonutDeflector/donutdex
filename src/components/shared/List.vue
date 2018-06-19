<template>
  <div id="List">
    <div class="pokemon-card">
      <p v-for="pokemon in pokemonList" :key="pokemon.number">
        <div class="pokemon-sprite-container">
          <img :v-lazy="`${pokemon.sprite}`">
        </div>
        {{pokemon.name}}
        {{pokemon.number}}
      </p>
    </div>
  </div>
</template>

<script>
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

export default {
  name: "List",
  data: function() {
    return {
      pokemonList: null
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
          "https://pokeapi.co/media/sprites/pokemon/" + element.number + ".png";
      });

      // sorts pokemon numberically
      this.pokemonList.sort((a, b) => (a.number > b.number ? 1 : -1));
      console.log(this.pokemonList);
    });
  }
};
</script>

<style scoped>
</style>
