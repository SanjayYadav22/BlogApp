import "./News.css";
import Calendar from "./Calendar";
import Wheather from "./Wheather";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import blogImg1 from "../assets/images/blog1.jpg";
import blogImg2 from "../assets/images/blog2.jpg";
import blogImg3 from "../assets/images/blog3.jpg";
import blogImg4 from "../assets/images/blog4.jpg";

import axios from "axios";
import { useEffect, useState } from "react";
import NewsModal from "./NewsModal";
import BookMarks from "./BookMarks";
import BlogsModal from "./BlogsModal";

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];

function News({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategories}&lang=en&apikey=bf3708662786f61a76ff814c0a3662e0`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=bf3708662786f61a76ff814c0a3662e0`;
      }
      const response = await axios.get(url);
      console.log(response);
      6;

      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));

      const saveBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarks(saveBookmarks);

      // console.log(news);
    };
    fetchNews();
  }, [selectedCategories, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategories(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticle = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const handleBlogClick = (blog) => {
    setSelectedPost(blog);
    setShowBlogModal(true);
  };

  const closeBlogModal = () => {
    setShowBlogModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg} alt="UserImg" />
            <p>Sanjay Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-header">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  key={category}
                  href="#"
                  className="nav-link"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}

              <a
                href=""
                className="nav-link"
                onClick={(e) => {
                  // e.stopPropagation();
                  e.preventDefault();
                  setShowBookmarkModal(true);
                }}
              >
                Bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline" onClick={() => handleArticle(headline)}>
              <img src={headline.image || noImg} alt={headline.title} />
              <h2 className="headline-title">
                {headline.title}
                <i
                  className={`${
                    bookmarks.some(
                      (bookmark) => bookmark.title === headline.title
                    )
                      ? "fa-solid"
                      : "fa-regular"
                  } fa-bookmark bookmark`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                  }}
                ></i>
              </h2>
            </div>
          )}

          <div className="news-grid">
            {news.map((article, index) => {
              return (
                <div
                  key={index}
                  className="news-grid-item"
                  onClick={() => handleArticle(article)}
                >
                  <img src={article.image || noImg} alt={article.title} />
                  <h3>
                    {article.title}
                    <i
                      className={`${
                        bookmarks.some(
                          (bookmark) => bookmark.title === article.title
                        )
                          ? "fa-solid"
                          : "fa-regular"
                      } fa-bookmark bookmark`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(article);
                      }}
                    ></i>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        <NewsModal
          show={showModal}
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        <BookMarks
          show={showBookmarkModal}
          bookmarks={bookmarks}
          onClose={() => setShowBookmarkModal(false)}
          onSelectedArticle={handleArticle}
          onDeleteBookmarks={handleBookmarkClick}
        />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="blog-post"
                onClick={() => handleBlogClick(blog)}
              >
                <img src={blog.image || noImg} alt="blog.title" />
                <h3>{blog.title}</h3>
                {/* <p>{blog.content}</p> */}
                <div className="post-button">
                  <button
                    className="edit-post"
                    onClick={() => onEditBlog(blog)}
                  >
                    <i className="bx bxs-edit"></i>
                  </button>
                  <button
                    className="delete-post"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBlog(blog);
                    }}
                  >
                    <i className="bx bxs-x-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedPost && showBlogModal && (
            <BlogsModal
              show={showBlogModal}
              blog={selectedPost}
              onClose={closeBlogModal}
            />
          )}
        </div>
        <div className="weather-calendar">
          <Wheather />
          <Calendar />
        </div>
      </div>
      <footer className="news-footer">
        <p>
          <span>News & Blogs App</span>
        </p>
        <p>&copy; All Right Reserved, By Sanjay</p>
      </footer>
    </div>
  );
}

export default News;
