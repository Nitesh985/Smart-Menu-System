
interface ImageProps{
    imageUrl: string;
    alt?: string;
    containerStyles?: string;
    className?: string;
}


function Image({imageUrl, alt="image", containerStyles, className}:ImageProps) {
  return (
    <div className={`avatar ${containerStyles}`}>
      <div className={`mask mask-squircle w-12 ${className}`}>
        <img src={imageUrl} alt={alt} />
      </div>
    </div>
  );
}

export default Image;
