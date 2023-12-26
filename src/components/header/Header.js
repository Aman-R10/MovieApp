import React , {useState} from "react";
import "./Header.css";
import { Link  ,  useNavigate} from "react-router-dom";
import logo from "../../Logo/movie.png";

const Header = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
  
    const handleSearch = () => {
      navigate(`/search/${searchQuery}`);
    };

    return (
        <div className="header">

            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src= {logo} alt="" /></Link>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
            </div>

            <div className="headerRight">
                <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

        </div>
    );
};

export default Header;