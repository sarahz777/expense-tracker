import express from "express";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json())

// MongoDB connection string
const uri = "mongodb://localhost:27017"; // Replace  your MongoDB URI
const DB_NAME = "expenses-tracker";
// Create a MongoClient
const client = new MongoClient(uri);

async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

// Route to list all expenses
app.get('/expenses', async (req, res) => {
    try {
        const database = client.db(DB_NAME); // Replace with your database name
        const collection = database.collection('expenses'); // Replace with your collection name

        // Query to get all documents
        const data = await collection.find({}).toArray();

        // Return the data as JSON
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Route to create new expense
app.post("/expenses", async (req, res) => {
    try {
        const database = client.db(DB_NAME);
        const collection = database.collection("expenses");


        // insert document into expenses collection
        await collection.insertOne(req.body);
        res.send("success")
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });    }
})

// Route to get data from MongoDB
app.get('/income', async (req, res) => {
    try {
        const database = client.db(DB_NAME); // Replace with your database name
        const collection = database.collection('income'); // Replace with your collection name

        // Query to get all documents
        const data = await collection.find({}).toArray();

        // Return the data as JSON
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server and connect to the database
app.listen(port, async () => {
    await connectToDB();
    console.log(`Server is running on http://localhost:${port}`);
});
