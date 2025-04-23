type Props = {
    value: string;
    onChange: (val: string) => void;
    options: string[];
  };
  
  export default function FilterDropdown({ value, onChange, options }: Props) {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)} className="p-2 border rounded">
        <option value="">All Types</option>
        {options.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    );
  }
  