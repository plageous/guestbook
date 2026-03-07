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

app.post('/submit-contact', async (req, res) => {
    try {
        const contact = req.body;        
        console.log('New order submitted:', contact);

        // SQL injection? whats that?
        const sql = 
        `INSERT INTO contacts(fname, lname, job, company, linkedin, email, meeting, other, message, mailing, method)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const params = [
            contact.fname,
            contact.lname,
            contact.job,
            contact.company,
            contact.linkedin,
            contact.email,
            contact.meeting,
            contact.other,
            contact.message,
            contact.mailing,
            contact.method
        ];
        
        const result = await pool.execute(sql, params);
        console.log('Contact saved with ID:', result[0].insertId);

        // Render confirmation page with the adoption data
        res.render('confirm', { contact });        
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).send('Sorry, there was an error saving your contact. Please try again.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});