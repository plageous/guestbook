import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
const app = express();
const PORT = 3003;

const contacts = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// database info pool (remember to npm i)
dotenv.config();
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// debug route
app.get('/db-test', async (req, res) => {
    try {
        const contacts = await pool.query('SELECT * FROM contacts');
        res.send(contacts[0]);
    } catch (err) {
       console.error('Database error:', err);
       res.status(500).send('Database error: ' + err.message);
    }
});

// main
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

// contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// display all contacts
app.get('/admin', async (req, res) => {
    try {
        const [contacts] = await pool.query('SELECT * FROM contacts ORDER BY timestamp DESC');  
        res.render('admin', { contacts });        
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error loading orders: ' + err.message);
    }
});

// post contact submission
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