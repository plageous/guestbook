import express from 'express';
const app = express();
const PORT = 3003;

const contacts = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// main
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});


app.get('/admin', (req, res) => {
    res.send(contacts);
});


app.post('/submit-contact', (req, res) => {
    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        job: req.body.job,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        meeting: req.body.meeting,
        other: req.body.other,
        message: req.body.message,
        mailing: req.body.mailing,
        method: req.body.method
    }

    contacts.push(contact);

    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});