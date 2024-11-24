import axios from "axios";
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

function Popular() {
    const [movies, setMovies] = useState([]);
    let navigate = useNavigate();
    const location = useLocation();
    const Api_key = "c45a857c193f6302f2b5061c3b85e743";
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")) || 1;
    console.log(initialPage);
    const [page, setPage] = useState(initialPage);

    const handlePre = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNext = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`)
            .then((response) => {
                console.log(response.data);
                setMovies(response.data.results);
            }).catch((error) => {
                console.log(error);
            });
        window.scroll(0, 0);
        navigate(`?page=${page}`, { replace: true });
    }, [page, navigate])

    const handleMovie = (id) => {
        console.log(id);
        navigate(`/movie?qr=${id}`);
    }

    return (
        <>
            <div className="container mb-3 mt-3">
                <div className="row">
                    {
                        movies && movies.length > 0 &&
                        movies.map((movie) => {
                            return (
                                <div className="col-xl-3 text-center p-3 single" onClick={() => handleMovie(movie.id)}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="img-fluid" />
                                    <h4>{movie.title}</h4>
                                    <p>Rating: <strong>{movie.vote_average}/10</strong> </p>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    movies.length > 0 &&
                    <div className="pagination">
                        <button className="btn btn-outline-danger" onClick={handlePre}>◀️ Previous</button>
                        <button className="btn btn-outline-danger">{page}</button>
                        <button className="btn btn-outline-danger" onClick={handleNext}>Next ▶️</button>
                    </div>
                }
            </div>
        </>
    )
}

export default Popular
