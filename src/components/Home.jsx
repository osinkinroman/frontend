import React, { useState } from "react";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmissionTransactions = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch("http://130.61.51.1/api/transactions", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmissionPrices = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);

    fetch("http://130.61.51.1/api/prices", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="home">
      <div className="home__description">
        <p>
          Система предназначена для мониторинга сделок, совершенных на бирже.
        </p>

        <p>Система разделена на две функциональности:</p>
        <ol>
          <li>
            <b>Data Accuracy module</b>
          </li>
          <li>
            <b>Suspicious Activities module</b>
          </li>
        </ol>
      </div>
      <div className="inputFiles">
        <div>
          <p>Загрузка файла транзакций: </p>
          <input type="file" name="file" onChange={changeHandler} />

          <div>
            <button onClick={handleSubmissionTransactions}>Отправить</button>
          </div>
        </div>
        <div>
          <p>Загрузка файла c ценами: </p>
          <input type="file" name="file" onChange={changeHandler} />

          <div>
            <button onClick={handleSubmissionPrices}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
