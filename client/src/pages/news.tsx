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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Women&apos;s Safety – Live News
      </h2>

      {articles.length === 0 && <p>Loading latest news...</p>}

      {articles.map((news, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-4 shadow-sm"
        >
          <h3 className="font-semibold">{news.title}</h3>
          <p className="text-sm text-gray-600">{news.description}</p>
          <a
            href={news.url}
            target="_blank"
            rel="noreferrer"
            className="text-pink-600 text-sm"
          >
            Read full article →
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
