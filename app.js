const express = require("express");
const router=express.Router();
const app = express();
const morgan = require("morgan");
const pokeBank = require("./pokeBank");
const pokemon=pokeBank.list();
app.use(express.static("public"));
//app.use(logger("dev"));

//app.use(morgan("dev"));
//app.get("/", (req, res) => res.send("Hello World!"));
console.log(pokemon);
app.get("/",function(req,res) {
  const pokemonList = pokeBank.list();
  let html = "<h1>Pokedex</h1>";
  pokemonList.forEach((pokemon) => {
    html += `<p><a href="/pokemon/${pokemon.id}">${pokemon.name}</a></p>`;
   
  });
  res.send(html);


});
app.get("/pokemon/:id",function(req,res) {
  const id= req.params.id;
  const post=pokeBank.find(id);
  //console.log(post);
  if(!post.id){
    throw new Error("Not Found");
  }
 /*  if(!pokemon){
    res.status(404).send("Pokemon not found");
  } */
    else{
      let page=`<h1>${post.name}</h1>`;
      page+=`<p>Type: ${post.type}</p>`;
      page+= `<p>Trainer:${post.trainer}</p>`;
      page+= `<p>date: ${post.date}</p>`;
      page+=`<img src="${post.image}" />`;
      res.send(page);
    }
  });


// Route to get all Pokemon
const Pokemon = require("./Models/Pokemon");

app.get("/pokemon", async (req, res) => {
  const pokemon = await Pokemon.findAll();
  res.json(pokemon);
});
// Route to get a single Pokemon by ID
app.get("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});
//Route to create a new Pokemon
app.post("/pokemon", async (req, res) => {
  const pokemon = await Pokemon.create(req.body);
  res.json(pokemon);
});
//Route to update a Pokemon by ID
app.put("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.update(req.body);
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});
//Route to delete a Pokemon by ID
app.delete("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Pokemon not found");
  }
});





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
