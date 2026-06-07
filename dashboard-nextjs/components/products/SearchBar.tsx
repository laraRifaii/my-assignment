import { IoMdSearch } from "react-icons/io";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-1 mb-6 border rounded-lg  ">
      <IoMdSearch size={24} className="text-gray-500 pl-1 ml-3 mr-2" />
      <input
        type="text"
        placeholder="type to find products by id, name, or price..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=" py-3 w-full hover:none focus:border-none outline-none active:border-none *:focus:ring-0"
      />
    </div>
  );
}