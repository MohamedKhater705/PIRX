import Dropdown from "../ui/Dropdown";
interface filterBarProps {
  category: string;
  setCategory: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
}
export default function FilterBar({
  category,
  setCategory,
  sort,
  setSort,
}: filterBarProps) {
  return (
    <div className="flex  hidden px-15 justify-between  items-center px-10 py-6 mb-1 border-y border-gray-300 lg:flex">
      <div className="flex gap-12 ">
        <span className="shrink-0 font-bold self-center text-4xl ">
          Category:
        </span>

        {[
          "Discover",
          "Electronics",
          "Men's Clothing",
          "jewelery",
          "women's clothing",
        ].map((cate) => (
          <button
            key={cate}
            onClick={() => setCategory(cate)}
            className={`shrink-0 px-5 py-3 rounded-4xl text-1xl hover:bg-gray-200 hover:text-gray-800 focus:bg-gray-300 transition cursor-pointer ${
              category === cate ? "bg-gray-300" : "bg-white"
            }`}>
            {cate}
          </button>
        ))}
      </div>

      <Dropdown
        label="Sort by"
        options={["Popularity", "Price: Low to High", "Price: High to Low"]}
        value={sort}
        onChange={setSort}
      />
      {/* <Dropdown
        label="Filter"
        options={["All", "Clothing and jewelries", "Electronics"]}
        value={filter}
        onChange={setFilter}
      /> */}
    </div>
  );
}
