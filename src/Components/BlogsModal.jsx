import "./BlogsModal.css";

function BlogsModal({ show, blog, onClose }) {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </span>
        {blog.image && (
          <img
            src={blog.image}
            alt="Blog.title"
            className="blogs-modal-image"
          />
        )}

        <h2 className="blogs-modal-title">{blog.title}</h2>
        <p className="blogs-modal-content">{blog.content}</p>
      </div>
    </div>
  );
}

export default BlogsModal;
