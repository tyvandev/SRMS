import Image from 'next/image';

export default function Home() {
  return (
    <div className="ml-64 px-4 pb-10 h-full">
      <div className="flex h-full">
        <div className="relative flex flex-col min-w-0 w-full mb-4 border-0">
          <div className="flex-auto px-4 lg:px-10 py-10">
            <Image src="https://picsum.photos/id/20/1000/500.jpg" alt="banner" width={1000} height={500} />
            <h3 className="text-4xl pb-3 pt-5">Welcome to Student Result Management System (SRMS)</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
