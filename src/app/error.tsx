"use client";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">Something went wrong!</h1>
        <p className="mb-4 text-muted-foreground">
          {error.message ||
            "An unexpected error occurred while loading hotels data."}
        </p>
        <Button onClick={reset} variant="default">
          Try again
        </Button>
      </div>
    </div>
  );
};

export default Error;
