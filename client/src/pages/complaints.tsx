import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle2, Clock, Send } from "lucide-react";
import type { Complaint, InsertComplaint } from "@shared/schema";
import { insertComplaintSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

const statusIcons = {
  Pending: Clock,
  "Under Review": AlertCircle,
  Resolved: CheckCircle2,
};

const statusColors = {
  Pending: "secondary",
  "Under Review": "default",
  Resolved: "outline",
} as const;

export default function Complaints() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(true);

  const { data: complaints = [], isLoading } = useQuery<Complaint[]>({
    queryKey: ["/api/complaints"],
  });

  const form = useForm<InsertComplaint>({
    resolver: zodResolver(insertComplaintSchema),
    defaultValues: {
      category: "",
      subject: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertComplaint) => {
      return await apiRequest("POST", "/api/complaints", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/complaints"] });
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been submitted successfully. We'll review it soon.",
      });
      form.reset();
      setShowForm(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertComplaint) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Complaints & Requests
          </h1>
          <p className="text-lg text-muted-foreground">
            Submit your concerns and track their status
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Submission Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Submit New Complaint</CardTitle>
              <CardDescription>
                Fill out the form below to submit your complaint or request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="Services">Services</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Brief description of the issue"
                            {...field}
                            data-testid="input-subject"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide detailed information about your complaint or request"
                            className="min-h-32 resize-none"
                            {...field}
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1 234 567 8900"
                              {...field}
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={submitMutation.isPending}
                      data-testid="button-submit-complaint"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {submitMutation.isPending ? "Submitting..." : "Submit Complaint"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                      data-testid="button-reset"
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {!showForm && (
          <div className="mb-8">
            <Button onClick={() => setShowForm(true)} data-testid="button-show-form">
              Submit Another Complaint
            </Button>
          </div>
        )}

        {/* Previous Complaints */}
        <div>
          <h2 className="font-display text-2xl font-semibold mb-6">Recent Submissions</h2>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : complaints.length === 0 ? (
            <Card className="py-12">
              <CardContent className="text-center text-muted-foreground">
                No complaints submitted yet
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => {
                const StatusIcon = statusIcons[complaint.status as keyof typeof statusIcons];
                return (
                  <Card key={complaint.id} className="hover-elevate" data-testid={`card-complaint-${complaint.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline">{complaint.category}</Badge>
                            <Badge variant={statusColors[complaint.status as keyof typeof statusColors]}>
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {complaint.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{complaint.subject}</CardTitle>
                          <CardDescription className="text-sm">
                            Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{complaint.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
