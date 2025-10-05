import ListContent from "@/components/ListContent";
import { dummyData } from "@/data/dummyData";

export default function Movies() {
  const movies = dummyData.movies;
  return (
    <div className="my-4">
      <ListContent data={movies} />
    </div>
  );
}
