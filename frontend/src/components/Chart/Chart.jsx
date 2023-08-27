import React from "react";
import "./Chart.css";

import { chartDataTemplate } from "../../utils";
import { ResponsiveContainer, Tooltip, LineChart, XAxis, YAxis, CartesianGrid, Line, Legend } from "recharts";

const tooltipFormatter = (value, name, props) => [`${name} : ${value}`, ""];

const lineColors = {
	0: "rgb(250, 2, 2)",
	1: "rgb(204, 186, 24)",
	2: "rgb(63, 209, 19)",
	3: "rgb(19, 240, 232)",
	4: "rgb(77, 128, 247)",
	5: "rgb(125, 17, 240)",
	6: "rgb(212, 16, 230)",
	7: "rgb(181, 67, 130)",
	8: "#ccc",
	9: "#fff",
};

export const Chart = ({ data }) => {
	const chartData = React.useMemo(() => {
		const result = {...chartDataTemplate};

		for(const entry of data) {
			for (const field in entry.response_times){
				result[field][entry.name] = entry.response_times[field]
			}
		}
		
		return Object.values(result);
	}, [data]);

	return (
		<div className="chart">
			<ResponsiveContainer width="100%" height={400}>
				<LineChart width={500} height={300} data={chartData}>
					<XAxis dataKey="name" stroke="rgb(200, 200, 200)" interval={5} />
					<YAxis stroke="rgb(200, 200, 200)" />
					<Tooltip 
						formatter={tooltipFormatter}
						separator={""}
					/>
          <Legend />
					<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
					{data.map((domain, index) => 
						<Line key={domain.id} width={500} type="monotone" dataKey={domain.name} stroke={lineColors[index % 10]} strokeWidth={3} />
					)}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
