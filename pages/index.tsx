import type { NextPage } from "next";
import Navbar from "../components/Navbar";
const Home: NextPage = () => {
  const fetchData = async () => {
    const fetchData = await fetch(
      `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`
    );
  };
  return (
    <div className="bg-neutral-600 min-h-screen p-5 text-white">
      <Navbar />
    </div>
  );
};

export default Home;
