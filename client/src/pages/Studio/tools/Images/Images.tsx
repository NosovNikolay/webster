import { Image, Link, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import NothingFound from '~/components/NothingFound';
import { unsplash } from '~/utils/unsplash-api';
import SearchForm from './SearchForm';
import { DEFAULT_IMG_QUERY, UNSPLASH_URL } from '~/consts/images';
import InfiniteWrapper from './InfiniteWrapper';

export type Photo = {
  id: string;
  urls: { large: string; regular: string; raw: string; small: string };
};

const Images = () => {
  const [images, setImages] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const fetchImages = async () => {
    try {
      const photos = await unsplash.search.getPhotos({ query: query || DEFAULT_IMG_QUERY, page });
      const result = photos.response?.results as Photo[] | [];
      setImages([...images, ...result]);
      query && setQuery('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (query) {
      setImages([]);
    }
    fetchImages();
  }, [query, page]);

  return (
    <VStack id="imageGrid" spacing={3} sx={{ p: 4, position: 'relative', h: '100%', overflowY: 'auto' }}>
      <VStack bgColor="gray.300" w="100%" spacing={3} sx={{ mt: '-4', py: '4', top: '-4', position: 'sticky' }}>
        <SearchForm setSearch={setQuery} />
        <Text>
          View more on{' '}
          <Link isExternal color="teal.500" as={RouterLink} to={UNSPLASH_URL}>
            Unsplash
          </Link>
        </Text>
      </VStack>
      {!images?.length ? (
        <NothingFound message="No images were found." />
      ) : (
        <>
          <InfiniteWrapper fetchItems={() => setPage((curr) => curr + 1)} count={images?.length || 10}>
            <SimpleGrid spacingY={4}>
              {images?.map((img, i) => (
                <Image key={i} src={img.urls.regular} />
              ))}
            </SimpleGrid>
          </InfiniteWrapper>
        </>
      )}
    </VStack>
  );
};

export default Images;
