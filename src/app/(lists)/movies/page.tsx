import ListContent from "@/components/ListContent";
import { dummyData } from "@/data/dummyData";

export default function Movies() {
  const movies = dummyData.movies;
  return <ListContent data={movies} />;
}
