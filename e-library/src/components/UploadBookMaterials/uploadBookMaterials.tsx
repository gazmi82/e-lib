import React, { useEffect, useState } from 'react';
import { ReactComponent as UploadSvg } from '../../assets/svgIcons/upload-svg.svg';
import { ReactComponent as AttachFile } from '../../assets/svgIcons/attachment-sign-svg.svg';
import { ReactComponent as ErrorSvg } from '../../assets/svgIcons/error-svg.svg';
import DeleteWindow from '../DeleteWindow';
import { useFormContext } from 'react-hook-form';
import FormErrors from '../FormErrors';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { updateBookFile } from '../../redux/slices/Books/booksSlice';
import { EditWindow } from '../EditWindow';

interface UploadBookMaterialsProps {
  name: string;
  disabled?: boolean;
  fileName?: undefined | string;
}

export const UploadBookMaterials: React.FunctionComponent<
  UploadBookMaterialsProps
> = ({ name, disabled, fileName }) => {
  const {
    register,
    formState: { touchedFields, isSubmitted, errors },
    setValue,
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touchedFields,
    isSubmitted,
  );

  const [file, setFile] = useState<undefined | string>(fileName);
  const [isModifying, setIsModifying] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);
  const [temporaryFile, setTemporaryFile] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname === `/manage/edit-books/${id}`) {
      setIsModifying(true);
    }
  }, []);

  const fileUpload = (e: any) => {
    if (isModifying && file) {
      setTemporaryFile(e.target.files[0].name);
      setFileChanged(true);
      setValue(name, e.target.files[0]);
    } else {
      setFile(e.target.files[0].name);
      setValue(name, e.target.files[0]);
    }
  };
  const deleteFile = (e: any) => {
    if (file) {
      setFile(undefined);
      setValue(name, null);
    }
  };
  const { getValues } = useFormContext();
  const modifiedFile = getValues(name);

  const updateFile = (e: any) => {
    if (modifiedFile) {
      dispatch(updateBookFile({ data: modifiedFile, id: Number(id) }));
      setFile(temporaryFile);
      setFileChanged(false);
    }
  };

  return (
    <div className="row-space-between" style={{ position: 'relative' }}>
      <div className="row-stack">
        <label className="custom-file-upload">
          <input
            id={name}
            {...register(name)}
            disabled={disabled}
            onChange={e => fileUpload(e)}
            type="file"
            accept=".pdf"
          />
          {isModifying && file ? (
            <>
              <UploadSvg className="upload-svg-icon" />
              <span> Ndrysho Librin</span>
            </>
          ) : (
            <>
              <UploadSvg className="upload-svg-icon" />
              <span> Ngarko Librin</span>
            </>
          )}
        </label>
        <label className="custom-file-text">
          {file ? (
            <div className="uploaded-file">
              <AttachFile className="attach-svg-icon" />
              <span className="file-title">{file}</span>
            </div>
          ) : (
            ''
          )}
        </label>
      </div>
      {fileChanged && file && (
        <div>
          <EditWindow
            toggle={setFileChanged}
            updateFile={updateFile}
            disabled={disabled}
          />
        </div>
      )}
      {file && (
        <div>
          <DeleteWindow deleteFile={deleteFile} disabled={disabled} />
        </div>
      )}
      {!file && errorMessage && (
        <div className="custom-file-invalid row-stack">
          <ErrorSvg className="error-svg" />
          {name && errorMessage}
        </div>
      )}
    </div>
  );
};
