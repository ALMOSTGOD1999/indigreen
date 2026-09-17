import { useForm, usePage } from '@inertiajs/react'
import { route } from '@izzyjs/route/client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import PasswordInput from '~/components/ui/password-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { HugeiconsIcon } from '@hugeicons/react'
import { CheckmarkCircle02Icon, Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons'

interface CreateUserDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateUserDialog({ isOpen, onOpenChange }: CreateUserDialogProps) {
  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    name: '',
    email: '',
    phone: '',
    password: '',
    parentId: '',
    role: 'user',
  })

  const page = usePage()
  const flash = (page.props as any).flash
  const createdUser = flash?.createdUser as { name: string; id: string; password: string } | undefined

  const [parentName, setParentName] = useState<string>('')
  const [parentLoading, setParentLoading] = useState(false)
  const [parentError, setParentError] = useState<string>('')
  const lookupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      reset()
      clearErrors()
      setParentName('')
      setParentError('')
    }
  }, [isOpen])

  const lookupParent = useCallback((id: string) => {
    if (lookupTimerRef.current) {
      clearTimeout(lookupTimerRef.current)
    }

    if (!id) {
      setParentName('')
      setParentError('')
      return
    }

    setParentLoading(true)
    setParentError('')

    lookupTimerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/admin/users/${id}/lookup`)
        if (res.ok) {
          const user = await res.json()
          setParentName(user.name)
          setParentError('')
        } else if (res.status === 404) {
          setParentName('')
          setParentError('User not found')
        } else {
          setParentName('')
          setParentError('Lookup failed')
        }
      } catch {
        setParentName('')
        setParentError('Lookup failed')
      } finally {
        setParentLoading(false)
      }
    }, 400)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('admin.users.store').toString(), {
      onSuccess: () => {
        // Keep dialog open to show success popup — reset form only
        reset()
        clearErrors()
      },
    })
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  // Success view — show created user credentials
  if (createdUser) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-8 w-8 text-emerald-600" />
            </div>
            <DialogTitle className="text-center text-xl">User Created Successfully</DialogTitle>
            <DialogDescription className="text-center">
              Share these credentials with the user. This information won't be shown again.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium">{createdUser.name}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">User ID</p>
                <p className="font-mono font-bold text-lg">{createdUser.id}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => copyToClipboard(createdUser.id, 'id')}
              >
                <HugeiconsIcon
                  icon={copiedField === 'id' ? Tick02Icon : Copy01Icon}
                  className="h-4 w-4"
                />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Password</p>
                <p className="font-mono font-bold">{createdUser.password}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => copyToClipboard(createdUser.password, 'password')}
              >
                <HugeiconsIcon
                  icon={copiedField === 'password' ? Tick02Icon : Copy01Icon}
                  className="h-4 w-4"
                />
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Create form view
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user. Leave Parent ID empty to create a root user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="John Doe"
              />
              {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-xs text-destructive">{errors.email}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                placeholder="9876543210"
              />
              {errors.phone && <span className="text-xs text-destructive">{errors.phone}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="parentId">Parent ID</Label>
              <Input
                id="parentId"
                type="text"
                placeholder="IG123456"
                value={data.parentId}
                onChange={(e) => {
                  setData('parentId', e.target.value)
                  lookupParent(e.target.value)
                }}
              />
              {parentLoading && (
                <span className="text-xs text-muted-foreground">Looking up user...</span>
              )}
              {parentName && !parentLoading && (
                <span className="text-xs text-green-600 font-medium">{parentName}</span>
              )}
              {parentError && !parentLoading && (
                <span className="text-xs text-destructive">{parentError}</span>
              )}
              {errors.parentId && (
                <span className="text-xs text-destructive">{errors.parentId}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <span className="text-xs text-destructive">{errors.password}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="franchise">Franchise</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <span className="text-xs text-destructive">{errors.role}</span>}
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={processing} onClick={submit}>
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
