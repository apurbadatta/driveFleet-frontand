'use client';

import React, { useState } from 'react';
import { Card, CardHeader, Input, Button, Form } from "@heroui/react"; 
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from "@/lib/auth-client"; 
import { FaGoogle, FaEnvelope } from "react-icons/fa"; 

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
   
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const { email, password } = data;

    setLoading(true);

    try {
      const { error ,data } = await signIn.email({
        email: email,
        password: password,
        callbackURL: "/cars" 
      });

      if (error) {
        toast.error(error.message || 'Login failed. Please check your credentials.');
        return;
      }

      toast.success('Successfully logged in! 🔑');
      router.push('/cars');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      toast.loading('Logging in with Google...');
    } catch (error) {
        console.error(error);
        toast.error('Google login failed.');
    } finally {
        setGoogleLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-[90vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
     
        <div className="lg:max-w-lg space-y-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            SECURE ACCESS
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-950 leading-tight">
            Welcome back to DriveFleet
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Manage listings, book available cars, and keep your rental history organized in one private dashboard.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Card className="max-w-[450px] w-full p-8 shadow-2xl rounded-3xl border border-slate-100 bg-white">
            <CardHeader className="flex flex-col gap-1 items-start pb-6 px-0">
              <h1 className="text-3xl font-black text-slate-950">Login</h1>
              <p className="text-sm text-slate-500">Sign in to continue to your dashboard</p>
            </CardHeader>
            
            <div className="py-2">
              <Form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
                
              
                <div className="w-full">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <Input
                    type="email"
                    name="email" 
                    variant="bordered"
                    required
                    placeholder="name@email.com"
                    startContent={<FaEnvelope className="text-slate-400 mr-2" />}
                    className="w-full text-slate-800"
                  />
                </div>
                
              
                <div className="w-full">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                  <Input
                    type="password"
                    name="password" 
                    variant="bordered"
                    required
                    placeholder="••••••••"
                    className="w-full text-slate-800"
                  />
                </div>

           
                <Button 
                  type="submit" 
                  className="w-full font-bold py-7 bg-[#0062ff] hover:bg-[#000bdc] text-slate-950 rounded-2xl text-base shadow-md transition"
                  isLoading={loading}
                >
                  Login
                </Button>
                
              
                <Button 
                  variant="bordered"
                  className="w-full font-bold py-7 border border-slate-200 text-slate-900 rounded-2xl text-base hover:bg-slate-50 transition"
                  startContent={<FaGoogle className="text-red-500 mr-1" />}
                  isLoading={googleLoading}
                  onClick={handleGoogleLogin}
                >
                  Google Login
                </Button>

              </Form>

              <p className="text-center text-sm text-slate-600 mt-8">
                New to DriveFleet?{' '}
                <Link href="/register" className="text-blue-600 font-bold hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}