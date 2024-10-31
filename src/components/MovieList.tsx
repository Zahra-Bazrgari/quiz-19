import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteMovie, sortMovies } from "../features/movies/moviesSlice";
import { Movie } from "../features/movies/moviesSlice";
import AddMovieModal from "./AddMovieModal";
import TrophyIcon from "../assets/TrophyIcon";
import TrashIcon from "../assets/TrashIcon";

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);

  const handleSort = (column: "name" | "rating" | "genre") => {
    dispatch(sortMovies(column));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteMovie(id));
  };

  const highestRatedMovie = movies.reduce(
    (highest, movie) =>
      movie.rating > (highest?.rating ?? 0) ? movie : highest,
    null as Movie | null
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl text-gray-700">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Movie List</h1>

      <button
        onClick={() => setAddModalOpen(true)}
        className="flex items-center justify-center px-6 shadow-md mb-6 mx-auto border-2 border-blue-500 text-blue-500 py-2 rounded-md hover:bg-blue-500 hover:text-white"
      >
        Add Movie
      </button>

      <table className="w-full bg-gray-50 shadow-lg rounded-md overflow-hidden">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("name")}
              className="cursor-pointer px-6 py-3 font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 text-center"
            >
              Movie Name
            </th>
            <th
              onClick={() => handleSort("rating")}
              className="cursor-pointer px-6 py-3 text-center font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
            >
              Rating
            </th>
            <th
              onClick={() => handleSort("genre")}
              className="cursor-pointer px-6 py-3 text-center font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
            >
              Genre
            </th>
            <th className="px-6 py-3 text-center font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr
              key={movie.id}
              className={`${
                movie.id === highestRatedMovie?.id ? "bg-green-100" : "bg-white"
              } border-b border-gray-200`}
            >
              <td className=" px-6 py-3 text-center flex gap-2 justify-center items-center space-x-2">
                {movie.id === highestRatedMovie?.id && <TrophyIcon />}
                {movie.name}
              </td>
              <td className=" px-6 py-3 text-center">{movie.rating}</td>
              <td className=" px-6 py-3 text-center">{movie.genre}</td>
              <td className=" px-6 py-3 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <TrashIcon />
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
