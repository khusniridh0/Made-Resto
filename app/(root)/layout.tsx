import { AppSidebar } from "@/components/sidebar/app-sidebar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

  return (
    <div className="flex min-h-screen w-screen bg-[var(--color-base-dark-1)] text-white">
      <AppSidebar />
      {children}
    </div>
  )
}

export default layout;