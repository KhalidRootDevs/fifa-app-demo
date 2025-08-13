"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Plus, Trash2 } from "lucide-react"

const plans = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 9.99,
    annualPrice: 99.99,
    features: ["Live match streaming", "Match highlights", "Group stage coverage", "Mobile access"],
    subscribers: 12450,
    revenue: 124375.5,
    status: "Active",
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: 19.99,
    annualPrice: 199.99,
    features: [
      "All Basic features",
      "Full tournament coverage",
      "Multi-device streaming",
      "4K Ultra HD quality",
      "No advertisements",
      "Exclusive interviews",
      "Match statistics",
    ],
    subscribers: 8320,
    revenue: 166233.8,
    status: "Active",
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">Pricing</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage subscription plans and pricing</p>
        </div>
        <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-black dark:text-white">Subscription Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="font-medium text-black dark:text-white">Total Subscribers</div>
                <div className="text-lg font-bold text-black dark:text-white">20,770</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="font-medium text-black dark:text-white">Monthly Revenue</div>
                <div className="text-lg font-bold text-black dark:text-white">$290,609.30</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="font-medium text-black dark:text-white">Average Revenue Per User</div>
                <div className="text-lg font-bold text-black dark:text-white">$13.99</div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="font-medium text-black dark:text-white">Churn Rate</div>
                <div className="text-lg font-bold text-black dark:text-white">3.2%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-black dark:text-white">Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-black dark:text-white">{plan.name} Plan</div>
                    <Badge className="bg-black text-white dark:bg-white dark:text-black">
                      {plan.subscribers.toLocaleString()} subscribers
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-black dark:bg-white h-full rounded-full"
                      style={{ width: `${(plan.subscribers / 20770) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    ${plan.revenue.toLocaleString()} revenue
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-black dark:text-white">Subscription Plans</CardTitle>
            <div className="flex items-center space-x-2">
              <Label
                htmlFor="billing-toggle"
                className={
                  billingCycle === "monthly"
                    ? "text-black dark:text-white font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={billingCycle === "annual"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
              />
              <Label
                htmlFor="billing-toggle"
                className={
                  billingCycle === "annual"
                    ? "text-black dark:text-white font-medium"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                Annual
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-200 dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-900">
                  <TableHead className="text-black dark:text-white">Plan</TableHead>
                  <TableHead className="text-black dark:text-white">Price</TableHead>
                  <TableHead className="text-black dark:text-white">Features</TableHead>
                  <TableHead className="text-black dark:text-white">Subscribers</TableHead>
                  <TableHead className="text-black dark:text-white">Status</TableHead>
                  <TableHead className="text-black dark:text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id} className="border-t border-gray-200 dark:border-gray-800">
                    <TableCell className="font-medium text-black dark:text-white">{plan.name}</TableCell>
                    <TableCell className="text-black dark:text-white">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {billingCycle === "monthly" ? "/month" : "/year"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                        {plan.features.length > 3 && <li>+{plan.features.length - 3} more features</li>}
                      </ul>
                    </TableCell>
                    <TableCell className="text-black dark:text-white">{plan.subscribers.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit {plan.name}</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 dark:text-red-400">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {plan.name}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
