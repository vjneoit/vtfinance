import Link from "next/link";
export default function Home() {
  return (
    <>

      {/* <Link href="/user/create">Register</Link><br></br>
      <Link href="/user/login">Login</Link><br></br>
      <Link href="/user/dashboard/user">user</Link><br></br>
      <Link href="/user/dashboard/admin">admin</Link><br></br>
      <Link href="/user/dashboard/superadmin">superadmin</Link>
 */}


      <div className=" p-4 bg-gray-100">
        <div className="container mx-auto">
          <div className=" flex gap-4">
            <Link href="/user/create" className=" text-white font-medium bg-blue-500 rounded-md py-1 px-4">Register</Link><br></br>
            <Link href="/user/login" className=" text-white font-medium bg-green-500 rounded-md py-1 px-4">Login</Link><br></br>
          </div>
        </div>

      </div>




    </>
  );
}
