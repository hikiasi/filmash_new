export const CarCardSkeleton = () => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden shadow-lg p-6 md:p-8 animate-pulse">
      <div className="aspect-[16/10] bg-zinc-800 rounded-2xl mb-6"></div>
      <div className="h-4 bg-zinc-800 rounded w-1/3 mb-2"></div>
      <div className="h-8 bg-zinc-800 rounded w-2/3 mb-6"></div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="h-12 bg-zinc-800 rounded-2xl"></div>
        <div className="h-12 bg-zinc-800 rounded-2xl"></div>
      </div>
      <div className="h-6 bg-zinc-800 rounded w-1/2 mt-auto"></div>
    </div>
  );
};

export default CarCardSkeleton;
