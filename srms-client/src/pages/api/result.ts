import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "./common";
import { Course } from "./course";
import { Student } from "./student";

export enum Score {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

export interface CreateResult {
  courseId: number | null;
  studentId: number | null;
  score: Score;
}

export interface Result {
  id: number;
  course: Course;
  student: Student;
  score: Score;
}

export async function createResult(payload: CreateResult) {
  try {
    const { data } = await axios({
      baseURL: baseUrl,
      url: '/results',
      method: 'POST',
      data: payload,
    });

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function getResults() {
  try {
    const { data } = await axios({
      baseURL: baseUrl,
      url: '/results',
      method: 'GET',
    });

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
}
