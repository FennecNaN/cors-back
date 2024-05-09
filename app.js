const express = require("express");
const axios = require("axios")
const cors = require("cors")
const app = express();

app.use(cors())

//todos los personajes

app.get('/characters', async (req, res) => {

    try {
        const allCharacters = [];
        for (let numberChar = 1; numberChar <= 50; numberChar++) {
            const url = `https://rickandmortyapi.com/api/character/${numberChar}`;
            const response = await axios.get(url)
            const {name, status, species, gender, origin: { name: origin } , image } = response.data;
            allCharacters.push({name, status, species, gender, origin , image });
        } 
        res.json(allCharacters)
    } catch (ERROR) {
        res.status(404).json({error: 'No se han podido cargar todos los personajes'})
    }
})

//por ID

app.get('/characters/ID/:charID', async (req,res) => {
    const charID = req.params.charID
    const url = `https://rickandmortyapi.com/api/character/${charID}`
    try {
        const response = await axios.get(url)
        const {name, status, species, gender, origin: { name: origin } , image } = response.data;
        res.json({name, status, species, gender, origin: { name: origin } , image})
    } catch  (ERROR) {
        res.status(404).json({error: 'Rick mató al personaje que estas buscando y eliminó todos sus datos, intenta con otro'})
    }
})

//por nombre

app.get('/characters/:name', async (req, res) => {
    const charFilter = req.params.name;
    const url = `https://rickandmortyapi.com/api/character/?name=${charFilter}`;
    try {
        const response = await axios.get(url);
        const { results } = response.data;
        const characters = results.map(({ name, status, species, gender, origin: { name: origin }, image }) => ({
            name,
            status,
            species,
            gender,
            origin,
            image
        }));
        res.json({ characters });
    } catch (error) {
        res.status(404).json({ error: 'Rick mató al personaje que estás buscando y eliminó todos sus datos, intenta con otro' });
    }
});




app.listen(3000, () => {
    console.log("Express escuchando en puerto 3000 ! ! !")
})