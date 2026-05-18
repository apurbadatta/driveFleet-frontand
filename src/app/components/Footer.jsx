import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLink,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">
            Contact Info
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" />
              <span>support@drivefleet.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-400" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaLink className="text-slate-600 text-xs" />
              <Link href="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaLink className="text-slate-600 text-xs" />
              <Link href="/cars" className="hover:text-blue-400 transition">
                Explore Cars
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <FaLink className="text-slate-600 text-xs" />
              <Link href="/privacy" className="hover:text-blue-400 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 tracking-wide">
            Follow Us
          </h3>
          <p className="text-sm mb-4">
            Stay connected with us on social media for exciting offers.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-full transition text-lg"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-blue-400 hover:text-white rounded-full transition text-lg"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 hover:bg-blue-700 hover:text-white rounded-full transition text-lg"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-12 pt-4 border-t border-slate-800 tracking-wider">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-blue-400 font-medium">DriveFleet</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
