import { useState } from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import ShareModal from "@/components/ShareModal";
import { cn } from "@/lib/utils";

interface VendorActionButtonsProps {
  vendorId: string;
  vendor?: { name: string; category: string };
  showLabels?: boolean;
  size?: "sm" | "default" | "lg";
  showShare?: boolean;
}

export const VendorActionButtons: React.FC<VendorActionButtonsProps> = ({
  vendorId,
  vendor,
  showLabels = false,
  size = "sm",
  showShare = true,
}) => {
  const [shareOpen, setShareOpen] = useState(false);
  const { isLiked, isFavorited, isSavedForLater, toggleLike, toggleFavorite, toggleSaveForLater } =
    useFavorites();

  const isLikedState = isLiked(vendorId);
  const isFavoritedState = isFavorited(vendorId);
  const isSavedState = isSavedForLater(vendorId);

  const buttonClasses = cn(
    "transition-all duration-300 shrink-0 text-xs h-8 px-2",
    size === "sm" && "gap-1",
    size === "default" && "gap-1.5",
    size === "lg" && "gap-2"
  );

  return (
    <div className="flex items-center gap-1.5 flex-nowrap overflow-x-auto pb-1">
      {/* Like Button */}
      <Button
        variant={isLikedState ? "accent" : "outline"}
        size={size}
        className={buttonClasses}
        onClick={() => toggleLike(vendorId)}
        title={isLikedState ? "Unlike this vendor" : "Like this vendor"}
      >
        <Heart
          className={cn("h-4 w-4", isLikedState && "fill-current")}
        />
        {showLabels && <span>{isLikedState ? "Liked" : "Like"}</span>}
      </Button>

      {/* Love Button (Favorite) */}
      <Button
        variant={isFavoritedState ? "accent" : "outline"}
        size={size}
        className={buttonClasses}
        onClick={() => toggleFavorite(vendorId)}
        title={isFavoritedState ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn("h-4 w-4", isFavoritedState && "fill-current text-red-500")}
          color={isFavoritedState ? "#ef4444" : "currentColor"}
        />
        {showLabels && <span>{isFavoritedState ? "Favorited" : "Favorite"}</span>}
      </Button>

      {/* Save for Later Button */}
      <Button
        variant={isSavedState ? "accent" : "outline"}
        size={size}
        className={buttonClasses}
        onClick={() => toggleSaveForLater(vendorId)}
        title={isSavedState ? "Remove from saved" : "Save for later"}
      >
        <Bookmark
          className={cn("h-4 w-4", isSavedState && "fill-current")}
        />
        {showLabels && <span>{isSavedState ? "Saved" : "Save"}</span>}
      </Button>

      {/* Share Button */}
      {showShare && (
        <>
          <Button
            variant="outline"
            size={size}
            className={buttonClasses}
            onClick={() => setShareOpen(true)}
            title="Share this vendor"
          >
            <Share2 className="h-4 w-4" />
            {showLabels && <span>Share</span>}
          </Button>
          <ShareModal
            open={shareOpen}
            onOpenChange={setShareOpen}
            vendorId={vendorId}
            vendorName={vendor?.name || "Vendor"}
          />
        </>
      )}
    </div>
  );
};

export default VendorActionButtons;
