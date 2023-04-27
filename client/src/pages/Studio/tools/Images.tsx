import { Image, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NothingFound from '~/components/NothingFound';
import { unsplash } from '~/utils/unsplash-api';

type Photo = {
  id: string;
  urls: { large: string; regular: string; raw: string; small: string };
};

const Images = () => {
  const [images, setImages] = useState<Photo[] | undefined>([]);

  useEffect(() => {
    unsplash.search.getPhotos({ query: 'design' }).then((photos) => {
      setImages(photos.response?.results as Photo[] | undefined);
    });
  }, []);

  return (
    <SimpleGrid spacingY={4}>
      {!images?.length ? (
        <NothingFound message="No images were found." />
      ) : (
        images?.map((img) => <Image key={img.id} src={img.urls.regular} />)
      )}
    </SimpleGrid>
  );
};

export default Images;
