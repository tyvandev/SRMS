import React, { useCallback, useEffect, useState } from 'react';
import { deleteStudent, getStudents, Student } from '@/pages/api/student';
import { dateToString } from '@/pages/utils';
import { NoData } from '../components/NoData';
import { toast } from 'react-hot-toast';

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);

  const handleDelete = useCallback(async (studentId: number) => {
    if(!confirm("Are you sure")) {
      return;
    }
    const response = await deleteStudent(studentId);
    if(response) {
      toast.success('Delete successful');
      fetchStudents();
    }
  }, []);

  const fetchStudents = async () => {
    const response = await getStudents();
    if (response?.data?.students) {
      setStudents(response?.data?.students || students);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="ml-64 px-4 pb-10 h-full">
      <div className="flex h-full">
        <div className="relative flex flex-col min-w-0 w-full mb-4 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10">
            <h3 className="text-3xl pb-3 mb-10">Students List</h3>
            <table className="border border-gray-200 text-sm items-center w-full bg-transparent border-collapse table-auto divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name & Family Name
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    DOB
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr className={`${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} key={student.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6 text-left">
                        {student.firstName}{' '}{student.familyName}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6">
                        {dateToString(student.birthDate)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6">
                        {student.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6">
                        <div className="cursor-pointer" onClick={() => handleDelete(student.id)}>
                          <i className="fas fa-close fa-fw text-red-500 text-2xl"></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : <NoData colSpan={4} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
