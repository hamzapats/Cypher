import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, MessageSquare } from "lucide-react";
import type { InsertFeedback, Feedback } from "@shared/schema";
import { insertFeedbackSchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

const feedbackCategories = ["Academics", "Facilities", "Events", "Support", "Other"];

export default function FeedbackPage() {
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: feedbackList = [] } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
  });

  const form = useForm<InsertFeedback>({
    resolver: zodResolver(
      insertFeedbackSchema.extend({
        rating: insertFeedbackSchema.shape.rating.refine((val) => val > 0, {
          message: "Please select a rating",
        }),
        categories: insertFeedbackSchema.shape.categories.refine((val) => val.length > 0, {
          message: "Please select at least one category",
        }),
      })
    ),
    defaultValues: {
      rating: 0,
      categories: "",
      message: "",
      anonymous: 0,
      name: "",
      email: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertFeedback) => {
      return await apiRequest("POST", "/api/feedback", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your valuable feedback!",
      });
      form.reset();
      setSelectedRating(0);
      setSelectedCategories([]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    form.setValue("categories", newCategories.join(","));
  };

  const onSubmit = (data: InsertFeedback) => {
    submitMutation.mutate(data);
  };

  const isAnonymous = form.watch("anonymous") === 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Share Your Feedback
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us improve by sharing your thoughts and experiences
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Feedback Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Submit Feedback</CardTitle>
            <CardDescription>
              Your feedback helps us make the campus experience better for everyone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Rating */}
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overall Rating</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => {
                                setSelectedRating(rating);
                                field.onChange(rating);
                              }}
                              className="transition-transform hover:scale-110 active:scale-95"
                              data-testid={`button-rating-${rating}`}
                            >
                              <Star
                                className={`h-10 w-10 ${
                                  rating <= selectedRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>
                        {selectedRating > 0 && (
                          <span className="text-foreground font-medium">
                            {selectedRating === 5
                              ? "Excellent!"
                              : selectedRating === 4
                              ? "Good"
                              : selectedRating === 3
                              ? "Average"
                              : selectedRating === 2
                              ? "Below Average"
                              : "Poor"}
                          </span>
                        )}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Categories */}
                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <FormLabel>Feedback Categories</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {feedbackCategories.map((category) => (
                            <Button
                              key={category}
                              type="button"
                              variant={
                                selectedCategories.includes(category) ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => toggleCategory(category)}
                              data-testid={`button-category-${category.toLowerCase()}`}
                              className="rounded-full"
                            >
                              {category}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>Select all that apply</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts, suggestions, or concerns..."
                          className="min-h-40 resize-none"
                          {...field}
                          data-testid="textarea-feedback"
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value.length}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Anonymous Toggle */}
                <FormField
                  control={form.control}
                  name="anonymous"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Submit Anonymously</FormLabel>
                        <FormDescription>
                          Your identity will not be recorded with this feedback
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value === 1}
                          onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                          data-testid="switch-anonymous"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Contact Information (if not anonymous) */}
                {!isAnonymous && (
                  <div className="grid gap-4 sm:grid-cols-2 p-4 rounded-lg border bg-muted/30">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              value={field.value || ""}
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              {...field}
                              value={field.value || ""}
                              data-testid="input-feedback-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full sm:w-auto"
                  data-testid="button-submit-feedback"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {submitMutation.isPending ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Recent Feedback Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{feedbackList.length}</div>
              <div className="text-sm text-muted-foreground">Total Feedback</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-primary/5">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">
                {feedbackList.length > 0
                  ? (
                      feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length
                    ).toFixed(1)
                  : "0.0"}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-4/5 to-primary/5">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-1">
                {feedbackList.filter((f) => f.rating >= 4).length}
              </div>
              <div className="text-sm text-muted-foreground">Positive Reviews</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
