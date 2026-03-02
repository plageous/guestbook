import express from 'express';
const app = express();
const PORT = 3003;

const contacts = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// main
app.get('/', (req, res) => {
    res.render('home');
});


app.get('/admin', (req, res) => {
    res.render('admin', { contacts });
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
        method: req.body.method,
        timestamp: new Date()
    }

    contacts.push(contact);

    res.render('confirm', { contact });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});