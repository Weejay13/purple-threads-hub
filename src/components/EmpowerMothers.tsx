
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Home, HandHeart } from 'lucide-react';

const EmpowerMothers = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-handwritten">
            Empower <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Our Mothers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-handwritten">
            Every service you book directly supports hardworking mothers in our community, providing them with flexible income opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg text-center">
            <CardContent className="p-6">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-handwritten">Support Local</h3>
              <p className="text-gray-600 text-sm font-handwritten">Your orders provide direct income to mothers in your neighborhood</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg text-center">
            <CardContent className="p-6">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Home className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-handwritten">Work From Home</h3>
              <p className="text-gray-600 text-sm font-handwritten">Flexible schedules that allow mothers to balance work and family</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg text-center">
            <CardContent className="p-6">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-handwritten">Build Community</h3>
              <p className="text-gray-600 text-sm font-handwritten">Creating connections and support networks among working mothers</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg text-center">
            <CardContent className="p-6">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <HandHeart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-handwritten">Make Impact</h3>
              <p className="text-gray-600 text-sm font-handwritten">Every booking contributes to women's economic empowerment</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 font-handwritten"
          >
            Learn More About Our Mission
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EmpowerMothers;
