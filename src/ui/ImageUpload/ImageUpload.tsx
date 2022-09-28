// Image upload component

import "./ImageUpload.scss";

interface ImageUploadProps {
  src: string;
  onChange: any;
}

const ImageUpload = (props: ImageUploadProps) => {
  const { src, onChange } = props;

  return (
    <>
      <div className="image-upload">
        <label htmlFor="photo-upload" className="image-upload__image">
          <div className="image-upload__preview">
            <img src={src} />
          </div>
          <input
            className="image-upload__input"
            accept="image/png,image/jpeg"
            id="photo-upload"
            type="file"
            onChange={onChange}
          />
        </label>
      </div>
    </>
  );
};

export default ImageUpload;
