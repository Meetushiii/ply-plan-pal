
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const employeeRegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  employeeCode: z.string().min(4, "Employee code must be at least 4 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type EmployeeRegisterFormValues = z.infer<typeof employeeRegisterSchema>;

const EmployeeRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<EmployeeRegisterFormValues>({
    resolver: zodResolver(employeeRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      employeeCode: "",
    },
  });

  const onSubmit = async (values: EmployeeRegisterFormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would verify the employee code with the backend
      if (values.employeeCode !== "1234") {
        throw new Error("Invalid employee code");
      }
      
      await register(values.name, values.email, values.password, 'employee');
      navigate("/dashboard");
    } catch (error: any) {
      // Error is handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-wood-light">
      <div className="w-full max-w-md px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-navy">PlyInventory</h1>
          <p className="text-slate-600">Employee Registration</p>
        </div>
        
        <Card className="border-wood shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl text-navy">Register as Employee</CardTitle>
            <CardDescription>Create an employee account with proper authorization</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                        <Input placeholder="you@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="employeeCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Authorization Code</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter provided code" {...field} />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-slate-500 mt-1">(For demo, use "1234" as the employee code)</p>
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-wood hover:bg-wood-dark"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to="/">
              <Button variant="link" className="p-0">Back to Home</Button>
            </Link>
            <Link to="/employee-login">
              <Button variant="link" className="p-0">Already have an account? Login</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeRegister;
