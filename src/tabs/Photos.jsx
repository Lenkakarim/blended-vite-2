import Text from '../components/Text/Text';
import Form from '../components/Form/Form';
import { useEffect, useState } from 'react';
import { getPhotos } from '../apiService/photos';
import Loader from '../components/Loader/Loader';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Button from '../components/Button/Button';
import { ImageModal } from '../components/ImageModal/ImageModal';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = (src, alt) => {
    setModalIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc('');
    setModalAlt('');
  };
  useEffect(() => {
    if (!query) return;
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          return setIsEmpty(true);
        }
        setImages(prevImages => [...prevImages, ...photos]);
        setIsVisible(page < Math.ceil(total_results / per_page));
        console.log;
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, [page, query]);
  const onHandleSubmit = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(false);
    setIsEmpty(false);
    setIsVisible(false);
  };
  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {!error && !isEmpty && !images.length && (
        <Text textAlign="centre">Lets begin search</Text>
      )}
      {isLoading && <Loader />}
      {error && <Text textAlign="centre">Oops! Something went wrong..</Text>}
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openModal} />
      )}
      {isEmpty && <Text textAlign="centre">Sorry, we dont found images..</Text>}
      {isVisible && images.length > 0 && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
};

export default Photos;
