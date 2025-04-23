type Props = {
    value: string;
    onChange: (val: string) => void;
  };
  
  export default function SearchBar({ value, onChange }: Props) {
    return (
      <input
        type="text"
        placeholder="Search songs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded w-full"
      />
    );
  }
  