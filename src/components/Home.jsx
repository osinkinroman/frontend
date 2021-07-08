import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="home__description">
        <p>
          Система предназначена для мониторинга сделок, совершенных на бирже.
        </p>

        <p>
          Система разделена на две функциональности:
          <ol>
            <li>
              <b>Data Accuracy module</b>
            </li>
            <li>
              <b>Suspicious Activities module</b>
            </li>
          </ol>
        </p>
      </div>
    </div>
  );
};

export default Home;
