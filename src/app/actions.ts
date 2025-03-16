"use server";

import { createClient } from "./supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { Polar } from "@polar-sh/sdk";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        email: email,
      },
    },
  });

  console.log("After signUp", error);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  if (user) {
    try {
      const { error: updateError } = await supabase.from("users").insert({
        id: user.id,
        name: fullName,
        full_name: fullName,
        email: email,
        user_id: user.id,
        token_identifier: user.id,
        created_at: new Date().toISOString(),
      });

      if (updateError) {
        console.error("Error updating user profile:", updateError);
      }
    } catch (err) {
      console.error("Error in user profile creation:", err);
    }
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {});

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const checkoutSessionAction = async ({
  productPriceId,
  successUrl,
  customerEmail,
  metadata,
}: {
  productPriceId: string;
  successUrl: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
}) => {
  const polar = new Polar({
    server: "sandbox",
    accessToken: process.env.POLAR_ACCESS_TOKEN,
  });

  const result = await polar.checkouts.create({
    productPriceId,
    successUrl,
    customerEmail,
    metadata,
  });

  return result;
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }

  return !!subscription;
};

export const manageSubscriptionAction = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }

  const polar = new Polar({
    server: "sandbox",
    accessToken: process.env.POLAR_ACCESS_TOKEN,
  });

  try {
    const result = await polar.customerSessions.create({
      customerId: subscription.customer_id,
    });

    // Only return the URL to avoid Convex type issues
    return { url: result.customerPortalUrl };
  } catch (error) {
    console.error("Error managing subscription:", error);
    return { error: "Error managing subscription" };
  }
};

// Course-related actions
export const markLessonCompleted = async (formData: FormData) => {
  const lessonId = formData.get("lessonId")?.toString();
  const userId = formData.get("userId")?.toString();
  const courseId = formData.get("courseId")?.toString();

  if (!lessonId || !userId || !courseId) {
    return encodedRedirect(
      "error",
      `/lesson/${lessonId}?courseId=${courseId}`,
      "Missing required information",
    );
  }

  const supabase = await createClient();

  // Update or insert lesson progress
  const { error: progressError } = await supabase
    .from("user_lesson_progress")
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      completed: true,
      updated_at: new Date().toISOString(),
    });

  if (progressError) {
    console.error("Error updating lesson progress:", progressError);
    return encodedRedirect(
      "error",
      `/lesson/${lessonId}?courseId=${courseId}`,
      "Could not update progress",
    );
  }

  // Get all lessons for this course
  const { data: modules } = await supabase
    .from("modules")
    .select("id")
    .eq("course_id", courseId);

  if (!modules) {
    return redirect(`/lesson/${lessonId}?courseId=${courseId}`);
  }

  const moduleIds = modules.map((m) => m.id);

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id")
    .in("module_id", moduleIds);

  if (!lessons) {
    return redirect(`/lesson/${lessonId}?courseId=${courseId}`);
  }

  // Get completed lessons
  const { data: completedLessons } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("completed", true)
    .in(
      "lesson_id",
      lessons.map((l) => l.id),
    );

  if (!completedLessons) {
    return redirect(`/lesson/${lessonId}?courseId=${courseId}`);
  }

  // Calculate progress percentage
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercentage = Math.round((completedCount / totalLessons) * 100);

  // Update course progress
  const { error: courseProgressError } = await supabase
    .from("user_progress")
    .upsert({
      user_id: userId,
      course_id: courseId,
      progress: progressPercentage,
      updated_at: new Date().toISOString(),
    });

  if (courseProgressError) {
    console.error("Error updating course progress:", courseProgressError);
  }

  return redirect(
    `/lesson/${lessonId}?courseId=${courseId}&moduleId=${formData.get("moduleId")?.toString() || ""}`,
  );
};

export const completeActivity = async ({
  userId,
  activityId,
  lessonId,
  courseId,
}: {
  userId: string;
  activityId: string;
  lessonId: string;
  courseId: string;
}) => {
  const supabase = await createClient();

  // Update activity progress
  const { error } = await supabase.from("user_activity_progress").upsert({
    user_id: userId,
    activity_id: activityId,
    completed: true,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error updating activity progress:", error);
    return { success: false, error: "Could not update activity progress" };
  }

  return { success: true };
};

export const submitQuizResults = async ({
  userId,
  quizId,
  score,
  maxScore,
  passed,
  lessonId,
  courseId,
}: {
  userId: string;
  quizId: string;
  score: number;
  maxScore: number;
  passed: boolean;
  lessonId: string;
  courseId: string;
}) => {
  const supabase = await createClient();

  // Insert quiz results
  const { error } = await supabase.from("user_quiz_results").insert({
    user_id: userId,
    quiz_id: quizId,
    score,
    max_score: maxScore,
    passed,
  });

  if (error) {
    console.error("Error submitting quiz results:", error);
    return { success: false, error: "Could not submit quiz results" };
  }

  // If passed, mark lesson as completed
  if (passed) {
    const { error: progressError } = await supabase
      .from("user_lesson_progress")
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed: true,
        updated_at: new Date().toISOString(),
      });

    if (progressError) {
      console.error("Error updating lesson progress:", progressError);
    } else {
      // Update course progress
      const formData = new FormData();
      formData.append("lessonId", lessonId);
      formData.append("userId", userId);
      formData.append("courseId", courseId);
      await markLessonCompleted(formData);
    }
  }

  return { success: true, passed };
};
