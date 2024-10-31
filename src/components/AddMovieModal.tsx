import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { addMovie } from '../features/movies/moviesSlice';

const movieSchema = z.object({
  name: z.string().min(3, 'Movie name must be at least 3 characters'),
  rating: z.number().min(1).max(10),
  genre: z.string().min(1, 'Genre is required'),
});

type MovieFormInputs = z.infer<typeof movieSchema>;

const AddMovieModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<MovieFormInputs>({
    resolver: zodResolver(movieSchema),
  });

  const onSubmit = (data: MovieFormInputs) => {
    const newMovie = { id: Date.now().toString(), ...data };
    dispatch(addMovie(newMovie));
    onClose();
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-300 p-5 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Movie Name</label>
          <input {...register('name')} />
          {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
        </div>
        <div>
          <label>Rating</label>
          <input type="number" {...register('rating', { valueAsNumber: true })} />
          {errors.rating && <span className='text-red-500'>{errors.rating.message}</span>}
        </div>
        <div>
          <label>Genre</label>
          <input {...register('genre')} />
          {errors.genre && <span className='text-red-500'>{errors.genre.message}</span>}
        </div>
        <button type="submit">Add Movie</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddMovieModal;