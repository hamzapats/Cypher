import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Code,
  Palette,
  Music,
  Users,
  Lightbulb,
  Trophy,
  BookOpen,
} from "lucide-react";
import type { Club, Project } from "@shared/schema";

const categoryIcons: Record<string, any> = {
  Technology: Code,
  Arts: Palette,
  Music: Music,
  Literature: BookOpen,
};

const statusColors = {
  Planning: "secondary",
  "In Progress": "default",
  Completed: "outline",
} as const;

export default function Clubs() {
  const { data: clubs = [], isLoading: clubsLoading } = useQuery<Club[]>({
    queryKey: ["/api/clubs"],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Clubs & Projects
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore campus clubs and collaborative projects
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Clubs Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">Active Clubs</h2>
            <Badge variant="secondary" className="text-sm">
              {clubs.length} clubs
            </Badge>
          </div>

          {clubsLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-12 w-12 bg-muted rounded-full mb-2"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : clubs.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center text-muted-foreground">
                No clubs available
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {clubs.map((club) => {
              const Icon = categoryIcons[club.category] || Users;
              return (
                <Card
                  key={club.id}
                  className="hover-elevate transition-all"
                  data-testid={`card-club-${club.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 bg-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {club.logo}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <CardTitle className="font-display text-lg leading-tight">
                          {club.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs gap-1">
                            <Icon className="h-3 w-3" />
                            {club.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm">
                      {club.description}
                    </CardDescription>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{club.memberCount} members</span>
                      </div>
                      <Button size="sm" variant="outline" data-testid={`button-join-${club.id}`}>
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
              })}
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">Active Projects</h2>
            <Badge variant="secondary" className="text-sm">
              {projects.filter((p) => p.status !== "Completed").length} ongoing
            </Badge>
          </div>

          {projectsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center text-muted-foreground">
                No projects available
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => {
              const club = clubs.find((c) => c.id === project.clubId);
              return (
                <Card
                  key={project.id}
                  className="hover-elevate"
                  data-testid={`card-project-${project.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="font-display text-xl">
                            {project.name}
                          </CardTitle>
                          <Badge variant={statusColors[project.status]}>
                            {project.status}
                          </Badge>
                        </div>
                        {club && (
                          <Badge variant="outline" className="w-fit text-xs">
                            {club.name}
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Started</div>
                        <div className="text-sm font-medium">
                          {new Date(project.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.teamMembers.slice(0, 4).map((member, idx) => (
                            <Avatar
                              key={idx}
                              className="h-8 w-8 border-2 border-background"
                            >
                              <AvatarFallback className="text-xs bg-muted">
                                {member[0]}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {project.teamMembers.length} members
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        data-testid={`button-project-details-${project.id}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
              })}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{clubs.length}</div>
              <div className="text-sm text-muted-foreground">Active Clubs</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5">
            <CardContent className="p-6 text-center">
              <Lightbulb className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-4/5 to-primary/5">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-chart-4 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">
                {clubs.reduce((sum, c) => sum + c.memberCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
