import React, { useState } from 'react'
import { checkTextOriginality } from '../utils/mockTextCheck'
import { checkImageOriginality } from '../utils/mockImageCheck'
import './RegisterIP.css' // Import your CSS file

export default function RegisterIP({ onRegister }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [isImageIP, setIsImageIP] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (isImageIP && !file) {
      setError('Please upload an image file')
      return
    }
    if (!isImageIP && (!title.trim() || !description.trim())) {
      setError('Title and description are required')
      return
    }
    setChecking(true)
    try {
      let score
      if (isImageIP) {
        score = await checkImageOriginality(file)
      } else {
        const text = `${title} ${description}`
        score = await checkTextOriginality(text)
      }
      if (score < 80) {
        setError(`Originality check failed (Score: ${score}%)`)
        return
      }
      onRegister({
        title: isImageIP ? file.name : title,
        description: isImageIP ? 'Image IP' : description,
        type: isImageIP ? 'image' : 'text',
        preview: isImageIP ? preview : null,
        score,
        date: new Date().toLocaleDateString()
      })
      setTitle('')
      setDescription('')
      setFile(null)
      setPreview('')
    } finally {
      setChecking(false)
    }
  }

  return (
    <form className="ip-register-form" onSubmit={handleSubmit}>
      <div className="ip-toggle">
        <button
          type="button"
          className={!isImageIP ? 'active' : ''}
          onClick={() => setIsImageIP(false)}
        >
          Text IP
        </button>
        <button
          type="button"
          className={isImageIP ? 'active' : ''}
          onClick={() => setIsImageIP(true)}
        >
          Image IP
        </button>
      </div>

      {isImageIP ? (
        <div className="ip-image-upload">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="Preview" className="ip-image-preview" />}
        </div>
      ) : (
        <>
          <input
            className="ip-input"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="ip-textarea"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </>
      )}

      <button className="ip-submit-btn" type="submit" disabled={checking}>
        {checking ? 'Checking Originality...' : 'Register'}
      </button>
      {error && <div className="ip-error">{error}</div>}
    </form>
  )
}
