interface SelectProps{
    children?: React.ReactNode;
    className?: string;
    options: Array<string>;
    value?: string;
    name?: string;
    onChange?: (event: React.FormEvent<HTMLSelectElement>) => void;
}


function Select({options, children, className, name, value, onChange, ...props}:SelectProps) {
  return (
    <select className={`select select-primary w-full max-w-xs ${className}`}
        name={name} value={value} onChange={onChange} {...props}
    >
      {children && <option disabled selected>
        {children}
      </option>}
      {options.map((option) => (
        <option key={option} value={option}>
          {option[0].toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default Select;
