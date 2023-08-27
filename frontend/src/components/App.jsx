import './App.css';
import React from 'react';

import { Chart } from "./Chart";
import { fetchChartData } from "../api";
import { LoadingOverlay, ErrorBlock } from "./common";

const TIMER_SECONDS = 1000 * 30; // 30 seconds

export const App = () => {
  const [cahrts, setCharts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errors, setErrors] = React.useState({ api: [], });

  const fetchCharts = async (secondsToLoad) => {
    setIsLoading(true);
    const response = await fetchChartData();

    try {
      const data = await response.json();
      setCharts(data);
      setErrors({ api: [], });
    } catch(e) { 
      setErrors({ api: ["Something went wrong with the API. Try again later ..."], });
    }

    setTimeout(() => setIsLoading(false), secondsToLoad * 1000);
  };

  React.useEffect(() => {
    fetchCharts(2);
    const timerId = setInterval(() => fetchCharts(0.5), TIMER_SECONDS);

    return () => {
      timerId && clearInterval(timerId);
    };
  }, []);

  return (
    <main className="main">
      <div className="container">
        <h1 className="main__title">Welcome to the Ping application!</h1>
        {!errors.api.length && cahrts.length && <Chart data={cahrts} />}
        <div className="main__errors">
          <ErrorBlock errorArr={errors.api} id="api" />
        </div>
        {isLoading && <LoadingOverlay />}
      </div>
    </main>
  );
}
