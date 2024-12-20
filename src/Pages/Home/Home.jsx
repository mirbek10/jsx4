import { useState } from "react";

const NationalitySearch = () => {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNationality = async () => {
    if (!name) {
      setError("Введите имя!");
      return;
    }

    setResults([]);
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`https://api.nationalize.io?name=${name}`);
      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }
      const data = await response.json();
      setResults(data.country || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Поиск национальности по имени</h2>
      <div style={{ marginBottom: "10px", display: 'flex' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя..."
          style={{ padding: "10px", width: "80%" }}
        />
        <button
          onClick={fetchNationality}
          style={{
            padding: "10px 15px",
            marginLeft: "5px",
            backgroundColor: "#06D001",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Искать
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <ul>
          {results.length > 0 ? (
            results.map((country, index) => (
              <li key={index} style={{ margin: "10px 0" }}>
                {country.country_id}: {Math.round(country.probability * 100)}% вероятности
              </li>
            ))
          ) : (
            name && <p>Ничего не найдено</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default NationalitySearch;
