import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { FiMail, FiGlobe, FiClock, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const contactItems = [
  { icon: FiMail,   title: "Email",         info: "muhmmadilyasabdulghoni@gmail.com" },
  { icon: FiGlobe,  title: "Location",      info: "Available Worldwide" },
  { icon: FiClock,  title: "Working Hours", info: "Mon-Fri, 9AM - 6PM" },
  { icon: FaWhatsapp,  title: "Whatsapp",         info: "+62 123 4567 890" },
];

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name    = formData.get('name');
    const email   = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');
    const emailBody = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`;
    window.location.href = `mailto:muhmmadilyasabdulghoni@gmail.com?subject=Contact Form Message from ${name}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-8">
        <Link to="/" className="inline-block">
          <h1 className="text-4xl md:text-5xl font-serif">M.Ilyas</h1>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-12">

        {/* Contact Form — sama di desktop & mobile, sudah responsif */}
        <div className="w-full max-w-2xl animate-fade-in mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-4 text-center">Let's Chat</h2>
          <p className="text-base md:text-xl text-muted-foreground mb-12 text-center max-w-xl mx-auto">
            We're excited to hear from you. Share your ideas and let's create something amazing together.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" className="h-12" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" className="h-12" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="Your company" className="h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Tell us about your project..." className="min-h-[200px] resize-none" required />
            </div>
            <Button type="submit" className="w-full h-12 text-base font-medium uppercase tracking-wide" size="lg">
              Send Message
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Or reach us directly at:</p>
            <a href="mailto:muhmmadilyasabdulghoni@gmail.com" className="text-primary hover:underline font-medium break-all">
              muhmmadilyasabdulghoni@gmail.com
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════
            CONTACT INFO — DESKTOP
            Icon card + info muncul saat hover
            ══════════════════════════════════════ */}
        <div className="hidden md:block w-full max-w-4xl mb-24">
          <h3 className="text-3xl md:text-4xl font-serif mb-12 text-center">Contact Information</h3>
          <div className="grid grid-cols-4 gap-8">
            {contactItems.map(({ icon: Icon, title, info }) => (
              <div key={title} className="flex justify-center">
                <div className="group relative inline-block">
                  <div className="bg-secondary/50 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg w-20 h-20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary transition-all duration-300" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-24 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center whitespace-nowrap pointer-events-none">
                    <h4 className="font-semibold mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground">{info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            CONTACT INFO — MOBILE
            Info selalu tampil (hover tidak ada
            di touch screen)
            ══════════════════════════════════════ */}
        <div className="block md:hidden w-full max-w-sm mb-24">
          <h3 className="text-2xl font-serif mb-8 text-center">Contact Information</h3>
          <div className="flex flex-col gap-4">
            {contactItems.map(({ icon: Icon, title, info }) => (
              <div key={title} className="flex items-center gap-4 bg-secondary/50 rounded-xl px-5 py-4">
                <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
                  <p className="text-sm font-medium break-all">{info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ — grid sudah responsif, tidak perlu diubah */}
        <div className="w-full max-w-4xl mb-24">
          <h3 className="text-2xl md:text-4xl font-serif mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { q: "How quickly do you respond?",          a: "We typically respond within 24-48 hours during business days." },
              { q: "Do you work with international clients?", a: "Yes! We work with clients from all around the world remotely." },
              { q: "What services do you offer?",          a: "We offer web development, software development, and consulting services." },
              { q: "What's your pricing model?",           a: "We offer both project-based and hourly rates. Contact us for a quote." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-secondary/50 p-5 md:p-6 rounded-lg">
                <h4 className="text-base md:text-xl font-semibold mb-2">{q}</h4>
                <p className="text-sm md:text-base text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services — grid sudah responsif */}
        <div className="w-full max-w-4xl mb-24">
          <h3 className="text-2xl md:text-4xl font-serif mb-8 text-center">Our Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Full Stack Web Dev",    desc: "Modern, responsive websites built with the latest technologies" },
              { title: "Software Engineering",  desc: "Robust and scalable software solutions for your business" },
              { title: "Mobile Development",    desc: "Native and cross-platform mobile applications" },
              { title: "Maintenance",           desc: "Ongoing support and maintenance for your projects" },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center p-4 md:p-6 bg-primary/5 rounded-lg">
                <h4 className="text-sm md:text-xl font-semibold mb-2">{title}</h4>
                <p className="text-xs md:text-base text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Contact;
