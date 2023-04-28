import React, { useEffect, useState } from 'react';
import { getResults, Result } from '@/pages/api/result';
import { NoData } from '../components/NoData';

export default function ResultList() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await getResults();
      if (response?.data?.results) {
        setResults(response?.data?.results || results);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="ml-64 px-4 pb-10 h-full">
      <div className="flex h-full">
        <div className="relative flex flex-col min-w-0 w-full mb-4 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10">
            <h3 className="text-3xl pb-3 mb-10">Results List</h3>
            <table className="border border-gray-200 text-sm items-center w-full bg-transparent border-collapse table-auto divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Course Name
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Student Name
                  </th>
                  <th className="px-6 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <tr className={`${index % 2 === 1 ? 'bg-gray-100' : 'bg-white'}`} key={result.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6 text-left">
                        {result.course.title}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6">
                        {result.student.firstName}{' '}{result.student.familyName}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-6">
                        {result.score}
                      </td>
                    </tr>
                  ))
                ) : <NoData colSpan={3} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
