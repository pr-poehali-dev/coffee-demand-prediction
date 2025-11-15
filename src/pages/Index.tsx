import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Index = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('forecast');

  const forecastData = [
    { month: 'Янв', actual: 4200, forecast: 4100, seasonal: 0.85 },
    { month: 'Фев', actual: 3800, forecast: 3900, seasonal: 0.82 },
    { month: 'Мар', actual: 4500, forecast: 4400, seasonal: 0.95 },
    { month: 'Апр', actual: 5200, forecast: 5100, seasonal: 1.08 },
    { month: 'Май', actual: 5800, forecast: 5700, seasonal: 1.15 },
    { month: 'Июн', actual: 6200, forecast: 6100, seasonal: 1.22 },
    { month: 'Июл', forecast: 6500, seasonal: 1.25 },
    { month: 'Авг', forecast: 6400, seasonal: 1.20 },
    { month: 'Сен', forecast: 5900, seasonal: 1.10 },
    { month: 'Окт', forecast: 5300, seasonal: 1.05 },
    { month: 'Ноя', forecast: 4700, seasonal: 0.95 },
    { month: 'Дек', forecast: 4400, seasonal: 0.90 },
  ];

  const analyticsData = [
    { category: 'Арабика', sales: 45000, growth: 12 },
    { category: 'Робуста', sales: 32000, growth: 8 },
    { category: 'Смесь', sales: 28000, growth: 15 },
    { category: 'Декаф', sales: 12000, growth: -3 },
  ];

  const seasonalityData = [
    { season: 'Зима', demand: 0.85, temp: -5 },
    { season: 'Весна', demand: 1.05, temp: 12 },
    { season: 'Лето', demand: 1.22, temp: 24 },
    { season: 'Осень', demand: 1.02, temp: 10 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Coffee" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold">CoffeeForecast</h1>
                <p className="text-xs text-muted-foreground">Прогнозирование спроса</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Неделя</SelectItem>
                  <SelectItem value="month">Месяц</SelectItem>
                  <SelectItem value="quarter">Квартал</SelectItem>
                  <SelectItem value="year">Год</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Icon name="Settings" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <Icon name="TrendingUp" size={16} />
              Прогнозы
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Icon name="BarChart3" size={16} />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Icon name="Sliders" size={16} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Текущий спрос</CardDescription>
                  <CardTitle className="text-3xl">6,200</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600">
                    <Icon name="ArrowUp" size={16} />
                    <span className="ml-1">+12% к прошлому месяцу</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Прогноз на июль</CardDescription>
                  <CardTitle className="text-3xl">6,500</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-secondary">
                    <Icon name="TrendingUp" size={16} />
                    <span className="ml-1">+4.8% рост</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Точность модели</CardDescription>
                  <CardTitle className="text-3xl">94.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Activity" size={16} />
                    <span className="ml-1">Высокая надёжность</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Прогноз спроса на год</CardTitle>
                <CardDescription>
                  Фактические данные и прогноз с учётом сезонных колебаний
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={forecastData}>
                    <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      fill="url(#colorActual)" 
                      name="Факт"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#0EA5E9" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#colorForecast)" 
                      name="Прогноз"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Сезонные коэффициенты</CardTitle>
                <CardDescription>
                  Влияние времени года на спрос кофе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={seasonalityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="season" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="demand" fill="#8B5CF6" name="Коэффициент спроса" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Продажи по категориям</CardTitle>
                <CardDescription>
                  Анализ объёмов продаж различных видов кофе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={analyticsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="category" type="category" stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#0EA5E9" name="Объём продаж (кг)" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analyticsData.map((item) => (
                <Card key={item.category}>
                  <CardHeader className="pb-3">
                    <CardDescription>{item.category}</CardDescription>
                    <CardTitle className="text-2xl">{item.sales.toLocaleString()} кг</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`flex items-center text-sm ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <Icon name={item.growth >= 0 ? "ArrowUp" : "ArrowDown"} size={16} />
                      <span className="ml-1">{Math.abs(item.growth)}% за период</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ключевые метрики</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Package" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Средний объём заказа</p>
                      <p className="text-xl font-semibold">2,340 кг</p>
                    </div>
                  </div>
                  <div className="text-green-600 text-sm">+8%</div>
                </div>
                
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Icon name="Users" className="text-secondary" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Активных клиентов</p>
                      <p className="text-xl font-semibold">1,247</p>
                    </div>
                  </div>
                  <div className="text-green-600 text-sm">+15%</div>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Icon name="Repeat" className="text-accent" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Повторные заказы</p>
                      <p className="text-xl font-semibold">68%</p>
                    </div>
                  </div>
                  <div className="text-green-600 text-sm">+3%</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Параметры прогнозирования</CardTitle>
                <CardDescription>
                  Настройте параметры модели для более точных прогнозов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Период прогнозирования</label>
                  <Select defaultValue="12">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 месяца</SelectItem>
                      <SelectItem value="6">6 месяцев</SelectItem>
                      <SelectItem value="12">12 месяцев</SelectItem>
                      <SelectItem value="24">24 месяца</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Учёт сезонности</label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Автоматически</SelectItem>
                      <SelectItem value="strong">Высокая сезонность</SelectItem>
                      <SelectItem value="medium">Средняя сезонность</SelectItem>
                      <SelectItem value="low">Низкая сезонность</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Тип модели</label>
                  <Select defaultValue="arima">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arima">ARIMA</SelectItem>
                      <SelectItem value="prophet">Prophet</SelectItem>
                      <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                      <SelectItem value="ensemble">Ensemble (комбинированная)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Пересчитать прогноз
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Внешние факторы</CardTitle>
                <CardDescription>
                  Дополнительные параметры, влияющие на спрос
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="CloudRain" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Погодные условия</p>
                      <p className="text-sm text-muted-foreground">Учитывать температуру и осадки</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Включено</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Calendar" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Праздничные дни</p>
                      <p className="text-sm text-muted-foreground">Учитывать выходные и праздники</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Включено</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Рыночные тренды</p>
                      <p className="text-sm text-muted-foreground">Анализ общих трендов рынка</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Выключено</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
