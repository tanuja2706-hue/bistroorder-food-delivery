import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { FEATURED_COLLECTIONS } from '../data/mockData';

interface FeaturedCollectionsProps {
  onSelectCollection: (collectionId: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectCollection,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs uppercase font-extrabold tracking-wider text-[#C04E26] mb-1">
            Curated For You
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight font-display">
            Featured Collections
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURED_COLLECTIONS.map((col) => (
          <div
            key={col.id}
            onClick={() => onSelectCollection(col.id)}
            className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300 border border-[#EAE6DF] flex flex-col justify-end p-6 sm:p-7"
          >
            {/* Background Image */}
            <img
              src={col.imageUrl}
              alt={col.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark & warm scrim gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/60 to-transparent" />

            {/* Tag Badge */}
            <div className="relative z-10 mb-auto">
              <span className="inline-block bg-white/90 backdrop-blur-xs text-[#1C1917] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {col.tag}
              </span>
            </div>

            {/* Content info */}
            <div className="relative z-10 text-white space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-orange-200 transition-colors font-display">
                  {col.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#C04E26] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 leading-relaxed">
                {col.description}
              </p>

              <div className="pt-2 text-[11px] font-semibold text-orange-300">
                {col.dishCount}+ Handcrafted Dishes
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
