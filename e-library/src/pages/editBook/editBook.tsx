import React, { useEffect, useState } from 'react';
import InputFormItem from '../../components/InputFormItem';
import TextAreaFormItem from '../../components/TextAreaFormItem';
import UploadBookCover from '../../components/UploadBookCover';
import UploadBook from '../../components/UploadBookMaterials';
import { ReactComponent as BackArrowSvg } from '../../assets/svgIcons/back-arrow-svg.svg';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';
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
  resetBooksState,
  updateBookData,
  deleteBook,
} from '../../redux/slices/Books/booksSlice';
import {
  selectAuthors,
  fetchAuthors,
} from '../../redux/slices/Authors/authorsSlice';
import authorsDataTransformer from '../../helpers/crateBook/authorsDataTransformer';
import { useNavigate, useParams } from 'react-router';
import {
  fetchSingleBook,
  selectSingleBook,
} from '../../redux/slices/Books/singleBookSlice';
import categoryDataTransformer from '../../helpers/crateBook/categoryDataTransformer';
import fieldDataTransformer from '../../helpers/crateBook/fieldDataTransformer';
import { CheckBoxItem } from '../../components/CheckBoxInput';
import DeleteWindow from '../../components/DeleteWindow';
interface SelectOptionsProps {
  id?: any;
  value?: string;
  label?: string;
}
interface EditBooksProps {
  children: any;
}

export const EditBooks: React.FunctionComponent<EditBooksProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  dispatch(resetBooksState());

  useEffect(() => {
    dispatch(fetchAuthors(''));
    dispatch(fetchSingleBook(id));
  }, []);

  const authors = useSelector(selectAuthors);
  const { singleBook, singleBookLoading } = useSelector(selectSingleBook);

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
    nrFaqeve: yup.number().nullable().required('Vendosni Nr e Faqeve'),
    kodiISBN: yup.string().nullable().required('Vendosni Kodin ISBN'),
    cmimi: yup.string().nullable().required('Vendosni Cmimin'),
    mePagese: yup.boolean().nullable(),
    file: yup.mixed().required('Ngarkoni librin ne formatin PDF'),
    image: yup.mixed(),
  });

  const [initalValues, setInitialValues] = useState<any>(null);
  const [bookType, setBookType] = useState<any>(null);

  useEffect(() => {
    if (singleBook) {
      setInitialValues({
        image: singleBook?.imgUrl,
        emri: singleBook?.emri,
        pershkrimi: singleBook?.pershkrimi,
        autoreTeLibrave: authorsDataTransformer(singleBook.autoreTeLibrave),
        kategoriaList: categoryDataTransformer(singleBook.kategoriaList),
        fushaList: fieldDataTransformer(singleBook.fushaList),
        lloji: singleBook?.lloji,
        dataPublikimit: singleBook?.dataPublikimit,
        nrFaqeve: singleBook?.nrFaqeve,
        kodiISBN: singleBook?.kodiISBN,
        cmimi: singleBook?.cmimi,
        mePagese: singleBook?.mePagese,
        file: singleBook?.fileUrl,
      });
    }
  }, [singleBook]);

  const onHandleSuccess = (data: any) => {
    const transformedData = createBookDataTransformer(data);
    dispatch(
      updateBookData({ data: transformedData.bookData, id: Number(id) }),
    );
  };
  const onHandleError = () => {
    console.log('Error occured while adding a new book!');
  };
  const handleDeleteBook = () => {
    dispatch(deleteBook(Number(id)));
    navigate(-1);
  };

  const [categoryOptions, setcategoryOptions] =
    useState<Array<SelectOptionsProps>>();

  useEffect(() => {
    if (initalValues) {
      if (initalValues.lloji === 'LIBER') {
        setcategoryOptions(bookCategoryOptions);
      } else if (initalValues.lloji === 'PERIODIK') {
        setcategoryOptions(magazineCategoryOptions);
      }
    }
  }, [initalValues]);

  return (
    <>
      {initalValues ? (
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
              <h2>Modifiko Libra</h2>
            </div>
            <div className="wrapper">
              <div className="container">
                <UploadBookCover name="image" image={singleBook?.imgUrl} />
                <InputFormItem
                  name="emri"
                  label="Emri"
                  placeholder="Emri"
                  value={initalValues.emri}
                />
                <TextAreaFormItem
                  name="pershkrimi"
                  label="Pershkrimi"
                  placeholder="Pershkrimi"
                  value={initalValues.pershkrimi}
                />
                <MultiSelectFormItem
                  name="autoreTeLibrave"
                  label="Autori"
                  placeholder="Autori"
                  selectValue={initalValues.autoreTeLibrave}
                  options={authorsDataTransformer(authors.authors)}
                  onChange={(e: any) => {
                    setInitialValues((oldInitialValues: any) => {
                      return {
                        ...oldInitialValues,
                        autoreTeLibrave: e,
                      };
                    });
                  }}
                />
                <div className="row-space-between">
                  <SingleSelectFormItem
                    name="lloji"
                    initialValue={initalValues.lloji}
                    placeholder="Lloji i librit"
                    options={typeOptions}
                    onChange={(e: any) => {
                      setInitialValues((oldInitialValues: any) => {
                        return {
                          ...oldInitialValues,
                          kategoriaList: null,
                          lloji: e.value,
                        };
                      });
                      setBookType(e.value);
                    }}
                  />
                  <MultiSelectFormItem
                    name="kategoriaList"
                    placeholder="Kategori"
                    selectValue={initalValues?.kategoriaList}
                    disabled={initalValues.lloji ? false : true}
                    options={categoryOptions && categoryOptions}
                    onChange={(e: any) => {
                      setInitialValues((oldInitialValues: any) => {
                        return {
                          ...oldInitialValues,
                          kategoriaList: e,
                        };
                      });
                    }}
                  />
                </div>
                <div className="row-space-between">
                  <MultiSelectFormItem
                    name="fushaList"
                    placeholder="Fusha"
                    selectValue={initalValues?.fushaList}
                    options={fieldOptions}
                    onChange={(e: any) => {
                      setInitialValues((oldInitialValues: any) => {
                        return {
                          ...oldInitialValues,
                          fushaList: e,
                        };
                      });
                    }}
                  />
                  <InputFormItem
                    name="kodiISBN"
                    label="Kodi ISBN"
                    placeholder="Kodi ISBN"
                    className="two-inputs"
                    value={initalValues.kodiISBN}
                  />
                </div>
                <div className="row-space-between">
                  <InputFormItem
                    name="dataPublikimit"
                    label="Data e publikimit"
                    placeholder="Data e publikimit"
                    type="date"
                    className="two-inputs"
                    value={initalValues.dataPublikimit}
                  />
                  <InputFormItem
                    name="nrFaqeve"
                    label="Numri i faqeve"
                    placeholder="Numri i faqeve"
                    type="number"
                    className="two-inputs"
                    value={initalValues.nrFaqeve}
                  />
                </div>
                <div className="row-space-between">
                  <InputFormItem
                    name="cmimi"
                    label="Çmimi"
                    placeholder="Çmimi"
                    type="number"
                    className="two-inputs"
                    value={initalValues.cmimi}
                  />
                  <CheckBoxItem
                    name="mePagese"
                    label="Me Pagese"
                    className="two-inputs"
                    checked={initalValues.mePagese}
                  />
                </div>

                <UploadBook name="file" fileName={singleBook?.filename} />
                <div className="row-stack">
                  <button type="submit" className="btn-primary">
                    Ruaj Librin
                  </button>
                  <DeleteWindow deleteBook={handleDeleteBook} />
                </div>
              </div>
            </div>
          </main>
        </NewBookForm>
      ) : (
        <div className="loader">
          <Spinner className="spinner load-spin" />
        </div>
      )}
    </>
  );
};
