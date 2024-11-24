import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

function Header() {
    let navigate = useNavigate();
    let title = useRef();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(title.current.value);
        navigate(`/search?q=${title.current.value}`);
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Navbar</Link>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 topmenu">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/">Popular</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="top_rated">Top Rated</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="upcoming">Upcoming</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="#">Liked</Link>
                            </li>
                        </ul>
                        <form class="d-flex" role="search" onSubmit={handleSearch}>
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={title} />
                            <button class="btn btn-outline-success" type="submit" >Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
