import { redirect } from "next/navigation";

const LANDING_URL = process.env.NEXT_PUBLIC_LANDING_URL || "https://12cut.pages.dev";

const Home = () => {
  redirect(LANDING_URL);
};

export default Home;
