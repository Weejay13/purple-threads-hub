
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Gift, Trophy, Users } from 'lucide-react';

const PointsRewards = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-handwritten">
            Earn <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Points & Rewards</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-handwritten">
            Every service you book earns you valuable points that you can redeem for amazing rewards!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-handwritten">Earn Points</h3>
              <p className="text-gray-600 mb-4 font-handwritten">Get 10 points for every dollar spent on our laundry services</p>
              <div className="text-2xl font-bold text-purple-600 font-casual">10 pts/$1</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-handwritten">Redeem Rewards</h3>
              <p className="text-gray-600 mb-4 font-handwritten">Exchange your points for free services, discounts, and exclusive products</p>
              <div className="text-2xl font-bold text-purple-600 font-casual">500+ Rewards</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-handwritten">VIP Status</h3>
              <p className="text-gray-600 mb-4 font-handwritten">Unlock premium benefits and priority service with higher tier status</p>
              <div className="text-2xl font-bold text-purple-600 font-casual">VIP Access</div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 font-handwritten"
          >
            View Your Points
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PointsRewards;
