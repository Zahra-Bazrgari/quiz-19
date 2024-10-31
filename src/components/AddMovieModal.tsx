import React, { useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { addMovie } from '../features/movies/moviesSlice';
import CancleBtnIcon from '../assets/CancleBtnIcon';


const movieSchema = z.object({
  name: z.string().min(3, 'Movie name must be at least 3 characters'),
  rating: z.number().min(1).max(10),
  genre: z.string().min(3, 'Movie genre must be at least 3 characters'),
});

type MovieFormInputs = z.infer<typeof movieSchema>;

const AddMovieModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const uniqueId = useId(); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormInputs>({
    resolver: zodResolver(movieSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: MovieFormInputs) => {
    const newMovie = { id: uniqueId, ...data };
    dispatch(addMovie(newMovie));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-700 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <CancleBtnIcon />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">Add New Movie</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Movie Name</label>
            <input
              {...register('name')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter movie name"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              {...register('rating', { valueAsNumber: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Rate 1 to 10"
            />
            {errors.rating && <span className="text-red-500 text-sm">{errors.rating.message}</span>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            <input
              {...register('genre')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter genre"
            />
            {errors.genre && <span className="text-red-500 text-sm">{errors.genre.message}</span>}
          </div>
          
          <button
            type="submit"
            className="border-2 border-blue-500 text-blue-500 w-full py-2 rounded-md hover:bg-blue-500 hover:text-white"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
