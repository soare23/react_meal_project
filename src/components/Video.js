import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from '../properties';
import YouTube from 'react-youtube';

function Videos(props) {
  const [videos, setVideos] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [page, setPage] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    setIngredient(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/food/videos/search?apiKey=${properties.forthKey}&query=${ingredient}&number=12&offset=${page}`
      )
      .then((response) => {
        setVideos(response.data.videos);
      });
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.spoonacular.com/food/videos/search?apiKey=${properties.forthKey}&query=${ingredient}&number=12&offset=${page}`
      )
      .then((response) => {
        setVideos(response.data.videos);
      });
  };

  //Youtube video option
  const opts = {
    height: '300',
    width: '440',
    playerVars: {
      autoplay: 0,
    },
  };

  function previousPage() {
    if (page > 0) {
      setPage(page - 10);
    }
  }

  function nextPage() {
    setPage(page + 10);
  }

  const pagination = (
    <div>
      <button onClick={previousPage} className="btn btn-outline-success">
        Previous
      </button>
      <button onClick={nextPage} className="btn btn-outline-success">
        Next
      </button>
    </div>
  );

  const noPagination = <div> </div>;

  return (
    <>
      <div className="nav justify-content-center">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Enter the ingredient"
            aria-label="Search"
            name="ingredient"
            value={ingredient}
            onChange={handleChange}
          />
          <button className="btn btn-sm btn-outline-secondary" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="row align-items-center">
        {videos.map((vid, index) => {
          return (
            <div className="col-sm-3">
              <h3>{vid.title}</h3>
              <YouTube videoId={vid.youTubeId} opts={opts} />
              <p>
                Length : {Math.floor((vid.length % 3600) / 60)}:
                {Math.floor((vid.length % 3600) % 60)} min
              </p>
            </div>
          );
        })}
      </div>

      {videos.length > 0 ? pagination : noPagination}
    </>
  );
}

export default Videos;
