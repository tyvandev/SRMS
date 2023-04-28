import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "./common";

export interface Student {
  id: number;
  firstName: string;
  familyName: string;
  birthDate: Date | null;
  email: string
}

export type CreateStudent = Omit<Student, 'id'>;

export async function createStudent(payload: CreateStudent) {
  try {
    const { data } = await axios({
      baseURL: baseUrl,
      url: '/students',
      method: 'POST',
      data: payload,
    });

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function getStudents() {
  try {
    const { data } = await axios({
      baseURL: baseUrl,
      url: '/students',
      method: 'GET',
    });

    return data;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function deleteStudent(studentId: number) {
  try {
    const { data } = await axios({
      baseURL: baseUrl,
      url: `/students/${studentId}`,
      method: 'DELETE',
    });

    return true;
  } catch (error: any) {
    toast.error(error.message);
  }
}

