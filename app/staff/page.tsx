"use client"

import { useState, useMemo } from "react"
import { Search, Coffee, Shield, Users, Gift } from "lucide-react"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  memberSince: string
  memberNumber: number
  mugEligible: boolean
}

export default function StaffPage() {
  const [pin, setPin] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [totalActive, setTotalActive] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  async function handleLogin() {
    if (!pin.trim()) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/staff/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong.")
        setLoading(false)
        return
      }

      setMembers(data.members)
      setTotalActive(data.totalActive)
      setAuthenticated(true)
    } catch {
      setError("Could not connect. Try again.")
    } finally {
      setLoading(false)
    }
  }

  async function refreshMembers() {
    setLoading(true)
    try {
      const res = await fetch("/api/staff/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      })
      const data = await res.json()
      if (res.ok) {
        setMembers(data.members)
        setTotalActive(data.totalActive)
      }
    } catch {
      // silently fail on refresh
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return members
    const q = search.toLowerCase()
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        String(m.memberNumber) === q
    )
  }, [members, search])

  const mugCount = members.filter((m) => m.mugEligible).length

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-soft-white/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-warm-gold" />
            </div>
            <h1 className="font-serif text-3xl text-soft-white mb-2">Staff Access</h1>
            <p className="font-sans text-soft-white/50 text-sm">Sweetside Drip Club Members</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter staff PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-4 bg-soft-white/10 border-2 border-soft-white/20 text-soft-white font-sans text-center text-2xl tracking-[0.5em] rounded-lg placeholder:text-soft-white/30 placeholder:tracking-normal placeholder:text-base focus:outline-none focus:border-warm-gold transition-colors"
              autoFocus
            />
            <button
              onClick={handleLogin}
              disabled={loading || !pin.trim()}
              className="w-full py-4 bg-crimson-red hover:bg-warm-gold hover:text-charcoal text-soft-white font-sans font-semibold uppercase tracking-wide rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Access Member List"}
            </button>
            {error && (
              <p className="text-crimson-red font-sans text-sm text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="border-b border-soft-white/10 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coffee className="w-6 h-6 text-warm-gold" />
            <h1 className="font-serif text-xl text-soft-white">Drip Club Members</h1>
          </div>
          <button
            onClick={refreshMembers}
            disabled={loading}
            className="font-sans text-sm text-warm-gold hover:text-soft-white transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-soft-white/5 rounded-lg p-4 border border-soft-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-warm-gold" />
              <span className="font-sans text-xs text-soft-white/50 uppercase tracking-wide">Active Members</span>
            </div>
            <p className="font-serif text-3xl text-soft-white">{totalActive}</p>
          </div>
          <div className="bg-soft-white/5 rounded-lg p-4 border border-soft-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-4 h-4 text-warm-gold" />
              <span className="font-sans text-xs text-soft-white/50 uppercase tracking-wide">Mugs Given</span>
            </div>
            <p className="font-serif text-3xl text-soft-white">{mugCount}<span className="text-soft-white/40 text-lg"> / 50</span></p>
          </div>
          <div className="bg-soft-white/5 rounded-lg p-4 border border-soft-white/10 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans text-xs text-soft-white/50 uppercase tracking-wide">Monthly Revenue</span>
            </div>
            <p className="font-serif text-3xl text-soft-white">${totalActive * 20}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-white/30" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or member #"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-soft-white/5 border border-soft-white/10 text-soft-white font-sans rounded-lg placeholder:text-soft-white/30 focus:outline-none focus:border-warm-gold transition-colors"
          />
        </div>

        {/* Member List */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <p className="text-soft-white/40 font-sans text-center py-8">
              {search ? "No members match that search." : "No active members yet."}
            </p>
          )}
          {filtered.map((member) => (
            <div
              key={member.id}
              className="bg-soft-white/5 border border-soft-white/10 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6"
            >
              <div className="flex items-center gap-3 shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-sans font-bold text-sm ${
                  member.mugEligible
                    ? "bg-warm-gold/20 text-warm-gold"
                    : "bg-soft-white/10 text-soft-white/50"
                }`}>
                  #{member.memberNumber}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-soft-white truncate">{member.name}</p>
                <p className="font-sans text-sm text-soft-white/50 truncate">{member.email}</p>
              </div>

              {member.phone !== "—" && (
                <p className="font-sans text-sm text-soft-white/40 shrink-0">{member.phone}</p>
              )}

              <div className="flex items-center gap-3 shrink-0">
                {member.mugEligible && (
                  <span className="font-sans text-xs bg-warm-gold/20 text-warm-gold px-2 py-1 rounded-full">
                    Mug
                  </span>
                )}
                <span className="font-sans text-xs text-soft-white/30">
                  Since {member.memberSince}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
