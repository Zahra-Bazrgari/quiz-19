import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { deleteMovie, sortMovies } from '../features/movies/moviesSlice';
import { Movie } from '../features/movies/moviesSlice';
import AddMovieModal from './AddMovieModal';

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);

  const handleSort = (column: 'name' | 'rating' | 'genre') => {
    dispatch(sortMovies(column));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteMovie(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>

      <button
        onClick={() => setAddModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Movie
      </button>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('name')}
              className="cursor-pointer border px-4 py-2"
            >
              Movie Name
            </th>
            <th
              onClick={() => handleSort('rating')}
              className="cursor-pointer border px-4 py-2"
            >
              Rating
            </th>
            <th
              onClick={() => handleSort('genre')}
              className="cursor-pointer border px-4 py-2"
            >
              Genre
            </th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td className="border px-4 py-2">{movie.name}</td>
              <td className="border px-4 py-2">{movie.rating}</td>
              <td className="border px-4 py-2">{movie.genre}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddModalOpen && (
        <AddMovieModal onClose={() => setAddModalOpen(false)} />
      )}

    </div>
  );
};

export default MovieList;
