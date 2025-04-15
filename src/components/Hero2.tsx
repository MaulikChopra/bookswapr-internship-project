import { Link } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Hero2() {
  return (
    <div>
      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
            Explore the Endless Possibilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Discover Hidden Gems
              </h3>
              <p className="text-muted-foreground">
                Unearth a treasure trove of books from classic literature to
                contemporary bestsellers.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 1"
                width={500}
                height={300}
                className="rounded-md mt-4"
              />
            </div>
            {/* Feature Card 2 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Share Your Literary Treasures
              </h3>
              <p className="text-muted-foreground">
                List your cherished books and give them a new life with fellow
                book enthusiasts.
              </p>
              <Image
                src="https://plus.unsplash.com/premium_photo-1663099585867-10856399b02b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9vayUyMHNoYXJpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Feature 2"
                width={500}
                height={300}
                className="rounded-md mt-4"
              />
            </div>
            {/* Feature Card 3 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Connect with Bookworms
              </h3>
              <p className="text-muted-foreground">
                Build meaningful connections with like-minded readers and expand
                your literary horizons.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1660128359777-c7e5f29e4106?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2slMjBzaGFyaW5nfGVufDB8fDB8fHww"
                alt="Feature 3"
                width={500}
                height={300}
                className="rounded-md mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-soft-blue">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-8">
            From Our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Review Card 1 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start mb-4">
                <Image
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  alt="Jane Doe"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="text-muted-foreground italic mb-2">
                    "BookSwapr has transformed my reading life! I've discovered
                    authors I never would have found otherwise."
                  </p>
                  <p className="font-semibold text-foreground">Jane Doe</p>
                </div>
              </div>
            </div>
            {/* Review Card 2 */}
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start mb-4">
                <Image
                  src="https://randomuser.me/api/portraits/men/83.jpg"
                  alt="John Smith"
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="text-muted-foreground italic mb-2">
                    "I love being able to exchange books with others and give my
                    old favorites a new home. It's a win-win!"
                  </p>
                  <p className="font-semibold text-foreground">John Smith</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Ready to Dive In?
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Join BookSwapr today and become part of a thriving community of book
            lovers. Start exploring, sharing, and connecting now!
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto" variant="default">
                Get Started
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero2;
