import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";

const Statistics = ({ alerts_datestamp, chartsInfo, error, isLoaded }) => {
  /*Преобразование и выдача данных транзакций с полем consideration*/
  const data = chartsInfo;
  const currData = [];
  data.forEach((item) => {
    item.consideration = item.quantity * item.price;
  });
  data.sort(
    (currentItem, nextItem) =>
      currentItem.consideration - nextItem.consideration
  );
  for (var i = data.length - 1; i > data.length - 6; i--) {
    currData.unshift(data[i]);
  }
  /*Рендер*/
  if (error) {
    return <p>Error {error.message}</p>;
  } else if (!isLoaded) {
    return (
      <p>
        {" "}
        Извините, но процесс “Анализ транзакций и создание оповещений” ещё не
        завершился
      </p>
    );
  } else {
    return (
      <div className="statistics">
        <div className="pieChart" style={{ margin: "5% 5% 5% 0" }}>
          <p> Доля алёртов каждого типа </p>
          <PieChart width={730} height={250}>
            <Pie
              data={alerts_datestamp}
              dataKey="affectedTransactionsCount"
              nameKey="alertType"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </div>
        <div className="histogramChart" style={{ margin: "5% 5% 5% 0" }}>
          <p>
            Топ-5 Execution Entity Name, отсортированных по значению
            Consideration
          </p>
          <BarChart
            width={730}
            height={250}
            data={currData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={10}
          >
            <XAxis
              dataKey="executionEntityName"
              scale="auto"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="consideration"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </div>
      </div>
    );
  }
};

export default Statistics;
