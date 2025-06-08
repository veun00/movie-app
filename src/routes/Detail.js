import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) return `${hours}시간 ${mins}분`;
    if (hours > 0) return `${hours}시간`;
    return `${mins}분`;
  };
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.description_full}</p>
          <ul>
            <li>
              <strong>Year:</strong> {movie.year}
            </li>
            <li>
              <strong>Rating:</strong> {movie.rating}
            </li>
            <li>
              <strong>Runtime:</strong> {formatRuntime(movie.runtime)}
            </li>
            <li>
              <strong>Genres:</strong>
              <ul>
                {movie.genres?.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </li>
          </ul>
          {movie.yt_trailer_code && (
            <div>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                title="YouTube trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Detail;
