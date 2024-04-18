import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className="w-36">
          <h1 className=" text-4xl font-bold">কন্ডাক্টর</h1>
        </Link>

        <p>2023 কন্ডাক্টর. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
