import { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  count: number;
  fetchItems: () => void;
  children: ReactNode;
};

const InfiniteWrapper = ({ count, fetchItems, children }: Props) => {
  return (
    <InfiniteScroll
      scrollableTarget={'imageGrid'}
      dataLength={count}
      next={fetchItems}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteWrapper;
