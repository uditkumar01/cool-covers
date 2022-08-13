import { FaChevronUp } from "react-icons/fa";

export function BackToTopButton() {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      className="back-to-top fixed bottom-8 flex right-8 left-auto z-[999] h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-dark"
      onClick={goToTop}
    >
      <FaChevronUp />
    </button>
  );
}
