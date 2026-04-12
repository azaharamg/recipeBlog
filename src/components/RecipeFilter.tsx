import { useState, useMemo } from "react";

type Recipe = {
  id: string;
  title: string;
  href: string;
  category: string;
};

type RecipeCardProps = {
  title: string;
  href: string;
  description?: string;
};

function RecipeCard({ title, href }: RecipeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <a href={href} className="block">
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-terracotta)]/10 to-[var(--color-sage)]/10 flex items-center justify-center overflow-hidden relative">
          {!imgError ? (
            <img
              className="recipe-img w-full h-full object-cover absolute inset-0"
              src={`/images/${title}.png`}
              alt={title}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : null}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-terracotta)]/10 to-[var(--color-sage)]/10"
            style={{ display: imgError ? "flex" : "none" }}
          >
            <svg className="w-16 h-16 text-[var(--color-terracotta)]/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
              <line x1="6" y1="17" x2="18" y2="17"/>
            </svg>
          </div>
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

export default function RecipeFilter({ 
  kidsRecipes, 
  adultRecipes 
}: { 
  kidsRecipes: Recipe[];
  adultRecipes: Recipe[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | "kids">("all");

  const filteredKids = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return kidsRecipes;
    return kidsRecipes.filter(r => r.title.toLowerCase().includes(query));
  }, [search, kidsRecipes]);

  const filteredAdults = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return adultRecipes;
    return adultRecipes.filter(r => r.title.toLowerCase().includes(query));
  }, [search, adultRecipes]);

  const showKids = category === "all" || category === "kids";
  const showAdults = category === "all";

  return (
    <div>
      <div className="mt-6 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar recetas..."
            className="w-full px-4 py-3 pl-12 rounded-full border border-[var(--color-charcoal)]/10 bg-white/80 text-[var(--color-charcoal)] placeholder-[var(--color-warm-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta)]/50 focus:border-[var(--color-terracotta)] transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-warm-gray)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </div>
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === "all"
                ? "bg-[var(--color-terracotta)] text-white"
                : "bg-white text-[var(--color-charcoal)] border border-[var(--color-charcoal)]/20 hover:bg-[var(--color-terracotta)]/20 hover:text-[var(--color-terracotta)]"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setCategory("kids")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === "kids"
                ? "bg-[var(--color-terracotta)] text-white"
                : "bg-white text-[var(--color-charcoal)] border border-[var(--color-charcoal)]/20 hover:bg-[var(--color-terracotta)]/20 hover:text-[var(--color-terracotta)]"
            }`}
          >
            Infantiles
          </button>
        </div>
      </div>

      {showKids && filteredKids.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--color-sage)] mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
              <path d="M9 10l.01 0"/>
              <path d="M15 10l.01 0"/>
              <path d="M9.5 15a3.5 3.5 0 0 0 5 0"/>
              <path d="M12 3a2 2 0 0 0 0 4"/>
            </svg>
            Recetas infantiles
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKids.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard title={recipe.title} href={recipe.href} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {showAdults && filteredAdults.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[var(--color-sage)] mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
              <line x1="6" y1="17" x2="18" y2="17"/>
            </svg>
            Recetas para todos
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdults.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard title={recipe.title} href={recipe.href} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {(filteredKids.length === 0 || !showKids) && (filteredAdults.length === 0 || !showAdults) && (
        <div className="text-center py-12">
          <p className="text-[var(--color-warm-gray)] text-lg">No se encontraron recetas</p>
        </div>
      )}
    </div>
  );
}