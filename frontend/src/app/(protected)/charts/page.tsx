"use client"

import { useState, useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartLegendContent,
  ChartLegend,
  type ChartConfig 
} from "@/components/ui/chart"
import { BillController } from '../../../utils/controllers/BillController'
import { Bill } from '@/lib/types/Bill'
import { toast } from '@/hooks/use-toast'
import { Input } from "@/components/ui/input"

const chartConfig = {
  pending: {
    label: "Pending",
    color: "hsl(var(--warning))",
  },
  paid: {
    label: "Paid",
    color: "hsl(var(--success))",
  },
} satisfies ChartConfig

const ChartsView = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(0);

  useEffect(() => {
    async function fetchBillsForChart() {
      try {
        const response = await BillController.findAll();
        const bills: Bill[] = response["content"];

        // Get next 6 months
        const months: { [key: string]: { pending: number; paid: number } } = {};
        const today = new Date();
        
        for (let i = 0; i < 6; i++) {
          const month = new Date(today.getFullYear(), today.getMonth() + i, 1);
          const monthKey = month.toLocaleString('default', { month: 'long' });
          months[monthKey] = { pending: 0, paid: 0 };
        }

        // Categorize bills by month
        bills.forEach(bill => {
          const dueDate = new Date(bill.dueDate);
          const monthKey = dueDate.toLocaleString('default', { month: 'long' });
          
          if (months[monthKey]) {
            if (bill.paid) {
              months[monthKey].paid += bill.amount;
            } else {
              months[monthKey].pending += bill.amount;
            }
          }
        });

        // Convert to chart data format
        const formattedData = Object.entries(months).map(([month, values]) => ({
          month,
          pending: values.pending,
          paid: values.paid,
        }));

        setChartData(formattedData);
      } catch (error) {
        const errorMessage = (error as Error).message;
        toast({ title: "Error", description: errorMessage });
      }
    }

    fetchBillsForChart();
  }, []);

  const getBudgetStatus = (currentMonth: string) => {
    const monthData = chartData.find(data => data.month === currentMonth);
    if (!monthData) return null;

    const totalSpending = monthData.pending + monthData.paid;
    if (totalSpending === monthlyBudget) return "on budget";
    return totalSpending > monthlyBudget ? "over budget" : "under budget";
  }

  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const budgetStatus = getBudgetStatus(currentMonth);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bills Forecast</h1>
      <div className="mb-4 space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="number"
            placeholder="Enter monthly budget"
            value={monthlyBudget || ''}
            onChange={(e) => setMonthlyBudget(Number(e.target.value))}
            className="max-w-[200px]"
          />
          {monthlyBudget > 0 && budgetStatus && (
            <p className={`text-sm ${
              budgetStatus === "over budget" ? "text-red-500" : 
              budgetStatus === "under budget" ? "text-green-500" : 
              "text-yellow-500"
            }`}>
              You are {budgetStatus} for {currentMonth}
            </p>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Overview of paid and pending bills for the next 6 months
        </p>
      </div>
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip 
            content={({ active, payload }) => {
              if (!active || !payload) return null
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Pending
                      </span>
                      <span className="font-bold text-yellow-500">
                        ${payload[0]?.value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Paid
                      </span>
                      <span className="font-bold text-green-500">
                        ${payload[1]?.value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar 
            dataKey="pending" 
            fill="#FF0000" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="paid" 
            fill="#00FF00" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default ChartsView