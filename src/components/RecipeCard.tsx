import { useState, useEffect } from "react";

export default function RecipeCard({ title, href, category }: { title: string; href: string; category?: string }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgError(false);
    img.onerror = () => setImgError(true);
    img.src = `/images/${title}.png`;
  }, [title]);

  const categoryLabels: Record<string, string> = {
    kids: "Infantil",
    traditional: "Tradicional",
    desserts: "Postre",
  };

  const categoryColors: Record<string, string> = {
    kids: "bg-green-700 text-white",
    traditional: "bg-amber-700 text-white",
    desserts: "bg-rose-700 text-white",
  };

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-[var(--color-charcoal)]/10">
      <a href={href} className="block" aria-label={`Ver receta: ${title}`}>
        <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-terracotta)]/20 to-[var(--color-sage)]/20 flex items-center justify-center overflow-hidden relative">
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
              <svg className="w-16 h-16 text-[var(--color-terracotta)]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
                <line x1="6" y1="17" x2="18" y2="17"/>
              </svg>
            </div>
          )}
          {category && (
            <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${categoryColors[category] || ""}`} aria-label={`Categoría: ${categoryLabels[category]}`}>
              {categoryLabels[category] || category}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-[var(--color-charcoal)] mb-1 group-hover:text-[var(--color-terracotta)] transition-colors">
            {title}
          </h3>
        </div>
      </a>
    </article>
  );
}