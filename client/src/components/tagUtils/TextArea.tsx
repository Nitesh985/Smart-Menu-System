interface TextAreaProps {
  value?: string;
  onChange?: (value: any) => void;
  name?: string;
  className?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  children?: React.ReactNode;
}

function TextArea({
  name,
  value,
  onChange,
  className,
  children,
  rows,
  cols,
  placeholder,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      className={`textarea text-[16px] ${className}`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      cols={cols}
      {...props}
    >
      {children}
    </textarea>
  );
}

export default TextArea;
