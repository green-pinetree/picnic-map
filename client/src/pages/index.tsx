import SearchBar from '@/components/common/SearchBar';
import { Button } from '@chwh/cds';
import { css } from '@emotion/react';

export default function Home() {
  return (
    <div>
      <SearchBar />
      <Button
        css={css`
          width: 300px;
        `}
      >
        click
      </Button>
    </div>
  );
}
