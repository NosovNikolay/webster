import { SearchIcon } from '@chakra-ui/icons';
import { FormControl, HStack, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type IFilter = {
  query: string;
};

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setQueryReset: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchForm = ({ setSearch, setQueryReset }: Props) => {
  const { register, handleSubmit } = useForm<IFilter>({});

  const submitHandler = (data: IFilter) => {
    data.query ? setSearch(data.query) : setQueryReset(true);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(submitHandler)}>
      <FormControl>
        <HStack>
          <InputGroup>
            <Input id="query" type="search" placeholder="Search photos" {...register('query')} />
          </InputGroup>
          <IconButton type="submit" aria-label="search-btn" icon={<SearchIcon />} />
        </HStack>
      </FormControl>
    </form>
  );
};

export default SearchForm;
