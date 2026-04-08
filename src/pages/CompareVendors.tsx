import { Link, useSearchParams } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allVendors } from "@/data/vendorDiscovery";

const CompareVendors = () => {
  const [searchParams] = useSearchParams();
  const ids = (searchParams.get("ids") || "").split(",").map(value => value.trim()).filter(Boolean);
  const vendors = allVendors.filter(vendor => ids.includes(vendor.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-10">
        <h1 className="font-heading text-3xl font-bold mb-2">Compare Vendors</h1>
        <p className="text-muted-foreground mb-8">Compare price, ratings, and offerings side-by-side.</p>

        {vendors.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No vendors selected. Return to browse and add vendors to compare.
              <div className="mt-4">
                <Button asChild variant="outline"><Link to="/browse">Go to Browse</Link></Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-semibold">Field</th>
                  {vendors.map(vendor => (
                    <th key={vendor.id} className="text-left p-3 min-w-[220px]">{vendor.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3 font-medium">Category</td>
                  {vendors.map(vendor => <td key={vendor.id} className="p-3">{vendor.category}</td>)}
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium">Location</td>
                  {vendors.map(vendor => <td key={vendor.id} className="p-3">{vendor.city}, {vendor.state}</td>)}
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium">Starting Price</td>
                  {vendors.map(vendor => <td key={vendor.id} className="p-3">${vendor.startingPrice}</td>)}
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium">Rating</td>
                  {vendors.map(vendor => <td key={vendor.id} className="p-3">{vendor.rating} ({vendor.reviewCount})</td>)}
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium">Top Package</td>
                  {vendors.map(vendor => <td key={vendor.id} className="p-3">{vendor.packages[0]?.name ?? "N/A"}</td>)}
                </tr>
                <tr className="border-t">
                  <td className="p-3 font-medium">Action</td>
                  {vendors.map(vendor => (
                    <td key={vendor.id} className="p-3">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/vendor/${vendor.id}`}>View Profile</Link>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {vendors.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {vendors.map(vendor => (
              <Card key={`tile-${vendor.id}`}>
                <CardContent className="p-4">
                  <img src={vendor.photo} alt={vendor.name} className="h-32 w-full object-cover rounded-md mb-3" />
                  <h3 className="font-semibold mb-1">{vendor.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><MapPin className="h-3 w-3" /> {vendor.city}, {vendor.state}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {vendor.rating}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CompareVendors;
