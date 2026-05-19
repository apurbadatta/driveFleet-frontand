"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { FaGoogle, FaCheck } from "react-icons/fa"; 
import { toast } from "react-hot-toast"; 
import Link from 'next/link'; 

export default function SignUpPage() {
  const router = useRouter();

  
  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
    });
    if (!error) {
      await authClient.signOut();
      router.push("/signin");
    }

    if (error) {
      toast.error(error.message || "Something went wrong!"); 
    }
    if (data) {
      toast.success("Success! You have signed up."); 
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-[90vh]">
   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
      
        <div className="lg:max-w-lg space-y-6">
          <span className="text-xs font-bold text-[#A8B548] uppercase tracking-widest">
            SECURE ACCESS
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-950 leading-tight tracking-tight">
            Create your DriveFleet account
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Manage listings, book available cars, and keep your rental history organized in one private dashboard.
          </p>
        </div>

    
        <div className="flex justify-center lg:justify-end">
          <Card className="max-w-[480px] w-full p-8 shadow-2xl rounded-3xl border border-slate-100 bg-white">
            <h1 className="text-3xl font-black text-slate-950 mb-6">Registration</h1>

            <Form className="flex flex-col gap-5 w-full" onSubmit={onSubmit}>
              
           
              <TextField isRequired name="name" type="text" className="w-full">
                <Label className="block text-sm font-bold text-slate-700 mb-2">Name</Label>
                <Input 
                  placeholder="Enter your name" 
                  className="w-full text-slate-800 bg-slate-50 border-slate-200"
                  variant="bordered"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              <TextField isRequired name="image" type="text" className="w-full">
                <Label className="block text-sm font-bold text-slate-700 mb-2">Photo URL</Label>
                <Input 
                  placeholder="Image URL" 
                  className="w-full text-slate-800 bg-slate-50 border-slate-200"
                  variant="bordered"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

          
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className="block text-sm font-bold text-slate-700 mb-2">Email</Label>
                <Input 
                  placeholder="john@example.com" 
                  className="w-full text-slate-800 bg-slate-50 border-slate-200"
                  variant="bordered"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

          
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                className="w-full"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <Label className="block text-sm font-bold text-slate-700 mb-2">Password</Label>
                <Input 
                  placeholder="Enter your password" 
                  className="w-full text-slate-800 bg-slate-50 border-slate-200"
                  variant="bordered"
                />
                <Description className="text-[11px] text-slate-400 mt-1 block">
                  Password must include uppercase, lowercase, and at least 6 characters.
                </Description>
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

            
              <div className="flex flex-col gap-3 mt-2">
                <Button 
                  type="submit"
                  className="w-full font-bold py-7 bg-[#CCFF00] hover:bg-[#b0dc00] text-slate-950 rounded-2xl text-base shadow-md transition flex items-center justify-center gap-2"
                >
                  <FaCheck className="text-sm" /> 
                  Register
                </Button>
              </div>
            </Form>

        
            <div className="flex flex-col gap-3 mt-3">
              <Button
                onClick={handleGoogleSignIn}
                variant="bordered"
                className="w-full font-bold py-7 border border-slate-200 text-slate-900 rounded-2xl text-base hover:bg-slate-50 transition flex items-center justify-center gap-3 shadow-sm"
              >
                <FaGoogle className="text-red-500 text-lg" />
                Google Login
              </Button>
            </div>

           
            <p className="text-center text-sm text-slate-600 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 font-bold hover:underline">
                Login
              </Link>
            </p>

          </Card>
        </div>

      </div>
    </div>
  );
}