import Headline from '@/components/Landing/Headline';
import TopNews from '@/components/Landing/TopNews';
import ViralPosts from '@/components/Landing/ViralPosts';
import Divider from '@/components/Landing/Divider';

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