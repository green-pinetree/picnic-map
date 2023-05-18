import PlaceInfo from '@/components/common/PlaceInfo';
import SideBar from '@/components/SideBar';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SideBar />
      <PlaceInfo imgSrc="/dummyimg.png" name="서울숲" address="설명설명" description="설명설명" />
      <PlaceInfo imgSrc="/dummyimg.png" name="서울숲" address="설명설명" description="설명설명" />
    </div>
  );
}
