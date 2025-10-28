import React, { useEffect, useState } from 'react';

function buildBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const protocol = codespace === 'localhost' ? 'http' : 'https';
  return `${protocol}://${codespace}-8000.app.github.dev/api`;
}

export default function Users() {
  const [items, setItems] = useState([]);
  const [teamsMap, setTeamsMap] = useState({});
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const base = buildBaseUrl();
    const url = `${base}/users/`;
    const teamsUrl = `${base}/teams/`;
    console.log('Fetching Users from', url);
    // fetch teams first to build a name map
    fetch(teamsUrl)
      .then((r) => r.json())
      .then((tdata) => {
        const tlist = tdata && tdata.results ? tdata.results : tdata || [];
        const map = {};
        tlist.forEach((t) => { map[t.id] = t.name; });
        setTeamsMap(map);
      })
      .catch((err) => console.warn('Teams fetch error', err))
      .finally(() => {
        fetch(url)
          .then((r) => r.json())
          .then((data) => {
            console.log('Users response:', data);
            const list = data && data.results ? data.results : data || [];
            setItems(list);
          })
          .catch((err) => console.error('Users fetch error', err));
      });
  }, []);

  const openDetails = (item) => { setSelected(item); setShow(true); };

  return (
    <div className="container py-4 app-container">
      <h2 className="h3">Users</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-json">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
                <th>Superhero</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id || it.email}>
                  <td>{it.id}</td>
                  <td>{it.name}</td>
                  <td>{it.email}</td>
                  <td>{teamsMap[it.team] || it.team}</td>
                  <td>{it.is_superhero ? 'Yes' : 'No'}</td>
                  <td><button className="btn btn-sm btn-primary" onClick={() => openDetails(it)}>Details</button></td>
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
                <h5 className="modal-title">User Details</h5>
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
