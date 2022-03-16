import React, { useEffect, useState } from 'react';
import InputFormItem from '../../components/InputFormItem';
import TextAreaFormItem from '../../components/TextAreaFormItem';
import UploadBookCover from '../../components/UploadBookCover';
import UploadBook from '../../components/UploadBookMaterials';
import { ReactComponent as BackArrowSvg } from '../../assets/svgIcons/back-arrow-svg.svg';
import NewBookForm from '../../components/NewBookForm';
import * as yup from 'yup';
import SingleSelectFormItem from '../../components/SingleSelectFormItem';
import MultiSelectFormItem from '../../components/MultiSelectFormItem';
import {
  bookCategoryOptions,
  magazineCategoryOptions,
  fieldOptions,
  typeOptions,
} from '../../components/SelectOptions/selectFieldOptions';
import createBookDataTransformer from '../../helpers/crateBook/createCourseDataTransformer';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBooks,
  selectLoading,
} from '../../redux/slices/Books/booksSlice';
import {
  selectAuthors,
  fetchAuthors,
} from '../../redux/slices/Authors/authorsSlice';
import authorsDataTransformer from '../../helpers/crateBook/authorsDataTransformer';
import { useNavigate } from 'react-router';
import { CheckBoxItem } from '../../components/CheckBoxInput';

interface SelectOptionsProps {
  id?: any;
  value?: string;
  label?: string;
}
// interface CreateBooksProps {}

export const CreateBooks: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAuthors(''));
  }, []);

  const authors = useSelector(selectAuthors);

  const schema = yup.object().shape({
    emri: yup
      .string()
      .max(250)
      .nullable()
      .required('Vendosni titullin e librit'),
    pershkrimi: yup
      .string()
      .nullable()
      .required('Vendosni pershkrimin e librit'),
    autoreTeLibrave: yup.array().nullable().required('Vendosni autoret'),
    lloji: yup.string().nullable().required('Vendosni Llojin'),
    kategoriaList: yup.array().nullable().required('Vendosni kategorin'),
    fushaList: yup.array().nullable().required('Vendosni Fushen'),
    dataPublikimit: yup
      .date()
      .nullable()
      .min('1900-01-01', 'Kontrolloni daten e publikimit')
      .max(new Date(), 'Kontrolloni daten e publikimit')
      .required('Vendosni Daten'),
    nrFaqeve: yup.string().nullable().required('Vendosni Nr e Faqeve'),
    kodiISBN: yup.string().nullable().required('Vendosni Kodin ISBN'),
    cmimi: yup.string().nullable().required('Vendosni Cmimin'),
    mePagese: yup.boolean().nullable(),
    file: yup.mixed().required('Ngarkoni librin ne formatin PDF'),
    image: yup.mixed(),
  });

  const [initalValues] = useState(() => {
    return {
      image: null,
      emri: null,
      pershkrimi: null,
      autoreTeLibrave: null,
      kategoriaList: null,
      fushaList: null,
      lloji: null,
      dataPublikimit: null,
      nrFaqeve: null,
      cmimi: null,
      mePagese: false,
      kodiISBN: null,
      file: null,
    };
  });
  const onHandleSuccess = (data: any) => {
    const transformedData = createBookDataTransformer(data);
    dispatch(createBooks(transformedData));
  };
  const onHandleError = () => {
    console.log('Error occured while adding a new book!');
  };

  const [bookType, setBookType] = useState(null);
  const [kategoriValue, setKategoriValue] = useState(null);
  const [kategoriaList, setKategoriaList] =
    useState<Array<SelectOptionsProps>>();
  useEffect(() => {
    setKategoriValue(null);
    if (bookType === 'LIBER') {
      setKategoriaList(bookCategoryOptions);
    } else {
      setKategoriaList(magazineCategoryOptions);
    }
  }, [bookType]);

  return (
    <NewBookForm
      schema={schema}
      initialValues={initalValues}
      onHandleSuccess={onHandleSuccess}
      onHandleError={onHandleError}
    >
      <main className="create-books-main">
        <div className="title">
          <BackArrowSvg
            className="back-arrow"
            onClick={() => navigate(-1)}
            fill="#3f78e0"
          />
          <h2>Shto liber te ri</h2>
        </div>
        <div className="wrapper">
          <div className="container">
            <UploadBookCover name="image" />
            <InputFormItem name="emri" label="Emri" placeholder="Emri" />
            <TextAreaFormItem
              name="pershkrimi"
              label="Pershkrimi"
              placeholder="Pershkrimi"
            />
            <MultiSelectFormItem
              name="autoreTeLibrave"
              label="Autori"
              placeholder="Autori"
              options={authorsDataTransformer(authors.authors)}
            />
            <div className="row-space-between">
              <SingleSelectFormItem
                name="lloji"
                placeholder="Lloji i librit"
                options={typeOptions}
                onChange={(e: any) => setBookType(e.value)}
              />
              <MultiSelectFormItem
                name="kategoriaList"
                placeholder="Kategori"
                disabled={bookType === null}
                options={kategoriaList}
                selectValue={kategoriValue}
                onChange={(e: any) => {
                  setKategoriValue(e);
                }}
              />
            </div>
            <div className="row-space-between">
              <MultiSelectFormItem
                name="fushaList"
                placeholder="Fusha"
                options={fieldOptions}
              />
              <InputFormItem
                name="kodiISBN"
                label="Kodi ISBN"
                placeholder="Kodi ISBN"
                className="two-inputs"
              />
            </div>
            <div className="row-space-between">
              <InputFormItem
                name="dataPublikimit"
                label="Data e publikimit"
                placeholder="Data e publikimit"
                type="date"
                className="two-inputs"
              />
              <InputFormItem
                name="nrFaqeve"
                label="Numri i faqeve"
                placeholder="Numri i faqeve"
                type="number"
                className="two-inputs"
              />
            </div>
            <div className="row-space-between">
              <InputFormItem
                name="cmimi"
                label="Çmimi"
                placeholder="Çmimi"
                type="number"
                className="two-inputs"
              />
              <CheckBoxItem
                name="mePagese"
                label="Me Pagese"
                className="two-inputs"
              />
            </div>
            <UploadBook name="file" />
            <button type="submit" className="btn-primary">
              Ruaj Librin
            </button>
          </div>
        </div>
      </main>
    </NewBookForm>
  );
};
