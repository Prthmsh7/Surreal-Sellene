import React from 'react'

export default function Recommendations() {
  const recs = [
    { id: 1, title: "AI-Generated Music Album", score: 92 },
    { id: 2, title: "3D Character Design Pack", score: 88 },
    { id: 3, title: "Blockchain Patent Draft", score: 95 }
  ]
  return (
    <div style={{ margin: '24px 0', padding: 16, border: '1px solid #eee' }}>
      <h3>AI Recommendations</h3>
      {recs.map(rec => (
        <div key={rec.id}>
          <b>{rec.title}</b> <span style={{ color: 'green' }}>{rec.score}% originality</span>
        </div>
      ))}
    </div>
  )
}
