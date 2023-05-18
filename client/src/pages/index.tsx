import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import SearchBar from '@/components/common/SearchBar';

export default function Home() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px' }}>
        <SearchBar />
        <Button label="search" size="middle">
          검색
        </Button>
      </div>
      <Badge>배지</Badge>
    </div>
  );
}
