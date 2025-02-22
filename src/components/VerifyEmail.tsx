"use client"

import { trpc } from "@/trpc/client"
import { Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

interface VerifyEmailProps {
    token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
    const { data, isError, isLoading } = 
        trpc.auth.verifyEmail.useQuery({
            token
    })

    if (isError) {
        return (
            <div className="flex flex-col items-center gap-2">
                <XCircle className="h-8 w-8 text-red-600" />
                <h3 className="font-semibold text-xl">
                    There was a problem
                </h3>
                <p className="text-muted-foreground text-sm">
                    this token is invalid or might expired. 
                    Please try again.
                </p>
            </div>
        )
    }

    if (data?.success) {
        return (
            <div className="flex h-full flex-col items-center justify-center">
                {/* TODO: replace it with Image */}
               <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                    {/* <h1>The Email was sent</h1>  */}
                </div> 

                <h3 className="font-semibold text-2xl">
                    You&apos;re all set!
                </h3>
                <p className="text-muted-foreground text-center mt-1">Thank you for verifying your email.</p>
                <Link 
                    href="/sing-in" 
                    className={buttonVariants({ className: "mt-4", variant: "link" })}>
                        Sign in
                    </Link>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
            <h3 className="font-semibold text-xl">
                Verifying...
            </h3>
            <p className="text-muted-foreground text-sm">
                This won&apos;t take long.
            </p>
        </div>
        )
    }

}

export default VerifyEmail