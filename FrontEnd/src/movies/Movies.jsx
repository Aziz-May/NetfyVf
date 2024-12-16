

function Movies(){

    return(
        <>
        <section id="movies">
            <h2 id="mv_cont">Tendances des Films Actuels</h2>
            <div class="movies-container">
                <div class="movie-box">
                    <a href="login.html">
                    <img src="../_images/f1.jpeg" alt="Film 1" />
                    </a>
                </div>
                <div class="movie-box">
                    <img src="path/to/film2.jpg" alt="Film 2" />
                    <h3>Film 2</h3>
                </div>
                <div class="movie-box">
                    <img src="path/to/film3.jpg" alt="Film 3" />
                    <h3>Film 3</h3>
                </div>
                <div class="movie-box">
                    <img src="path/to/film4.jpg" alt="Film 4" />
                    <h3>Film 4</h3>
                </div>
                <div class="movie-box">
                    <img src="path/to/film5.jpg" alt="Film 5" />
                    <h3>Film 5</h3>
                </div>
                <div class="movie-box">
                    <img src="path/to/film2.jpg" alt="Film 6" />
                    <h3>Film 6</h3>
                </div>
                <div class="movie-box">
                    <img src="path/to/film2.jpg" alt="Film 7" />
                    <h3>Film 7</h3>
                </div>
                <div class="movie-box">
                    <img src="path/to/film2.jpg" alt="Film 8" />
                    <h3>Film 8</h3>
                </div>
                
            </div>
            <div id="div_button">
                <button class="scroll-button left" onclick="slideLeft()">&#10094;</button>
                <button class="scroll-button right" onclick="scrollRight()">&#10095;</button>

            </div>
        </section>
        </>
    )



}
export default Movies ;