import React from 'react'
import './IPList.css'

export default function IPList({ ips }) {
  return (
    <div className="ip-list">
      <h3>Registered IPs</h3>
      {ips.length === 0 && <div>No IPs registered yet.</div>}
      {ips.map((ip, idx) => (
        <div key={idx} className="ip-list-item">
          {ip.type === 'image' ? (
            <div>
              <img src={ip.preview} alt={ip.title} className="ip-list-image" />
              <div className="ip-score">Originality Score: {ip.score}%</div>
            </div>
          ) : (
            <div>
              <b>{ip.title}</b>
              <div>{ip.description}</div>
              <div className="ip-score">Originality Score: {ip.score}%</div>
            </div>
          )}
          <div className="ip-meta">
            Owner: {ip.owner} | Date: {ip.date} | Type: {ip.type}
          </div>
        </div>
      ))}
    </div>
  )
}
