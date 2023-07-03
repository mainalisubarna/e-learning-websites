import { Document } from "mongoose";

interface LectureInteface extends Document {
  title: string;
  content: string;
  duration: number;
  lectureUrl: string;
  photo_public_id: string;
}

export default LectureInteface;
