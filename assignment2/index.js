const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
app.use(express.json());

const PORT = process.env.PORT ;
const MONGO_URL = process.env.MONGO_URL;

const Movie = require("./models/movie"); // Import the movie schema

// Create a new movie entry
app.post('/movies', async (req, res) => {
    try {
        const { title, director, genre, releaseYear, rating, posterURL, description } = req.body;

        if (!title || !director) {
            return res.status(400).json({ error: 'Title and director are required fields' });
        }

        const newMovie = new Movie({
            title,
            director,
            genre,
            releaseYear,
            rating,
            posterURL: posterURL || 'default-poster-url',
            description
        });

        await newMovie.save();
        res.status(201).json({ success: true, message: 'Movie created successfully', movie: newMovie });
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve a list of all movies with optional filtering
app.get('/movies', async (req, res) => {
    try {
        const { genre, director, releaseYear } = req.query;
        const filter = {};

        if (genre) filter.genre = genre;
        if (director) filter.director = director;
        if (releaseYear) filter.releaseYear = releaseYear;

        const movies = await Movie.find(filter);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve details of a single movie by ID
app.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing movie's details
app.put('/movies/:id', async (req, res) => {
    try {
        const { title, director, genre, releaseYear, rating, posterURL, description } = req.body;

        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, director, genre, releaseYear, rating, posterURL, description },
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json({ success: true, message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a movie by ID
app.delete('/movies/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Listening on PORT ${PORT}`);
      }
    });
  });