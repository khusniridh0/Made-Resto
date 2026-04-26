import { ChartOrder } from "@/components/cards/chart-order";
import { OrderedCard } from "@/components/cards/ordered";
import { SummaryCard, SummaryCardHeader, summaryVariants } from "@/components/cards/summary-card";
import { IconComponent, myIcons } from "@/components/custom-ui/dynamic-Icon";
import { StatusBadge, statusVariants, } from "@/components/custom-ui/status-badge";
import { Datatable } from "@/components/tables/datatables";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { dateNow, toRupiah } from "@/lib/utils";
import { data } from '@/service/data';

const filterOrder = [
    { label: 'Today', value: 'today' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
]

const filterReport = [
    { label: 'Customer', value: 'customer' },
    { label: 'Product', value: 'product' },
    { label: 'Payment', value: 'payment' },
    { label: 'Status', value: 'status' },
]

const DashboardPage = () => {
    const report = data.report.map((item) => ({
        ...item,
        customer: <div className="flex items-center">
            <Avatar size="lg" className={item.customer.background}>
                <AvatarImage src={item.customer.image} alt={item.customer.name} />
                <AvatarFallback>{item.customer.name}</AvatarFallback>
            </Avatar>
            <span className="ml-6">{item.customer.name}</span>
        </div>,
        payment: toRupiah(parseInt(item.payment)),
        status: <StatusBadge status={item.status as keyof typeof statusVariants} classes="min-w-30">
            {item.status}
        </StatusBadge>
    }))

    return (
        <div className="w-full p-6 grid grid-cols-12 gap-6">
            <div className="lg:col-span-8 col-span-12">
                <section id="headers">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-md">{dateNow()}</p>
                    <Separator className="my-6 bg-[var(--color-dark-line)]" />
                </section>

                <section id="summary" className="flex flex-wrap gap-6 mb-6">
                    {data.summary.map((item, idx) => (
                        <SummaryCard key={idx}>
                            <SummaryCardHeader
                                status={item.status}
                                growth={item.growth}
                                variant={item.logo.variant as keyof typeof summaryVariants}
                            >
                                <IconComponent iconName={item.logo.icon as keyof typeof myIcons} />
                            </SummaryCardHeader>
                            <h1 className="text-3xl font-bold my-4">{item.amount}</h1>
                            <p className="font-medium">{item.title}</p>
                        </SummaryCard >
                    ))}
                </section>

                <section id="report" className="flex gap-6">
                    <Datatable filterOptions={filterReport} data={report} />
                </section>
            </div>
            <aside className="lg:col-span-4 col-span-12 flex flex-col gap-6">
                <OrderedCard orders={data.orders} filterOptions={filterOrder} />
                <ChartOrder filterOptions={filterOrder} />
            </aside>
        </div >
    );
}

export default DashboardPage;