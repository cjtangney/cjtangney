let axios = require('axios');

export const getFiles = async (path) => {
	let data = await axios.get(path);
	return(data);
}

export const getPost = async (file) => {
	let data = await axios.get(file);
	return(data);
}