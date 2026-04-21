import { useEffect, useState } from "react";

const News = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    fetch(
      `https://newsapi.org/v2/everything?q=women+safety+OR+women+empowerment&language=en&apiKey=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
      });
  }, []);

  return (
    <div
      className="min-h-screen p-6 relative overflow-x-hidden"
      style={{
        backgroundImage: "url('/bg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🌫️ OVERLAY */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* ✨ GLOW EFFECT */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[400px] h-[400px] bg-pink-300/30 blur-[120px] top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-purple-300/30 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          📰 Women&apos;s Safety – Live News
        </h2>

        {articles.length === 0 && (
          <p className="text-center text-gray-700">
            Loading latest news...
          </p>
        )}

        {articles.map((news, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-xl border border-pink-200 rounded-2xl p-5 mb-4 shadow-lg hover:shadow-pink-400/30 transition"
          >
            <h3 className="font-semibold text-gray-800 text-lg">
              {news.title}
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              {news.description}
            </p>

            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 text-pink-600 font-semibold"
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