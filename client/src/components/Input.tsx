import { useId } from "react"

interface InputProps {
    label: string;
    labelStyles?: string;
    inputStyles?: string;
    name: string;
    value: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}


function Input({label, labelStyles, inputStyles, name, value, onChange, ...props}:InputProps){
    const id = useId()
    return (
        <>
            <label className={`${labelStyles}`} htmlFor={id}>{label}</label>
            <input className={`input ${inputStyles}`} name={name} value={value} onChange={onChange} id={id} {...props} />
        </>
    )
}

export default Input;

