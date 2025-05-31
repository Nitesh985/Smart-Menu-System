import { useId, forwardRef } from "react"


interface InputProps{
    type?: React.HTMLInputTypeAttribute | undefined;
    label?: string;
    labelStyles?: string;
    inputStyles?: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}



const Input = forwardRef(
    function Input({label, type="text", labelStyles, placeholder, inputStyles, name, value, onChange, ...props}:InputProps, ref){
        const id = useId()
        return (
            <>
                <label className={`${labelStyles}`} htmlFor={id}>{label}</label>
                <input type={type} className={`input border ${inputStyles}`} name={name} value={value} onChange={onChange} id={id} placeholder={placeholder} ref={ref} {...props} />
            </>
        )
    }
)



export default Input;

