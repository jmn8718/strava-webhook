import { Frame } from "lucide-react"
import Link from "next/link"
import { AuthButton } from "./auth-button"

export function Header() {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4">
        <Frame className="w-6 h-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
        <Link href="#" className="text-muted-foreground">
          Projects
        </Link>
        <Link href="#" className="text-muted-foreground">
          Deployments
        </Link>
        <Link href="/activities" className="text-muted-foreground">
          Activities
        </Link>
        <Link href="#" className="text-muted-foreground">
          Logs
        </Link>
        <Link href="#" className="font-bold">
          Settings
        </Link>
      </nav>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <AuthButton />
      </div>
    </header>
  )
}

