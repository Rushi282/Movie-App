import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

function Search() {

    const Api_key = "c45a857c193f6302f2b5061c3b85e743";
    const [movies, setMovies] = useState([]);
    const [searchParam] = useSearchParams();
    let query = searchParam.get("q");
    console.log("title in search: " + query);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${query}&page=1`).then((response) => {
            console.log(response.data);
            setMovies(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [query])

    return (
        <>
            <div className="container mb-3 mt-3">
                <div className="row">
                    {
                        movies.results && movies.results.length > 0 &&
                        movies.results.map((movie) => {
                            return (
                                <div className="col-xl-3 text-center p-3 border border-2">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="img-fluid" />
                                    <h4>{movie.title}</h4>
                                    <p>Rating: <strong>{movie.vote_average}/10</strong> </p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Search
