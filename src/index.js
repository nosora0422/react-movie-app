import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from "react-router-dom"; 
import './index.css';
import App from './App';
import NowPlaying from './views/NowPlaying/NowPlaying';
import Tranding from './views/Tranding/Tranding';
import TopRated from './views/TopRated/TopRated';
import Upcoming from './views/Upcoming/Upcoming';
import Search from './views/Search/Search';
import Favorite from './views/Favorite/Favorite';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<NowPlaying />} />
        <Route path="now-playing" element={<NowPlaying />} />
        <Route path="tranding" element={<Tranding />} />
        <Route path="top-rated" element={<TopRated />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="search" element={<Search />} />
        <Route path="favorite" element={<Favorite/>} />
      </Route>
    </Routes>
  </HashRouter>
);

