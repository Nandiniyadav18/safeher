import { useEffect, useState } from "react";

const News = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("safety");

  const fetchNews = () => {
    setLoading(true);

    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    fetch(
      `https://newsapi.org/v2/everything?q=women+${category}&language=en&pageSize=6&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const news = data.articles || [];
        setArticles(news);
        setLoading(false);

        // cache
        localStorage.setItem("newsData", JSON.stringify(news));
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    const cached = localStorage.getItem("newsData");

    if (cached) {
      setArticles(JSON.parse(cached));
      setLoading(false);
    }

    fetchNews();

    // 🔄 Auto refresh every 2 minutes
    const interval = setInterval(fetchNews, 120000);

    return () => clearInterval(interval);
  }, [category]);

  return (
    <div
      className="min-h-screen p-6 relative"
      style={{
        backgroundImage: "url('/bg.avif')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-white/70"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          📰 Women Safety News
        </h2>

        {/* 🔥 CATEGORY FILTER */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {["safety", "crime", "empowerment"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                category === cat
                  ? "bg-pink-500 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-600 animate-pulse">
            Fetching latest news...
          </p>
        )}

        {/* NEWS LIST */}
        {!loading &&
          articles.map((news, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-xl p-4 mb-4 shadow hover:scale-[1.02] transition"
            >
              <h3 className="font-semibold text-gray-800">
                {news.title}
              </h3>

              <p className="text-sm text-gray-600">
                {news.description}
              </p>

              <a
                href={news.url}
                target="_blank"
                rel="noreferrer"
                className="text-pink-600 text-sm font-semibold"
              >
                Read full article →
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default News;