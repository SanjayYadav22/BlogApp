import { useEffect, useState } from "react";
import Blogs from "./Components/Blogs";
import News from "./Components/News";

function App() {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  }, []);

  const handleCreateBlog = (newBlog, isEditing) => {
    setBlogs((prevBlog) => {
      const updatedBlogs = isEditing
        ? prevBlog.map((blog) => (blog === selectedPost ? newBlog : blog))
        : [...prevBlog, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleEditBlog = (blog) => {
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlog) => {
      const updatedBlogs = prevBlog.filter((blog) => blog !== blogToDelete);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectedPost(null);
  };

  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && (
          <News
            onShowBlogs={handleShowBlogs}
            blogs={blogs}
            onEditBlog={handleEditBlog}
            onDeleteBlog={handleDeleteBlog}
          />
        )}
        {showBlogs && (
          <Blogs
            onBack={handleBackToNews}
            onCreatedBlog={handleCreateBlog}
            editPost={selectedPost}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
}

export default App;
