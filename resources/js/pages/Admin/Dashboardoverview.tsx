import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, Bell, Activity } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Overview',
        href: '/',
    },

    
];

const stats = [
    { label: 'Total Students', value: 1200, icon: <Users className="w-6 h-6 text-blue-500" /> },
    { label: 'Total Teachers', value: 75, icon: <Users className="w-6 h-6 text-green-500" /> },
    { label: 'Total Parents', value: 950, icon: <Users className="w-6 h-6 text-purple-500" /> },
    { label: 'Total Classes', value: 50, icon: <Users className="w-6 h-6 text-yellow-500" /> },
];

const chartOptions = {
    title: {
        text: 'Students Enrollment Over Time'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [400, 300, 500, 200, 700],
            type: 'line',
            smooth: true,
            lineStyle: {
                width: 3,
            },
        }
    ]
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="flex items-center gap-4 p-4">
                            {stat.icon}
                            <div>
                                <h2 className="text-xl font-bold">{stat.value}</h2>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <Card className="col-span-2">
                        <CardContent>
                            <h2 className="mb-4 text-lg font-bold">Students Enrollment Over Time</h2>
                            <ReactECharts option={chartOptions} style={{ height: 300 }} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h2 className="mb-4 text-lg font-bold">Notifications</h2>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-red-500" />
                                    <p>3 Pending approvals</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-yellow-500" />
                                    <p>5 New submissions</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-green-500" />
                                    <p>New reports generated</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
