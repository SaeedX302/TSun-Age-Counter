"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react"
import type { ZodiacSign } from "@/lib/zodiac"

interface ShareButtonsProps {
  age: {
    years: number
    months: number
    days: number
    hours: number
  } | null
  zodiacSign: ZodiacSign | null
}

export function ShareButtons({ age, zodiacSign }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  if (!age || !zodiacSign) {
    return null
  }

  const shareText = `I am ${age.years} years, ${age.months} months, and ${age.days} days old. 
My zodiac sign is ${zodiacSign.name} ${zodiacSign.emoji}
Check your age with this vintage calculator!`

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "My Age Calculation",
          text: shareText,
          url: shareUrl,
        })
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const handleCopy = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(shareText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      console.error("Error copying:", error)
    }
  }

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`

  // Check if Web Share API is available
  const canShare = typeof navigator !== "undefined" && navigator.share

  return (
    <div className="opacity-100 transform-none">
      <Card className="vintage-card overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {canShare && (
              <Button onClick={handleShare} variant="outline" className="vintage-button">
                <Share2 className="h-4 w-4 mr-2 text-vintage-dark" />
                Share
              </Button>
            )}

            <Button onClick={() => window.open(twitterShareUrl, "_blank")} variant="outline" className="vintage-button">
              <Twitter className="h-4 w-4 mr-2 text-vintage-dark" />
              Twitter
            </Button>

            <Button
              onClick={() => window.open(facebookShareUrl, "_blank")}
              variant="outline"
              className="vintage-button"
            >
              <Facebook className="h-4 w-4 mr-2 text-vintage-dark" />
              Facebook
            </Button>

            <Button
              onClick={() => window.open(linkedinShareUrl, "_blank")}
              variant="outline"
              className="vintage-button"
            >
              <Linkedin className="h-4 w-4 mr-2 text-vintage-dark" />
              LinkedIn
            </Button>

            <Button onClick={handleCopy} variant="outline" className="vintage-button">
              {copied ? (
                <Check className="h-4 w-4 mr-2 text-green-700" />
              ) : (
                <Copy className="h-4 w-4 mr-2 text-vintage-dark" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
