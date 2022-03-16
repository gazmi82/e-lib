import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import useDraggableScroll from 'use-draggable-scroll';
import { ReactComponent as XIcon } from '../../assets/svgIcons/x-icon.svg';
import { ReactComponent as ArrowIcon } from '../../assets/svgIcons/arrow-next.svg';
import { ReactComponent as ZoomIn } from '../../assets/svgIcons/zoom-in.svg';
import { ReactComponent as ZoomOut } from '../../assets/svgIcons/zoom-out.svg';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

interface ToolbarSlotsExampleProps {
  fileUrl?: string;
  setModal?: any;
  pageNumber: number;
  setPageNumber: (e: any) => void;
  handleProgresUpdate: () => void;
  isFavorite?: boolean;
}

const PDFFrame: React.FC<ToolbarSlotsExampleProps> = ({
  pageNumber,
  setPageNumber,
  handleProgresUpdate,
  fileUrl,
  setModal,
  isFavorite,
}) => {
  const ref = useRef(null);
  const tooltip = useRef(null);
  const range = useRef(null);
  const pageInput = useRef(null);

  const [numPages, setNumPages] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [scale, setScale] = useState(1.2);
  const { onMouseDown } = useDraggableScroll(ref);
  const { innerWidth: width, innerHeight: height } = window;

  useEffect(() => {
    setScale(1.2);
  }, [pageNumber]);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const handleScale = (type: string) => {
    if (type === 'zoomIn') {
      scale < 2.6 && setScale(scale + 0.2);
    } else if (type === 'zoomOut') {
      scale > 0.6 && setScale(scale - 0.2);
    }
  };

  const handlePage = (type: string) => {
    const pageNode: any = pageInput.current;
    if (type === 'next') {
      pageNumber < numPages && setPageNumber(pageNumber + 1);

      pageNode.value = pageNumber + 1;
    } else if (type === 'previous') {
      pageNumber > 1 && setPageNumber(pageNumber - 1);
      pageNode.value = pageNumber - 1;
    }
  };

  const handlePageSwipe = (end: number) => {
    if (width - touchStart < 30 || touchStart < 30) {
      const dif = touchStart - end;
      if (dif > 0) {
        dif > 25 && handlePage('next');
      } else {
        dif * -1 > 25 && handlePage('previous');
      }
    }
  };

  const handlePageInput = (e: number) => {
    if (e >= 0 && e <= numPages) {
      e === 0 ? setPageNumber(1) : setPageNumber(e);
    }
  };

  const debounceBookSearch = debounce(handlePageInput, 500);

  const handleMouseTooltip = (e: any) => {
    const x = e.clientX;
    const y = e.clientY;
    const node: any = tooltip.current;
    if (range.current) {
      node.style.left = x - 20 + 'px';
      node.style.top = y + 20 + 'px';
    }
  };

  return (
    <div className="PDF-modal-contaiener">
      <button className="next-page" onClick={() => handlePage('next')}>
        <ArrowIcon fill="white" />
      </button>
      <button className="previous-page" onClick={() => handlePage('previous')}>
        <ArrowIcon fill="white" />
      </button>
      <div className="nav-tools">
        <div onClick={() => handleScale('zoomOut')}>
          <ZoomOut />
        </div>

        <div id="myRange" ref={range} onMouseMove={e => handleMouseTooltip(e)}>
          <input
            style={{ width: '100px' }}
            data-tooltip-container
            data-tooltip-label="I'm A Tooltip"
            value={scale * 10}
            type="range"
            min="6"
            max="26"
            onChange={e => {
              setScale(Number(e.target.value) / 10);
            }}
          />{' '}
          <div id="tooltip" ref={tooltip}>
            <span>{Math.round(scale * 100)} %</span>
          </div>
        </div>
        <div onClick={() => handleScale('zoomIn')}>
          <ZoomIn />
        </div>
        <p>
          Faqja
          <input
            defaultValue={pageNumber}
            style={{ width: '25px', maxWidth: '50px', margin: '0 8px' }}
            type="number"
            ref={pageInput}
            max={numPages}
            onChange={e => debounceBookSearch(Number(e.target.value))}
          />
          nga {numPages}
        </p>
        <span
          className="close-icon"
          onClick={() => {
            if (isFavorite) {
              handleProgresUpdate();
            }
            setModal(false);
          }}
        >
          <XIcon fill="white" />
        </span>
      </div>
      <Document
        className="custom-document-container"
        onLoadSuccess={onDocumentLoadSuccess}
        file={fileUrl}
      >
        <div
          className="custom-page-container"
          ref={ref}
          onMouseDown={onMouseDown}
          onTouchStart={touchStartEvent =>
            setTouchStart(touchStartEvent.targetTouches[0].pageX)
          }
          onTouchEnd={e =>
            handlePageSwipe(e.nativeEvent.changedTouches[0].pageX)
          }
        >
          <Page scale={scale} pageNumber={pageNumber} />
        </div>
      </Document>
    </div>
  );
};
export default PDFFrame;
