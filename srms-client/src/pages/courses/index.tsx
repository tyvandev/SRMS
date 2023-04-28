import React, { useCallback, useEffect, useState } from 'react';
import { Course, deleteCourse, getCourses } from '@/pages/api/course';
import { NoData } from '../components/NoData';
import { toast } from 'react-hot-toast';

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);

  const handleDelete = useCallback(async (courseId: number) => {
    if(!confirm("Are you sure?")){
      return;
    }
    const response = await deleteCourse(courseId);
    if(response) {
      toast.success('Delete Successful');
      fetchCourses();
    }
  }, [])

  const fetchCourses = async () => {
    const response = await getCourses();
    if (response?.data?.courses) {
      setCourses(response?.data?.courses || courses);
    }
  };

  useEffect(() => {

    fetchCourses();
  }, []);

  return (
    <div className="ml-64 px-4 pb-10 h-full">
      <div className="flex h-full">
        <div className="relative flex flex-col min-w-0 w-full mb-4 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10">
            <h3 className="text-3xl pb-3 mb-10">Courses List</h3>
            <table className="border border-gray-200 text-sm items-center w-full bg-transparent border-collapse table-auto divide-y divide-gray-200">
              <thead>
                <tr className=''>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Course Name
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr className={`${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} key={course.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6 text-left">
                        {course.title}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6">
                        <div className="cursor-pointer" onClick={() => handleDelete(course.id)}>
                          <i className="fas fa-close fa-fw text-red-500 text-2xl"></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : <NoData colSpan={2} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
