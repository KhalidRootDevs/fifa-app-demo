"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your admin preferences and system settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-gray-900">
          <TabsTrigger value="general" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
            General
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name" className="text-black dark:text-white">
                  Site Name
                </Label>
                <Input
                  id="site-name"
                  defaultValue="FIFA World Cup 2026"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description" className="text-black dark:text-white">
                  Site Description
                </Label>
                <Textarea
                  id="site-description"
                  defaultValue="Official FIFA World Cup 2026 streaming platform"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-black dark:text-white">
                  Default Timezone
                </Label>
                <Select defaultValue="utc">
                  <SelectTrigger className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-950">
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode" className="text-black dark:text-white">
                    Maintenance Mode
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Put the site in maintenance mode</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>

              <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black dark:text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Admin User"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black dark:text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@fifa.com"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-black dark:text-white">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-black dark:text-white">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-black dark:text-white">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>

              <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                <Save className="h-4 w-4 mr-2" />
                Update Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-black dark:text-white">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email notifications for important events
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="match-alerts" className="text-black dark:text-white">
                    Match Alerts
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive alerts for match starts and results
                  </p>
                </div>
                <Switch id="match-alerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-notifications" className="text-black dark:text-white">
                    System Notifications
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications about system updates</p>
                </div>
                <Switch id="system-notifications" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails" className="text-black dark:text-white">
                    Marketing Emails
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive marketing and promotional emails</p>
                </div>
                <Switch id="marketing-emails" />
              </div>

              <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">API Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="api-key" className="text-black dark:text-white">
                  API Key
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    defaultValue="sk_live_51NcgMpLkojYnPXhJIgOVXh7T5jbJwK8mV"
                    className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    readOnly
                  />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Use this key to authenticate API requests</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url" className="text-black dark:text-white">
                  Webhook URL
                </Label>
                <Input
                  id="webhook-url"
                  placeholder="https://your-site.com/api/webhook"
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-access" className="text-black dark:text-white">
                    API Access
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable API access for third-party integrations
                  </p>
                </div>
                <Switch id="api-access" defaultChecked />
              </div>

              <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                <Save className="h-4 w-4 mr-2" />
                Save API Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
