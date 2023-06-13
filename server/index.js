
const express = require('express');
const {Configuration, OpenAIApi} = require("openai");
const app = express();
const cors = require('cors');
const dotenv  = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



app.post('/', async (req, res) => {
    const {text, lang} = req.body;
    try{

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `##### Translate this function into ${lang}\n### C++\n ${text}   \n    \n### ${lang} \n`,
            temperature: 0,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["###"],
        });
        // console.log(response.data.choices[0].text);
        res.status(200).send(response.data.choices[0].text);
    }catch(err){

        res.status(500).send(err.message);
    }
})


app.listen(3000, ()=>{
    console.log("listening on port 3000");
})

