export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-[999]">
      <div className="relative size-20">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
