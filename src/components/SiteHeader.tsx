import TopBar from "./TopBar";
import Navbar from "./Navbar";

/** Persistent site chrome — stays mounted across route changes so the navbar never jumps. */
export default function SiteHeader() {
  return (
    <>
      <TopBar />
      <Navbar />
    </>
  );
}
