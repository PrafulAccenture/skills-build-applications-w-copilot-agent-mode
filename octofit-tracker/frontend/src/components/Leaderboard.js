import React, { useEffect, useState } from 'react';

function buildBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  return `${protocol}://${codespace}-8000.app.github.dev/api`;
}

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const base = buildBaseUrl();
    const url = `${base}/leaderboard/`;
    console.log('Fetching Leaderboard from', url);
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        console.log('Leaderboard response:', data);
        const list = data && data.results ? data.results : data || [];
        setItems(list);
      })
      .catch((err) => console.error('Leaderboard fetch error', err));
  }, []);

  const openDetails = (item) => { setSelected(item); setShow(true); };

  return (
    <div className="container py-4 app-container">
      <h2 className="h3">Leaderboard</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-sm table-hover table-json">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.user || idx}>
                  <td>{it.rank || idx + 1}</td>
                  <td>{it.user}</td>
                  <td>{it.score}</td>
                  <td><button className="btn btn-sm btn-outline-primary" onClick={() => openDetails(it)}>Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {show && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leaderboard Entry</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)} />
              </div>
              <div className="modal-body">
                <pre className="modal-pre">{JSON.stringify(selected, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
