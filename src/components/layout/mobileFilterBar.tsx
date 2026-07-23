import Dropdown from "../ui/DropdownM";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearch } from "@/store/useSearch";
interface filterBarProps {
  category: string;
  setCategory: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
}
export default function MobileFilterBar({
  category,
  setCategory,
  sort,
  setSort,
}: filterBarProps) {
  const { query, setQuery } = useSearch();
  return (
    <div className="flex  flex-col justify-between  gap-5 items-center px-10 py-6 mb-1 border-y border-gray-300 lg:hidden">
      <div className="flex gap-12 my-5 items-center flex-nowrap overflow-x-auto scroll-smooth scrollbar-none max-w-full">
        {" "}
        <span className="shrink-0 font-bold  text-3xl">Category:</span>
        {[
          "Discover",
          "Electronics",
          "Men's Clothing",
          "jewelery",
          "women's clothing",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-5 py-3 rounded-4xl text-1xl hover:bg-gray-200 hover:text-gray-800 focus:bg-gray-300 transition cursor-pointer ${
              category === cat ? "bg-gray-300" : "bg-white"
            }`}>
            {cat}
          </button>
        ))}
      </div>
      <Dropdown
        label="Sort by"
        options={["Popularity", "Price: Low to High", "Price: High to Low"]}
        value={sort}
        onChange={setSort}
      />

      <form className="searchBar relative w-full ">
        <input
          aria-label="Search products"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-8 px-18 border-2 bg-white capitalize rounded-full pr-[11.2rem]"
          placeholder="Search Products..."
        />
        {/* <Button
          className="group/search cursor-pointer flex justify-center items-center rounded-full absolute right-1 top-1 active:scale-90 w-24 h-24 p-0 transition-all duration-300 hover:bg-gray-700"
          type="submit">
          <Search className="size-10 transition-transform duration-300 group-hover/search:scale-125 group-hover/search:rotate-12" />
        </Button> */}
      </form>
    </div>
  );
}
