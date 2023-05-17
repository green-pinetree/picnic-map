import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import SearchBar from '@/components/common/SearchBar';

export default function Home() {
  return (
    <div>
      <SearchBar />
      <Button label="search" size="middle">
        검색
      </Button>
      <Badge>배지</Badge>
      <div style={{ fontFamily: 'ImcreSoojin' }}>dddd</div>
    </div>
  );
}
