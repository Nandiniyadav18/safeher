import { useEffect, useState } from "react";

const News = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("safety");

  const speak = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  // 🤖 simple AI summary (manual logic)
  const getSummary = (desc: string) => {
    if (!desc) return "No summary available";
    return desc.split(".").slice(0, 2).join(".") + ".";
  };

  const fetchNews = () => {
    setLoading(true);

    const apiKey = "559516ecdf02a00e4d56c956d1b1ea60";

    
    fetch(
       `https://gnews.io/api/v4/search?q=women safety&lang=en&max=6&apikey=${apiKey}`
    )
       .then((res) => res.json())
       .then((data) => {
        console.log("GNEWS:", data);
        setArticles(data.articles || []);
        setLoading(false);
       })
       .catch((err) => {
         console.error(err);
         setLoading(false);
       });

  useEffect(() => {
    fetchNews();
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
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          📰 Smart Women Safety News
        </h2>

        {/* CATEGORY */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["safety", "crime", "empowerment"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                category === cat
                  ? "bg-pink-500 text-white"
                  : "bg-white text-gray-700"
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

        {/* NEWS */}
        {!loading &&
          articles.map((news, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-xl rounded-xl p-4 mb-4 shadow"
            >
              {/* IMAGE */}
              {news.image && (
                <img
                  src={news.image}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="font-semibold text-gray-800 mb-1">
                {news.title}
              </h3>

              {/* 🤖 AI SUMMARY */}
              <p className="text-sm text-gray-600 mb-2">
                {getSummary(news.description)}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => speak(news.title)}
                  className="bg-pink-500 text-white px-3 py-1 rounded text-xs"
                >
                  🔊 Listen
                </button>

                <a
                  href={news.url}
                  target="_blank"
                  className="text-pink-600 text-sm font-semibold"
                >
                  Read →
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default news;