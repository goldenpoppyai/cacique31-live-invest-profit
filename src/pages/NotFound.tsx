import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Helpful diagnostic in logs for tracking broken links / UX issues
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <section className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops — we couldn't find the page you were looking for.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-5 py-2 rounded-md border border-transparent text-sm font-medium bg-white shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            aria-label="Go back to previous page"
          >
            Go back
          </button>

          <a
            href="./"
            className="inline-flex items-center justify-center px-5 py-2 rounded-md text-sm font-medium text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            aria-label="Return to home"
          >
            Return home
          </a>
        </div>
      </section>
    </main>
  );
};

export default NotFound;

