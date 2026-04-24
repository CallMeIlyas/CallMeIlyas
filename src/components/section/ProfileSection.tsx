import React from "react";
import { Cpu, Globe } from "lucide-react";
import { FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";

const ProfileSection = () => {
  return (
    <section
      id="profile-section"
      className="relative w-full bg-[#f7f6f4] text-[#343535] z-[0]"
    >
      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex min-h-screen flex-col items-center justify-center px-6 py-20 -mt-[18vh]">
        <div className="max-w-5xl w-full grid grid-cols-2 gap-10 items-center">
          
          <div className="flex justify-end">
            <img
              src="images/profile-photo.jpg"
              alt="Muhammad Ilyas Abdul Ghoni"
              className="w-[280px] h-[280px] object-cover rounded-3xl shadow-xl border border-[#d4d3d2]"
            />
          </div>
      
          <div className="space-y-6 text-left">
            <h2 className="text-5xl font-bold tracking-tight">
              Muhammad Ilyas Abdul Ghoni
            </h2>
      
            <p className="text-lg leading-relaxed max-w-[500px] text-[#5a5958]">
              A passionate <span className="font-semibold text-[#343535]">Full Stack Developer & Software Engineer</span> 
              and <span className="font-semibold text-[#343535]">Math & Physics Enthusiast</span>, 
              focused on building scalable systems and intelligent digital products.
              Currently creating adaptive systems where performance meets clarity.
            </p>
      
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 shrink-0" />
                <p><strong>Available Worldwide</strong></p>
              </div>
      
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 shrink-0" />
                <p><strong>Focus:</strong> Full Stack Development & Software Engineering</p>
              </div>
            </div>
      
            <div className="flex gap-5">
              <a
                href="https://www.linkedin.com/in/muhammad-ilyas-abdul-ghoni-76a584368"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[#343535] rounded-lg hover:bg-[#343535] hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
      
              <a
                href="https://www.instagram.com/ilyas_art01?igsh=MmJ1cnF5azV3dXV4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[#343535] rounded-lg hover:bg-[#343535] hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
      
              <a
                href="https://discord.com/users/1491647158137655307"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-[#343535] rounded-lg hover:bg-[#343535] hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT — foto atas, info bawah ── */}
      <div className="flex md:hidden flex-col items-center justify-center px-6 py-20 -mt-[8vh] gap-8">
        {/* Foto */}
        <img
          src="images/profile-photo.jpg"
          alt="Muhammad Ilyas Abdul Ghoni"
          className="w-[200px] h-[200px] object-cover rounded-3xl shadow-xl border border-[#d4d3d2]"
        />

        {/* Info — semua center */}
        <div className="flex flex-col items-center text-center gap-5 w-full max-w-sm">
          <h2 className="text-3xl font-bold tracking-tight">
            Muhammad Ilyas Abdul Ghoni
          </h2>
        
          <p className="text-base leading-relaxed text-[#5a5958]">
            A passionate <span className="font-semibold text-[#343535]">Full Stack Developer</span> and{" "}
            <span className="font-semibold text-[#343535]">Math & Physics Enthusiast</span>, 
            focused on building scalable systems and exploring{" "}
            <span className="font-semibold">Edge Intelligence</span>.
          </p>
        
          <div className="flex flex-col items-center gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 shrink-0" />
              <p><strong>Available Worldwide</strong></p>
            </div>
        
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 shrink-0" />
              <p><strong>Focus:</strong> Full Stack & Software Engineering</p>
            </div>
          </div>
        
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/muhammad-ilyas-abdul-ghoni-76a584368"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#343535] rounded-lg hover:bg-[#343535] hover:text-white transition-all duration-300"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
        
            <a
              href="https://www.instagram.com/ilyas_art01?igsh=MmJ1cnF5azV3dXV4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#343535] rounded-lg hover:bg-[#343535] hover:text-white transition-all duration-300"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
        
            <a
              href="https://discord.com/users/1491647158137655307"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-[#343535] rounded-lg hover:bg-[#343535] hover:text-white transition-all duration-300"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
