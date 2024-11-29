interface ButtonProps{
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    onClick?: (event: Event) => void;
    className?: string;
}

function Button({type="button", className, children, ...props}:ButtonProps){
    return (
        <button type={type} className={`btn btn-secondary rounded-full ${className}`} {...props} >
            {children}
        </button>
    )
}

export default Button;