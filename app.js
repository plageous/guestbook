import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// main
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// contact submission
app.post('/book-appointment', (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});