import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div className="space-y-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                P
              </div>
              <span className="text-base font-bold text-slate-900">
                Pixel<span className="text-blue-600">Local</span>
              </span>
            </Link>
            <p className="text-slate-500 leading-relaxed">
              Fast, free, privacy-first image tools. Process files locally in your browser with no signup required.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Popular Converters
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li><Link href="/heic-to-jpg" className="hover:text-blue-600">HEIC to JPG</Link></li>
              <li><Link href="/heic-to-png" className="hover:text-blue-600">HEIC to PNG</Link></li>
              <li><Link href="/jpg-to-webp" className="hover:text-blue-600">JPG to WebP</Link></li>
              <li><Link href="/png-to-webp" className="hover:text-blue-600">PNG to WebP</Link></li>
              <li><Link href="/avif-to-jpg" className="hover:text-blue-600">AVIF to JPG</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Compressors & Resizer
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li><Link href="/compress-image" className="hover:text-blue-600">Image Compressor</Link></li>
              <li><Link href="/compress-image-to-100kb" className="hover:text-blue-600">Compress to 100 KB</Link></li>
              <li><Link href="/compress-image-to-200kb" className="hover:text-blue-600">Compress to 200 KB</Link></li>
              <li><Link href="/resize-image" className="hover:text-blue-600">Resize Image</Link></li>
              <li><Link href="/batch-image-converter" className="hover:text-blue-600">Batch Converter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Legal & Info
            </h4>
            <ul className="space-y-1.5 text-slate-600">
              <li><Link href="/about" className="hover:text-blue-600">About PixelLocal</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 space-y-2 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} PixelLocal. All rights reserved.
          </div>
          <div>
            Files are processed locally in your browser. PixelLocal does not upload user files to its servers for normal processing.
          </div>
        </div>
      </div>
    </footer>
  );
}
