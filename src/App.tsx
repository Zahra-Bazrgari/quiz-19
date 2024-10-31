import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MovieList from "./components/MovieList";

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <MovieList />
      </div>
    </Provider>
  );
}
