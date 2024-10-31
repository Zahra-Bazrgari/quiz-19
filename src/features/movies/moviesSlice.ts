import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  id: string;
  name: string;
  rating: number;
  genre: string;
}

interface MoviesState {
  movies: Movie[];
  sortBy: 'name' | 'rating' | 'genre';
}

const initialState: MoviesState = {
  movies: [],
  sortBy: 'name',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    deleteMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
    sortMovies: (state, action: PayloadAction<'name' | 'rating' | 'genre'>) => {
      state.sortBy = action.payload;
      state.movies.sort((a, b) => {
        if (action.payload === 'rating') return b.rating - a.rating ;
        return a[action.payload].localeCompare(b[action.payload]);
      });
    },
  },
});

export const { addMovie, deleteMovie, sortMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
