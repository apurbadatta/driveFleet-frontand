import BannerPage from "./components/Banner";
import HomePage from "./components/Homepage";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <BannerPage></BannerPage>
      <HomePage></HomePage>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>

    </div>
  );
}
