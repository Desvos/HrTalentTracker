const express = require('express');
const cors = require('cors');

const professionCache = {};
async function getDistributionByProfession(profession) {
    profession = profession.toLowerCase().trim();
    if (professionCache[profession]) {
        return professionCache[profession];
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": "Genera dati sintetici ma plausibili sulla distribuzione geografica in Italia di una figura professionale specifica.\nDato in input un titolo professionale (es. \"Software Developer\", \"Infermiere\", \"Architetto\"), restituisci un array JSON di oggetti, ciascuno dei quali rappresenta una località italiana (il più possibile precisa e coerente con il contesto professionale).\nOgni oggetto deve avere due campi:\n\"place\": il nome della località (in minuscolo, senza accenti, es. \"napoli\"),\n\"distribution\": un numero decimale maggiore di 0 e minore o uguale a 1, che rappresenta la quota (in proporzione) di professionisti presenti in quella località. La somma dei valori \"distribution\" dell'intero array deve essere esattamente 1.\nIl numero di località può variare, assicurati tuttavia che ci sia un numero ragionevole di risultati, almeno 10, ma deve riflettere la realisticità della distribuzione della professione (es. per \"Ricercatore universitario\", concentrarsi su città universitarie, ecc.).Assicurati che la città sia esistente (non usare raggruppamenti come \"altre citta\" ma usa solo nomi di città italiane). Assicurati che le città siano ripetute una sola volta, ovvero i risultati devono essere univoci per place.\nRestituisci solo l'array JSON, senza ulteriori spiegazioni o testo."
                    },
                    {
                        "text": profession
                    }
                ]
            }
        ]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const req = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAlVWUWu0jBTqjqaV9ofC9MD2wndggW_go", requestOptions);

    const res = await req.json();
    const data = res.candidates[0].content.parts[0].text;
    // data may start with "```json" and end with "```", remove them
    const start = data.indexOf("[");
    const end = data.lastIndexOf("]");
    const json = data.substring(start, end + 1);
    // parse the json
    const ret = JSON.parse(json);
    professionCache[profession] = ret;
    return ret;
}

const placeToCoordinates = {};
async function getCoordinatesByPlace(place) {
    if (placeToCoordinates[place]) {
        return placeToCoordinates[place];
    }
    const res = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(place)}&format=jsonv2`);
    const data = await res.json();
    if (data.length === 0) {
        throw new Error(`No coordinates found for place: ${place}`);
    }
    const { lat, lon } = data[0];
    placeToCoordinates[place] = { lat, lon };
    return { lat, lon };
}
const app = express();
const port = 6000;

// Enable CORS for localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.get('/api/distribution', async (req, res) => {
    try {
        const { profession } = req.query;
        if (!profession) {
            return res.status(400).json({ error: 'Profession is required' });
        }

        const distribution = await getDistributionByProfession(profession);
        for (const place of distribution) {
            const coordinates = await getCoordinatesByPlace(place.place);
            place.coordinates = coordinates;
        }

        res.json(distribution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// serve index.htm on /
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.htm');
});
app.get('/resume/:name', (req, res) => {
    res.sendFile(__dirname + '/resume_sample.pdf');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});