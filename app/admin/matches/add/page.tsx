"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

const streamSourceSchema = z.object({
  name: z.string().min(1, "Stream source name is required"),
  url: z.string().url("Please enter a valid URL"),
  quality: z.enum(["HD", "FHD", "4K"]),
  language: z.string().min(1, "Language is required"),
})

const matchSchema = z.object({
  homeTeam: z.string().min(1, "Home team is required"),
  awayTeam: z.string().min(1, "Away team is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  venue: z.string().min(1, "Venue is required"),
  group: z.string().min(1, "Group is required"),
  status: z.enum(["Upcoming", "Live", "Finished"]),
  homeScore: z.number().min(0).optional(),
  awayScore: z.number().min(0).optional(),
  description: z.string().optional(),
  streamSources: z.array(streamSourceSchema).min(1, "At least one stream source is required"),
})

type MatchFormData = z.infer<typeof matchSchema>

const teams = [
  "Argentina",
  "Brazil",
  "France",
  "England",
  "Spain",
  "Germany",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Italy",
  "Croatia",
  "Morocco",
  "Mexico",
  "USA",
  "Canada",
  "Japan",
  "Denmark",
  "Wales",
  "Serbia",
  "Switzerland",
  "Poland",
  "Ukraine",
  "Sweden",
  "Austria",
]

const groups = ["Group A", "Group B", "Group C", "Group D", "Group E", "Group F", "Group G", "Group H"]

const venues = [
  "MetLife Stadium, New York",
  "SoFi Stadium, Los Angeles",
  "AT&T Stadium, Dallas",
  "Azteca Stadium, Mexico City",
  "BMO Field, Toronto",
  "Mercedes-Benz Stadium, Atlanta",
  "Hard Rock Stadium, Miami",
  "Levi's Stadium, San Francisco",
  "Lincoln Financial Field, Philadelphia",
  "Arrowhead Stadium, Kansas City",
]

export default function AddMatchPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      homeTeam: "",
      awayTeam: "",
      date: "",
      time: "",
      venue: "",
      group: "",
      status: "Upcoming",
      homeScore: undefined,
      awayScore: undefined,
      description: "",
      streamSources: [{ name: "", url: "", quality: "HD", language: "English" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "streamSources",
  })

  const onSubmit = async (data: MatchFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Match data:", data)
      toast({
        title: "Success",
        description: "Match has been created successfully.",
      })
      router.push("/admin/matches")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create match. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/matches">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">Add New Match</h1>
          <p className="text-gray-600 dark:text-gray-400">Create a new match with stream sources</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Match Details Card */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Match Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="homeTeam"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">Home Team</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 dark:bg-gray-900">
                              <SelectValue placeholder="Select home team" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teams.map((team) => (
                              <SelectItem key={team} value={team}>
                                {team}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="awayTeam"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">Away Team</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 dark:bg-gray-900">
                              <SelectValue placeholder="Select away team" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teams.map((team) => (
                              <SelectItem key={team} value={team}>
                                {team}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">Date</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-gray-50 dark:bg-gray-900" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">Time</FormLabel>
                        <FormControl>
                          <Input type="time" className="bg-gray-50 dark:bg-gray-900" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black dark:text-white">Venue</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-50 dark:bg-gray-900">
                            <SelectValue placeholder="Select venue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {venues.map((venue) => (
                            <SelectItem key={venue} value={venue}>
                              {venue}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="group"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">Group</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 dark:bg-gray-900">
                              <SelectValue placeholder="Select group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {groups.map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 dark:bg-gray-900">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Upcoming">Upcoming</SelectItem>
                            <SelectItem value="Live">Live</SelectItem>
                            <SelectItem value="Finished">Finished</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("status") === "Finished" && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="homeScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black dark:text-white">Home Score</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              className="bg-gray-50 dark:bg-gray-900"
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="awayScore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black dark:text-white">Away Score</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              className="bg-gray-50 dark:bg-gray-900"
                              value={field.value || ""}
                              onChange={(e) =>
                                field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black dark:text-white">Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Match description..."
                          className="bg-gray-50 dark:bg-gray-900"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Stream Sources Card */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-black dark:text-white">Stream Sources</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ name: "", url: "", quality: "HD", language: "English" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Source
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-black dark:text-white">Stream Source {index + 1}</h4>
                      {fields.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`streamSources.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black dark:text-white">Source Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., ESPN, Fox Sports"
                                className="bg-gray-50 dark:bg-gray-900"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`streamSources.${index}.language`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black dark:text-white">Language</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., English, Spanish"
                                className="bg-gray-50 dark:bg-gray-900"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name={`streamSources.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black dark:text-white">Stream URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/stream"
                              className="bg-gray-50 dark:bg-gray-900"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`streamSources.${index}.quality`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black dark:text-white">Quality</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-50 dark:bg-gray-900">
                                <SelectValue placeholder="Select quality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="HD">HD (720p)</SelectItem>
                              <SelectItem value="FHD">Full HD (1080p)</SelectItem>
                              <SelectItem value="4K">4K (2160p)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Match
                </>
              )}
            </Button>
            <Link href="/admin/matches">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
