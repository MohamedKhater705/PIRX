export default function ProductCardSkeleton() {
  return (
    <div className="bg-gray-300 flex max-w-fit flex-col rounded-2xl   transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl active:scale-103 animate-pulse">
      <div className="min-w-120 md:min-w-120 h-110 bg-gray-400 rounded-2xl" />

      <div className="flex justify-between items-center my-8 px-8">
        <span className="flex flex-col gap-3">
          <div className="h-8 w-40 bg-gray-400 rounded" />
          <div className="h-8 w-28 bg-gray-400 rounded" />
          <div className="h-10 w-32 bg-gray-400 rounded mt-2" />
        </span>
        <div className="w-50 h-20 bg-gray-400 rounded-full shrink-0" />
      </div>
    </div>
  );
}
