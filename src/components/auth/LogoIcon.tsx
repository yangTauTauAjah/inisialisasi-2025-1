import { UserIcon, LockIcon, KeyIcon } from "lucide-react"

export function LogoIcon() {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/placeholder.svg?height=64&width=64&text=Logo"
        alt="Logo"
        className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center"
      />
    </div>
  )
}

export const User = UserIcon
export const Lock = LockIcon
export const Key = KeyIcon
