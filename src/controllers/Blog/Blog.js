let axios = require('axios');

export const getBlogPosts = async () => {
	let data = [];
	await axios.get('/blog_posts/')
	.then(res => {
		res.data.map(async fileName => {
			await axios.get('/blog_posts/' + fileName)
			.then(res => {
				data.push(res.data);
			})
		})
	})
	.catch(err => {
		console.log(err);
	});
	console.log(data.length);
	return data;
}