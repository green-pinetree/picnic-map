import { CdsSearch, Input } from '@chwh/cds';

export default function Home() {
  return (
    <div>
      <Input leadingIcon={<CdsSearch />} />
    </div>
  );
}
