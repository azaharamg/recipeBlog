import { useState, useMemo, useEffect, useRef } from "react";

type Recipe = {
  id: string;
  title: string;
  href: string;
  category: string;
  pubDate: string;
};

type RecipesSectionProps = {
  recipes: Recipe[];
  icon: string;
};

const icons: Record<string, React.ReactNode> = {
  kids: (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
      <path d="M9 10l.01 0"/>
      <path d="M15 10l.01 0"/>
      <path d="M9.5 15a3.5 3.5 0 0 0 5 0"/>
      <path d="M12 3a2 2 0 0 0 0 4"/>
    </svg>
  ),
  traditional: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
      <line x1="6" y1="17" x2="18" y2="17"/>
    </svg>
  ),
  desserts: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2a10 10 0 0 1 10 10c0 6.08-4.32 10.75-10 14a2 2 0 0 1-2 2c-1.15 0-2-.75-2-1.67V5.67a1.33 1.33 0 0 1 1.33-1.33h.67A1.33 1.33 0 0 1 12 2z"/>
      <path d="M9 12.5a3 3 0 1 0 6 0"/>
    </svg>
  ),
};

function RecipeCard({ title, href }: { title: string; href: string }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgError(false);
    img.onerror = () => setImgError(true);
    img.src = `/images/${title}.png`;
  }, [title]);

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <a href={href} className="block" aria-label={`Ver receta: ${title}`}>
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-terracotta)]/10 to-[var(--color-sage)]/10 flex items-center justify-center overflow-hidden relative">
          {!imgError && (
            <img
              className="recipe-img w-full h-full object-cover absolute inset-0"
              src={`/images/${title}.png`}
              alt=""
              loading="lazy"
            />
          )}
          {imgError && (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <svg className="w-16 h-16 text-[var(--color-terracotta)]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
                <line x1="6" y1="17" x2="18" y2="17"/>
              </svg>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-[var(--color-charcoal)] mb-1 group-hover:text-[var(--color-terracotta)] transition-colors">
            {title}
          </h3>
        </div>
      </a>
    </article>
  );
}

export default function RecipesSection({ recipes, icon }: RecipesSectionProps) {
  const [displayCount, setDisplayCount] = useState(10);
  const [search, setSearch] = useState("");
  const loaderRef = useRef<HTMLDivElement>(null);

  const filteredRecipes = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return recipes;
    return recipes.filter(r => r.title.toLowerCase().includes(query));
  }, [search, recipes]);

  const visibleRecipes = filteredRecipes.slice(0, displayCount);
  const hasMore = displayCount < filteredRecipes.length;

  useEffect(() => {
    if (!hasMore || !loaderRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayCount(prev => Math.min(prev + 10, filteredRecipes.length));
      }
    }, { threshold: 0.1 });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, filteredRecipes.length]);

  useEffect(() => {
    setDisplayCount(10);
  }, [search]);

  return (
    <div>
      <div className="relative mb-6 max-w-md mx-auto">
        <label htmlFor="recipe-search" className="sr-only">Buscar recetas</label>
        <input
          id="recipe-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar recetas..."
          className="w-full px-4 py-3 pl-12 rounded-full border border-[var(--color-charcoal)]/10 bg-white text-[var(--color-charcoal)] placeholder-[var(--color-warm-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta)]/50 focus:border-[var(--color-terracotta)] transition-all"
          aria-describedby="search-hint"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-warm-gray)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>

      <section aria-label="Resultados de recetas">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleRecipes.map((recipe) => (
            <li>
              <RecipeCard title={recipe.title} href={recipe.href} />
            </li>
          ))}
        </ul>

        {visibleRecipes.length === 0 && (
          <p className="text-center text-[var(--color-warm-gray)] py-8" role="status">No se encontraron recetas</p>
        )}

        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-8" aria-label="Cargando más recetas">
            <div className="w-8 h-8 border-2 border-[var(--color-terracotta)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </section>
    </div>
  );
}