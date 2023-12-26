import React, { useEffect, useState, useCallback } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import ActorImage from "../../Logo/movie.png";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [castData, setCastData] = useState([]);
    const [director, setDirector] = useState("");
    const { id } = useParams();

    const getData = useCallback(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
          .then((res) => res.json())
          .then(async (data) => {
            setMovie(data);
            
            // Fetch additional details, including crew information
            const crewResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
            const crewData = await crewResponse.json();
      
            // Set director information
            const directorInfo = crewData.crew.find((member) => member.job === "Director");
            setDirector(directorInfo?.name || "");
          });
     }, [id]);
      
    const getCast = useCallback(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((res) => res.json())
        .then((data) => setCastData(data.cast));
    }, [id]);

    useEffect(() => {
        getData();
        getCast();
        window.scrollTo(0, 0);
    }, [getData, getCast]); 

    return (
        <div className="movie">

            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt="bannermovie" />
            </div>
            
            <div className="movie__detail">

                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt="cardimage" />
                    </div>
                </div>

                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    
                    <h3 className = "director">Director : {director ? director : "Not Found"}</h3>

                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>

            </div>

            {/*  Cast Member part. */}
            <div className="cast-members">
                <h1>Cast Members</h1>
                <ul>
                {castData.map((castMember) => (
                    <li key={castMember.id}>
                    
                    <img
                        src={
                            castMember.profile_path
                            ? `https://image.tmdb.org/t/p/original${castMember.profile_path}`
                            : ActorImage
                        }
                        alt={castMember.name}
                        className={castMember.profile_path ? 'circular' : 'placeholder'}
                    />

                    <div>
                        <h4>Name: {castMember.name}</h4>
                        <h4>Role: {castMember.character}</h4>
                    </div>
                    </li>
                ))}
                </ul>
            </div>

        </div>
    )
}

export default Movie;