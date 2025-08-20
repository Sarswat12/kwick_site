import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  pageName: string;
}

export default function PlaceholderPage({ pageName }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <Construction className="h-24 w-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{pageName} Coming Soon</h1>
        <p className="text-gray-600 mb-8">
          We're working hard to bring you this page. Check back soon for updates!
        </p>
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            Want this page built? Continue prompting to add more content to your KWICK website.
          </p>
        </div>
      </div>
    </div>
  );
}
