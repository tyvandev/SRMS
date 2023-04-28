import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { createCourse, CreateCourse } from '../api/course';

const initialValues = {
  title: '',
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Enter a course title'),
});

export default function NewCourse() {
  const onSubmit = React.useCallback(async (payload: CreateCourse, formik: FormikHelpers<typeof initialValues>) => {
    const response = await createCourse(payload);

    if (response?.status === 'success') {
      toast.success('Successfully created course');
      formik.resetForm();
    }
  }, []);

  return (
    <div className="ml-64 px-4 pb-10 h-full">
      <div className="flex h-full">
        <div className="relative flex flex-col min-w-0 w-full mb-4 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10">
            <h3 className="text-3xl pb-3 mb-10">Add New Courses</h3>
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
                        className="block uppercase text-gray-600 text-sm font-bold mb-2"
                        htmlFor="title"
                        >
                        Course Name
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        className="border border-blue-600 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Course Name"
                      />
                      {errors.title && touched.title ? (
                        <div className="text-sm text-red-500">{errors.title}</div>
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
