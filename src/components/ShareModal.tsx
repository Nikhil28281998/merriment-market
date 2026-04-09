import { useState } from "react";
import { Share2, Facebook, Twitter, Mail, Copy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendorId?: string;
  vendorName?: string;
  title?: string;
  description?: string;
  isCollection?: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  open,
  onOpenChange,
  vendorId,
  vendorName = "Vendor",
  title = "Share",
  description = "Share with others",
  isCollection = false,
}) => {
  const [copied, setCopied] = useState(false);

  // Build share URL
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    if (isCollection) {
      return `${baseUrl}/my-favorites`;
    }
    return `${baseUrl}/vendor/${vendorId}`;
  };

  const shareUrl = getShareUrl();
  const shareText = isCollection
    ? `Check out my favorite vendors on EventzHub!`
    : `Check out ${vendorName} on EventzHub - Find and book event vendors!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: vendorName,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled share
      }
    }
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "facebook-share", "width=600,height=400");
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "twitter-share", "width=600,height=400");
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
    window.open(url, "whatsapp-share");
  };

  const handleEmailShare = () => {
    const subject = isCollection ? "Check out my EventzHub collections" : `Check out ${vendorName} on EventzHub`;
    const body = `${shareText}\n\n${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareOptions = [
    {
      label: "Copy Link",
      icon: copied ? Check : Copy,
      onClick: handleCopyLink,
      className: "text-blue-600",
    },
    {
      label: "Facebook",
      icon: Facebook,
      onClick: handleFacebookShare,
      className: "text-blue-600",
    },
    {
      label: "Twitter",
      icon: Twitter,
      onClick: handleTwitterShare,
      className: "text-sky-500",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      onClick: handleWhatsAppShare,
      className: "text-green-600",
    },
    {
      label: "Email",
      icon: Mail,
      onClick: handleEmailShare,
      className: "text-gray-600",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Share URL Preview */}
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Share Link:</p>
            <p className="text-sm truncate text-foreground font-mono">{shareUrl}</p>
          </div>

          {/* Share Options Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {shareOptions.map(option => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.label}
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2 h-24"
                  onClick={option.onClick}
                >
                  <Icon className={cn("h-5 w-5", option.className)} />
                  <span className="text-xs font-medium text-center">{option.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Native Share Button */}
          {navigator.share && (
            <Button onClick={handleNativeShare} className="w-full gap-2">
              <Share2 className="h-4 w-4" />
              More Sharing Options
            </Button>
          )}

          {/* Description */}
          <p className="text-xs text-muted-foreground text-center">
            {description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
