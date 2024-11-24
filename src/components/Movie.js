import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Movie() {
    // const [movie, setMovie] = useState(null)
    // const [searchParam] = useSearchParams();
    // let movie_id = searchParam.get("qr");
    // console.log("id: " + movie_id);
    // const Api_key = "c45a857c193f6302f2b5061c3b85e743";
    // useEffect(() => {
    //     const fetchMovie = async () => {
    //         try {
    //             await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`).then((response) => {
    //                 console.log(response.data);
    //                 console.log(typeof response.data);
    //                 setMovie(response.data);
    //             }).catch((error) => {
    //                 console.log(error);
    //             });
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     if (movie_id) {
    //         fetchMovie();
    //     }
    // }, [movie_id])

    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const movie_id = searchParams.get("qr");

    const Api_key = "c45a857c193f6302f2b5061c3b85e743";

    useEffect(() => {
        const fetchMovie = async () => {
            if (!movie_id) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`);
                console.log(response.data);
                setMovie(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const getCast = () => {
            axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`)
                .then((response) => {
                    console.log(response.data.cast);
                    setCast(response.data.cast);
                }).catch((error) => {
                    console.log(error);
                });
        }

        fetchMovie();
        getCast();
    }, [movie_id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="container mb-3 mt-3">
                <div className="row">
                    <div className="col-xl-7">
                        <div className="row">
                            <div className="col-xl-3" id='poster'>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                            </div>
                            <div className="col-xl-9">
                                <h2>{movie.title}</h2>
                                <p>Rating: {movie.vote_average}</p>
                                <p>{movie.runtime} min</p>
                                <p>
                                    <div>
                                        {
                                            movie.genres &&
                                            movie.genres.map((genre) => genre.name).join(' ,')
                                        }
                                    </div>
                                </p>
                                <p>Release date: {movie.release_date}</p>
                            </div>
                        </div>
                        <div className="row">
                            <h3>Overview</h3>
                            {movie.overview}
                        </div>
                    </div>
                    <div className="col-xl-5">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" />
                    </div>
                </div>
            </div>
            <div className="container">
                <h3>Cast</h3>
                <div className="row">
                    {
                        cast && cast.length > 0 &&
                        cast.map((c) =>
                            c.profile_path !== undefined && c.profile_path !== null &&
                            <div className="col-xl-2">
                                <img src={`https://image.tmdb.org/t/p/w500${c.profile_path}`} alt="" className='img-fluid' />
                                <p>{c.original_name}</p>
                                <p>Character: {c.character}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
