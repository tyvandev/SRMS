import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "./common";

export interface Course {
  id: number;
  title: string;
}

export type CreateCourse = Omit<Course, 'id'>;

export async function createCourse(payload: CreateCourse) {
  try {
    const { data } = await axios({
      baseURL: baseUrl,
      url: '/courses',
      method: 'POST',
      data: payload,
    });

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function getCourses() {
  try {
    const { data } = await axios({
      baseURL: baseUrl,
      url: '/courses',
      method: 'GET',
    });

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function deleteCourse(courseId: number) {
  try {
    await axios({
      baseURL: baseUrl,
      url: `/courses/${courseId}`,
      method: 'DELETE',
    });

    return true;
  } catch (error: any) {
    toast.error(error.message);
  }
}
