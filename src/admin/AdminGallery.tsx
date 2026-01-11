import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  uploadDate: string;
}

const AdminGallery: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [photos, setPhotos] = useState<GalleryPhoto[]>([
    // Sample data - in production, fetch from backend
    {
      id: '1',
      src: '/images/gallery/sunset-cruise.jpg',
      alt: 'Sunset cruise on Fort Lauderdale Intracoastal',
      title: 'Sunset Cruise',
      category: 'sunset',
      uploadDate: '2024-01-15'
    }
  ]);
  
  const [newPhoto, setNewPhoto] = useState<Partial<GalleryPhoto>>({
    title: '',
    alt: '',
    category: 'cruising'
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ADMIN_PASSWORD = 'TikiTaco2024!'; // In production, use environment variables

  const categories = ['cruising', 'sunset', 'sandbar', 'groups', 'amenities'];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true'); // Simple auth
    } else {
      alert('Incorrect password');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select an image file');
      }
    }
  };

  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !newPhoto.title || !newPhoto.alt) {
      alert('Please fill in all fields and select a photo');
      return;
    }

    // In production, upload to cloud storage (Cloudinary, AWS S3, etc.)
    // For now, simulate upload
    const newPhotoData: GalleryPhoto = {
      id: Date.now().toString(),
      src: previewUrl, // In production, this would be the uploaded URL
      alt: newPhoto.alt || '',
      title: newPhoto.title || '',
      category: newPhoto.category || 'cruising',
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setPhotos([...photos, newPhotoData]);
    
    // Reset form
    setNewPhoto({ title: '', alt: '', category: 'cruising' });
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    alert('Photo uploaded successfully!');
    
    // In production, send to backend API:
    // const formData = new FormData();
    // formData.append('image', selectedFile);
    // formData.append('title', newPhoto.title);
    // formData.append('alt', newPhoto.alt);
    // formData.append('category', newPhoto.category);
    // await fetch('/api/gallery/upload', { method: 'POST', body: formData });
  };

  const handleDeletePhoto = (id: string) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      setPhotos(photos.filter(photo => photo.id !== id));
      
      // In production, delete from backend:
      // await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      
      alert('Photo deleted successfully!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h1>🌴 Tiki Taco Admin</h1>
          <h2>Gallery Management</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>

        <style>{`
          .admin-login {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }

          .login-container {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            width: 100%;
            text-align: center;
          }

          h1 {
            font-size: 2rem;
            color: #1a365d;
            margin-bottom: 0.5rem;
          }

          h2 {
            font-size: 1.25rem;
            color: #4a5568;
            margin-bottom: 2rem;
          }

          .password-input {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            margin-bottom: 1rem;
          }

          .password-input:focus {
            outline: none;
            border-color: #FF6B6B;
          }

          .login-btn {
            width: 100%;
            padding: 1rem;
            background: #FF6B6B;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
          }

          .login-btn:hover {
            background: #e05555;
            transform: translateY(-2px);
          }
        `}</style>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <>
      <Helmet>
        <title>Admin - Gallery Management | Tiki Taco</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="admin-dashboard">
        {/* Header */}
        <header className="admin-header">
          <div className="header-content">
            <h1>🌴 Tiki Taco Admin</h1>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="admin-container">
          <div className="admin-grid">
            {/* Upload Section */}
            <section className="upload-section">
              <h2>Upload New Photo</h2>
              <form onSubmit={handleUploadPhoto} className="upload-form">
                <div className="form-group">
                  <label>Select Photo</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="file-input"
                  />
                  {previewUrl && (
                    <div className="preview-container">
                      <img src={previewUrl} alt="Preview" className="preview-image" />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Photo Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Sunset Cruise"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    className="text-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Alt Text (for SEO) *</label>
                  <input
                    type="text"
                    placeholder="e.g., Sunset cruise on Fort Lauderdale Intracoastal"
                    value={newPhoto.alt}
                    onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
                    className="text-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="select-input"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="upload-btn" disabled={!selectedFile}>
                  Upload Photo
                </button>
              </form>
            </section>

            {/* Photos Gallery */}
            <section className="photos-section">
              <h2>Current Photos ({photos.length})</h2>
              <div className="photos-grid">
                {photos.map(photo => (
                  <div key={photo.id} className="photo-card">
                    <img src={photo.src} alt={photo.alt} />
                    <div className="photo-info">
                      <h4>{photo.title}</h4>
                      <p className="category-badge">{photo.category}</p>
                      <p className="upload-date">Uploaded: {photo.uploadDate}</p>
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Instructions */}
          <section className="instructions">
            <h3>📋 Photo Management Instructions</h3>
            <ul>
              <li><strong>Image Format:</strong> JPG, PNG, or WebP (recommended for web)</li>
              <li><strong>Optimal Size:</strong> 1920x1280px or similar aspect ratio</li>
              <li><strong>File Size:</strong> Keep under 2MB for fast loading</li>
              <li><strong>Alt Text:</strong> Describe the image for SEO and accessibility</li>
              <li><strong>Categories:</strong> Helps organize photos in the gallery</li>
            </ul>
          </section>
        </div>

        <style>{`
          .admin-dashboard {
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            background: #f7fafc;
          }

          /* Header */
          .admin-header {
            background: #1a365d;
            color: white;
            padding: 1.5rem 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .header-content {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .admin-header h1 {
            font-size: 1.75rem;
            margin: 0;
          }

          .logout-btn {
            padding: 0.75rem 1.5rem;
            background: #FF6B6B;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
          }

          .logout-btn:hover {
            background: #e05555;
          }

          /* Container */
          .admin-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
          }

          .admin-grid {
            display: grid;
            grid-template-columns: 400px 1fr;
            gap: 2rem;
            margin-bottom: 2rem;
          }

          /* Upload Section */
          .upload-section {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            height: fit-content;
            position: sticky;
            top: 2rem;
          }

          .upload-section h2 {
            font-size: 1.5rem;
            color: #1a365d;
            margin-bottom: 1.5rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          label {
            display: block;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 0.5rem;
          }

          .file-input,
          .text-input,
          .select-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s;
          }

          .file-input:focus,
          .text-input:focus,
          .select-input:focus {
            outline: none;
            border-color: #FF6B6B;
          }

          .preview-container {
            margin-top: 1rem;
            border-radius: 8px;
            overflow: hidden;
          }

          .preview-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .upload-btn {
            width: 100%;
            padding: 1rem;
            background: #48bb78;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
          }

          .upload-btn:hover:not(:disabled) {
            background: #38a169;
            transform: translateY(-2px);
          }

          .upload-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          /* Photos Section */
          .photos-section {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .photos-section h2 {
            font-size: 1.5rem;
            color: #1a365d;
            margin-bottom: 1.5rem;
          }

          .photos-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .photo-card {
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s;
          }

          .photo-card:hover {
            border-color: #FF6B6B;
            transform: translateY(-5px);
          }

          .photo-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .photo-info {
            padding: 1rem;
          }

          .photo-info h4 {
            font-size: 1rem;
            color: #1a365d;
            margin-bottom: 0.5rem;
          }

          .category-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: #e6fffa;
            color: #319795;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .upload-date {
            font-size: 0.875rem;
            color: #718096;
            margin-bottom: 1rem;
          }

          .delete-btn {
            width: 100%;
            padding: 0.5rem;
            background: #fc8181;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
          }

          .delete-btn:hover {
            background: #f56565;
          }

          /* Instructions */
          .instructions {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .instructions h3 {
            font-size: 1.25rem;
            color: #1a365d;
            margin-bottom: 1rem;
          }

          .instructions ul {
            list-style: none;
            padding: 0;
          }

          .instructions li {
            padding: 0.75rem 0;
            border-bottom: 1px solid #e2e8f0;
            color: #4a5568;
          }

          .instructions li:last-child {
            border-bottom: none;
          }

          @media (max-width: 1024px) {
            .admin-grid {
              grid-template-columns: 1fr;
            }

            .upload-section {
              position: static;
            }
          }

          @media (max-width: 768px) {
            .photos-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default AdminGallery;