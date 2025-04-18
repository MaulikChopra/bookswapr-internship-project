"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "../../context/UserContext";

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Invalid username.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type LoginValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useUser();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await fetch("/api/login", {
        // Use backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        const user = {
          id: data.userId,
          role: data.role,
          username: data.username,
          name: data.name,
          phone: data.phone,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });

        // Redirect based on user role
        if (data.role === "seeker") {
          router.push("/dashboard/seeker");
        } else if (data.role === "owner") {
          router.push("/dashboard/owner");
        } else {
          router.push("/"); // Or handle other roles/cases
        }
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.message || "Invalid credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button type="submit">
            Login <Icons.login className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
