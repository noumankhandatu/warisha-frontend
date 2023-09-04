import styles from "../style";
import logo from "../assets/splash/aboutimage.png";
import FileSaver, { saveAs } from "file-saver";
import { Link } from "react-router-dom";
// import pdf from "../../public/documentation.pdf";

const About = () => {
  const handleDownload = () => {
    FileSaver.saveAs("/documentation.pdf", "documentation of warisha.pdf");
  };
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={logo} alt="billing" className=" h-[70%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 ml-10`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[42px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            About Us
            <br className="sm:block hidden" />{" "}
            <span className="text-gradient"> Automated Text-to-Image </span>{" "}
          </h1>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[42px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full text-gradient">
          Generator
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Our mission is to provide the best platform for creating realistic art images by writing
          prompts in natural language within a few seconds and generated in a high-quality image
          resolution.
        </p>
        <button
          onClick={handleDownload}
          style={{ backgroundColor: "#040C21" }}
          class="text-center text-white font-bold rounded p-2 mt-4 focus:outline-none bg-white border-4 border-white-400 "
        >
          Download Research Paper
        </button>
      </div>
    </section>
  );
};

export default About;
