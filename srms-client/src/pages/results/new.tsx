import React, { useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { CreateResult, createResult, Score } from '@/pages/api/result';
import { getStudents, Student } from '@/pages/api/student';
import { Course, getCourses } from '@/pages/api/course';

const initialValues = {
  courseId: null,
  studentId: null,
  score: '' as Score,
};

const validationSchema = yup.object().shape({
  courseId: yup.number().required('Select a course'),
  studentId: yup.number().required('Select a student'),
  score: yup.string().required('Select a score'),
});

export default function NewResult() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const onSubmit = React.useCallback(async (payload: CreateResult, formik: FormikHelpers<typeof initialValues>) => {
    const response = await createResult(payload);

    if (response?.status === 'success') {
      toast.success('Successfully created result');
      formik.resetForm();
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses();
      if (response?.data?.courses) {
        setCourses(response?.data?.courses || courses);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getStudents();
      if (response?.data?.students) {
        setStudents(response?.data?.students || students);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="ml-64 px-4 pb-10 h-full">
      <div className="flex h-full">
        <div className="relative flex flex-col min-w-0 w-full mb-4 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10">
            <h3 className="text-3xl pb-3 mb-10">Add New Results</h3>
            <div>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ values, handleChange, handleSubmit, isSubmitting, isValid, errors, touched }) => (
                  <form className="max-w-md mb-6" onSubmit={handleSubmit}>
                    <div className="relative w-full py-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="courseId"
                        >
                        Course Name
                      </label>
                      <select
                        id="courseId"
                        value={values.courseId || ''}
                        onChange={handleChange}
                        className="border border-blue-600 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Course Name"
                      >
                        <option value="">Select One</option>
                        {courses.map(course => (
                          <option value={course.id} key={course.id}>{course.title}</option>
                        ))}
                      </select>
                      {errors.courseId && touched.courseId ? (
                        <div className="text-sm text-red-500">{errors.courseId}</div>
                      ) : null}
                    </div>

                    <div className="relative w-full py-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="studentId"
                        >
                        Student Name
                      </label>
                      <select
                        required
                        id="studentId"
                        value={values.studentId || ''}
                        onChange={handleChange}
                        className="border border-blue-600 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Student Name"
                      >
                        <option value="">Select One</option>
                        {students.map(student => (
                          <option value={student.id} key={student.id}>{student.firstName}{' '}{student.familyName}</option>
                        ))}
                      </select>
                      {errors.studentId && touched.studentId ? (
                        <div className="text-sm text-red-500">{errors.studentId}</div>
                      ) : null}
                    </div>

                    <div className="relative w-full py-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="score"
                        >
                        Score
                      </label>
                      <select
                        id="score"
                        value={values.score}
                        onChange={handleChange}
                        className="border border-blue-600 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Score"
                      >
                        <option value="">Select One</option>
                        {Object.values(Score).map(score => (
                          <option value={score} key={score}>{score}</option>
                        ))}
                      </select>
                      {errors.score && touched.score ? (
                        <div className="text-sm text-red-500">{errors.score}</div>
                      ) : null}
                    </div>

                    <div className="text-center mt-6">
                      <button
                        disabled={isSubmitting || !isValid}
                        className="bg-blue-200 disabled:bg-gray-200 border-gray-400 border text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
