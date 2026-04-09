import { useState } from "react";
import { Heart, Bookmark, Trash2, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShareModal from "@/components/ShareModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from "@/contexts/FavoritesContext";
import { allVendors } from "@/data/vendorDiscovery";

const MyFavoritesPage = () => {
  const [shareOpen, setShareOpen] = useState(false);
  const { liked, favorited, savedForLater, toggleLike, toggleFavorite, toggleSaveForLater } = useFavorites();

  const likedVendors = allVendors.filter((v) => liked.includes(v.id));
  const favoritedVendors = allVendors.filter((v) => favorited.includes(v.id));
  const savedVendors = allVendors.filter((v) => savedForLater.includes(v.id));

  const VendorGrid = ({ vendors, type }: { vendors: typeof allVendors; type: "liked" | "favorited" | "saved" }) => {
    if (vendors.length === 0) {
      return (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mb-4">
              {type === "liked" && <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />}
              {type === "favorited" && <Heart className="h-12 w-12 mx-auto text-red-500 mb-4 fill-current" />}
              {type === "saved" && <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />}
            </div>
            <p className="text-muted-foreground mb-4">
              {type === "liked" && "You haven't liked any vendors yet"}
              {type === "favorited" && "You haven't favorited any vendors yet"}
              {type === "saved" && "You haven't saved any vendors yet"}
            </p>
            <Button variant="accent" asChild>
              <Link to="/browse">Browse Vendors Now</Link>
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img src={vendor.photo} alt={vendor.name} className="w-full h-40 object-cover" />
            <CardContent className="p-4">
              <Badge variant="outline" className="mb-2">
                {vendor.category}
              </Badge>
              <h3 className="font-heading font-bold mb-1 line-clamp-2">{vendor.name}</h3>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                📍 {vendor.city}, {vendor.state}
              </p>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                ⭐ {vendor.rating} ({vendor.reviewCount})
              </p>

              <div className="flex gap-2 flex-wrap mb-3">
                {type === "liked" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => toggleLike(vendor.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Unlike
                  </Button>
                )}
                {type === "favorited" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => toggleFavorite(vendor.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                )}
                {type === "saved" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => toggleSaveForLater(vendor.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                )}
              </div>

              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to={`/vendor/${vendor.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">My Collections</h1>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShareOpen(true)}
            >
              <Share2 className="h-4 w-4" />
              Share Collections
            </Button>
          </div>
          <p className="text-muted-foreground">
            Manage your liked vendors, favorites, and saved-for-later items in one place.
          </p>
        </div>

        <ShareModal
          open={shareOpen}
          onOpenChange={setShareOpen}
          title="Share My Collections"
          description="Share your favorite vendors with friends and family"
          isCollection={true}
        />

        <Tabs defaultValue="liked" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="liked" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>
                Liked
                {liked.length > 0 && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">{liked.length}</span>}
              </span>
            </TabsTrigger>
            <TabsTrigger value="favorited" className="flex items-center gap-2">
              <Heart className="h-4 w-4 fill-current text-red-500" />
              <span>
                Favorites
                {favorited.length > 0 && <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{favorited.length}</span>}
              </span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              <span>
                Saved
                {savedForLater.length > 0 && <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">{savedForLater.length}</span>}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="liked">
            <VendorGrid vendors={likedVendors} type="liked" />
          </TabsContent>
          <TabsContent value="favorited">
            <VendorGrid vendors={favoritedVendors} type="favorited" />
          </TabsContent>
          <TabsContent value="saved">
            <VendorGrid vendors={savedVendors} type="saved" />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MyFavoritesPage;
