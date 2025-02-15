import { Header } from '@/components/header'

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}
