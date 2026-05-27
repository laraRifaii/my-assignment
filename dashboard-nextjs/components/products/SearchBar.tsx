type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <input
        type="text"
        placeholder="type to find products by id, name, or price..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-3 rounded-lg w-full"
      />

      <button className="bg-black text-white px-4 py-3 rounded-lg">
        Search
      </button>
    </div>
  );
}