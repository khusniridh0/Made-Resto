import { SuccessAnimation } from "@/components/custom-ui/success-animation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DataProvider } from "@/contexts/data-provider";
import { EventProvider } from "@/contexts/event-provider";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

  return (
    <DataProvider>
      <EventProvider>
        <TooltipProvider>
          <SuccessAnimation />
          <main className="flex max-w-[100vw] text-white">
            <AppSidebar />
            {children}
          </main>
        </TooltipProvider>
      </EventProvider>
    </DataProvider>
  )
}

export default layout;