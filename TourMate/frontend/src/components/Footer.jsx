import { RiFacebookFill, RiInstagramFill, RiWhatsappFill, RiTwitterFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-gray-200 border-t border-gray-300 mt-10">

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex gap-4 -ml-5">
          <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full">
            <RiFacebookFill size={14}/>
          </div>
          <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full">
            <RiInstagramFill size={14}/>
          </div>
          <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full">
            <RiWhatsappFill size={14}/>
          </div>
          <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full">
            <RiTwitterFill size={14}/>
          </div>
        </div>

        <div className="flex gap-12 text-sm text-gray-700">
          <p>Términos Legales</p>
          <p>Política de Cookies</p>
          <p>Política de Privacidad</p>
        </div>
      </div>
    </footer>
  );
}
