import { Link } from "react-router-dom";

const Navbar = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "SafeHer – Women Safety App",
        text: "SafeHer is a women safety app with live alerts, maps, and unsafe zone prediction.",
        url: window.location.origin,
      });
    } else {
      alert("Sharing not supported. Please copy the link manually.");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-pink-500 text-white">
      <h1 className="font-bold text-lg">SafeHer</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/news">News</Link>
        <Link to="/map">Map</Link>
        <Link to="/about">About</Link>

        <button
          onClick={handleShare}
          className="bg-white text-pink-500 px-3 py-1 rounded"
        >
          Share App
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


