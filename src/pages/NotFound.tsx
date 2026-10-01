import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';

const NotFound = () => {
  return (
    <>
      <SEO title={seo.pageNotFound.title} description={seo.pageNotFound.description} />
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-xl text-center">
          {/* 404 */}
          <div className="mb-6">
            <h1 className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter text-primary">404</h1>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Oops! Page not found</h2>

            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or may have been moved. Let's get you back to something
              delicious.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Home className="size-4" />
              Back to Home
            </Link>

            <Button
              onClick={() => window.history.back()}
              variant={'ghost'}
              className="inline-flex items-center  justify-center gap-2 rounded-lg border border-border bg-background px-6! 
            h-11! text-sm font-medium transition-colors "
            >
              <ArrowLeft className="size-4" />
              Go Back
            </Button>
          </div>

          {/* Brand */}
          <p className="mt-12 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Craveo</span> — Your cravings, delivered.
          </p>
        </div>
      </main>
    </>
  );
};

export default NotFound;
