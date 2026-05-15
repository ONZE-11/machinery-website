// Server-only — do not import in client components.
import { currentUser } from "@clerk/nextjs/server"

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? ""
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string): boolean {
  return getAdminEmails().includes(email.toLowerCase())
}

/** Returns true if the current Clerk session belongs to an admin email.
 *  Call at the top of every mutating API route. */
export async function verifyAdmin(): Promise<boolean> {
  const user = await currentUser()
  if (!user) return false
  const email =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? user.emailAddresses[0]?.emailAddress
  return !!(email && isAdminEmail(email))
}
