import Image from "next/image"
import Link from "next/link"

const leagueLogos = [
  { id: "ucl", logo: "/icons/ucl.svg" },
  { id: "uel", logo: "/icons/uel.svg" },
  { id: "premier", logo: "/icons/premier.svg" },
  { id: "nations", logo: "/icons/nations.svg" },
  { id: "laliga", logo: "/icons/laliga.svg" },
  { id: "bundesliga", logo: "/icons/bundesliga.svg" },
  { id: "ligue1", logo: "/icons/ligue1.svg" },
  { id: "seriea", logo: "/icons/seriea.svg" },
  { id: "pro", logo: "/icons/pro.svg" },
]

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-dark-accent pt-8 pb-6 bg-dark-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <Image src="/logo.png" alt="Hola Football" width={150} height={60} className="mb-6" />

          <p className="text-center text-gray-400 max-w-2xl mx-auto text-sm">
            Dive into the thrilling world of live sports with Hola Football! Enjoy HD football streams, stay updated
            with fixtures and explore 100+ leagues. Every match is a unique experience. Join us for an unmatched sports
            journey!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 my-8">
          {leagueLogos.map((league) => (
            <Image
              key={league.id}
              src={league.logo || "/placeholder.svg"}
              alt={league.id}
              width={32}
              height={32}
              className="w-8 h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>

        <div className="text-center text-sm text-gray-400 mb-4">
          Email:{" "}
          <a href="mailto:support@holafootball.com" className="text-red-500 hover:underline">
            support@holafootball.com
          </a>
        </div>

        <div className="flex justify-center gap-4 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-red-500 transition-colors">
            Home
          </Link>
          <Link href="/pricing" className="hover:text-red-500 transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-red-500 transition-colors">
            Contact
          </Link>
          <Link href="/terms" className="hover:text-red-500 transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:text-red-500 transition-colors">
            Privacy Policy
          </Link>
        </div>

        <div className="text-center text-xs text-gray-500">© 2023 Holafootball. All Rights Reserved.</div>
      </div>
    </footer>
  )
}
