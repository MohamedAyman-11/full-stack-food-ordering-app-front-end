import { Camera, X } from 'lucide-react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Button } from './button';
import { FieldError } from './field';
type Errors = {
  categoryName: string;
  categoryImage: string;
};

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  defaultImage?: string;
  setErrors?: Dispatch<SetStateAction<Errors>>;
  showDeleteOption?: boolean;
  error: string;
}
const ImageInput = ({ setFile, file, defaultImage, setErrors, showDeleteOption = false, error }: Props) => {
  const [preview, setPreview] = useState<string>();
  useEffect(() => {
    if (!file) {
      setPreview(defaultImage);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, defaultImage]);
  return (
    <div className="flex items-center flex-col justify-center gap-4">
      <label
        className="group w-40 h-40 relative z-30 rounded-full cursor-pointer mx-auto border border-border"
        htmlFor="file-input"
      >
        {showDeleteOption && preview && (
          <Button
            onClick={() => {
              setPreview('');
              setFile(null);
            }}
            className="absolute top-2 right-1  bg-white text-destructive z-45 rounded-full p-0 size-7 shadow-2xl hover:bg-white/90 cursor-pointer"
          >
            <X className="stroke-3" />
          </Button>
        )}
        {preview && <img src={preview} alt="Image" className="w-full h-full rounded-full object-cover" />}
        <input
          type="file"
          name="file-input"
          id="file-input"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            if (e.target.files?.[0]) {
              setErrors && setErrors((prev) => ({ ...prev, categoryImage: '' }));
            }
          }}
        />
        <span
          className={`${!preview ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-all duration-500 absolute top-0 left-0 w-full
        h-full rounded-full z-40 bg-gray-200/30 flex items-center justify-center`}
        >
          <Camera className="w-8 h-8 text-black/60 " />
        </span>
      </label>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default ImageInput;
