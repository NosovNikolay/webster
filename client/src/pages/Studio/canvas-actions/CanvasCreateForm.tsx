import { VStack, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useRequestHandler from '~/hooks/use-request-handler';
import { useCreateCanvasMutation } from '~/store/slices/canvas-slice';
import { ICanvasPayload } from '~/types/canvas';
import { ICreate, createSchema } from '~/validation/canvas';

const CanvasCreateForm = () => {
  const [create, { isLoading }] = useCreateCanvasMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreate>({
    resolver: zodResolver(createSchema),
  });

  const { handler: createHandler } = useRequestHandler<ICanvasPayload>({
    f: create,
  });

  const onSubmit = async (data: ICreate) => {
    await createHandler({ ...data, content: '""' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="4">
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" placeholder="name" {...register('name')} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input id="description" placeholder="description" {...register('description')} />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" w="200px" colorScheme="pink" isLoading={isLoading}>
          Create
        </Button>
      </VStack>
    </form>
  );
};

export default CanvasCreateForm;
