import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, MessageCircle, Mail, Link as LinkIcon, Copy, Check } from "lucide-react";
import { SiWhatsapp, SiFacebook, SiX } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Share() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = "https://safeher.app";
  const shareMessage = "Stay safe with SafeHer - AI-powered women's safety app. Download now!";

  const recordShareMutation = useMutation({
    mutationFn: async (platform: string) => {
      return await apiRequest("POST", "/api/share", { platform });
    },
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Share link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: string) => {
    const encodedMessage = encodeURIComponent(shareMessage);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
      email: `mailto:?subject=Check%20out%20SafeHer&body=${encodedMessage}%20${encodedUrl}`,
      sms: `sms:?body=${encodedMessage}%20${encodedUrl}`,
    };

    if (urls[platform]) {
      recordShareMutation.mutate(platform);
      window.open(urls[platform], "_blank");
      toast({
        title: "Opening share dialog",
        description: `Sharing on ${platform}`,
      });
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-950",
      action: () => handleShare("whatsapp"),
    },
    {
      name: "SMS",
      icon: MessageCircle,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-950",
      action: () => handleShare("sms"),
    },
    {
      name: "Email",
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-950",
      action: () => handleShare("email"),
    },
    {
      name: "Facebook",
      icon: SiFacebook,
      color: "text-blue-700",
      bg: "bg-blue-100 dark:bg-blue-950",
      action: () => handleShare("facebook"),
    },
    {
      name: "X (Twitter)",
      icon: SiX,
      color: "text-sky-600",
      bg: "bg-sky-100 dark:bg-sky-950",
      action: () => handleShare("twitter"),
    },
  ];

  return (
    <div className="min-h-screen pb-20 pt-4">
      <div className="container max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Share SafeHer
          </h2>
          <p className="text-muted-foreground">
            Help keep your loved ones safe
          </p>
        </motion.div>

        <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Spread Safety
            </h3>
            <p className="text-sm text-muted-foreground">
              Share SafeHer with your friends, family, and community. Together we can create a safer environment for all women.
            </p>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Share via</h3>
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option, index) => (
              <motion.div
                key={option.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  variant="outline"
                  onClick={option.action}
                  className="w-full h-auto flex-col gap-2 p-4 hover-elevate"
                  data-testid={`button-share-${option.name.toLowerCase()}`}
                >
                  <div className={`w-12 h-12 rounded-full ${option.bg} flex items-center justify-center`}>
                    <option.icon className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <span className="text-xs font-medium">{option.name}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-primary" />
              Share Link
            </CardTitle>
            <CardDescription>Copy and share the app link</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1 px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground truncate">
                {shareUrl}
              </div>
              <Button
                onClick={handleCopyLink}
                size="icon"
                variant="outline"
                data-testid="button-copy-link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Why Share?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Help your friends and family stay safe with advanced safety features
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Create a stronger safety network in your community
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Empower more women with AI-powered safety tools
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                Together we can make a difference in women's safety
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
