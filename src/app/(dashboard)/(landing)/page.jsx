import Headline from '@/components/Dashboard/Landing/Headline';
import TopNews from '@/components/Dashboard/Landing/TopNews';
import ViralPosts from '@/components/Dashboard/Landing/ViralPosts';
import Divider from '@/components/Dashboard/Landing/Divider';

export default function LandingPage() {
  return (
    <>
      <Headline />
      <Divider />
      <TopNews />
      <Divider />
      <ViralPosts />
    </>
  );
}