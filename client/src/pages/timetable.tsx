import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FlaskConical, Users } from "lucide-react";
import type { ClassSession, AttendanceRecord } from "@shared/schema";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

const classTypeIcons = {
  Lecture: BookOpen,
  Lab: FlaskConical,
  Tutorial: Users,
};

const classTypeColors = {
  Lecture: "bg-primary/10 text-primary border-primary/20",
  Lab: "bg-accent/10 text-accent border-accent/20",
  Tutorial: "bg-chart-4/10 text-chart-4 border-chart-4/20",
};

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState<typeof days[number]>("Monday");

  const { data: timetableData = [], isLoading: timetableLoading } = useQuery<ClassSession[]>({
    queryKey: ["/api/timetable"],
  });

  const { data: attendanceData = [], isLoading: attendanceLoading } = useQuery<AttendanceRecord[]>({
    queryKey: ["/api/attendance"],
  });

  const todayClasses = timetableData.filter((c) => c.day === selectedDay);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Timetable & Attendance
          </h1>
          <p className="text-lg text-muted-foreground">
            View your class schedule and track attendance
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timetable Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">Weekly Schedule</h2>

              {/* Day Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {days.map((day) => (
                  <Button
                    key={day}
                    variant={selectedDay === day ? "default" : "outline"}
                    onClick={() => setSelectedDay(day)}
                    data-testid={`button-day-${day.toLowerCase()}`}
                    className="rounded-full"
                  >
                    {day}
                  </Button>
                ))}
              </div>

              {/* Class Cards */}
              <div className="space-y-4">
                {timetableLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-muted rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : todayClasses.length === 0 ? (
                  <Card className="py-12">
                    <CardContent className="text-center text-muted-foreground">
                      No classes scheduled for {selectedDay}
                    </CardContent>
                  </Card>
                ) : (
                  todayClasses
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((classSession) => {
                      const Icon = classTypeIcons[classSession.type];
                      return (
                        <Card
                          key={classSession.id}
                          className={`hover-elevate border-l-4 ${classTypeColors[classSession.type]}`}
                          data-testid={`card-class-${classSession.id}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h3 className="font-display text-xl font-semibold">
                                    {classSession.subject}
                                  </h3>
                                  <Badge variant="outline" className="gap-1">
                                    <Icon className="h-3 w-3" />
                                    {classSession.type}
                                  </Badge>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Time: </span>
                                    <span className="font-medium">
                                      {classSession.startTime} - {classSession.endTime}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Room: </span>
                                    <span className="font-medium">{classSession.room}</span>
                                  </div>
                                  <div className="sm:col-span-2">
                                    <span className="text-muted-foreground">Faculty: </span>
                                    <span className="font-medium">{classSession.faculty}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                )}
              </div>
            </div>

            {/* Class Type Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Class Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {(Object.keys(classTypeIcons) as Array<keyof typeof classTypeIcons>).map((type) => {
                    const Icon = classTypeIcons[type];
                    return (
                      <div key={type} className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg border ${classTypeColors[type]}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{type}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Section */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">Attendance</h2>

              <div className="space-y-4">
                {attendanceLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-muted rounded mb-2"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : attendanceData.length === 0 ? (
                  <Card className="py-12">
                    <CardContent className="text-center text-muted-foreground">
                      No attendance records available
                    </CardContent>
                  </Card>
                ) : (
                  attendanceData.map((record) => (
                    <Card key={record.subject} className="hover-elevate" data-testid={`card-attendance-${record.subject.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-sm">{record.subject}</h3>
                          <Badge
                            variant={
                              record.percentage >= 85
                                ? "outline"
                                : record.percentage >= 75
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {record.percentage}%
                          </Badge>
                        </div>

                        <Progress value={record.percentage} className="h-2" />

                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {record.attended} / {record.total} classes
                          </span>
                          <span>
                            {record.total - record.attended} missed
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    </Card>
                  ))
                )}
              </div>

              {/* Overall Attendance */}
              {attendanceData.length > 0 && (
                <Card className="mt-6 bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {Math.round(
                          attendanceData.reduce((sum, r) => sum + r.percentage, 0) /
                            attendanceData.length
                        )}
                        %
                      </div>
                      <p className="text-sm text-muted-foreground">Average across all subjects</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
