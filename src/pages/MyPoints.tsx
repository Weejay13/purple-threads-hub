import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Gift, 
  Trophy, 
  Zap, 
  Crown,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Navigation from '@/components/Navigation';

const MyPoints = () => {
  const { user } = useAuth();
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState('Bronze');
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      sessionStorage.setItem('intendedDestination', '/my-points');
      window.location.href = '/auth';
      return;
    }
    calculatePoints();
  }, [user]);

  const calculatePoints = async () => {
    try {
      // Calculate points from bookings (10 points per booking)
      const { data: bookings } = await supabase
        .from('bookings')
        .select('total_amount, created_at, services(name)')
        .eq('user_id', user?.id);

      // Calculate points from orders (1 point per dollar spent)
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount, created_at')
        .eq('user_id', user?.id);

      let points = 0;
      const activity = [];

      if (bookings) {
        bookings.forEach(booking => {
          const bookingPoints = Math.floor(booking.total_amount) + 10; // 1 point per dollar + 10 bonus
          points += bookingPoints;
          activity.push({
            type: 'booking',
            points: bookingPoints,
            description: `Service booking: ${booking.services?.name}`,
            date: booking.created_at
          });
        });
      }

      if (orders) {
        orders.forEach(order => {
          const orderPoints = Math.floor(order.total_amount);
          points += orderPoints;
          activity.push({
            type: 'order',
            points: orderPoints,
            description: 'Product purchase',
            date: order.created_at
          });
        });
      }

      setTotalPoints(points);
      setRecentActivity(activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10));

      // Determine level
      if (points >= 1000) setCurrentLevel('Platinum');
      else if (points >= 500) setCurrentLevel('Gold');
      else if (points >= 200) setCurrentLevel('Silver');
      else setCurrentLevel('Bronze');
    } catch (error) {
      console.error('Error calculating points:', error);
    }
  };

  const rewards = [
    {
      id: 1,
      title: '10% Off Next Service',
      cost: 100,
      description: 'Get 10% discount on your next laundry service',
      icon: Gift,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Free Express Service',
      cost: 200,
      description: 'Upgrade to express service at no extra cost',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 3,
      title: 'Premium Detergent Upgrade',
      cost: 150,
      description: 'Free upgrade to premium eco-friendly detergent',
      icon: Sparkles,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 4,
      title: 'Free Pickup & Delivery',
      cost: 300,
      description: 'One month of free pickup and delivery service',
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const getLevelIcon = () => {
    switch (currentLevel) {
      case 'Platinum': return <Crown className="h-8 w-8 text-purple-600" />;
      case 'Gold': return <Trophy className="h-8 w-8 text-yellow-600" />;
      case 'Silver': return <Star className="h-8 w-8 text-gray-600" />;
      default: return <Star className="h-8 w-8 text-amber-600" />;
    }
  };

  const getLevelColor = () => {
    switch (currentLevel) {
      case 'Platinum': return 'from-purple-400 to-indigo-400';
      case 'Gold': return 'from-yellow-400 to-orange-400';
      case 'Silver': return 'from-gray-400 to-slate-400';
      default: return 'from-amber-400 to-yellow-400';
    }
  };

  const getNextLevelPoints = () => {
    switch (currentLevel) {
      case 'Bronze': return 200;
      case 'Silver': return 500;
      case 'Gold': return 1000;
      default: return null;
    }
  };

  if (!user) return null;

  return (
    <div className="lg:pl-64 pb-20 lg:pb-0">
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-800 mb-2 flex items-center justify-center gap-2">
              <Star className="h-8 w-8 text-amber-600" />
              My Points & Rewards
            </h1>
            <p className="text-amber-600 text-lg">Earn points and unlock amazing rewards</p>
          </div>

          {/* Points Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${getLevelColor()} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  {getLevelIcon()}
                </div>
                <CardTitle className="text-amber-800">Current Level</CardTitle>
                <Badge className={`bg-gradient-to-r ${getLevelColor()} text-white`}>
                  {currentLevel}
                </Badge>
              </CardHeader>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-amber-800">Total Points</CardTitle>
                <div className="text-3xl font-bold text-green-600">{totalPoints}</div>
              </CardHeader>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-amber-800">Next Level</CardTitle>
                {getNextLevelPoints() ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      {getNextLevelPoints()! - totalPoints} points to go
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((totalPoints / getNextLevelPoints()!) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <Badge className="bg-gradient-to-r from-purple-400 to-indigo-400 text-white">
                    Max Level!
                  </Badge>
                )}
              </CardHeader>
            </Card>
          </div>

          {/* Available Rewards */}
          <Card className="mb-8 bg-white/90 backdrop-blur-sm border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <Gift className="h-6 w-6" />
                Available Rewards
              </CardTitle>
              <CardDescription>Redeem your points for exciting rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => {
                  const Icon = reward.icon;
                  const canRedeem = totalPoints >= reward.cost;
                  
                  return (
                    <div 
                      key={reward.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        canRedeem 
                          ? 'border-green-200 bg-green-50 hover:shadow-lg' 
                          : 'border-gray-200 bg-gray-50 opacity-75'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${reward.bgColor} rounded-full flex items-center justify-center`}>
                          <Icon className={`h-6 w-6 ${reward.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{reward.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-amber-700 border-amber-300">
                              {reward.cost} points
                            </Badge>
                            <Button
                              size="sm"
                              disabled={!canRedeem}
                              className={`${
                                canRedeem 
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                                  : 'bg-gray-400'
                              }`}
                            >
                              {canRedeem ? 'Redeem' : 'Not enough points'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your recent point earning activities</CardDescription>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No activity yet. Start booking services or shopping to earn points!
                </p>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'booking' ? 'bg-purple-100' : 'bg-pink-100'
                        }`}>
                          {activity.type === 'booking' ? (
                            <Star className="h-5 w-5 text-purple-600" />
                          ) : (
                            <Gift className="h-5 w-5 text-pink-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{activity.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        +{activity.points} points
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyPoints;