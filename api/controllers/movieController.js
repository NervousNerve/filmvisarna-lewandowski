// import Movie model here

const getAllMovies = async (req, res) => {
	let movies = await Movies.find().exec();
	res.json(movies)
}

module.exports = {
	getAllMovies
}