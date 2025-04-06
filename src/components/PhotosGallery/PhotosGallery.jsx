import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';

const PhotosGallery = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(image => {
        return (
          <GridItem key={image.id}>
            {' '}
            <PhotosGalleryItem
              openModal={openModal}
              src={image.src}
              alt={image.alt}
              avg_color={image.avg_color}
            />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default PhotosGallery;
