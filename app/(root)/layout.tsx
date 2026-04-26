import { SuccessAnimation } from "@/components/custom-ui/success-animation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { DataProvider } from "@/contexts/data-provider";
import { EventProvider } from "@/contexts/event-provider";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

  return (
    <DataProvider>
      <EventProvider>
        <SuccessAnimation />
        <div className="flex min-h-screen w-screen bg-[var(--color-base-dark-1)] text-white">
          <AppSidebar />
          {children}
        </div>
      </EventProvider>
    </DataProvider>
  )
}

export default layout;