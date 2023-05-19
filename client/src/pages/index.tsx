import Header from '@/components/common/Header';
import DesktopSection from '@/components/DesktopSection';
import MobileSection from '@/components/MobileSection';
import SideBar from '@/components/SideBar';

export default function Home() {
  return (
    <div>
      <div className="mobile-layout">
        <Header mobile />
        <MobileSection />
      </div>
      <div className="desktop-layout">
        <SideBar />
        <DesktopSection />
      </div>
    </div>
  );
}
