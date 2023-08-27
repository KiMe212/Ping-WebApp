export const fetchChartData = async () => {
	return fetch("http://localhost:8080/chart/")
		.then(res => res)
		.catch(err => err)
};
