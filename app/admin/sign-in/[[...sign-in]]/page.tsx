import { ClerkProvider, SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <ClerkProvider>
      <div className="flex min-h-screen items-center justify-center">
        <SignIn
          routing="path"
          path="/admin/sign-in"
          forceRedirectUrl="/admin"
          fallbackRedirectUrl="/admin"
        />
      </div>
    </ClerkProvider>
  )
}