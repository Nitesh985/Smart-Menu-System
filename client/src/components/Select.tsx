

interface SelectProps{
    children?: React.ReactNode;
    className?: string;
    options: Array<string>;
    value?: string;
    name?: string;
    onChange?: (event: React.FormEvent<HTMLSelectElement>) => void;
    optionStyles?: string;
}


function Select({options=[], children, optionStyles, className, name, value, onChange, ...props}:SelectProps) {
  return (
    <select className={`select select-primary w-full ${className}`}
        name={name} value={value} onChange={onChange} {...props}
    >
      {children && <option disabled selected>
        {children}
      </option>}
      {options.length>0 && options.map((option) => (
        <option key={option} className={optionStyles} value={option}>
          {option[0].toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
  );
}

export default Select;
