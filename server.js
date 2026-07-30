import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint for John's profile
app.get('/profiles', (req, res) => {
  res.status(200).json({
    data: {
      name: "john",
      age: 20
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
