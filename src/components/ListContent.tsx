import { MediaData } from "@/types/media";

/* eslint-disable */ // TODO: DELETE line
export default function ListContent({ data }: { data: MediaData }) {
  return (
    <div className="my-4">
      <p>{data.label}</p>
    </div>
  );
}
