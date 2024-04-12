"use client";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSignupSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = ({}) => {
  const form = useForm<z.infer<typeof formSignupSchema>>({
    resolver: zodResolver(formSignupSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (val: z.infer<typeof formSignupSchema>) => {
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(val),
      });

      toast({
        title: "Success",
        description: "Create account success",
      });

      router.push("/signin");
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again",
      });
    }
  };
  return (
    <div>
      <div className="text-3xl text-center font-semibold mb-7">
        {" "}
        Get more opportunities
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
          <div className="text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link href={"/signin"} className="text-primary font-medium">
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpPage;
