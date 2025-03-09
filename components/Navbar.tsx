import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  const navIcons = [
    { src: "/assets/icons/search.svg", alt: "search" },
    { src: "/assets/icons/black-heart.svg", alt: "heart" },
    { src: "/assets/icons/user.svg", alt: "user" },
  ];
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={27}
            height={27}
          />
          <p className="nav-logo">
            Price <span className="text-red-600">Wise</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((nav) => (
            <Image
              src={nav.src}
              key={nav.alt}
              alt={nav.alt}
              width={27}
              height={27}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
