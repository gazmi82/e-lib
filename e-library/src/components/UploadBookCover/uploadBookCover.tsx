import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ReactComponent as EditSvg } from '../../assets/svgIcons/edit-svg.svg';
import { updateBookImage } from '../../redux/slices/Books/booksSlice';
import { EditWindow } from '../EditWindow';

interface UploadBookCoverProps {
  name: string;
  disabled?: boolean;
  image?: undefined | string;
}

export const UploadBookCover: React.FunctionComponent<UploadBookCoverProps> = ({
  name,
  disabled,
  image,
}) => {
  const { setValue } = useFormContext();
  const [coverImage, setCoverImage] = useState(image);
  const [isModifying, setIsModifying] = useState(false);
  const [coverChanged, setCoverChanged] = useState(false);
  const [tempImage, setTempImage] = useState<string>();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname === `/manage/edit-books/${id}`) {
      setIsModifying(true);
    }
  }, []);
  const showCoverImage = async (e: any) => {
    if (isModifying && e.target.files[0]) {
      setCoverChanged(true);
      setTempImage(URL.createObjectURL(e.target.files[0]));
      setValue(name, e.target.files[0]);
    } else if (e.target.files[0]) {
      setCoverImage(URL.createObjectURL(e.target.files[0]));
      setValue(name, e.target.files[0]);
    }
  };
  const { getValues } = useFormContext();
  const modifiedFile = getValues(name);

  const updateImage = (e: any) => {
    if (modifiedFile) {
      setCoverImage(tempImage);
      dispatch(updateBookImage({ data: modifiedFile, id: Number(id) }));
      setCoverChanged(false);
    }
  };
  return (
    <div className="cover-image">
      <label
        className="custom-file-upload-image"
        style={
          coverImage
            ? {
                backgroundImage: `url("${coverImage}")`,
                backgroundPosition: '50% ',
                backgroundSize: 'contain',
              }
            : {}
        }
      >
        <input
          onChange={showCoverImage}
          name={name}
          disabled={disabled}
          type="file"
          accept=".png,.jpeg"
        />
        <EditSvg className="svg-icon" />
        <p className="cover-text"> Kliko per te ngarkuar nje imazh</p>
      </label>
      {coverChanged && (
        <div>
          <EditWindow
            toggle={setCoverChanged}
            updateFile={updateImage}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};
