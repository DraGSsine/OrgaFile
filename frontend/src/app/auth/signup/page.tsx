import SignupPageForm from '@/components/signup/SignupPageForm'
import Discover from '@/components/signup/discover'
import { AuthWelcome } from '@/components/signup/AuthWelcome'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title: 'Sign In',
  description: "Sign in to your account and get started with OrgaFile.",
}

const Page = () => {
  return (
    <div className=" w-full md:w-[60%] flex flex-col items-center justify-center bg-gradient-to-br from-background via-background/98 to-background/95">
      <div className="w-[85%] max-w-[480px] py-16 relative">
        <AuthWelcome title="Create your account" paragraph="Already have an account?" authLink="/auth/signin" authTitle="Sign in" />
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className=" bg-background px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <SignupPageForm />
      </div>
    </div>
  );
}

export default Page