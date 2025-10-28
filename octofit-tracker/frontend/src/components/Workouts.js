import React, { useEffect, useState } from 'react';

function buildBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  return `${protocol}://${codespace}-8000.app.github.dev/api`;
}

export default function Workouts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const base = buildBaseUrl();
    const url = `${base}/workouts/`;
    console.log('Fetching Workouts from', url);
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        console.log('Workouts response:', data);
        const list = data && data.results ? data.results : data || [];
        setItems(list);
      })
      .catch((err) => console.error('Workouts fetch error', err));
  }, []);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
