import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { CreateStudent, createStudent } from '@/pages/api/student';
import { dateToString } from '@/pages/utils';

const initialValues = {
  firstName: '',
  familyName: '',
  birthDate: null,
  email: '',
};

const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 10)

const validationSchema = yup.object().shape({
  firstName: yup.string().required('Enter your first name'),
  familyName: yup.string().required('Enter your family name'),
  birthDate: yup.date()
    .max(maxDate, 'You must be at least years old')
    .required('Enter your date of birth'),
  email: yup.string().email('Enter a valid email address').required('Enter your email address'),
});

export default function NewStudent() {
  const onSubmit = React.useCallback(async (payload: CreateStudent, formik: FormikHelpers<typeof initialValues>) => {
    const response = await createStudent(payload);

    if (response?.status === 'success') {
      toast.success('Successfully created student');
      formik.resetForm();
    }
  }, []);

  return (
    <div className="ml-64 px-4 pb-10 h-full">
      <div className="flex h-full">
        <div className="relative flex flex-col min-w-0 w-full mb-4 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10">
            <h3 className="text-3xl pb-3 mb-10">Add New Students</h3>
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
                        htmlFor="firstName"
                        >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        className="border border-blue-600 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="First Name"
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="text-sm text-red-500">{errors.firstName}</div>
                      ) : null}
                    </div>

                    <div className="relative w-full py-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="familyName"
                      >
                        Family Name
                      </label>
                      <input
                        id="familyName"
                        type="familyName"
                        value={values.familyName}
                        onChange={handleChange}
                        className="border border-blue-600 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Family Name"
                      />
                      {errors.familyName && touched.familyName ? (
                        <div className="text-sm text-red-500">{errors.familyName}</div>
                      ) : null}
                    </div>

                    <div className="relative w-full py-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={values.email}
                        className="border border-blue-600 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                      {errors.email && touched.email ? (
                        <div className="text-sm text-red-500">{errors.email}</div>
                      ) : null}
                    </div>

                    <div className="relative w-full py-3">
                      <label
                        className="block uppercase text-gray-600 text-xs font-bold mb-2"
                        htmlFor="birthDate"
                      >
                        Date of Birth
                      </label>
                      <input
                        id="birthDate"
                        type="date"
                        value={dateToString(values.birthDate)}
                        max={dateToString(maxDate)}
                        className="border border-blue-600 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Date of Birth"
                        onChange={handleChange}
                      />
                      {errors.birthDate && touched.birthDate ? (
                        <div className="text-sm text-red-500">{errors.birthDate}</div>
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
