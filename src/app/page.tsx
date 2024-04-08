import BannerSignUp from "@/components/organism/BannerSignUp";
import Category from "@/components/organism/Category";
import Clients from "@/components/organism/Clients";
import FeaturedJobs from "@/components/organism/FeaturedJobs";
import Hero from "@/components/organism/Hero";
import LatesJobs from "@/components/organism/LatestJobs";

export default function Home() {
  return (
    <div className="px-32 mb-10">
      <Hero />
      <Clients />
      <Category />
      <BannerSignUp />
      <FeaturedJobs />
      <LatesJobs />
    </div>
  );
}
