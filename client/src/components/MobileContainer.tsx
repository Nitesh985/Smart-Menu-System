
interface MobileComponentProps{
    children: React.ReactNode;
    className?: string;
    size?: Number;
    mobile?: boolean;
}


export default function MobileContainer({children, className, size=6}:MobileComponentProps){
    return(
        <div className={`artboard phone-${size} ${className}`}>{children}</div>
    )
}